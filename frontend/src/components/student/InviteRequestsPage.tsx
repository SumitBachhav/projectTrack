import React, { useEffect, useState } from "react";
import axios from "axios";

// Type Definitions
interface Abstract {
  title: string;
  abstract: string;
  domain: string[];
  requirements: { domain: string; skills: string[] }[];
}

interface Skill {
  _id: string;
  domain: string;
  skills: string[];
  experience: number;
}

interface InviteRequest {
  name: string;
  date: string;
  status: string;
  abstract?: Abstract;
  skills?: Skill[];
  _id: string;
}

interface ApiResponse {
  sentInvites: InviteRequest[];
  sentRequests: InviteRequest[];
  receivedInvites: InviteRequest[];
  receivedRequests: InviteRequest[];
}

const InviteRequestsPage: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modifiableInviteId, setModifiableInviteId] = useState<string | null>(null);
  const [acceptedInviteId, setAcceptedInviteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: ApiResponse }>(`${import.meta.env.VITE_API_URL}/api/v1/student/getInvitesAndRequests`, {
          withCredentials: true
        });
        setData(response.data.data);
        setAcceptedInviteId(response.data.data.receivedInvites.find(invite => invite.status === "accepted")?._id || null);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleResponse = async (inviteId: string, response: "accepted" | "rejected") => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/student/inviteResponse`,
        { inviteId, response },
        { withCredentials: true }
      );
      alert(`Invite ${response}`);
      setAcceptedInviteId(response === "accepted" ? inviteId : null);
      setData(prevData => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          receivedInvites: prevData.receivedInvites.map(invite =>
            invite._id === inviteId ? { ...invite, status: response } : invite
          ),
        };
      });
      setModifiableInviteId(null);
    } catch (err) {
      alert("Failed to send response.");
    }
  };

  const formatDate = (dateStr: string): string => new Date(dateStr).toLocaleDateString("en-GB");

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Invites & Requests</h2>

      {data &&
        Object.entries(data).map(([key, list]: [string, InviteRequest[]]) => (
          <div key={key} className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 capitalize border-b pb-2">{key.replace(/([A-Z])/g, " $1")}</h3>
            {list.length === 0 ? (
              <p className="text-gray-500 mt-2">No {key.replace(/([A-Z])/g, " $1").toLowerCase()}.</p>
            ) : (
              list.map((item: InviteRequest, index: number) => (
                <div key={index} className={`mt-3 p-4 border rounded-lg shadow-sm bg-gray-50 ${acceptedInviteId && acceptedInviteId !== item._id ? "opacity-50" : ""}`}>
                  <p className="text-gray-800 font-medium">👤 {item.name}</p>
                  <p className="text-gray-600 text-sm">📅 {formatDate(item.date)}</p>
                  <p className={`text-sm mt-1 font-semibold ${item.status === "pending" ? "text-yellow-600" : "text-green-600"}`}>
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

                  {(key === "receivedInvites") && (
                    <div className="mt-3 flex space-x-3">
                      {modifiableInviteId === item._id || (item.status === "pending" && !acceptedInviteId) ? (
                        <>
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            onClick={() => handleResponse(item._id, "accepted")}
                          >
                            Accept
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            onClick={() => handleResponse(item._id, "rejected")}
                          >
                            Reject
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            onClick={() => setModifiableInviteId(null)}
                          >
                            Cancel Modify
                          </button>
                        </>
                      ) : (
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          onClick={() => setModifiableInviteId(item._id)}
                        >
                          Modify Decision
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ))}
    </div>
  );
};

export default InviteRequestsPage;
