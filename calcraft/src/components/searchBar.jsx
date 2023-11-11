import React, { useState, useEffect, handleChange } from "react";

import { FaSearch } from "react-icons/fa";
import "./SearchBar.css"
import "./Login.css"
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from '../firebase.js';

export const SearchBar = () => {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);
    const [keys, setKeys] = useState([]);

    //getting the data from the data base
    useEffect(() => {
        console.log('Fetching data...');

        const fetchData = async() => {
            try {
                const db = collection(getFirestore(firebaseApp), 'calcraft_carb_db');
                const querySnapshot = getDocs(db);

                const newData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log('Data fetched:', newData);
                setData(newData[0]);
            } catch (error) {
                console.error('Error fetching data from Firestore:', error.message);
            }
            

            console.log('Data fetched:');
        };
        fetchData();
        setKeys(Object.keys(data).slice(1).sort());
    }, []);

    



    //here for the webpage to instantly make an api call to grab
    //the data from the data base  v
    


return <div>
    <FaSearch id="search-icon" />
    <input class="form_log" placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
    />
</div>


}

export default SearchBar;