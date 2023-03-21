import React from "react";
import { useSelector } from "../../services/hooks";

import headerStyles from "./app-header.module.css";
import { 
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useMatch } from "react-router-dom";

export const AppHeader = () => {
    const isConstructor = !!useMatch({ path: "/", end: true });
    const isFeed = !!useMatch("/feed");
    const isProfile = !!useMatch("/profile");

    const userName = useSelector((store: any) => store.user?.data?.name);

    let activeStyle = {
        color: "#F2F2F3",
    };

    return (
        <header className={`${headerStyles.header} ${"pt-4 pb-4 mb-10"}`}>
            {/* wrapper */}
            <div className={headerStyles.wrapper}>
                {/* навигация в хэдере */}
                <nav className={headerStyles.navContainer}>
                    {/* меню слева от логотипа */}
                    <div className={headerStyles.nav_menu}>
                        <NavLink
                            to="/"
                            className={`${headerStyles.link} ${"pl-5 pr-5 pt-4 pb-4"}`}
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            {/* убрал headerStyles.burger с BurgerIcon на div */}
                            <div className={`${headerStyles.burger} ${"mr-2"}`}>
                                <BurgerIcon type={isConstructor ? "primary" : "secondary"} />
                            </div>
                            <h2 className="text text_type_main-default">Конструктор</h2>
                        </NavLink>
                        <NavLink
                            to="/feed"
                            className={`${headerStyles.link} ${"pl-5 pr-5 pt-4 pb-4"}`}
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            <div className="mr-2">
                                <ListIcon type={isFeed ? "primary" : "secondary"} />
                            </div>
                            <h2 className="text text_type_main-default">Лента заказов</h2>
                        </NavLink>
                    </div>

                    {/* логотип в хэдере */}
                    <div className={`${headerStyles.logo} ${"pt-6 pb-6 mr-30"}`}>
                        <NavLink to="/">
                            <Logo />
                        </NavLink>
                    </div>

                    {/* иконка профиля справа от логотипа */}
                    <NavLink
                        to="/profile"
                        className={`${headerStyles.link} ${"pl-5 pr-5 pt-4 pb-4"}`}
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                    >
                        <div className="mr-2">
                            <ProfileIcon type={isProfile ? "primary" : "secondary"} />
                        </div>
                        <h2 className="text text_type_main-default">
                            {userName ? userName : "Личный кабинет"}
                        </h2>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};
