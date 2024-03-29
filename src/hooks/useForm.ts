import { useState } from "react";

type TForm = {
    email: string;
    name: string;
    password: string;
};

export function useForm(inputValues: TForm) {
    const [values, setValues] = useState(inputValues);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
};
