import React from "react";
import ReactDOM from "react-dom";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

export const Modal = (props) => {
    const {children, onClick} = props;

    return ReactDOM.createPortal(
        <div className={modalStyles.Modal} onClick={onClick}>
            <ModalOverlay 
                handleOverlayClick={props.handleOverlayClick}
            />
            {children}
        </div>, modalRoot
    );
}
