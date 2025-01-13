import React from 'react'

const InvitesAndRequests = () => {

    const data = {
        InvitationSent: [],
        InvitationReceived: [],
        Requests: []
    }



    return (
        <div className='mt-16'>
            <div className="p-6 max-w-4xl mx-auto bg-slate-50 shadow-lg rounded-lg mt-32">
      {/* Invites Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Invites</h2>

        {/* Sent Invites Section */}
        <div className="mt-6">
          <h3 className="text-xl font-medium text-blue-600">Sent</h3>
          {data.InvitationSent.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {data.InvitationSent.map((invite, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                  <span className="text-gray-700">{invite.name}</span>
                  <button className="text-sm text-blue-500 hover:underline">Cancel</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-500">No sent invitations.</p>
          )}
        </div>

        {/* Received Invites Section */}
        <div className="mt-6">
          <h3 className="text-xl font-medium text-green-600">Received</h3>
          {data.InvitationReceived.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {data.InvitationReceived.map((invite, index) => (
                <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                  <span className="text-gray-700">{invite.name}</span>
                  <div className="space-x-3">
                    <button className="text-sm text-green-500 hover:underline">Accept</button>
                    <button className="text-sm text-red-500 hover:underline">Decline</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-500">No received invitations.</p>
          )}
        </div>
      </div>

      {/* Requests Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Requests</h2>
        {data.Requests.length > 0 ? (
          <ul className="mt-6 space-y-2">
            {data.Requests.map((request, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100">
                <span className="text-gray-700">{request.name}</span>
                <div className="space-x-3">
                  <button className="text-sm text-blue-500 hover:underline">Approve</button>
                  <button className="text-sm text-red-500 hover:underline">Reject</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-500">No requests.</p>
        )}
      </div>
    </div>
        </div>
    )
}

export default InvitesAndRequests