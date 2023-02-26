import React, { ReactNode, FunctionComponent } from "react";
import styles from "./page-wrapper.module.css";

interface IPageWrapperProps {
    children?: ReactNode
}

export const PageWrapper: FunctionComponent<IPageWrapperProps> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            { children }
        </div>
    );
};
