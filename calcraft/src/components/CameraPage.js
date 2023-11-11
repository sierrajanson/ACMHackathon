import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const CameraPage = () => {
  const fileInputRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [detectionMessage, setDetectionMessage] = useState('');

  useEffect(() => {
    // Ensure that the ref is set correctly after the component is mounted
    fileInputRef.current = document.createElement('input');
    fileInputRef.current.type = 'file';
    fileInputRef.current.accept = 'image/*';
    fileInputRef.current.style.display = 'none';
    fileInputRef.current.addEventListener('change', handleFileChange);
    document.body.appendChild(fileInputRef.current);

    return () => {
      // Cleanup the event listener and remove the input element when the component is unmounted
      fileInputRef.current.removeEventListener('change', handleFileChange);
      document.body.removeChild(fileInputRef.current);
    };
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const base64String = await convertToBase64(file);
        console.log('Base64 equivalent:', base64String);
        setCapturedImage(base64String);
      } catch (error) {
        console.error('Error converting to base64:', error);
      }
    }
  };

  const handleImageChange = () => {
    // Trigger a click on the file input to open the file explorer
    fileInputRef.current.click();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result.split(',')[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleApiSubmit = async () => {
    if (capturedImage) {
      try {
        // Make the API request
        const response = await makeApiRequest(capturedImage);
        const className = response.predictions[0]?.class;

        if (className === undefined) {
          setDetectionMessage('Unable to detect match');
        } else {
          setDetectionMessage(`Item: ${className}`);
        }
        // Handle the API response as needed
      } catch (error) {
        console.error('API Request Error:', error);
      }
    } else {
      console.warn('No captured image to submit.');
    }
  };

  const makeApiRequest = async (base64String) => {
    const apiUrl = 'https://detect.roboflow.com/food_detector-qom4m/1';
    const apiKey = 'BPnyauKuOtT3c149r2CB';

    try {
      const response = await axios.post(apiUrl, base64String, {
        params: {
          api_key: apiKey,
          confidence: 0.7,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      console.log('API Response:', response.data);
      // Handle the API response as needed
      return response.data;
    } catch (error) {
      console.error('API Request Error:', error.message);
      throw error;
    }
  };

  return (
    <div>
      <h1>Upload / Take Image</h1>
      {capturedImage ? (
        <>
          <img
            src={`data:image/png;base64, ${capturedImage}`}
            alt="Captured"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
          <br />
          <button onClick={handleImageChange}>Change Image</button>
          <button onClick={handleApiSubmit}>Submit Image</button>
          <p>{detectionMessage}</p>
        </>
      ) : (
        <>
          <label>
            Click here to select an image
            <br />
            <button onClick={handleImageChange}>Select Image</button>
          </label>
        </>
      )}
    </div>
  );
};

export default CameraPage;
