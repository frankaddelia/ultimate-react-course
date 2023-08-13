import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return(
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const Header = () => {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

const Menu = () => {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizzas = pizzas.length;

  return(
    <main className="menu">
      <h2>Our menu</h2>

      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {
              pizzas.map(p =>
                <Pizza
                  key={p.name}
                  photoName={p.photoName}
                  name={p.name}
                  ingredients={p.ingredients}
                  price={Number(p.price)}
                  soldOut={p.soldOut}
                />
              )
            }
          </ul>
        </>
      )
      :
      <p>We're still working on our menu. Please come back later :)</p>
      }
      
    </main>
  );
}

function Pizza(props) {
  console.log(props);

  const {photoName, name, ingredients, price, soldOut} = props;

  // if (soldOut) return null;

  return (
    <li className={`pizza ${soldOut ? 'sold-out': ''}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>
          {name}
        </h3>
        <p>
          {ingredients}
        </p>
        <span>{soldOut ? "Sold out" : price}</span>
      </div>
    </li>
  );
}

const Footer = (props) => {
  console.log(props)

  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  // if (hour >= openHour && hour <= closeHour) {
  //   alert ("We're currnetly open!");
  // } else {
  //   alert("Sorry we're closed!");
  // }

  // if (!isOpen) {
  //   return (<p>CLOSED</p>);
  // }

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      )
      :
      <p>We're happy to welcome you between {openHour} and {closeHour} :)</p>
      }
    </footer>
  );
  // return React.createElement('footer', null, "We're currently open!");
}

const Order = (props) => {
  const { closeHour, openHour } = props;

  return (
    <div className="order">
      <p>
        We're open form {openHour}:00 to {closeHour}:00. Come visit us or order online.
      </p>

      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
