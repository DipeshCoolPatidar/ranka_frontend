import React from 'react'

const MsgLogs = () => {
 
    return (

        <>
          <div className="overflow-x-auto mx-auto p-4 sm:p-6 max-w-7xl bg-white rounded-lg shadow-lg my-4">
            <table className="min-w-full text-left table-auto">
              <thead className="bg-gray-100 hidden sm:table-header-group">
                <tr>
                  <th className="px-4 py-2">Date/Time</th>
                  <th className="px-4 py-2">Mobile_Number</th>
                  <th className="px-4 py-2">Status</th>
                  
                </tr>
              </thead>
              <tbody>
                  <tr className="block sm:table-row">
                    <td className="px-4 py-2">06:05:38 PM Nov 11</td>
                    <td className="px-4 py-2">9977665544</td>
                    <td className="px-4 py-2">Delevered</td>  
                  </tr>
              </tbody>
            </table>
          </div>
        </>
      )
  
}

export default MsgLogs