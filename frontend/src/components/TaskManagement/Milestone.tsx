import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, ArrowRight, X } from "lucide-react";

interface MilestoneData {
  id: string;
  milestone: string;
}

const Milestone: React.FC = () => {
  const [milestones, setMilestones] = useState<MilestoneData[]>([]);
  const [newMilestone, setNewMilestone] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Fetch milestones from the API on component mount
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get<MilestoneData[]>(
          "http://localhost:4000/api/v1/assigner/task/milestone",
          { withCredentials: true }
        );
        console.log("Fetched milestones:", response.data);
        // Reverse the fetched milestones so newest appears first
        setMilestones(response.data.reverse());
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchMilestones();
  }, []);

  const addMilestone = async () => {
    if (newMilestone.trim() === "") return;
    try {
      const response = await axios.post<MilestoneData>(
        "http://localhost:4000/api/v1/assigner/task/milestone",
        { milestone: newMilestone },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      // Add new milestone to the beginning of the chain
      const createdMilestone = response.data;
      setMilestones([createdMilestone, ...milestones]);
      setNewMilestone("");
      setDialogOpen(false); // Close the dialog after adding
    } catch (error) {
      console.error("Error adding milestone:", error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-2 mt-20 mx-5">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="flex items-center gap-4">
          <div className="w-36 h-36 flex items-center justify-center rounded-full border-2 border-gray-500 bg-blue-100 text-black text-lg">
            {milestone.milestone}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewMilestone(e.target.value)
            }
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
