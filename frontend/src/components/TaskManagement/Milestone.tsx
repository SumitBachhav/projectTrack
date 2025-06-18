import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, ArrowRight, X, Edit, Trash2, MoreVertical } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface MilestoneData {
  id: string;
  milestone: string;
  order: number;
}

interface ContextMenuProps {
  x: number;
  y: number;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const ContextMenu = ({ x, y, onEdit, onDelete, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute bg-white shadow-lg rounded-md py-1 z-50 border border-blue-200 min-w-32"
      style={{ top: `${y}px`, left: `${x}px` }}
    >
      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-blue-700"
        onClick={onEdit}
      >
        <Edit size={16} /> Edit
      </button>
      <button
        className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-red-600"
        onClick={onDelete}
      >
        <Trash2 size={16} /> Delete
      </button>
    </div>
  );
};

const Milestone: React.FC = () => {
  const [milestones, setMilestones] = useState<MilestoneData[]>([]);
  const [newMilestone, setNewMilestone] = useState<string>("");
  const [editMilestone, setEditMilestone] = useState<string>("");
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [insertionIndex, setInsertionIndex] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
    milestoneId: string | null;
  }>({
    x: 0,
    y: 0,
    visible: false,
    milestoneId: null,
  });

  useEffect(() => {
    fetchMilestones();
  }, []);

  useEffect(() => {
    if (!dialogOpen) {
      setInsertionIndex(null);
      setNewMilestone("");
    }
  }, [dialogOpen]);

  const fetchMilestones = async () => {
    try {
      const response = await axios.get<MilestoneData[]>(
        "http://localhost:4000/api/v1/assigner/task/milestone",
        { withCredentials: true }
      );
      const sortedMilestones = response.data.sort((a, b) => a.order - b.order);
      setMilestones(sortedMilestones);
    } catch (error) {
      console.error("Error fetching milestones:", error);
      toast.error("Failed to load milestones");
    }
  };

  const handleOpenAddDialog = (index: number) => {
    setInsertionIndex(index);
    setNewMilestone("");
    setDialogOpen(true);
  };

  const calculateNewOrder = (index: number): number => {
    if (milestones.length === 0) {
      return 0;
    }
    
    if (index === 0) {
      return milestones[0].order - 1000; // Large step back to ensure it stays first
    }
    
    if (index >= milestones.length) {
      return milestones[milestones.length - 1].order + 1000; // Large step forward to ensure it stays last
    }
    
    // For inserting between two milestones
    return (milestones[index - 1].order + milestones[index].order) / 2;
  };

