import React, { useState } from 'react';
import { Button, ButtonGroup, Modal, ModalDialog, Typography } from '@mui/joy'; // Modal for confirmation

const ListView = ({ clients, onEndVisit, onViewDetails, onUpdatePurchase }) => { // Added onViewDetails prop
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // State to manage modal visibility
  const [clientToEnd, setClientToEnd] = useState(null); // Client selected for ending visit
  const [purchaseStatus, setPurchaseStatus] = useState("No")

  const handleEndVisitClick = (clientId) => {
    setClientToEnd(clientId); // Set selected client
    setConfirmModalOpen(true); // Open confirmation modal
  };

  const confirmEndVisit = () => {
    onEndVisit(clientToEnd); // Call the onEndVisit function with the selected client ID
    setConfirmModalOpen(false); // Close modal after action
    setClientToEnd(null); // Reset client to end
  };

  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // Converts timestamp to a date string
  };

  
    
  return (
    <>
      <div className="overflow-x-auto mx-auto p-4 sm:p-6 max-w-7xl bg-white rounded-lg shadow-lg my-4">
        <table className="min-w-full text-left table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Last Visit</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Purchase</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{client.id}</td>
                <td className="px-4 py-2">{client.name}</td>
                <td className="px-4 py-2">{client.company_name}</td>
                <td className="px-4 py-2">{client.primary_mobile_no}</td>
                <td className="px-4 py-2">{formatDate(client.updated_at)}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      client.status === 'active'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {client.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => {
                    onUpdatePurchase(client)
                    setPurchaseStatus("Yes")
                    }} >{purchaseStatus}</button>
                </td>
                <td className="px-4 py-2">
                  <ButtonGroup variant="outlined" size="sm">
                    <Button color="danger" onClick={() => handleEndVisitClick(client.id)}>
                      End Visit
                    </Button>
                    {/* Call the onViewDetails prop when View Details is clicked */}
                    <Button color="primary" onClick={() => onViewDetails(client)}>
                      View Details
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal for "End Visit" */}
      {confirmModalOpen && (
        <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
          <ModalDialog aria-labelledby="confirm-end-visit" size="sm">
            <Typography id="confirm-end-visit" level="h5" fontWeight="bold">
              End Visit Confirmation
            </Typography>
            <Typography level="body1" mb={2}>
              Are you sure you want to end this visit?
            </Typography>
            <ButtonGroup variant="solid" fullWidth>
              <Button color="danger" onClick={confirmEndVisit}>
                Yes, End Visit
              </Button>
              <Button onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
            </ButtonGroup>
          </ModalDialog>
        </Modal>
      )}
    </>
  );
}

export default ListView;
