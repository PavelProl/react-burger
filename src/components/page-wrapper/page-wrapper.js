import React from "react";
import styles from "./page-wrapper.module.css";

export const PageWrapper = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            { children }
        </div>
    );
};
