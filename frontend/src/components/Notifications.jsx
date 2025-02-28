import React, { useState } from 'react';
import { Bell, AlertCircle, CheckCircle } from 'lucide-react';

const Notifications = () => {
  const [unreadNotifications, setUnreadNotifications] = useState([
    {
      id: 1,
      title: "New Message",
      message: "You have received a new message from John.",
      time: "2 hours ago",
      type: "info"
    },
    {
      id: 2,
      title: "System Update",
      message: "Your system will be updated tonight.",
      time: "1 day ago",
      type: "warning"
    }
  ]);

  const [readNotifications, setReadNotifications] = useState([
    {
      id: 3,
      title: "Group Update",
      message: "New member joined your project group: John Doe",
      time: "1 day ago",
      type: "info"
    },
    {
      id: 4,
      title: "Deadline Reminder",
      message: "Project specification submission due in 3 days",
      time: "2 days ago",
      type: "warning"
    }
  ]);

  const [activeTab, setActiveTab] = useState('unread');

  const markAsRead = (id) => {
    const notification = unreadNotifications.find(n => n.id === id);
    setUnreadNotifications(unreadNotifications.filter(n => n.id !== id));
    setReadNotifications([...readNotifications, notification]);
  };

  const NotificationCard = ({ notification, onMarkAsRead }) => (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 hover:shadow-md transition-shadow duration-200 ease-in-out
      ${notification.type === 'urgent' ? 'border-red-500' : 
        notification.type === 'success' ? 'border-green-500' : 
        notification.type === 'warning' ? 'border-yellow-500' : 'border-blue-500'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-800">{notification.title}</h3>
          <p className="text-gray-600 mt-1 text-sm">{notification.message}</p>
        </div>
        <span className="text-xs text-gray-500">{notification.time}</span>
      </div>
      {onMarkAsRead && (
        <button
          onClick={() => onMarkAsRead(notification.id)}
          className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
        >
          Mark as Read
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pt-20 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Bell className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Notification Center</h1>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('unread')}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === 'unread'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Incoming Updates
          </button>
          <button
            onClick={() => setActiveTab('read')}
            className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === 'read'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Previous Updates
          </button>
        </div>

        <div className="mt-6">
          {activeTab === 'unread' ? (
            <div className="space-y-4">
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={markAsRead}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No new notifications</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {readNotifications.length > 0 ? (
                readNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No previous notifications</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;