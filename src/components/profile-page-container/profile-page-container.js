import React from "react";
import styles from "./profile-page-container.module.css";

export const ProfilePageContainer = ({ children }) => {
    return (
        <div className={styles.container}>
            { children }
        </div>
    );
};
