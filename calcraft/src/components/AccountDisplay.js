import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const AccountDisplay = () => {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const db = getDatabase();
  const authInstance = getAuth();

  useEffect(() => {
    const hasRedirected = localStorage.getItem('redirected');

    if (hasRedirected) {
      setLoggedIn(true);
    }

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User is signed in:", uid);
        setLoggedIn(true);

        // Fetch user data from Firebase Realtime Database
        const userRef = ref(db, `users/${uid}`);
        try {
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserData(userData);
          } else {
            console.log("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        console.log("User is signed out");
        setLoggedIn(false);
        navigate("/signIn");
      }
    });

    return () => unsubscribe();
  }, [authInstance, db, navigate]);

  return (
    <div className="pageContent">
      {loggedIn && userData ? (
        <div>
          <p>Hello, {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Age: {userData.age}</p>
          <p>Weight: {userData.weight}</p>
          <p>Carbohydrate Insulin Ratio: {userData.insulinRatio}</p>
        </div>
      ) : null}
    </div>
  );
};

export default AccountDisplay;
