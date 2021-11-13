import React, { useContext, useState } from "react"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartContext from "../store/cart-context"
import CartItem from "./CartItem"
import Checkout from "./Checkout"
const Cart = (props) => {

    const [isCheckout, setCheckout] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const Cartctx = useContext(CartContext)
    const totalAmount = `$${Cartctx.totalAmount.toFixed(2)}`

    const cartRemoveHandler = (id) => {
        Cartctx.removeItem(id);
    }
    const cartAddHandler = (item) => {
        Cartctx.addItem({ ...item, amount: 1 });
    }

    const orderHandler = () => {
        setCheckout(true)
    }

    const finalOrderHandler = async (userData) => {
        setIsSubmiting(true)
       await fetch('https://react-food-972e4-default-rtdb.firebaseio.com/orders.json',{
            method : 'POST',
            body : JSON.stringify({
                user: userData,
                item: Cartctx.items
            }) 
        })
        setIsSubmiting(false)
        setDidSubmit(true)
        Cartctx.clearItem()
    }

    const cartItem = <ul className={classes['cart-items']}>{Cartctx.items.map((item)=>{
       return <CartItem key={item.id} 
       price={item.price}
       amount={item.amount} 
       price={item.price} 
       name={item.name} 
       onAdd={cartAddHandler.bind(null, item)}
       onRemove={cartRemoveHandler.bind(null, item.id)}/>

    })
    }</ul>

    const cartFormContent = <React.Fragment>
        {cartItem}
            <div className={classes.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onOrder={finalOrderHandler}  onClose={props.hideModal}/>}
            {
                !isCheckout &&
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.hideModal}>Close</button>
                <button className={classes['button']} onClick={orderHandler}>Order</button>
            </div>
            }
    </React.Fragment>

    const loadingContent = <p>Ordering...</p>
    const successfullContent = <p>Order has been placed successfully!</p>
    return(
        <Modal hideModal={props.hideModal}>
            {isSubmiting && !didSubmit && loadingContent}
            {!isSubmiting && !didSubmit && cartFormContent}
            {didSubmit && !isSubmiting && successfullContent}
        </Modal>
    )
}

export default Cart