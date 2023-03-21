import React, { useCallback } from "react";
import { useDispatch } from "../services/hooks";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { forgotUserPassword } from "../services/actions/user";

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { values, handleChange } = useForm({ email: "", password: "", name: "" });

    const forgotPassword: React.FormEventHandler<HTMLFormElement> = useCallback(() => {
        navigate("/reset-password", {
            state: { resetPassword: true }
        });

        dispatch(forgotUserPassword(values));
    }, [forgotUserPassword]);

    return (
        <PagesCenterContainer>
            {/* ФОРМА */}
            <FormContainer onFormClick={forgotPassword} classname={"mb-20"}>
                <FormHeader title="Восстановление пароля" />
                <EmailInput
                    onChange={handleChange}
                    value={values.email}
                    name={"email"}
                    isIcon={false}
                    placeholder="E-mail"
                />
                    <Button
                        htmlType="button"
                        type="primary"
                        size="medium"
                    >
                        Восстановить
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
