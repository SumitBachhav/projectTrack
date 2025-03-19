import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubmittedAbstractPage = () => {
  const [submittedAbstracts, setSubmittedAbstracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmittedAbstracts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/student/getSubmittedAbstract`);
        setSubmittedAbstracts(response.data.data.abstracts);
      } catch (error) {
        console.error("Error fetching submitted abstracts", error);
      }
    };
    
    fetchSubmittedAbstracts();
  }, []);

  const handleUpdate = (abstractId) => {
    navigate(`/student/updateabstract/${abstractId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 mt-14">
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">Submitted Abstracts</h1>

        {submittedAbstracts.length > 0 ? (
          submittedAbstracts.map((abstract) => (
            <div key={abstract._id} className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{abstract.title}</h2>
              <p className="text-lg text-gray-600 mb-4">{abstract.abstract}</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Domain:</h3>
                  <p className="text-lg text-gray-600">{abstract.domain.join(", ")}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Keywords:</h3>
                  <p className="text-lg text-gray-600">{abstract.keywords.join(", ")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Status:</h3>
                  <p className={`text-lg font-semibold ${abstract.status === 'accepted' ? 'text-green-500' : abstract.status === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                    {abstract.status}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Submission Date:</h3>
                  <p className="text-lg text-gray-600">{new Date(abstract.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {abstract.comments && abstract.comments.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-gray-800">Staff Comments:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {abstract.comments.map((comment, index) => (
                      <li key={index} className="text-lg">{comment}</li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => handleUpdate(abstract._id)}
                className="mt-6 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200 block w-full text-center"
              >
                Update Abstract
              </button>
            </div>
          ))
        ) : (
          <p className="text-lg text-center text-gray-600">No submitted abstracts found.</p>
        )}
      </div>
    </div>
  );
};

export default SubmittedAbstractPage;
