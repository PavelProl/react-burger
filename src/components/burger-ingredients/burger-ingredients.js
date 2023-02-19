import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { openIngredient } from "../../services/actions/currentIngredient";
import ingredientsStyles from "./burger-ingredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";

export const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.ingredients.ingredients);
    // console.log("ingredients from burger-ingredients", ingredients);
    const [currentTab, setCurrentTab] = useState("buns");

    const [bunsRef, inViewBuns] = useInView({
        threshold: 0
    });
    const [mainsRef, inViewFilling] = useInView({
        threshold: 0
    });
    const [saucesRef, inViewSauces] = useInView({
        threshold: 0
    });

    useEffect(() => {
        if (inViewBuns) {
            setCurrentTab("buns")
        } else if (inViewSauces) {
            setCurrentTab("sauces")
        } else if (inViewFilling) {
            setCurrentTab("mains")
        }
    }, [inViewBuns, inViewFilling, inViewSauces]);

    // плавная прокрутка до контейнера с ингредиентами
    // по клику на заголовок меню
    const onTabClick = (tab) => {
        setCurrentTab(tab);
        const element = document.getElementById(tab);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    // открытие модального окна ингредиента
    const onIngredientClick = (id) => {
        const ingredient = ingredients.find(item => item._id === id);
        dispatch(openIngredient(ingredient));
    };

    const buns = useMemo(() => {
        return ingredients.filter(ingredient => ingredient.type === "bun")
    }, [ingredients]);

    const mains = useMemo(() => {
        return ingredients.filter(ingredient => ingredient.type === "main")
    }, [ingredients]);

    const sauces = useMemo(() => {
        return ingredients.filter(ingredient => ingredient.type === "sauce")
    }, [ingredients]);

    return (
        <section className={ingredientsStyles.ingredients}>
            <h1 className="text text_type_main-large mb-5">
                Соберите бургер
            </h1>
            <ul className={`${ingredientsStyles.tabs_container} ${"mb-10"}`}>
                <Tab id="buns" value="buns" active={currentTab === 'buns'} onClick={onTabClick}>
                    Булки
                </Tab>
                <Tab id="mains" value="mains" active={currentTab === 'mains'} onClick={onTabClick}>
                    Начинки
                </Tab>
                <Tab id= "sauces" value="sauces" active={currentTab === 'sauces'} onClick={onTabClick}>
                    Соусы
                </Tab>
            </ul>

            {/* СКРОЛЛ-КОНТЭЙНЕР */}
            <div className={ingredientsStyles.scroll_container}>
                <IngredientsCategory
                    id="buns"
                    title="Булки"
                    ingredients={buns}
                    onIngredientClick={onIngredientClick}
                    ref={bunsRef}
                />
                <IngredientsCategory
                    id="mains"
                    title="Начинки"
                    ingredients={mains}
                    onIngredientClick={onIngredientClick}
                    ref={mainsRef}
                />
                <IngredientsCategory
                    id="sauces"
                    title="Соусы"
                    ingredients={sauces}
                    onIngredientClick={onIngredientClick}
                    ref={saucesRef}
                />
            </div>
        </section>
    );
}

// Ingredient.propTypes = {
//     onClick: PropTypes.func
// };
