import React, { FunctionComponent, ReactNode } from "react";
import styles from "./pages-center-container.module.css";

interface IPagesCenterContainerProps {
    children?: ReactNode
}

export const PagesCenterContainer: FunctionComponent<IPagesCenterContainerProps> = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};
