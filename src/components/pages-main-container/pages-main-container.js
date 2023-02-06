import React from "react";
import styles from "./pages-main-container.module.css";

export const PagesMainContainer = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};
