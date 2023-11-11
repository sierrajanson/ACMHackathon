import React, { useState, useEffect } from 'react';
import '../index.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import SearchIcon from '@mui/icons-material/Search';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseApp from '../firebase.js';
import SearchBar from './searchBar.jsx';
import './MenuPage.css';
import { getDatabase, ref, get } from 'firebase/database';

const MenuPage = () => {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const authInstance = getAuth();
  const db = getDatabase();
  const [insulin_to_carbohydrate, setInsulinToCarbohydrate] = useState(15);


  useEffect(() => {
    // console.log('Fetching data...');

    const fetchData = async () => {
      try {
        const db = collection(getFirestore(firebaseApp), 'calcraft_carb_db');
        const querySnapshot = await getDocs(db);

        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id, 
          ...doc.data(),
        }));  
       
        // console.log('Data fetched:', newData);
        setData(newData[0]);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error.message);
      }
    };

    fetchData();
  }, []);

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

  console.log(insulin_to_carbohydrate);



  let coffee_names = Object.keys(data).slice(1).sort();
  let carbs_array = [];
  let coffee_array = [];
  let cards = [];
  let selected = [];

  let [carb_total, setCarb] = useState(0);

  for (let i = 0; i < coffee_names.length; i++) { // creating objects dynamically
    if (data[coffee_names[i]] !== null){
      coffee_array[i] = {
        id: i,
        name: coffee_names[i],
        carbs: data[coffee_names[i]],
        class: "grid-item",
        border: "thick solid grey"
      };
    }
    else{
      coffee_array[i] = {
        id: i,
        name: coffee_names[i],
        carbs: 0,
        class: "grid-item",
        border: "thick solid grey"
      };
    }

  }
  const LinkCard = (props) => {
    return (
      <div className='linkCard' id={props.id}>
        <a style={linkCardStyles}>
          <h3 onClick={myfunction(props)} className="linkCardHeader">{props.title}</h3>
          <p className="linkCardBody">{props.carbs} Carbs</p>
        </a>
      </div>
    );
  }

  const myfunction = (props) => {
    return function () {
      if (!(selected.includes(props.title))) {
        selected.push(props.title);
        { setCarb(carb_total += props.carbs) };
        //console.log(props.title, props.id);
        console.log("You have selected " + props.title + " with " + data[props.title] + " carbs.");
        //console.log(carb_total);
        console.log("Insulin units to take is: " + (carb_total / 15).toFixed(2) + " if insulin to carbohydrate ratio is 15.")
      }
      else {
        selected.splice(selected.indexOf(props.title));
        { setCarb(carb_total -= props.carbs) };
        console.log("Insulin units to take is: " + (carb_total / 15).toFixed(2) + " if insulin to carbohydrate ratio is 15.")
      }
    }
  };
  for (let i = 0; i < coffee_array.length; i++) {
    cards.push(<LinkCard
      className={"linkCard"}
      id={i}
      title={coffee_array[i].name}
      carbs={coffee_array[i].carbs}
      height={50}
      width={50}
    />);
  }

  const linkCardStyles = {
    textDecoration: 'none',
    color: 'inherit'
  };


  const LinkCardContainer = (props) => {
    return (
      <div className={props.className} id={props.id}>
        <div className='linkCardContainer' style={{ height: `${props.containerHeight}rem`, gridTemplateColumns: `repeat(${props.gridWidth}), 1.5fr` }}>
          {props.card_list}
        </div>
      </div>
    );
  }
  return (
    <div class="linkCardMain">
      <h1>UCSC Dining Hall Menu Items</h1>
      {/* Search Bar Goes here */}
      
      {/* <div className="search-bar-container" >
        <SearchBar/>
        <div>SearchRestults</div>
      </div> */}

      {/* End of Search Bar*/}

      <div class="menuContainerItems">
        <div id="temp">
          <LinkCardContainer
            gridWidth={4}
            card_list={cards}
          />
        </div>
      </div>
      <h3>Total number of carbs in food to eat is: {carb_total}.</h3>
      <h3>Total number of units of insulin to injest: {(carb_total/insulin_to_carbohydrate).toFixed(2)}.</h3>
    </div>
  );
};

export default MenuPage;
