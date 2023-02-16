import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export default function ProtectedRoute({ redirectTo, children }) {
    const isAuthChecked = useSelector(store => store.user.isAuthChecked);
    const resetMessageSuccess = useSelector(store => store.user.resetMessageSuccess);
    const user = useSelector(store => store.user.data);
    const location = useLocation();

    console.log("USER FROM PROTECTED ROUTE", user);
    console.log("resetMessageSuccess from protectedRoute", resetMessageSuccess);

    // if (!isAuthChecked) {
    //     return (
    //         <Preloader />
    //     );
    // }

    // если страница для неавторизованных пользователей,
    // причем данные пользователя получены, то редирект на главную страницу,
    // либо на страницу, которая записана в поле from стэйта location

    // if (onlyUnAuth && user) {
    //     const { from } = location.state || { from: { pathname: '/' } };

    //     return (
    //         <Route {...rest}>
    //             <Redirect to={from} />
    //         </Route>
    //     );
    // }

    // return (
    //     <Route {...rest}>
    //         {children}
    //     </Route>
    // )

    if (!isAuthChecked) {
        return "Loaded...";
    };

    // if (!resetMessageSuccess) {
    //     return;
    // };
    
    if (!user) {
        return <Navigate to={redirectTo} state={{ from: location }} />;
    };
    
    return (
        <>
            {children}
        </>
    );
};
