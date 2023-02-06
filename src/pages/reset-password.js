import React from "react";
import { PagesInputsContainer } from "../components/pages-inputs-container/pages-inputs-container";
import { PagesMainContainer } from "../components/pages-main-container/pages-main-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { PagesHeader } from "../components/pages-header/pages-header";
// import { InputEmail } from "../components/input-email/input-email";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { InputPassword } from "../components/input-password/input-password";

export const ResetPassword = () => {
    return (
        <PagesMainContainer>
            <PagesInputsContainer classname={"mb-20"}>
                <PagesHeader title="Восстановление пароля" />
                <InputPassword />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    name={'name'}
                />
                <Button htmlType="button" type="primary" size="medium">
                    Сохранить
                </Button>
            </PagesInputsContainer>
            <PagesFooterContainer>
                <FooterString
                    question="Вспомнили пароль ?"
                    link="Войти"
                />
            </PagesFooterContainer>
        </PagesMainContainer>
    );
}
