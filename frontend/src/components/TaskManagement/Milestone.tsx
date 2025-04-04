import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ArrowRight, X } from "lucide-react";

const Milestone = () => {
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Milestone 1" },
    { id: 2, title: "Milestone 2" },
    { id: 3, title: "Milestone 3" },
  ]);
  const [newMilestone, setNewMilestone] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const addMilestone = () => {
    if (newMilestone.trim() === "") return;
    const newId = milestones.length + 1;
    setMilestones([...milestones, { id: newId, title: newMilestone }]);
    setNewMilestone("");
    setDialogOpen(false); // Close the dialog after adding milestone
  };

  return (
    <div className="flex items-center gap-4 p-2 mt-14">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="flex items-center gap-4">
          <div className="w-40 h-40 flex items-center justify-center rounded-full border-2 border-gray-500 text-black text-lg">
            {milestone.title}
          </div>
          {index < milestones.length - 1 && (
            <ArrowRight className="text-gray-500" />
          )}
        </div>
      ))}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
            <Plus size={32} className="text-white" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl">Add Milestone</h2>
            <DialogTrigger asChild>
              <button onClick={() => setDialogOpen(false)}>
                <X className="text-white cursor-pointer" />
              </button>
            </DialogTrigger>
          </div>
          <input
            type="text"
            placeholder="Enter milestone title"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none"
          />
          <button
            onClick={addMilestone}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Milestone;
