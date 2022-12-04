import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

export const ModalOverlay = (props) => {
    return (
        <div
            onClick={props.handleOverlayClick}
            className={modalOverlayStyles.modal_overlay}>
        </div>
    );
}
