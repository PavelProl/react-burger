import React from "react";
import styles from "./form-header.module.css";
import PropTypes from "prop-types";

export const FormHeader = (props) => {
    return (
        <p className={`${styles.form_header} ${"text text_type_main-medium"} ${props.classname}`}>
            {props.title}
        </p>
    );
}

FormHeader.propTypes = {
    title: PropTypes.string
}
