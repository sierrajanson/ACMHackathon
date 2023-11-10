import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [insulinRatio, setInsulinRatio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const auth = getAuth();
    const db = getDatabase();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Push user details to the 'users' node
      const usersRef = ref(db, 'users');
      const newUserData = {
        uid: user.uid, // Add user's UID to link authentication with user data
        name,
        age,
        weight,
        gender,
        insulinRatio,
        email,
      };
      push(usersRef, newUserData);

      // Redirect to a success page or any other page
      navigate('/home');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>

      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Age:</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>

      <div>
        <label>Weight:</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>

      <div>
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>  
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Insulin-to-Carbohydrate Ratio:</label>
        <input type="number" value={insulinRatio} onChange={(e) => setInsulinRatio(e.target.value)} />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateAccount;
