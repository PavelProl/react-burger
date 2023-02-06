import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormContainer } from "../components/form-container/form-container";
import { PagesMainContainer } from "../components/pages-content-container/pages-content-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { InputEmail } from "../components/input-email/input-email";
import { InputPassword } from "../components/input-password/input-password";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";

export const LoginPage = () => {
    // const navigate = useNavigate();
    // const onClick = () => {
    //     navigate("/", {replace: true} )
    // }

    return (
        <PagesMainContainer>
            {/* ФОРМА */}
            <FormContainer classname={"mb-20"}>
                <FormHeader title="Вход" />
                <InputEmail />
                <InputPassword />
                <Link to="/">
                    <Button htmlType="button" type="primary" size="medium">
                            Войти
                    </Button>
                </Link>

            </FormContainer>

            {/* ВОПРОСЫ ПОД ФОРМОЙ */}
            <PagesFooterContainer>
                <FooterString
                    question="Вы - новый пользователь?"
                    link_text="Зарегистрироваться"
                    link="/register"
                />
                <FooterString
                    question="Забыли пароль ?"
                    link_text="Восстановить пароль"
                    link="/forgot-password"
                />
            </PagesFooterContainer>
        </PagesMainContainer>
    );
}
