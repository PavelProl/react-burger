import React, { FunctionComponent } from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

interface IModalOverlayProps {
    closeModal: ()=> void;
}

export const ModalOverlay: FunctionComponent<IModalOverlayProps> = (props) => {    
    return (
        <div
            onClick={props.closeModal}
            className={modalOverlayStyles.modal_overlay}>
        </div>
    );
};
