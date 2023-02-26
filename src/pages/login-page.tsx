import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { PagesFooterContainer } from "../components/pages-footer-container/pages-footer-container";
import { FormHeader } from "../components/form-header/form-header";
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { FooterString } from "../components/footer-string/footer-string";
import { loginUser } from "../services/actions/user";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
    const dispatch = useDispatch();
    // const user = useSelector(store => store.user.data);
    const { values, handleChange } = useForm({ email: "", password: "" });

    const login = useCallback(
        (e: any) => {
            e.preventDefault();
            dispatch<any>(loginUser(values));
        },
        [loginUser]
    );

    return (
        <PagesCenterContainer>
            {/* ФОРМА */}
            <FormContainer onFormClick={login} classname={"mb-20"}>
                <FormHeader title="Вход" />
                <EmailInput
                    autoFocus
                    onChange={handleChange}
                    value={values.email}
                    name={"email"}
                    isIcon={false}
                    placeholder="E-mail"
                />
                 <PasswordInput
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    placeholder="Пароль"
                />
                {/* <Link to="/"> */}
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="medium"
                        // onClick={login}
                    >
                            Войти
                    </Button>
                {/* </Link> */}

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
        </PagesCenterContainer>
    );
}
