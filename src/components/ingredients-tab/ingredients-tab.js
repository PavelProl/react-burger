import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsTabStyles from "./ingredients-tab.module.css";

const IngredientsTab = () => {
    const [current, setCurrent] = React.useState('one');
    return (
        <div className={`${ingredientsTabStyles.tabs_container} ${"mb-10"}`}>

            {/* здесь пытался через map получить, но пока не вышло */}
            {/* {props.names.map(name => {
                return <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    {name}
                </Tab>
            })} */}

            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    );
}

export default IngredientsTab;
