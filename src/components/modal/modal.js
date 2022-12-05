import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";

import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

export const Modal = (props) => {
    const {children} = props;

    return ReactDOM.createPortal(
        <div className={`${modalStyles.Modal} ${"pl-10 pr-10 pt-10"}`}>
            
            {/* ШАПКА МОДАЛЬНОГО ОКНА */}
            <div className={modalStyles.Modal_header}>
                <div className="text text_type_main-large">
                    {props.title}
                </div>
                <button
                    className={modalStyles.button}
                    onClick={props.closeModal}>
                        <CloseIcon type="primary" />
                </button>
            </div>

            {/* <ModalOverlay 
                handleOverlayClick={props.handleOverlayClick}
            /> */}
            {children}
        </div>, modalRoot
    );
}

Modal.propTypes = {
    handleClick: PropTypes.func,
    children: PropTypes.element.isRequired
};
