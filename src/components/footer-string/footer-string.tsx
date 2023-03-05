import React, { FunctionComponent } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./footer-string.module.css";

interface IFooterStringProps {
    question: string;
    link: string;
    link_text: string
};

export const FooterString: FunctionComponent<IFooterStringProps> = (props) => {
    return (
        <div className={styles.container}>
            <span className="text text_type_main-default text_color_inactive mr-2">
                {props.question}
            </span>
            <Link to={props.link}>
                <Button htmlType="button" type="secondary" size="medium" style={{ padding: 0 }}>
                        {props.link_text}
                </Button>
            </Link>
        </div>
    );
};
