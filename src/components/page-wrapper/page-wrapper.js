import React from "react";
import styles from "./page-wrapper.module.css";
import PropTypes from "prop-types";

export const PageWrapper = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            { children }
        </div>
    );
};

PageWrapper.propTypes = {
    children: PropTypes.element
}
