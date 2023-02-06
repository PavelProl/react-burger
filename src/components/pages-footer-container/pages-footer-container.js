import React from "react";
import styles from "./pages-footer-container.module.css";

export const PagesFooterContainer = ({children}) => {
    return (
        <div className={styles.container} >
            {children}
        </div>
    );
};
