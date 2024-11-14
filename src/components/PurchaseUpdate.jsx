import React, { useState } from 'react';
import { Modal, ModalDialog, Typography, Button } from '@mui/joy';

const PurchaseUpdateModal = ({ isModalOpen, closeModal, visitor }) => {
  const [primaryMobileNo, setPrimaryMobileNo] = useState(visitor.primary_mobile_no || '');
  const [billNumber, setBillNumber] = useState('');
  const [purchase, setPurchase] = useState(false);

   // Submit handler for sending data to the backend
   const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    
    
    // Gather form data to send to the backend
    const formData = {
      primary_mobile_no: primaryMobileNo,
      bill_no: billNumber,
      purchase: purchase
    };
       
    try {
      // Send data to backend
        const response = await fetch('http://localhost:5000/api/visitors/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data submitted successfully!', response);
        closeModal(); // Close the modal if needed
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <ModalDialog>
        <Typography level="h5" className="font-bold mb-4">Update Purchase Details</Typography>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <input
                type="radio"
                value={purchase}
                onChange={(e) => setPurchase(e.target.checked)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              />
              <label className="block text-gray-700 font-medium mb-2 px-2">Purchase</label>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Primary Mobile Number</label>
              <input
                type="text"
                value={primaryMobileNo}
                onChange={(e) => setPrimaryMobileNo(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Bill Number</label>
              <input
                type="text"
                value={billNumber}
                onChange={(e) => setBillNumber(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-2"
              />
            </div>
          </div>
          <Button type='submit' className="mt-2 flex items-center">Submit</Button>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default PurchaseUpdateModal;
