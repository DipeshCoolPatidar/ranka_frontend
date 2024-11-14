import React, { useState } from "react";
import { CloudArrowUpIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid"; 
import { toast } from "react-toastify";

// Modal for showing messages
const MessageModal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 className="text-xl font-bold text-indigo-800 mb-4">Message</h2>
      <p>{message}</p>
      <div className="mt-6 text-right">
        <button
          onClick={onClose}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          OK
        </button>
      </div>
    </div>
  </div>
);

const AddVisitForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    address_line1: "",
    tel_no: "",
    primary_mobile_no: "",
    secondary_mobile_no: "",
    company_name: "",
    village: "",
    tahsil: "",
    dist: "",
    pin_code: "",
    tent_house: false,
    catering: false,
    event: false,
    hotel: false,
    restro: false,
    resort: false,
    tent_suppliers: false,
    home_used: false,
    other: false,
    cooler: false,
  });

  const [step, setStep] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [messageModal, setMessageModal] = useState({ isOpen: false, message: "" });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "primary_mobile_no" && value.length === 10) {
      setIsNextDisabled(false);
    } else if (name === "primary_mobile_no") {
      setIsNextDisabled(true);
    }
  };

  // Function to fetch visitor details based on the mobile number
  const fetchVisitorDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/visitors/details?mobile=${formData.primary_mobile_no}`);
      const data = await response.json();
      console.log(data);
      

      if (data.message === "Visitor not found") {
        toast.error("Visitor not found. Please enter details manually.");
        setFormData({ ...formData });
      } else {
        // Pre-fill the form with visitor details from the API
        setFormData({
          name: data.name || "",
          address_line1: data.address_line1 || "",
          tel_no: data.tel_no || "",
          primary_mobile_no: data.primary_mobile_no || "",
          secondary_mobile_no: data.secondary_mobile_no || "",
          company_name: data.company_name || "",
          village: data.village || "",
          tahsil: data.tahsil || "",
          dist: data.dist || "",
          pin_code: data.pin_code || "",
          tent_house: data.tent_house === 1,
          catering: data.catering === 1,
          event: data.event === 1,
          hotel: data.hotel === 1,
          restro: data.restro === 1,
          resort: data.resort === 1,
          tent_suppliers: data.tent_suppliers === 1,
          home_used: data.home_used === 1,
          other: data.other === 1,
          cooler: data.cooler === 1,
        });
        toast.success("Visitor details loaded successfully.");
      }
    } catch (error) {
      console.error("Error fetching visitor details:", error);
      toast.error("An error occurred while fetching visitor details.");
    } finally {
      setLoading(false);
    }
  };

  // Function to move to the next step and fetch data if the mobile number is valid
  const handleNextStep = async () => {
    if (step === 1 && formData.primary_mobile_no.length === 10) {
      await fetchVisitorDetails(); // Fetch visitor details from API
    }
    setStep(step + 1); // Move to the next step
  };

  // Function to submit data to the API
  const upsertVisitor = async () => {
    setLoading(true);
    const formattedData = {
      ...formData,
      tent_house: formData.tent_house ? 1 : 0,
      catering: formData.catering ? 1 : 0,
      event: formData.event ? 1 : 0,
      hotel: formData.hotel ? 1 : 0,
      restro: formData.restro ? 1 : 0,
      resort: formData.resort ? 1 : 0,
      tent_suppliers: formData.tent_suppliers ? 1 : 0,
      home_used: formData.home_used ? 1 : 0,
      other: formData.other ? 1 : 0,
      cooler: formData.cooler ? 1 : 0,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/visitors/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageModal({ isOpen: true, message: data.message });
      } else {
        throw new Error("Failed to upsert visitor");
      }
    } catch (error) {
      console.log("Error increating visitor", error)
      setMessageModal({ isOpen: true, message: "Failed to create visitor" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    upsertVisitor(); // Call the upsert API on form submit
  };

  // Close both modals (parent and message modal)
  const closeMessageModal = () => {
    setMessageModal({ isOpen: false, message: "" });
    closeModal(); // Close the parent form modal when OK is clicked
  };

  const renderStep1 = () => (
    <div>
      <h2 className="text-3xl font-bold text-indigo-800 mb-6">Enter a Mobile Number - Step 1</h2>
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="primary_mobile_no">
          Primary Mobile Number
        </label>
        <input
          type="text"
          id="primary_mobile_no"
          name="primary_mobile_no"
          value={formData.primary_mobile_no}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter 10-digit mobile number"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 className="text-3xl font-bold text-indigo-800 mb-6">Enter Visitor Details - Step 2</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="secondary_mobile_no">
            Secondary Mobile Number
          </label>
          <input
            type="text"
            id="secondary_mobile_no"
            name="secondary_mobile_no"
            value={formData.secondary_mobile_no}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="tel_no">Telephone Number</label>
          <input
            type="text"
            id="tel_no"
            name="tel_no"
            value={formData.tel_no}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="company_name">Company Name</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="village">Village</label>
          <input
            type="text"
            id="village"
            name="village"
            value={formData.village}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="tahsil">Tahsil</label>
          <input
            type="text"
            id="tahsil"
            name="tahsil"
            value={formData.tahsil}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="dist">District</label>
          <input
            type="text"
            id="dist"
            name="dist"
            value={formData.dist}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="pin_code">PIN Code</label>
          <input
            type="text"
            id="pin_code"
            name="pin_code"
            value={formData.pin_code}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>

        {/* Address Line 1 - full width */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="address_line1">Address Line 1</label>
          <input
            type="text"
            id="address_line1"
            name="address_line1"
            value={formData.address_line1}
            onChange={handleInputChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="my-4 flex flex-wrap gap-4">
        <label>
          <input
            type="checkbox"
            name="tent_house"
            checked={formData.tent_house}
            onChange={handleInputChange}
          />
          Tent House
        </label>
        <label>
          <input
            type="checkbox"
            name="catering"
            checked={formData.catering}
            onChange={handleInputChange}
          />
          Catering
        </label>
        <label>
          <input
            type="checkbox"
            name="event"
            checked={formData.event}
            onChange={handleInputChange}
          />
          Event
        </label>
        <label>
          <input
            type="checkbox"
            name="hotel"
            checked={formData.hotel}
            onChange={handleInputChange}
          />
          Hotel
        </label>
        <label>
          <input
            type="checkbox"
            name="restro"
            checked={formData.restro}
            onChange={handleInputChange}
          />
          Restro
        </label>
        <label>
          <input
            type="checkbox"
            name="resort"
            checked={formData.resort}
            onChange={handleInputChange}
          />
          Resort
        </label>
        <label>
          <input
            type="checkbox"
            name="tent_suppliers"
            checked={formData.tent_suppliers}
            onChange={handleInputChange}
          />
          Tent Suppliers
        </label>
        <label>
          <input
            type="checkbox"
            name="home_used"
            checked={formData.home_used}
            onChange={handleInputChange}
          />
          Home Used
        </label>
        <label>
          <input
            type="checkbox"
            name="other"
            checked={formData.other}
            onChange={handleInputChange}
          />
          Other
        </label>
        <label>
          <input
            type="checkbox"
            name="cooler"
            checked={formData.cooler}
            onChange={handleInputChange}
          />
          Cooler
        </label>
      </div>
    </div>
  );

  return (
    <div className="flex p-6" style={{ height: "90vh", width: "100%" }}>
      <div className="w-[100%] pr-4 flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300 flex items-center"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" /> Back
              </button>
            )}
            {step < 2 && (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={isNextDisabled || loading}
                className={`bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center ml-auto ${
                  isNextDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Loading..." : "Next"} <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            )}
            {step === 2 && (
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center ml-auto"
              >
                <CloudArrowUpIcon className="w-5 h-5 mr-2" /> Submit
              </button>
            )}
          </div>
        </form>

        {/* Message Modal */}
        {messageModal.isOpen && (
          <MessageModal
            message={messageModal.message}
            onClose={closeMessageModal}
          />
        )}
      </div>
    </div>
  );
};

export default AddVisitForm;
