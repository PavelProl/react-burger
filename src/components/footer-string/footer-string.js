import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import styles from "./footer-string.module.css";
import PropTypes from "prop-types";

export const FooterString = (props) => {
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

FooterString.propTypes = {
    question: PropTypes.string,
    link_text: PropTypes.string
}
