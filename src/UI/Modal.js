import React,{Fragment} from "react"
import ReactDOM  from "react-dom"
import classes from "./Modal.module.css"
const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.hideModal}></div>
}

const ModalContent = (props) => {
    return <div className={classes.modal}>{props.children}</div>
}

const portalId = document.getElementById('overlay')
const Modal = (props) => {
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop hideModal={props.hideModal} />, portalId)}
            {ReactDOM.createPortal(<ModalContent>{props.children}</ModalContent>,portalId)}
        </Fragment>
    )
}

export default Modal