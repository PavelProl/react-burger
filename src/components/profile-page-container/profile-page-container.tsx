import React, { ReactNode, FunctionComponent } from "react";
import styles from "./profile-page-container.module.css";

interface IProfilePageContainerProps {
    children?: ReactNode
}

export const ProfilePageContainer: FunctionComponent<IProfilePageContainerProps> = ({children}) => {
    return (
        <div className={styles.container}>
            { children }
        </div>
    );
};
