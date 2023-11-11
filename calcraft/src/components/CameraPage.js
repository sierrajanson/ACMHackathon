import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
// import './CameraPage.css';


const CameraPage = () => {
  const fileInputRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null); 
  const [detectionMessage, setDetectionMessage] = useState('');
  const [insulin_to_carbohydrate, setInsulinToCarbohydrate] = useState(15);
  const [loggedIn, setLoggedIn] = useState(false);
  const authInstance = getAuth();
  const db = getDatabase();

  useEffect(() => {
    // Ensure that the ref is set correctly after the component is mounted
    fileInputRef.current = document.createElement('input');
    fileInputRef.current.type = 'file';
    fileInputRef.current.accept = 'image/*';
    fileInputRef.current.style.display = 'none';
    fileInputRef.current.addEventListener('change', handleFileChange);
    document.body.appendChild(fileInputRef.current);

    return () => {
      fileInputRef.current.removeEventListener('change', handleFileChange);
      document.body.removeChild(fileInputRef.current);
    };
  }, []); 

  useEffect(() => {
    const hasRedirected = localStorage.getItem('redirected');

    if (hasRedirected) {
      setLoggedIn(true);
    }

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        const uid = user.uid;
        // console.log("User is signed in:", uid);
        setLoggedIn(true);

        // Fetch user data from Firebase Realtime Database
        const userRef = ref(db, `users/${uid}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setInsulinToCarbohydrate(userData.insulinRatio);
          } else {
            console.log("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        console.log("User is not signed in");
        setLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, [authInstance, db, loggedIn]);

  // insulin_to_carbohydrate

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
          console.log(className);
          if (className === "rice"){setDetectionMessage(`Item: Jasmine Rice | 35 Carbs Insulin Units to Injest: ${(35/insulin_to_carbohydrate).toFixed(2)}`);}
          if (className === "cooked chicken"){setDetectionMessage(`Item: Halal Chicken | 5 Carbs\nInsulin Units to Injest: ${(5/insulin_to_carbohydrate).toFixed(2)}`);}
          if (className === "samosas"){ setDetectionMessage(`Item: Potato Samosas | 25 Carbs\nInsulin Units to Injest: ${(5/insulin_to_carbohydrate).toFixed(2)}`);} }
          if (className === "tortillas"){setDetectionMessage(`Item: White Corn Tortillas | 15 Carbs\nInsulin Units to Injest: ${(5/insulin_to_carbohydrate).toFixed(2)}`);}
          if (className === "cookies"){setDetectionMessage(`Vegan Chocolate Chip Cookie | 16 Carbs\nInsulin Units to Injest: ${(16/insulin_to_carbohydrate).toFixed(2)}`);}
          if (className === "pizza"){setDetectionMessage(`Cheese Pizza | 35 Carbs\nInsulin Units to Injest: ${(35/insulin_to_carbohydrate).toFixed(2)}`);}
          if (className == "burger"){setDetectionMessage(`Rodeo Burger | 40 Carbs\nInsulin Units to Injest: ${(40/insulin_to_carbohydrate).toFixed(2)}`);}
          if (className = "fries"){setDetectionMessage(`French Fries | 30 Carbs\nInsulin Units to Injest: ${(30/insulin_to_carbohydrate).toFixed(2)}`);}
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

  const renderTextWithNewlines = () => {
    // Replace newline characters with <br> elements
    const lines = detectionMessage.split('\n');
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
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
          <button class="buttonlog2" onClick={handleImageChange}>Change Image</button>
          <button class="buttonlog2" onClick={handleApiSubmit}>Submit Image</button>
          <p>{renderTextWithNewlines()}</p>
        </>
      ) : (
        <>
          <label>
            Click here to select an image
            <br />
            <button class="buttonlog2" onClick={handleImageChange}>Select Image</button>
          </label>
        </>
      )}
    </div>
  );
};

export default CameraPage;
