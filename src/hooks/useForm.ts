import { useState } from "react";

type TForm = {
    email: string;
    name: string;
    password: string;
    key: string;
};

export function useForm(inputValues: { email: string; name: string; password: string; key: string}) {
    const [values, setValues] = useState<TForm>(inputValues);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
};
