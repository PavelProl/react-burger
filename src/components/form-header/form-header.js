import React from "react";
import styles from "./form-header.module.css";

export const FormHeader = (props) => {
    return (
        <p className={`${styles.form_header} ${"text text_type_main-medium"} ${props.classname}`}>
            {props.title}
        </p>
    );
}
