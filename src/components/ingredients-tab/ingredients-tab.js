import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientsTab = (props) => {
    const [current, setCurrent] = React.useState('one');
    return (
        <div style={{ display: 'flex' }} className={props.className}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            One
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Two
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Three
            </Tab>
        </div>
    );
}

export default IngredientsTab;
