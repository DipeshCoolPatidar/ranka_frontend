import React from 'react';
import { Modal, ModalDialog, Typography, Button } from '@mui/joy';

const VisitorDetailsModal = ({ isModalOpen, closeModal, visitor }) => {
  if (!visitor) return null;

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <ModalDialog>
        <Typography level="h5" className="font-bold mb-4">Visitor Details</Typography>

        {/* Visitor details form (read-only) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={visitor.name || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Secondary Mobile Number</label>
            <input
              type="text"
              value={visitor.secondary_mobile_no || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Telephone Number</label>
            <input
              type="text"
              value={visitor.tel_no || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Company Name</label>
            <input
              type="text"
              value={visitor.company_name || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Village</label>
            <input
              type="text"
              value={visitor.village || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tahsil</label>
            <input
              type="text"
              value={visitor.tahsil || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">District</label>
            <input
              type="text"
              value={visitor.dist || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">PIN Code</label>
            <input
              type="text"
              value={visitor.pin_code || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Address Line 1</label>
            <input
              type="text"
              value={visitor.address_line1 || ""}
              readOnly
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>
        </div>

        {/* Services Checkboxes */}
        <div className="my-4 flex flex-wrap gap-4">
          <label>
            <input type="checkbox" checked={visitor.tent_house === 1} readOnly />
            Tent House
          </label>
          <label>
            <input type="checkbox" checked={visitor.catering === 1} readOnly />
            Catering
          </label>
          <label>
            <input type="checkbox" checked={visitor.event === 1} readOnly />
            Event
          </label>
          <label>
            <input type="checkbox" checked={visitor.hotel === 1} readOnly />
            Hotel
          </label>
          {/* Add more checkboxes similarly... */}
        </div>

        <Button onClick={closeModal} className="mt-4">Close</Button>
      </ModalDialog>
    </Modal>
  );
};

export default VisitorDetailsModal;
