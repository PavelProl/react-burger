import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./footer-string.module.css";

export const FooterString = (props) => {
    return (
        <div className={styles.container}>
            <span className="text text_type_main-default text_color_inactive mr-2">
                {props.question}
            </span>
            <Button htmlType="button" type="secondary" size="medium" style={{ padding: 0 }}>
                {props.link}
            </Button>
        </div>
    );
};
