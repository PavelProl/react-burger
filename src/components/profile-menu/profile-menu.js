import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
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

    let activeStyle = {
        color: "#F2F2F3",
    };
    let inactiveStyle = {
        color: "#8585AD",
    };

    return (
        <ul className={styles.list}>
            <li className={`${styles.list_item} ${"text text_type_main-medium"}`}>
                <NavLink
                    to="/profile"
                    style={({ isActive }) =>
                        isActive ? activeStyle : inactiveStyle
                    }
                >
                    Профиль
                </NavLink>
            </li>
            <li className={`${styles.list_item} ${"text text_type_main-medium"}`}>
                <NavLink
                    to="/feed"
                    style={({ isActive }) =>
                        isActive ? activeStyle : inactiveStyle
                    }
                >
                    История заказов
                </NavLink>
            </li>
            <li className={`${styles.list_item} ${"text text_type_main-medium"}`}>
                <NavLink
                    to="/"
                    onClick={logout}
                    style={({ isActive }) =>
                        isActive ? activeStyle : inactiveStyle
                    }
                >
                    Выход
                </NavLink>
            </li>

        </ul>
    );
};
