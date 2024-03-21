import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [catImage, setCatImage] = useState('');

  useEffect(() => {
    fetchCatImage();
  }, []);

  const fetchCatImage = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search');
      setCatImage(response.data[0].url);
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  const handleRefresh = () => {
    fetchCatImage();
  };

  return (
    <div className="App">
      <h1>Cat Gallery</h1>
      <div>
        <img src={catImage} alt="Cat" style={{ maxWidth: '100%', maxHeight: '400px' }} />
      </div>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default App;
