// import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart"
import CartProvider from './store/CartProvider';

function App() {

  const [cartIsShown,setCartIsShown]= useState(false);          //useState Hook
  
  const showCartHandler =() =>{
    setCartIsShown(true);
  }

  const hideCardHandler =() =>{
    setCartIsShown(false);
  }

  return (
    <CartProvider>
        {cartIsShown && <Cart onClose={hideCardHandler}/>}
        <Header onShowCart={showCartHandler}/>
        <main>
            <Meals/>
        </main>
    </CartProvider>
  );
}

export default App;
