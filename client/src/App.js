import React, { useState, useEffect } from 'react';

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then(response => response.json()) // Return the JSON response here
      .then(data => setBackendData(data)) // Use the parsed data
      .catch(error => console.error('Error fetching data:', error)); // Optional error handling
  }, []);

  return (
    <div>
      {/* You can now use backendData here, for example: */}
      {backendData.map((item, index) => (
        <div key={index}>{JSON.stringify(item)}</div>
      ))}
    </div>
  );
}

export default App;
