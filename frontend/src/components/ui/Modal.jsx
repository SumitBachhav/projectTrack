import React, { useState } from "react";

// Modal component
const Modal = ({ isOpen, closeModal, names, onSelect }) => {
  const [selectedName, setSelectedName] = useState(null);

  // Handle click on a name
  const handleSelect = (name) => {
    setSelectedName(name);
  };

  // Handle the button click
  const handleButtonClick = () => {
    if (selectedName) {
      onSelect(selectedName);
    }
    closeModal(); // Close the modal after selection
  };

  // If modal is not open, return null to avoid rendering
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg min-w-[300px] text-center">
        <h3 className="text-lg font-semibold mb-4">Select a Name</h3>
        <ul className="list-none p-0 m-0 max-h-52 overflow-y-auto">
          {names.map((name, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 border-b border-gray-300 ${
                selectedName === name ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(name)}
            >
              {name}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between gap-2">
          <button
            onClick={handleButtonClick}
            disabled={!selectedName}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              !selectedName ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            Select
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
