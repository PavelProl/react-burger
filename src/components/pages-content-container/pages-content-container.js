import React from "react";
import styles from "./pages-content-container.module.css";

export const PagesMainContainer = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};
