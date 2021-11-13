import React,{useContext, useEffect, useState } from "react"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderButton.module.css"
import CartContext from "../store/cart-context"

const HeaderButton = (props) => {

    const crtCtx = useContext(CartContext)
    const [addBump, setAddBump] = useState(false)

    const {items} = crtCtx

    const btnClasses = `${classes.button} ${addBump ? classes.bump : ''}`

    const cartItemNumber = items.reduce((cartNumber, cart)=>{
        return cartNumber + cart.amount
    },0)

    useEffect(() => {
        if(crtCtx.items.length == 0){
            return 
        }
        setAddBump(true)

        setTimeout(()=>{
            setAddBump(false)
        },300)
    },[items])
    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Cart</span>
            <span className={classes.badge}>{cartItemNumber}</span>
        </button>
    )
}

export default HeaderButton