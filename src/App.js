import React,{ useState } from "react";
import Cart from "./Cart/Cart";
import Header from "./Layout/Header";
import Meals from "./Meals/Meals"
import CartProvider from "./store/CartProvider";

function App() {
  const [modalShown, setModalShown] = useState(false)

  const modalShowHandler = () =>{
    setModalShown(true)
  }

  const modalHideHandler = () => {
    setModalShown(false)
  }

  return (
    <CartProvider>
      {modalShown && <Cart hideModal={modalHideHandler}/>}
      <Header showModal={modalShowHandler}/>
      <Meals/>
    </CartProvider>
  )
}

export default App;
