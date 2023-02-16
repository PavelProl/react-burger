import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { Button, Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/actions/user";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setUser] = useState({ email: "", name: "", password: "" });

    const register = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(registerUser(form))
        }
    );

    const onChange = (e) => {
        setUser({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <PagesCenterContainer>
            {/* ФОРМА */}
            <FormContainer classname={"mb-20"}>
                <FormHeader title="Регистрация" />
                <Input
                    onChange={onChange}
                    value={form.name}
                    type={'text'}
                    name={'name'}
                    placeholder={'Имя'}
                />
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
                <Link to="/register">
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={register}
                    >
                        Зарегистрироваться
                    </Button>
                </Link>

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
