import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

import PropTypes from "prop-types";

export const ModalOverlay = (props) => {
    const {children} = props;
    
    return (
        <div
            onClick={props.closeModal}
            className={modalOverlayStyles.modal_overlay}>
                {children}
        </div>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired
};