  const addMilestone = async () => {
    if (newMilestone.trim() === "" || insertionIndex === null) {
      toast.error("Milestone title cannot be empty.");
      return;
    }

    const newOrder = calculateNewOrder(insertionIndex);
    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const optimisticMilestone: MilestoneData = {
      id: tempId,
      milestone: newMilestone,
      order: newOrder
    };

    // Optimistically update the UI
    const newMilestones = [...milestones];
    newMilestones.splice(insertionIndex, 0, optimisticMilestone);
    setMilestones(newMilestones.sort((a, b) => a.order - b.order));

    setDialogOpen(false);
    setNewMilestone("");

    try {
      await axios.post<MilestoneData>(
        "http://localhost:4000/api/v1/assigner/task/milestone",
        {
          milestone: newMilestone,
          order: newOrder
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      await fetchMilestones();
      toast.success("Milestone added successfully!");
    } catch (error) {
      console.error("Error adding milestone:", error);
      setMilestones(prevMilestones =>
        prevMilestones.filter(m => m.id !== tempId)
      );
      toast.error("Failed to add milestone. Please refresh and try again.");
      fetchMilestones();
    }
  };

  const updateMilestone = async () => {
    if (!selectedMilestoneId || editMilestone.trim() === "") {
      toast.error("Milestone title cannot be empty.");
      return;
    }

    const originalMilestones = [...milestones];
    setMilestones(prevMilestones =>
      prevMilestones.map(m =>
        m.id === selectedMilestoneId ? { ...m, milestone: editMilestone } : m
      )
    );
    setEditDialogOpen(false);

    try {
      await axios.patch<MilestoneData>(
        `http://localhost:4000/api/v1/assigner/task/milestone/${selectedMilestoneId}`,
        { milestone: editMilestone },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      await fetchMilestones();
      toast.success("Milestone updated successfully!");
    } catch (error) {
      console.error("Error updating milestone:", error);
      setMilestones(originalMilestones);
      toast.error("Failed to update milestone. Please refresh and try again.");
      fetchMilestones();
    }
  };

  const deleteMilestone = async () => {
    if (!selectedMilestoneId) return;

    const originalMilestones = [...milestones];
    setMilestones(prevMilestones =>
      prevMilestones.filter(m => m.id !== selectedMilestoneId)
    );
    setDeleteDialogOpen(false);

    try {
      await axios.delete(
        `http://localhost:4000/api/v1/assigner/task/milestone/${selectedMilestoneId}`,
        { withCredentials: true }
      );
      await fetchMilestones();
      toast.success("Milestone deleted successfully!");
    } catch (error) {
      console.error("Error deleting milestone:", error);
      setMilestones(originalMilestones);
      toast.error("Failed to delete milestone. Please refresh and try again.");
      fetchMilestones();
    }
  };

  const handleContextMenu = (e: React.MouseEvent, milestoneId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, visible: true, milestoneId });
  };

  const handleEditClick = () => {
    if (contextMenu.milestoneId) {
      const milestone = milestones.find((m) => m.id === contextMenu.milestoneId);
      if (milestone) {
        setSelectedMilestoneId(contextMenu.milestoneId);
        setEditMilestone(milestone.milestone);
        setEditDialogOpen(true);
      }
    }
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  const handleDeleteClick = () => {
    if (contextMenu.milestoneId) {
      setSelectedMilestoneId(contextMenu.milestoneId);
      setDeleteDialogOpen(true);
    }
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  const hideContextMenu = () => {
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div className="mt-20 mx-auto max-w-7xl">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
        Project Milestones
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-blue-50 rounded-lg shadow-md">
        <button
          className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors shadow-md"
          onClick={() => handleOpenAddDialog(0)}
          title="Add milestone at the beginning"
        >
          <Plus size={24} className="text-white" />
        </button>

        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="flex items-center gap-2">
            <div
              className="relative group w-36 h-36 flex flex-col items-center justify-center rounded-full border-2 border-blue-300 bg-gradient-to-br from-blue-100 to-blue-200 text-blue-800 text-lg font-medium shadow-md transition-all hover:shadow-lg cursor-pointer"
              onContextMenu={(e) => handleContextMenu(e, milestone.id)}
            >
              <div className="p-4 text-center">{milestone.milestone}</div>
              <button
                className="absolute -top-2 -right-2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleContextMenu(e, milestone.id);
                }}
              >
                <MoreVertical size={16} className="text-blue-600" />
              </button>
            </div>
            
            <div
              className="relative w-10 h-10 flex items-center justify-center group rounded-full cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={() => handleOpenAddDialog(index + 1)}
              title="Add milestone here"
            >
              <ArrowRight className="text-blue-400 w-6 h-6 transition-opacity group-hover:opacity-0" />
              <Plus className="text-blue-600 w-6 h-6 absolute transition-opacity opacity-0 group-hover:opacity-100" />
            </div>
          </div>
        ))}
        
        <button
          className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          onClick={() => handleOpenAddDialog(milestones.length)}
          title="Add milestone at the end"
        >
          <Plus size={32} className="text-white" />
        </button>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-blue-800 text-xl font-bold">
              Add New Milestone
              {insertionIndex !== null && (
                <span className="text-sm font-normal text-blue-600 block">
                  {insertionIndex === 0 
                    ? "At the beginning" 
                    : insertionIndex >= milestones.length 
                    ? "At the end" 
                    : `Between position ${insertionIndex} and ${insertionIndex + 1}`
                  }
                </span>
              )}
            </h2>
          </div>
          <input
            type="text"
            placeholder="Enter milestone title"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
            className="w-full p-3 bg-blue-50 text-blue-800 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addMilestone();
              }
            }}
          />
          <button
            onClick={addMilestone}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium transition-colors shadow-md"
          >
            Add Milestone
          </button>
        </DialogContent>
      </Dialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-blue-800 text-xl font-bold">Edit Milestone</h2>
          </div>
          <input
            type="text"
            placeholder="Enter milestone title"
            value={editMilestone}
            onChange={(e) => setEditMilestone(e.target.value)}
            className="w-full p-3 bg-blue-50 text-blue-800 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateMilestone();
              }
            }}
          />
          <button
            onClick={updateMilestone}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium transition-colors shadow-md"
          >
            Update Milestone
          </button>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-blue-800 text-xl font-bold">Delete Milestone</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this milestone? This action cannot be undone.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => setDeleteDialogOpen(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={deleteMilestone}
              className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onClose={hideContextMenu}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Milestone;