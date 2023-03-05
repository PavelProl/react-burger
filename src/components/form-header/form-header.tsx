import React, { FunctionComponent } from "react";
import styles from "./form-header.module.css";

type TFormHeaderProps = {
    title: string;
    classname?: string;
};

export const FormHeader: FunctionComponent<TFormHeaderProps> = (props) => {
    return (
        <p className={`${styles.form_header} ${"text text_type_main-medium"} ${props.classname}`}>
            {props.title}
        </p>
    );
}
