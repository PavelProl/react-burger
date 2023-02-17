import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { getCookie } from "../../utils/cookies";

export default function ProtectedRoute({ onlyUnAuth = false, children }) {
    const user = useSelector(store => store.user.data);
    const location = useLocation();

    const isAuthChecked = useSelector(store => store.user.isAuthChecked);
    if (!isAuthChecked) {
        return "Loaded...";
    }

    // альтернативный способ проверки авторизованности пользователя
    // if (!getCookie("refreshToken")) return "Loaded...";

    // если страница для неавторизованных пользователей,
    // причем данные пользователя получены, то редирект на главную страницу,
    // либо на страницу, которая записана в location.state.from

    if (onlyUnAuth && user) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    if (!onlyUnAuth && !user) {
        // Сервер не ответил
        return <Navigate to="/login" state={{ from: location }} />;
    }
    
    // if (user) {
    //     return <Navigate to={redirectTo} state={{ from: location }} />;
    // };
    
    return (
        <>
            {children}
        </>
    );
};
