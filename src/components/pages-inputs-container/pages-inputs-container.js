import React from "react";
import styles from "./pages-inputs-container.styles.module.css";

export const PagesInputsContainer = (props) => {
    const { children } = props;
    return (
        <div className={`${styles.container} ${props.classname}`} >
            {children}
        </div>
    );
};
