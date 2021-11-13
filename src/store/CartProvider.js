import React, {useReducer} from "react";
import CartContext from "./cart-context";

 const defaultItem = {
        items: [],
        totalAmount: 0
    }

const reducerFunction = (state, action) => {
    if(action.type == 'ADD'){
      const updatedTotalAmount =
      state.totalAmount + action.items.price * action.items.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.items.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.items.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.items);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
    }

    if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if(action.type == 'CLEAR'){
    return defaultItem
  }

  return defaultItem
}

const CartProvider = (props) => {

    const [cartItem, dispatchCart] = useReducer(reducerFunction, defaultItem)
     
    const addItemCartHandler = (items) => {
        dispatchCart({type:'ADD', items: items})
    }
    const removeItemCartHandler = (id) => {
      dispatchCart({type:'REMOVE', id:id})
    }

    const clearItemCartHandler = () => {
      dispatchCart({type:'CLEAR'})
    }

    const cartContext = {
        items: cartItem.items,
        totalAmount: cartItem.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemCartHandler,
        clearItem: clearItemCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    ) 
}

export default CartProvider
