import React from "react";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

export const InputPassword = (props) => {
    const [value, setValue] = React.useState('password');
    const onChange = e => {
        setValue(e.target.value)
    };

    return (
        <div className={props.classname}>
            <PasswordInput
                onChange={onChange}
                value={value}
                name={'password'}
            />
        </div>
    );
};
