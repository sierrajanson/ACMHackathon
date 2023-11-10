import React from 'react';
import '../index.css'
const MenuPage = () => {
  let coffee_names = ["rice","chicken","samosas","tortillas","cookies","pizza","burger","fries","cookies","pizza","burger","fries"];
  let carbs_array = [];
  let coffee_array = [];
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
        <a href={props.link} target="_self" rel="noopener noreferrer" style={linkCardStyles}>
          <h3 className="linkCardHeader">{props.title}</h3>
          <p className="linkCardBody">{props.description}</p>
        </a>
      </div>  
    );
  }
  const cards = [];
  // plsWork = () => {
  //   console.log('hello?');
  // }
  for (let i = 0; i < coffee_array.length; i++){
    cards.push(<LinkCard 
      className={"linkCard"}
      key={i}
      title={coffee_array[i].name}
      description={coffee_array[i].carbs + " Carbs"}
      height={20}
      width={20}
      onClick = {(event) => console.log('wheewhoo')}
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
  function myfunction(){console.log('hi')}
  return (
    <div id="main">
      <h1>Welcome to the Menu Page!</h1>
      {/* Add your home page content here */}
      <div id="main">
        <div id="main_food" class="grid-container"> 
          <div id="temp" onClick="myfunction()">
            <LinkCardContainer
              className= 'linkCardContainer'
              gridWidth={3}
              card_list={cards}
            />
          </div>
        </div>
        <div id="total_carbs" class="generic-text"></div>
        <div id="subtotal"></div>
      </div>
    </div>
  );
};

export default MenuPage;

// ReactDOM.render(<JSXDemo />, document.getElementById('root'));