import React, { useCallback, useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
import { useDispatch } from "../services/hooks";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { Button, Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { registerUser } from "../services/actions/user";

type TRegisterForm = {
    email: string;
    name: string;
    password: string;
};

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const nameRef = useRef<HTMLInputElement>(null);

    const [form, setUser] = useState<TRegisterForm>({ email: "", name: "", password: "" });

    useEffect(() => {
        nameRef.current?.focus();
    }, []);

    const register: React.FormEventHandler<HTMLFormElement> = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            dispatch<any>(registerUser(form))
        },
        [registerUser, form]
    );

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUser({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <PagesCenterContainer>
            {/* ФОРМА */}
            <FormContainer onFormClick={register} classname={"mb-20"}>
                <FormHeader title="Регистрация" />
                <Input
                    ref={nameRef}
                    onChange={handleChange}
                    value={form.name}
                    type={'text'}
                    name={'name'}
                    placeholder={'Имя'}
                />
                <EmailInput
                    onChange={handleChange}
                    value={form.email}
                    name={"email"}
                    isIcon={false}
                    placeholder="E-mail"
                />
                 <PasswordInput
                    onChange={handleChange}
                    value={form.password}
                    name={'password'}
                />
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                    >
                        Зарегистрироваться
                    </Button>

            </FormContainer>

            {/* ВОПРОСЫ ПОД ФОРМОЙ */}
            <PagesFooterContainer>
                <FooterString
                    question="Уже зарегистрированы ?"
                    link_text="Войти"
                    link="/"
                />
            </PagesFooterContainer>
        </PagesCenterContainer>
    );
}
