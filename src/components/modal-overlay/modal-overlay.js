import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

import PropTypes from "prop-types";

export const ModalOverlay = (props) => {    
    return (
        <div
            onClick={props.closeModal}
            className={modalOverlayStyles.modal_overlay}>
        </div>
    );
};

ModalOverlay.propTypes = {
    closeModal: PropTypes.func
};
