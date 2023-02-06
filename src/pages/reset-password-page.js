import React from "react";
import { FormContainer } from "../components/form-container/form-container";
import { PagesMainContainer } from "../components/pages-content-container/pages-content-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
// import { InputEmail } from "../components/input-email/input-email";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { InputPassword } from "../components/input-password/input-password";

export const ResetPasswordPage = () => {
    return (
        <PagesMainContainer>
            {/* ФОРМА */}
            <FormContainer classname={"mb-20"}>
                <FormHeader title="Восстановление пароля" />
                <InputPassword />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    name={'name'}
                />
                <Button htmlType="button" type="primary" size="medium">
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
        </PagesMainContainer>
    );
}
