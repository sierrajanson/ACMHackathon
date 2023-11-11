import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import './CreateAccount.css'
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

    // Set user details under the 'users' node with UID as the key
    const usersRef = ref(db, `users/${user.uid}`);
    const newUserData = {
      uid: user.uid, // Add user's UID to link authentication with user data
      name,
      age,
      weight,
      gender,
      insulinRatio,
      email,
    };
    await set(usersRef, newUserData); // Use set instead of push

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
        <input placeholder='Name' class="form_log" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <input placeholder='Age' class="form_log" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </div>

      <div>
        <input placeholder='Weight' class="form_log" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </div>

      <div>
        <select class="select-box" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Gender</option>  
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <input placeholder='Insulin To Carbohydrate Ratio' class="form_log" type="number" value={insulinRatio} onChange={(e) => setInsulinRatio(e.target.value)} />
      </div>

      <div>
        <input placeholder='Email' class="form_log" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <input placeholder='Password' class="form_log" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button class="buttonlog2" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CreateAccount;
