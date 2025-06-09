import mongoose from "mongoose";
import { Abstract } from "../models/abstract.model.js";
import { Staff } from "../models/staff.model.js";

// Determine final decision from staff votes
const getFinalDecision = (decisions) => {
    const sorted = decisions.slice().sort(); // predictable ordering
    const key = sorted.join(',');

    const decisionMap = {
        "accepted,accepted": "accepted",
        "accepted,revision": "revision",
        "accepted,rejected,accepted": "revision",
        "accepted,rejected,revision": "revision",
        "accepted,rejected,rejected": "rejected",
        "revision,revision": "revision",
        "revision,rejected": "rejected",
        "rejected,rejected": "rejected"
    };

    return decisionMap[key] || null;
};

const resolveAbstractDecision = async (abstractId) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const abstract = await Abstract.findById(abstractId).session(session);
        if (!abstract) throw new Error("Abstract not found.");

        if (abstract.status !== 'submitted') {
            await session.commitTransaction();
            return true; // No processing needed
        }

        const assignedTo = abstract.assignedTo;
        const decided = assignedTo.filter(entry => entry.decision !== 'pending');

        if (decided.length < 2) {
            await session.commitTransaction();
            return true; // Not enough decisions yet
        }

        const decisions = decided.map(entry => entry.decision);
        const finalDecision = getFinalDecision(decisions);

        if (!finalDecision) {
            await session.commitTransaction();
            return true; // No conclusion possible yet
        }

        // Update abstract status
        abstract.status = finalDecision;

        // If 3 staff were assigned and one is still pending, remove that one
        if (assignedTo.length === 3) {
            const undecided = assignedTo.find(entry => entry.decision === 'pending');
            if (undecided) {
                const undecidedStaffId = undecided.assignedStaff;

                // Remove undecided staff from abstract
                abstract.assignedTo = assignedTo.filter(entry => entry.assignedStaff.toString() !== undecidedStaffId.toString());

                // Remove abstract from staff’s verificationAssigned
                await Staff.updateOne(
                    { _id: undecidedStaffId },
                    { $pull: { verificationAssigned: { abstract: abstract._id } } },
                    { session }
                );
            }
        }

        await abstract.save({ session });
        await session.commitTransaction();
        return true;

    } catch (error) {
        await session.abortTransaction();
        console.error(`Error resolving decision for abstract ${abstractId}:`, error.message);
        return false;
    } finally {
        session.endSession();
    }
};

export { resolveAbstractDecision };
