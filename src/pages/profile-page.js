import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import { ProfilePageContainer } from "../components/profile-page-container/profile-page-container";
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfilePage = () => {
    // const dispatch = useDispatch();

    const [form, setUser] = useState({ email: "", name: "", password: "" });

    const onChange = (e) => {
        setUser({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <ProfilePageContainer>
            <ProfileMenu />
            <PagesCenterContainer>
                {/* ФОРМА */}
                <FormContainer>
                    <Input
                        onChange={onChange}
                        value={form.name}
                        type={'text'}
                        name={'name'}
                        placeholder={'Имя'}
                        icon="EditIcon"
                    />
                    <EmailInput
                        onChange={onChange}
                        value={form.email}
                        name={"email"}
                        isIcon={false}
                        placeholder="Логин"
                        icon="EditIcon"
                    />
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                        placeholder="Пароль"
                        icon="EditIcon"
                    />
                </FormContainer>
            </PagesCenterContainer>
        </ProfilePageContainer>
    );
}
