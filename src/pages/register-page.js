import React from "react";
import { FormContainer } from "../components/form-container/form-container";
import { PagesMainContainer } from "../components/pages-content-container/pages-content-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { InputEmail } from "../components/input-email/input-email";
import { InputPassword } from "../components/input-password/input-password";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
    return (
        <PagesMainContainer>
            {/* ФОРМА */}
            <FormContainer classname={"mb-20"}>
                <FormHeader title="Регистрация" />
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    name={'name'}
                />
                <InputEmail />
                <InputPassword />
                <Link to="/">
                    <Button htmlType="button" type="primary" size="medium">
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
        </PagesMainContainer>
    );
}
