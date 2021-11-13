import React, {useRef, useState} from "react"
import Input from "../../UI/Input"
import classes from "./MealItemForm.module.css"
const MealItemForm = (props) => {
  const inputRef = useRef()
  const [inputIsValid, setInputIsValid] = useState(true)

    const submitHandler = (event) => {
        event.preventDefault()
        const EnteredAmount = inputRef.current.value;
        const OriginalAmount = +EnteredAmount

        if(EnteredAmount.trim().length == 0 || OriginalAmount < 0 || OriginalAmount > 5){
            setInputIsValid(false)
            return
        }
        props.onAddToCart(OriginalAmount)
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" ref={inputRef} input={{
                id:"amount_"+props.id,
                min:'0',
                max:'5',
                step:'1',
                defaultValue:'1',
                type:'number'
                }} />
            <button>+ Add</button>
            {!inputIsValid && <p>Please enter a valid amount</p>}
        </form>
    )
}

export default MealItemForm