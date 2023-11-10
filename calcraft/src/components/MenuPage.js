import React from 'react';
import '../index.css'
const MenuPage = () => {
  let coffee_names = ["rice","chicken","samosas","tortillas","cookies","pizza","burger","fries","cookies","pizza","burger","fries"];
  let carbs_array = [];
  let coffee_array = [];
  const cards = [];
  let carb_total = 5;
  let selected = [];

  for (let i = 0; i < coffee_names.length; i++){ // creating objects dynamically
    coffee_array[i] = {
      id: i,
      name: coffee_names[i],
      carbs: Math.floor(Math.random()*300 + 3),
      class: "grid-item",
      border: "thick solid grey"
    };
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
    return function() {
      if (!(selected.includes(props.title))){
        selected.push(props.title);
        carb_total += props.carbs
        console.log(props.title, props.id);
        console.log(carb_total);
        window.value = carb_total;
      }
      else {
        selected.splice(selected.indexOf(props.title));
        carb_total -= props.carbs;
        console.log(carb_total);
        window.value = carb_total;
      }
    }
  };
  for (let i = 0; i < coffee_array.length; i++){
    cards.push(<LinkCard 
      className={"linkCard"}
      id={i}
      title={coffee_array[i].name}
      carbs={coffee_array[i].carbs}
      height={20}
      width={20}
      onClick = {myfunction}
    />);
  }
  console.log(cards);

  const linkCardStyles = {
    textDecoration: 'none',
    color: 'inherit'
  };


  const LinkCardContainer = (props) => {
    return (
      <div className={props.className} id={props.id}>
        <div>
        </div>
          <div className='linkCardContainer' style={{height: `${props.containerHeight}rem`, gridTemplateColumns: `repeat(${props.gridWidth}), 1fr`}}>
            {props.card_list}
          </div>
      </div>
    );
  }
  
  return (
    <div id="main">

      <h1>Welcome to the Menu Page!</h1>
      {/* Add your home page content here */}
      <div id="main">
        <div id="main_food" class="grid-container"> 
          <div id="temp">
            <LinkCardContainer
              className= 'linkCardContainer'
              gridWidth={3}
              card_list={cards}
            />
          </div>
        </div>
        <div id="total_carbs"class="linkCard2">
          Check console tab for total carb value. 
        </div>
      </div>
    </div>
  );
};

export default MenuPage;

// ReactDOM.render(<JSXDemo />, document.getElementById('root'));