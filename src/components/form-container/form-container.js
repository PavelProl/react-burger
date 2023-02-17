import React from "react";
import styles from "./form-container.styles.module.css";

export const FormContainer = (props) => {
    const { children } = props;
    return (
        <form onSubmit={props.onFormClick} className={`${styles.container} ${props.classname}`} >
            {children}
        </form>
    );
};
