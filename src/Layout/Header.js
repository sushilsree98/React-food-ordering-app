import react,{Fragment} from "react"
import MenuImg from "../assets/meals.jpg";
import classes from './Header.module.css'
import HeaderButton from "./HeaderButton";

const Header = props => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h3>Food App</h3>
                <HeaderButton onClick={props.showModal}/>
            </header>
            <div className={classes['main-image']}>
                <img src={MenuImg} alt="Delicious meals"/>
            </div>
        </Fragment>
    )
}

export default Header