// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// ... (other imports and code)


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const authInstance = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const hasRedirected = localStorage.getItem('redirected');

    if (hasRedirected) {
      setLoggedIn(true);
    }

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User is signed in:", uid);
        setLoggedIn(true);
      } else {
        console.log("User is signed out");
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [authInstance, navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      navigate('/home');
      // The redirection will be handled in the onAuthStateChanged listener
    } catch (error) {
      console.error("Error signing in with email/password:", error);
    }
  };

  const handleCreateAccount = async () => {
    try {
      await createUserWithEmailAndPassword(authInstance, email, password);
      // No need to setLoggedIn(true) here because onAuthStateChanged will handle it
    } catch (error) {
      console.error("Error creating account with email/password:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('redirected');
      await signOut(authInstance);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(authInstance, new GoogleAuthProvider());
      const user = result.user;
      console.log("User signed in with Google:", user);
      navigate('/home');
      // The redirection will be handled in the onAuthStateChanged listener
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  
  return (
    <div>
      <h2>Login Page</h2>

      <div>
        <h3>Email/Password Login:</h3>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password: </label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleCreateAccount}>Create Account</button>
      </div>

      {/* Conditional rendering based on login status */}
      <div>
        {loggedIn ? (
          <div>
            <p>User logged in</p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <p>User not logged in</p>
        )}
      </div>
      <button onClick={googleSignIn}>Sign In with Google</button>
      
    </div>
  );
};

export default Login;
