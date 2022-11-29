import React from "react";
import headerStyles from "./app-header.module.css";
import { 
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo
} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
    return (
        <header className={`${headerStyles.header} ${"pt-4 pb-4 mb-10"}`}>
            
            {/* контэйнер */}
            <div className={headerStyles.container}>

                {/* навигация в хэдере */}
                <nav className={headerStyles.nav}>

                    {/* меню слева от логотипа */}
                    <ul className={headerStyles.nav_menu}>
                        <li className={`${headerStyles.nav_item} ${"pl-5 pr-5 pt-4 pb-4"}`}>
                            <div className="mr-2">
                                <BurgerIcon type="secondary" className={headerStyles.burger} alt="иконка бургера."/>
                            </div>
                            <h2 className="text text_type_main-default">Конструктор</h2>
                        </li>
                        <li className={`${headerStyles.nav_item} ${"pl-5 pr-5 pt-4 pb-4"}`}>
                            <div className="mr-2">
                                <ListIcon type="secondary" className="mr-2" alt="иконка списка." />
                            </div>
                            <h2 className="text text_type_main-default">Лента заказов</h2>
                        </li>
                    </ul>

                    {/* логотип в хэдере */}
                    <div className={`${headerStyles.logo} ${"pt-6 pb-6 mr-30"}`}>
                        <Logo />
                    </div>

                    {/* иконка профиля справа от логотипа */}
                    <div className={`${headerStyles.nav_item} ${"pl-5 pr-5 pt-4 pb-4"}`}>
                        <div className="mr-2">
                            <ProfileIcon type="secondary" />
                        </div>
                        <h2 className="text text_type_main-default">Личный кабинет</h2>
                    </div>
                </nav>
                
                
            </div>
        </header>
    );
}
