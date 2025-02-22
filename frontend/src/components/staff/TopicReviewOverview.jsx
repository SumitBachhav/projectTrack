import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const TopicReviewOverview = () => {
  const [abstracts, setAbstracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchAbstracts = async () => {
      try {
        const response = await fetch("/api/v1/staff/toVerifyAbstractList");
        if (!response.ok) {
          throw new Error("Failed to fetch abstracts");
        }
        const data = await response.json();
        setAbstracts(data.data); // Update to match the API response structure
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAbstracts();
  }, []);

  // Function to handle row click
  const handleRowClick = (abstractId) => {
    navigate(`/staff/topicReview`, { state: { abstractId } }); // Navigate to the detail page with abstractId
  };

  if (loading) return <p>Loading abstracts...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to get color for status
  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "text-green-600 bg-green-200/50 border-green-400";
      case "rejected":
        return "text-red-600 bg-red-200/50 border-red-400";
      case "submitted":
        return "text-blue-600 bg-blue-200/50 border-blue-400"
      case "revision":
        return "text-blue-600 bg-blue-200/50 border-yellow-400"
      default:
        return "text-gray-600 bg-gray-200/50 border-gray-400";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="max-w-4xl w-full p-6 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📄 Submitted Abstracts</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-lg bg-white/90">
            <thead>
              <tr className="bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800">
                <th className="py-3 px-4 text-left font-semibold">Title</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
            {abstracts.length > 0 ? (
              abstracts.map((abstract) => (
                <tr
                  key={abstract.id}
                  className="border hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(abstract.id)} // Add click handler
                >
                  {/* <td className="border p-2">{abstract.title}</td> */}
                  {/* <td className="border p-2">{abstract.status}</td> */}
                  <td className="py-4 px-4 text-gray-800 font-medium">{abstract.title}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full border ${getStatusColor(abstract.status)} shadow-sm`}
                    >
                      {abstract.status == "submitted" ? "pending" : abstract.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="p-2 text-center">
                  No abstracts available
                </td>
              </tr>
            )}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopicReviewOverview;