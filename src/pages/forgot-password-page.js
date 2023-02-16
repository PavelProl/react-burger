import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { Link } from "react-router-dom";
import { forgotUserPassword } from "../services/actions/user";

export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({ email: '' });

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const forgotPassword = useCallback(() => {
        dispatch(forgotUserPassword(form));
    });

    return (
        <PagesCenterContainer>
            {/* ФОРМА */}
            <FormContainer classname={"mb-20"}>
                <FormHeader title="Восстановление пароля" />
                <EmailInput
                    onChange={onChange}
                    value={form.email}
                    name={"email"}
                    isIcon={false}
                    placeholder="E-mail"
                />
                <Link to="/reset-password">
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                        onClick={forgotPassword}
                    >
                        Восстановить
                    </Button>
                </Link>
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
