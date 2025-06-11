import React from 'react'
// import Modal from '../ui/Modal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4

const AvailableGroups = () => {

  const navigate = useNavigate();

  const [selectedProjects, setSelectedProjects] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/student/getAvailableGroups`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setData(response.data.data);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (grouptId) => {
    const updatedProjects = [...selectedProjects];
    const index = updatedProjects.indexOf(grouptId);
    if (index === -1) {
      updatedProjects.push(grouptId);
    } else {
      updatedProjects.splice(index, 1);
    }
    setSelectedProjects(updatedProjects);
    console.log(selectedProjects);
  };

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/student/sendRequestToGroup`,
        { groupIds: selectedProjects },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      alert("Request sent successfully!");
    } catch (err) {
      setError("Failed to send request.");
    }
    navigate('/student/dashboard');
  };

  if (loading) return (
    <p className="flex justify-center items-center h-screen text-2xl font-bold text-gray-700">
      Loading...
    </p>
  );

  if (error) return (
    <p className="flex justify-center items-center h-screen text-2xl font-bold text-red-500">
      {error}
    </p>
  );


  return (
    <div className='mt-16 flex flex-row'>
      <div className='w-3/4 overflow-auto h-screen bg-slate-400'>
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-slate-100 p-6 rounded-xl shadow-lg mb-4 m-2"
          >
            <p className="text-2xl font-bold mb-4">{item.projectTitle}</p>
            <p className="mb-4">Project Lead: {item.projectHead}</p>
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
                className={`bg-${selectedProjects.includes(item.groupId) ? 'slate-400' : 'slate-200'} p-1 flex justify-center rounded-xl shadow-lg my-2 cursor-pointer hover:bg-slate-300`}
                onClick={() => handleSelect(item.groupId)}
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