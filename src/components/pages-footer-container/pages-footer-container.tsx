import React, { ReactNode, FunctionComponent } from "react";
import styles from "./pages-footer-container.module.css";

interface IPagesFooterContainerProps {
    children?: ReactNode
}

export const PagesFooterContainer: FunctionComponent<IPagesFooterContainerProps> = ({children}) => {
    return (
        <div className={styles.container} >
            {children}
        </div>
    );
};
