import React from "react";
import { PagesInputsContainer } from "../components/pages-inputs-container/pages-inputs-container";
import { PagesMainContainer } from "../components/pages-main-container/pages-main-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { PagesHeader } from "../components/pages-header/pages-header";
import { InputEmail } from "../components/input-email/input-email";
import { InputPassword } from "../components/input-password/input-password";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";

export const Login = () => {
    return (
        <PagesMainContainer>
            <PagesInputsContainer classname={"mb-20"}>
                <PagesHeader title="Вход" />
                <InputEmail />
                <InputPassword />
                <Button htmlType="button" type="primary" size="medium">
                    Войти
                </Button>
            </PagesInputsContainer>
            <PagesFooterContainer>
                <FooterString
                    question="Вы - новый пользователь?"
                    link="Зарегистрироваться"
                />
                <FooterString
                    question="Забыли пароль ?"
                    link="Восстановить пароль"
                />
            </PagesFooterContainer>
        </PagesMainContainer>
    );
}
