import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { loginUser } from "../services/actions/user";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
    const dispatch = useDispatch();
    // const emailRef = useRef<HTMLInputElement>(null);

    const { values, handleChange } = useForm({ email: "", password: "", name: "", key: "" });
    console.log(values)

    // useEffect(() => {
    //     emailRef.current?.focus();
    // }, []);

    const login: React.FormEventHandler<HTMLFontElement> = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            dispatch<any>(loginUser(values));
        },
        [loginUser, values]
    );

    return (
        <PagesCenterContainer>
            {/* ФОРМА */}
            <FormContainer onFormClick={login} classname={"mb-20"}>
                <FormHeader title="Вход" />
                <EmailInput
                    // ref={emailRef}
                    autoFocus
                    onChange={handleChange}
                    value={values.email}
                    name={"email"}
                    isIcon={false}
                    placeholder="E-mail"
                />
                 <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    placeholder="Пароль"
                />
                <Button
                    htmlType="submit"
                    type="primary"
                    size="medium"
                >
                        Войти
                </Button>

            </FormContainer>

            {/* ВОПРОСЫ ПОД ФОРМОЙ */}
            <PagesFooterContainer>
                <FooterString
                    question="Вы - новый пользователь?"
                    link_text="Зарегистрироваться"
                    link="/register"
                />
                <FooterString
                    question="Забыли пароль ?"
                    link_text="Восстановить пароль"
                    link="/forgot-password"
                />
            </PagesFooterContainer>
        </PagesCenterContainer>
    );
}
