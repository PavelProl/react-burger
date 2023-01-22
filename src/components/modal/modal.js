import React from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import modalStyles from "./modal.module.css";
import PropTypes from "prop-types";

import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

export const Modal = (props) => {
    const {children, closeModal} = props;

    React.useEffect(() => {
        function closeByEscape(evt) {
            if(evt.key === 'Escape') {
                closeModal();
            }
        }
        document.addEventListener('keydown', closeByEscape);
    
        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
    }, []);

    return ReactDOM.createPortal(
        <>
            {/* МОДАЛЬНОЕ ОКНО */}
            <div className={`${modalStyles.Modal} ${"pl-10 pr-10 pt-10"}`}>
                {/* ШАПКА МОДАЛЬНОГО ОКНА */}
                <div className={modalStyles.Modal_header}>
                    <div className="text text_type_main-large">
                        {props.title}
                    </div>
                    <button
                        className={modalStyles.button}
                        onClick={closeModal}>
                            <CloseIcon type="primary" />
                    </button>
                </div>
                {children}
            </div>

            {/* ОВЕРЛЭЙ */}
            <ModalOverlay closeModal={closeModal} />
        </>, modalRoot
    );
}

Modal.propTypes = {
    handleClick: PropTypes.func,
    children: PropTypes.element.isRequired
};
