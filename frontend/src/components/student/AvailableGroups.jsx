import React from 'react'
// import Modal from '../ui/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4

const AvailableGroups = () => {

  const navigate = useNavigate();

  const data = [
    {
      projectTitle: "AI-Powered Chatbot",
      projectAbstract: "A conversational AI chatbot designed to assist customers with frequently asked questions and basic service requests.",
      projectId: 1,
      members: [
        "Alice Johnson",
        "Bob Smith",
        "Charlie Brown",
      ],
      projectHead: "Dr. Emily Davis",
    },
    {
      projectTitle: "E-Commerce Platform",
      projectAbstract: "A scalable e-commerce platform offering a wide variety of products with integrated payment systems, user reviews, and product recommendations.",
      projectId: 2,
      members: [
        "David Lee",
        "Eva Martinez",
        "Frank Wilson",
      ],
      projectHead: "Sarah Thompson",
    },
    {
      projectTitle: "Smart Home Automation",
      projectAbstract: "A smart home system that allows users to control lighting, heating, security, and appliances through a mobile app or voice assistant.",
      projectId: 3,
      members: [
        "Grace Clark",
        "Hannah Moore",
        "Isaac Taylor",
      ],
      projectHead: "Michael Roberts",
    },
    {
      projectTitle: "Blockchain Voting System",
      projectAbstract: "A secure, transparent, and decentralized voting platform built on blockchain technology to ensure the integrity of elections.",
      projectId: 4,
      members: [
        "Jack White",
        "Lily Harris",
        "Mason Scott",
      ],
      projectHead: "Dr. Robert Jones",
    },
    {
      projectTitle: "Real-Time Weather App",
      projectAbstract: "An app that provides real-time weather data, forecasts, and weather alerts using APIs from various weather data providers.",
      projectId: 5,
      members: [
        "Olivia Green",
        "Paul Walker",
        "Quincy Adams",
      ],
      projectHead: "Dr. Laura Mitchell",
    },
];


  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleSelect = (projectId) => {
    const updatedProjects = [...selectedProjects];
    const index = updatedProjects.indexOf(projectId);
    if (index === -1) {
      updatedProjects.push(projectId);
    } else {
      updatedProjects.splice(index, 1);
    }
    setSelectedProjects(updatedProjects);
  };

  const handleSendRequest = () => {
    // console.log("Sending request to selected projects:", selectedProjects);
    alert("Request sent successfully!");
    navigate('/student/dashboard');
  };


  return (
    <div className='mt-16 flex flex-row'>
      <div className='w-3/4 overflow-auto h-screen bg-slate-400'>
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-slate-100 p-6 rounded-xl shadow-lg mb-4 m-2"
          >
            <p className="text-2xl font-bold mb-4">{item.projectTitle}</p>
            <p className="mb-4">Project Head: {item.projectHead}</p>
            <p className="mb-4">Members: {item.members.join(', ')}</p>
            <p className="mb-4">{item.projectAbstract}</p>
          </div>
        ))}
      </div>
      <div className='w-1/4 mx-2'>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-2xl font-bold mb-4">Select Projects to send join requests</p>
          
          <div className="grid grid-cols-1">
            {data.map((item, index) => (
              <div
                key={index}
                className={`bg-${selectedProjects.includes(item.projectId) ? 'slate-400' : 'slate-200'} p-1 flex justify-center rounded-xl shadow-lg my-2 cursor-pointer hover:bg-slate-300`}
                onClick={() => handleSelect(item.projectId)}
              >
                <p className="text-lg mb-4">{item.projectTitle}</p>
              </div>
            ))}
            <button
              onClick={handleSendRequest}
                className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none m-2"
            >
              Send request
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvailableGroups