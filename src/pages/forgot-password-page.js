import React from "react";
import { FormContainer } from "../components/form-container/form-container";
import { PagesMainContainer } from "../components/pages-content-container/pages-content-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
// import { InputEmail } from "../components/input-email/input-email";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const ForgotPasswordPage = () => {
    return (
        <PagesMainContainer>
            {/* ФОРМА */}
            <FormContainer classname={"mb-20"}>
                <FormHeader title="Восстановление пароля" />
                <EmailInput
                    placeholder="Укажите e-mail"
                />
                <Link to="/login">
                    <Button htmlType="button" type="primary" size="medium">
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
        </PagesMainContainer>
    );
}
