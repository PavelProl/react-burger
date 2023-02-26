import React, { FunctionComponent, ReactNode } from "react";
import styles from "./form-container.styles.module.css";

type TFormContainerProps = {
    onFormClick?: (e: any) => void;
    children: ReactNode;
    classname?: string;
};

export const FormContainer: FunctionComponent<TFormContainerProps> = (props) => {
    const { children } = props;
    return (
        <form onSubmit={props.onFormClick} className={`${styles.container} ${props.classname}`} >
            {children}
        </form>
    );
};
