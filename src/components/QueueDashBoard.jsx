import React from 'react'


const QueueDashBoard = ( ) => {


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Converts timestamp to a date string
  };

  return (

    <>
      <div className="overflow-x-auto mx-auto p-4 sm:p-6 max-w-7xl bg-white rounded-lg shadow-lg my-4">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-100 hidden sm:table-header-group">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Salesman</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Duration</th>
              <th className="px-4 py-2">Response</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
              <tr className="block sm:table-row">
                <td className="px-4 py-2">id</td>
                <td className="px-4 py-2">name</td>
                <td className="px-4 py-2">mobile_number</td>
                <td className="px-4 py-2">salesman</td>
                <td className="px-4 py-2">Date</td>
                <td className="px-4 py-2">Time</td>
                <td className="px-4 py-2">Duration</td>
                <td className="px-4 py-2">Response</td>
                <td className="px-4 py-2">Status</td>
              </tr>
            
          </tbody>
        </table>
      </div>
    </>
  )
}

export default QueueDashBoard