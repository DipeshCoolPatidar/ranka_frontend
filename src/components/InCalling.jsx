import React,{useState, useEffect} from 'react'

const InCalling = () => {
    const [remark, setRemark] = useState("");
    const [counter, setCounter] = useState(5); // Initial counter set to 5 seconds
    
  
    useEffect(() => {
      if (counter === 0) {
        // Trigger the API call when the counter reaches 0
        triggerApiCall();
      }
  
      // Only start the countdown if the counter is greater than 0
      const interval = counter > 0 && setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000); // Decrease counter by 1 every second
  
      // Clean up the interval when the component unmounts or counter changes
      return () => clearInterval(interval);
    }, [counter]);
  
    const triggerApiCall = () => {
      // API call logic here
      console.log("API Call Triggered");
      // Example API call (you can replace this with your actual API logic):
      fetch('https://api.example.com/trigger')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    };

    const nextCall = () =>{
        setCounter(5)
    }
  

    return (
      <div className="p-4 space-y-4 border border-black rounded-md max-w-lg mx-auto">
        {/* Top Buttons Section */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="w-full sm:w-auto mt-2 px-4 py-2 border bg-blue-500 text-white rounded-lg">Counter: {counter} </button>
          <button onClick={nextCall} className="w-full sm:w-auto mt-2 px-4 py-2 border bg-gray-300 text-black rounded-lg" >Next-Btn</button>
          <button   className="w-full sm:w-auto mt-2 px-4 py-2 border bg-gray-300 text-black rounded-lg">Auto-Btn</button>
          <button className="w-full sm:w-auto mt-2 px-4 py-2 border bg-gray-300 text-black rounded-lg">Stop-Btn</button>
        </div>
  
        {/* Middle Section */}
        <div className="border border-black rounded-md p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            Show Number  And
            Show Details From DB
          </div>
  
                {/* Remark Input Field */}
        <div className="space-y-2">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Add Remark By Agent"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
          <button className="w-full sm:w-auto mt-2 px-4 py-2 border bg-blue-500 text-white rounded-lg" onClick={() => alert(`Remark saved: ${remark}`)}>
            Save
          </button>
        </div>
      </div>

        
  
        {/* Bottom Section */}
        <div className="border border-black rounded-md px-4 py-2 text-center">
          Invoice Details
        </div>
      </div>
    );
}

export default InCalling