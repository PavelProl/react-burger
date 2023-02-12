import React from "react";
import styles from "./pages-center-container.module.css";

export const PagesCenterContainer = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};
