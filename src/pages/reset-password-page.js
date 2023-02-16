import React from "react";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPasswordPage = () => {
    return (
        <PagesCenterContainer>
            {/* ФОРМА */}
            <FormContainer classname={"mb-20"}>
                <FormHeader title="Восстановление пароля" />
                <PasswordInput
                    // onChange={onChange}
                    // value={form.password}
                    name={'password'}
                />
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
        </PagesCenterContainer>
    );
}
