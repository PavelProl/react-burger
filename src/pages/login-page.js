import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
// import { InputEmail } from "../components/input-email/input-email";
// import { InputPassword } from "../components/input-password/input-password";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { loginUser } from "../services/actions/user";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const [form, setValue] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const login = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(loginUser(form));
        }, [form]
    );

    return (
        <PagesCenterContainer>
            {/* ФОРМА */}
            <FormContainer classname={"mb-20"}>
                <FormHeader title="Вход" />
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={"email"}
                    isIcon={false}
                    placeholder="E-mail"
                />
                 <PasswordInput
                    onChange={onChange}
                    value={form.password}
                    name={'password'}
                />
                <Link to="/">
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={login}
                    >
                            Войти
                    </Button>
                </Link>

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
