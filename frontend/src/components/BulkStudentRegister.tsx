import React, { useState } from "react";
import axios from "axios";

type User = {
  name: string;
  email: string;
  password: string;
  role: string;
};

type RegistrationResult = {
  successfulUsers: User[];
  failedUsers: { user: User; reason: string }[];
};

const BulkStudentRegister: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [result, setResult] = useState<RegistrationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setResult(null);

    try {
      const parsedData: User[] = JSON.parse(jsonInput);

      if (!Array.isArray(parsedData)) {
        setError("Input must be a JSON array.");
        return;
      }

      setLoading(true);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/bulkRegister`, parsedData, { withCredentials: true }); // Change this to your actual route
      const { successfulUsers, failedUsers } = response.data.data;

      setResult({ successfulUsers, failedUsers });
    } catch (err: any) {
      console.error(err);
      setError("Invalid JSON input or server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-16 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Bulk Register Students</h2>

      <textarea
        className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono"
        placeholder='Paste JSON array here. E.g. [{"name":"John", "email":"john@example.com", "password":"123", "role":"student"}]'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
      >
        {loading ? "Registering..." : "Submit"}
      </button>

      {error && (
        <div className="mt-4 text-red-600 font-semibold">{error}</div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-green-100 p-4 rounded-md">
            <h3 className="font-bold text-green-700">
              ✅ {result.successfulUsers.length} users registered successfully
            </h3>
            <ul className="list-disc list-inside text-sm">
              {result.successfulUsers.map((user, idx) => (
                <li key={idx}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>

          {result.failedUsers.length > 0 && (
            <div className="bg-red-100 p-4 rounded-md">
              <h3 className="font-bold text-red-700">
                ❌ {result.failedUsers.length} users failed to register
              </h3>
              <ul className="list-disc list-inside text-sm">
                {result.failedUsers.map((fail, idx) => (
                  <li key={idx}>
                    {fail.user?.email || "Unknown"} - {fail.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkStudentRegister;
