import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../hooks/useForm";

export const ResetPasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("LOCATION FROM ResetPasswordPage", location)
        !location?.state?.resetPassword && navigate("/forgot-password");
    }, [location.state, navigate]);

    const {values, handleChange} = useForm({ password: "", key: "", name: "", email: ""});

    return (
        <PagesCenterContainer>
            {/* ФОРМА */}
            <FormContainer classname={"mb-20"}>
                <FormHeader title="Восстановление пароля" />
                <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                />
                <Input
                    onChange={handleChange}
                    value={values.key}
                    name={'name'}
                    type={'text'}
                    placeholder={'Введите код из письма'}
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </FormContainer>

            {/* ВОПРОСЫ ПОД ФОРМОЙ */}
            <PagesFooterContainer>
                <FooterString
                    question="Вспомнили пароль ?"
                    link_text="Войти"
                    link="/"
                />
            </PagesFooterContainer>
        </PagesCenterContainer>
    );
}
