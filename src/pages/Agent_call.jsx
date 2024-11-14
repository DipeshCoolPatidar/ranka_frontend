import React, {useState} from 'react'
import QueueDashBoard from '../components/QueueDashBoard'
import { Button, Typography } from "@mui/joy";
import Modal from "./Modal";
import InCalling from '../components/InCalling';
import CalledDashboard from '../components/CalledDashboard';
import Pagination from '../components/Pagination';

const Agent_call =  () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("queue");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 6;
  

  const handleAddVisit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  
  return(
    <>

        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl font-bold'>Agent Call Dashboard</h1>

        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4 mx-2 sm:mx-5  ">
        <Button
            variant={viewMode === "queue" ? "solid" : "plain"}
            onClick={() => setViewMode("queue")}
            size="sm"
          >
           Queue Dashboard
          </Button>
          <Button
            variant={viewMode === "called" ? "solid" : "plain"}
            onClick={() => setViewMode("called")}
            size="sm"
          >
            Called Dashboard
          </Button>
          <Button
            size="sm"
            onClick={handleAddVisit}
          >
            Play
          </Button>
          {isModalOpen && (
          <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
                <InCalling closeModal={closeModal} />
          </Modal>
      )}
        </div>
      <div className='px-2 md:px-10 lg:px-20 mt-4'>
        {viewMode === "queue" ? (
            <QueueDashBoard/>
          ) : (
            <CalledDashboard/>
          )}
        </div>
        {/* Conditionally Render Views */}
   {/*   {loading ? (
        <Typography>Loading visitors...</Typography>
      ) : error ? (
        <Typography color="danger">{error}</Typography>
      ) : clients.length === 0 ? (
        <Typography>No visitors found for today.</Typography>
      ) : (
        <>
          {viewMode === "queue" ? (
            <QueueDashBoard/>
          ) : (
            <CalledDashboard
              clients={currentClients}
              
            />
          )}

          
          <Pagination
            totalClients={clients.length}
            clientsPerPage={clientsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </> 
      )}
    */}
        
    </>
  )
}


export default Agent_call