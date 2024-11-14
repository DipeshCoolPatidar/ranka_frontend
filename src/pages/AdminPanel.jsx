import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'; // For charts
import { CircularProgress } from '@mui/material'; // For loading spinner

const DashboardAdminPanel = () => {
  const [staffList, setStaffList] = useState([]);
  const [totalStaff, setTotalStaff] = useState(0);
  const [onlineCount, setOnlineCount] = useState(0); // For analytics
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isCreateModalOpen, setCreateModalOpen] = useState(false); // Modal states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors
    try {
      const response = await axios.get('${apiUrl}/api/staff');
      setStaffList(response.data);
      setTotalStaff(response.data.length);
      setOnlineCount(response.data.filter((staff) => staff.status === 'online').length); // Count online staff
    } catch (error) {
      setError('Error fetching staff data. Please try again.');
      console.error('Error fetching staff:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required to create a new staff member.');
      return;
    }

    try {
      await axios.post(`${apiUrl}/api/staff`, { username, email, password });
      fetchStaff(); // Refresh staff list after creation
      setCreateModalOpen(false); // Close modal
      setUsername(''); // Clear form
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Error creating staff. Please try again.');
      console.error('Error creating staff:', error.message);
    }
  };

  const pieData = [
    { name: 'Online', value: onlineCount },
    { name: 'Offline', value: totalStaff - onlineCount },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Total Staff</h2>
          <p className="text-2xl font-bold mt-2">{totalStaff}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Staff Online</h2>
          <p className="text-2xl font-bold mt-2">{onlineCount}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Add Staff</h2>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
          >
            Create New
          </button>
        </div>
      </div>

    

      {/* Staff List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Staff List</h2>
        {loading ? (
          <div className="flex justify-center py-4">
            <CircularProgress /> {/* Loading Spinner */}
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-2 px-4">Username</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id} className="border-t">
                  <td className="py-2 px-4">{staff.username}</td>
                  <td className="py-2 px-4">{staff.email}</td>
                  <td className="py-2 px-4">
                    {staff.status === 'online' ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      <span className="text-gray-500">Offline</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setCreateModalOpen(true)}
        className="fixed bottom-10 right-10 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        Add Staff
      </button>

      {/* Create Staff Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Create New Staff</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleCreateStaff} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
              <div className="flex justify-end space-x-4">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Create Staff
                </button>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="text-red-500 py-2 px-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdminPanel;
