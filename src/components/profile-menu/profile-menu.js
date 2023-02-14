import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile-menu.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/actions/user";

export const ProfileMenu = () => {
    const dispatch = useDispatch();

    const logout = useCallback(
        () => {
            dispatch(logoutUser());
        }
    );

    return (
        <nav className={styles.nav}>
            <Link to="/" className={`${"text text_type_main-medium"} ${styles.nav_link}`}>
                Профиль
            </Link>
            <Link to="/" className={`${styles.nav_link} ${"ttext text_type_main-medium text_color_inactive"}`}>
                История заказов
            </Link>
            <Link
                to="/"
                onClick={logout}
                className={`${styles.nav_link} ${"text text_type_main-medium text_color_inactive"}`}>
                Выход
            </Link>
        </nav>
    );
};
