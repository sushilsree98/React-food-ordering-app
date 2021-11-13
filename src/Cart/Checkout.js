import { useRef } from 'react'
import classes from './Checkout.module.css'
const Checkout = (props) => {

    const nameInput = useRef();
    const streetInput = useRef();
    const pincodeInput = useRef();
    const cityInput = useRef();

    const confirmHandler = event => {
        event.preventDefault()

        const enteredName = nameInput.current.value;
        const enteredStreet = streetInput.current.value;
        const enteredPincode = pincodeInput.current.value;
        const enteredCity = cityInput.current.value
        props.onOrder({
            name: enteredName,
            street: enteredStreet,
            pincode: enteredPincode,
            city: enteredCity
        })
        
    }
    return(
        <form onSubmit={confirmHandler}>
            <div  className={classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input id='name' ref={nameInput}/>
            </div>
            <div  className={classes.control}>
                <label htmlFor='street' >Street</label>
                <input id='street' ref={streetInput}/>
            </div>
            <div  className={classes.control}>
                <label htmlFor='pincode'>Pincode</label>
                <input id='pincode' ref={pincodeInput}/>
            </div>
            <div  className={classes.control}>
                <label htmlFor='city'>City</label>
                <input id='city' ref={cityInput}/>
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onClose}>Cancel</button>
                <button>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout