import React from "react";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

export const InputEmail = (props) => {
    const [value, setValue] = React.useState('');
    const onChange = e => {
        setValue(e.target.value)
    };
    return (
        <EmailInput
            onChange={onChange}
            value={value}
            name={"email"}
            isIcon={false}
            placeholder="E-mail"
        />
    );
};
