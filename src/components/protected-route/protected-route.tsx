import React, { ReactNode, FunctionComponent } from "react";
import { useSelector } from "../../services/hooks";
import { useLocation, Navigate } from "react-router-dom";

type TProtectedRouteProps = {
    children?: ReactNode;
    onlyUnAuth?: boolean;
};

export const ProtectedRoute: FunctionComponent<TProtectedRouteProps> = ({ onlyUnAuth, children }) => {
    const user = useSelector((store: any) => store.user.data);
    const isAuthChecked: boolean = useSelector((store: any) => store.user.isAuthChecked);
    const location = useLocation();

    if (!isAuthChecked) {
        return <h2>"Loaded..."</h2>;
    }

    // альтернативный способ проверки авторизованности пользователя
    // if (!getCookie("refreshToken")) return "Loaded...";

    // если страница для неавторизованных пользователей,
    // причем данные пользователя получены, то редирект на главную страницу,
    // либо на страницу, которая записана в location.state.from

    if (onlyUnAuth && user) {
        const from = location.state?.from || '/';

        // отправляем его на предыдущую страницу
        return <Navigate to={ from } />;
    }

    if (!onlyUnAuth && !user) {
        // Сервер не ответил
        return <Navigate to="/login" state={{ from: location }} />;
    }
    
    return (
        <>
            {children}
        </>
    );
};
