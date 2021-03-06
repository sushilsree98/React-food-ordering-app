import React,{ useContext } from "react"
import CartContext from "../../store/cart-context"
import classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm"
const MealItem =(props)=> {
    const price =`$${props.price.toFixed(2)}`
    const cartState = useContext(CartContext)

    const onAddToCart = (amount) => {
        console.log(typeof amount, amount)

        cartState.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    }
    return(
        <li>
        <div className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <p className={classes.description}>{props.description}</p>
                <p className={classes.price}>{price}</p>
            </div>
            <div>
                <MealItemForm onAddToCart={onAddToCart} id={props.id}/>
            </div>
        </div>
        </li>
        
    )
}

export default MealItem