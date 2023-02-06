import React from "react";
import { PagesInputsContainer } from "../components/pages-inputs-container/pages-inputs-container";
import { PagesMainContainer } from "../components/pages-main-container/pages-main-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { PagesHeader } from "../components/pages-header/pages-header";
import { InputEmail } from "../components/input-email/input-email";
import { InputPassword } from "../components/input-password/input-password";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";

export const Register = () => {
    return (
        <PagesMainContainer>
            <PagesInputsContainer classname={"mb-20"}>
                <PagesHeader title="Регистрация" />
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                />
                <InputEmail />
                <InputPassword />
                <Button htmlType="button" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </PagesInputsContainer>
            <PagesFooterContainer>
                <FooterString
                    question="Уже зарегистрированы ?"
                    link="Войти"
                />
            </PagesFooterContainer>
        </PagesMainContainer>
    );
}
