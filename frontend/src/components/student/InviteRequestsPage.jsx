import React, { useEffect, useState } from "react";
import axios from "axios";

const InviteRequestsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modifiableItems, setModifiableItems] = useState(new Set());
  const [acceptedInviteId, setAcceptedInviteId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/student/getInvitesAndRequests`,
          { withCredentials: true }
        );
        const invites = response.data.data.receivedInvites;
        setData(response.data.data);
        setAcceptedInviteId(invites.find((invite) => invite.status === "accepted")?._id || null);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleResponse = async (item, response, isRequest = false) => {
    try {
      const endpoint = isRequest
        ? `${import.meta.env.VITE_API_URL}/api/v1/student/RequestResponseForGroup`
        : `${import.meta.env.VITE_API_URL}/api/v1/student/inviteResponse`;

      // Use the appropriate ID for the API call
      const idToSend = item.inviteId || item._id;
      await axios.post(endpoint, { inviteId: idToSend, response }, { withCredentials: true });
      
      alert(`${isRequest ? "Request" : "Invite"} ${response}`);

      if (!isRequest) {
        setAcceptedInviteId(response === "accepted" ? item._id : null);
      }

      // Update the data state
      const key = isRequest ? "receivedRequests" : "receivedInvites";
      setData((prev) => ({
        ...prev,
        [key]: prev[key].map((dataItem) =>
          dataItem._id === item._id ? { ...dataItem, status: response } : dataItem
        ),
      }));

      // Remove from modifiable items - use the same unique key
      const uniqueKey = item._id || item.inviteId;
      setModifiableItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(uniqueKey);
        return newSet;
      });

      window.location.reload();
    } catch (err) {
      alert("Failed to send response.");
    }
  };

  const toggleModifiable = (itemId) => {
    setModifiableItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

  const renderSection = (key, list) => {
    const isRequest = key === "receivedRequests";
    const isSentSection = key === "sentInvites" || key === "sentRequests";
    const sectionTitle = key.replace(/([A-Z])/g, " $1");

    return (
      <div key={key} className="mb-6">
        <h3 className="text-lg font-bold text-gray-700 capitalize border-b pb-2">
          {sectionTitle}
        </h3>

        {list.length === 0 ? (
          <p className="text-gray-500 mt-2">
            No {sectionTitle.toLowerCase()}.
          </p>
        ) : (
          list.map((item, index) => {
            // Create a unique key using section, id, and index as fallback
            const uniqueKey = item._id || item.inviteId || `${key}-${index}`;
            const isModifiable = modifiableItems.has(uniqueKey);
            const disableFade = isRequest || !acceptedInviteId || acceptedInviteId === item._id;

            return (
              <div
                key={uniqueKey}
                className={`mt-3 p-4 border rounded-lg shadow-sm bg-gray-50 ${!disableFade ? "opacity-50" : ""}`}
              >
                <p className="text-gray-800 font-medium">👤 {item.name}</p>
                <p className="text-gray-600 text-sm">📅 {formatDate(item.date)}</p>
                <p
                  className={`text-sm mt-1 font-semibold ${
                    item.status === "pending"
                      ? "text-yellow-600"
                      : item.status === "accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {item.status}
                </p>

                {item.abstract && (
                  <div className="mt-3 bg-white p-3 border rounded-lg">
                    <h4 className="text-md font-semibold">📖 {item.abstract.title}</h4>
                    <p className="text-gray-600 text-sm mt-1">{item.abstract.abstract}</p>
                    <p className="text-gray-700 text-sm mt-1">
                      <strong>Domain:</strong> {item.abstract.domain.join(", ")}
                    </p>
                  </div>
                )}

                {/* Only show buttons for received invites and requests, not sent ones */}
                {!isSentSection && (
                  <div className="mt-3 flex space-x-3">
                    {item.status === "pending" ? (
                      isModifiable ? (
                        <>
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            onClick={() => handleResponse(item, "accepted", isRequest)}
                          >
                            Accept
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={() => handleResponse(item, "rejected", isRequest)}
                          >
                            Reject
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            onClick={() => toggleModifiable(uniqueKey)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            onClick={() => handleResponse(item, "accepted", isRequest)}
                          >
                            Accept
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={() => handleResponse(item, "rejected", isRequest)}
                          >
                            Reject
                          </button>
                        </>
                      )
                    ) : (
                      // For non-pending status, show modify decision button
                      isModifiable ? (
                        <>
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            onClick={() => handleResponse(item, "accepted", isRequest)}
                          >
                            Accept
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={() => handleResponse(item, "rejected", isRequest)}
                          >
                            Reject
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            onClick={() => toggleModifiable(uniqueKey)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          onClick={() => toggleModifiable(uniqueKey)}
                        >
                          Modify Decision
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  if (loading)
    return <p className="text-center text-2xl font-bold mt-20">Loading...</p>;

  if (error)
    return <p className="text-center text-2xl font-bold text-red-500 mt-20">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Invites & Requests</h2>
      {data && Object.entries(data).map(([key, list]) => renderSection(key, list))}
    </div>
  );
};

export default InviteRequestsPage;