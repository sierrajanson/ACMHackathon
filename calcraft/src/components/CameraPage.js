import React, { useRef, useState, useEffect } from 'react';

const CameraPage = () => {
  const fileInputRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

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
        console.log('API Response:', response);
        // Handle the API response as needed
      } catch (error) {
        console.error('API Request Error:', error);
      }
    } else {
      console.warn('No captured image to submit.');
    }
  };

  const makeApiRequest = async (base64String) => {
    const apiUrl = 'http://100.64.57.88:9001/infer/object_detection';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model_id: 'food_detector-qom4m/1',
        model_type: 'object-detection',
        api_key: 'BPnyauKuOtT3c149r2CB',
        image: [
          {
            type: 'base64',
            value: base64String,
          },
        ],
        confidence: 0.7,
        mode: 'no-cors',
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
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
