import React, { useState } from 'react';
import axios from 'axios';

const SendInvitationsRawJSON = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [successList, setSuccessList] = useState([]);
  const [failureList, setFailureList] = useState([]);

  const handleSend = async () => {
    try {
      const parsed = JSON.parse(jsonInput);

      if (!parsed.users || !Array.isArray(parsed.users)) {
        alert("Invalid input: 'users' array is missing.");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/email/send-invitations`,
        parsed,
        { withCredentials: true }
      );

      const { sent = [], failed = [] } = response.data;
      setSuccessList(sent);
      setFailureList(failed);

      if (sent.length > 0 || failed.length > 0) {
        alert('Email processing completed. See results below.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send invitations. Please check your input JSON.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  const formatList = (list) =>
    JSON.stringify(list, null, 2); // pretty print JSON

  return (
    <div className="max-w-4xl mx-auto p-8 mt-16 bg-white shadow-lg rounded-2xl border">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">📩 Send Email Invitations</h2>

      <label htmlFor="jsonInput" className="block text-sm font-medium text-gray-700 mb-2">
        Paste JSON below
      </label>
      <textarea
        id="jsonInput"
        rows={12}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Example: { "users": [ { "name": "Alice", "email": "...", "password": "..." } ] }'
        className="w-full border border-gray-300 p-4 rounded-lg font-mono text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className={`mt-6 px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Sending...
          </div>
        ) : (
          'Send Invitations'
        )}
      </button>

      {/* Success List */}
{successList.length > 0 && (
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-green-700 mb-2">
      ✅ Invitations Sent Successfully ({successList.length})
    </h3>
    <div className="overflow-x-auto border border-green-200 rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-green-100 text-green-800">
          <tr>
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium">Email</th>
          </tr>
        </thead>
        <tbody>
          {successList.map((user, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button
      onClick={() => copyToClipboard(formatList(successList))}
      className="mt-2 text-sm text-green-600 hover:underline"
    >
      📋 Copy Success List (JSON)
    </button>
  </div>
)}

{/* Failure List */}
{failureList.length > 0 && (
  <div className="mt-8">
    <h3 className="text-lg font-semibold text-red-700 mb-2">
      ❌ Failed to Send ({failureList.length})
    </h3>
    <div className="overflow-x-auto border border-red-200 rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-red-100 text-red-800">
          <tr>
            <th className="px-4 py-2 font-medium">Name</th>
            <th className="px-4 py-2 font-medium">Email</th>
            <th className="px-4 py-2 font-medium">Reason</th>
          </tr>
        </thead>
        <tbody>
          {failureList.map((user, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.reason || 'Unknown error'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button
      onClick={() => copyToClipboard(formatList(failureList))}
      className="mt-2 text-sm text-red-600 hover:underline"
    >
      📋 Copy Failure List (JSON)
    </button>
  </div>
)}

    </div>
  );
};

export default SendInvitationsRawJSON;
