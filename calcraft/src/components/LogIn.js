import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import NavBar from './navbar.jsx';
import './Login.css';

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
    } catch (error) {
      console.error("Error signing in with email/password:", error);
    }
  };

  const handleCreateAccount = async () => {
    navigate('/createAccount');
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
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  
  return (
    <div>
      <h2>Login Page</h2>

      <div>
        <h3>Email/Password Login:</h3>
        <input id="email_css" placeholder='Email' class="form_log"  type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input placeholder="Password" id="password_css" class="form_log"  type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button class="buttonlog" onClick={handleSignIn}>Sign In</button>
        <button class ="buttonlog" onClick={handleCreateAccount}>Create Account</button>
      </div>

      {/* Conditional rendering based on login status */}
      <div>
        {loggedIn ? (
          <div>
            <p class="logged_in_status">User logged in</p>
            <button class="buttonlog" onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <p class="logged_in_status">User not logged in</p>
        )}
      </div>
      <button class="buttonlog" onClick={googleSignIn}>Sign In with Google</button>
      
    </div>
  );
};

export default Login;
