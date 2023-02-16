import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import { ProfilePageContainer } from "../components/profile-page-container/profile-page-container";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {updateUser} from "../services/actions/user";
import styles from "./profile-page.module.css";

export const ProfilePage = () => {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user.data.user);
    console.log("USER FROM PROFILE PAGE", user)
    const [formValue, setFormValue] = useState({ email: user?.email, name: user?.name, password: "" }); 

    const handleInputChange = (e) => {
        setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
        }));
    };

    const update = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(updateUser(formValue))
        }
    );
    
    const clearForm = () => {
        setFormValue({ email: user.email, name: user.name, password: "" })
    };

    return (
        <ProfilePageContainer>
            <ProfileMenu />
            <PagesCenterContainer>
                {/* ФОРМА */}
                <FormContainer>
                    <Input
                        onChange={handleInputChange}
                        value={formValue.name}
                        type={'text'}
                        name={'name'}
                        placeholder={'Имя'}
                        icon="EditIcon"
                    />
                    <EmailInput
                        onChange={handleInputChange}
                        value={formValue.email}
                        name={"email"}
                        isIcon={false}
                        placeholder="Email"
                        icon="EditIcon"
                    />
                    <PasswordInput
                        onChange={handleInputChange}
                        value={formValue.password}
                        name={'password'}
                        placeholder="Пароль"
                        icon="EditIcon"
                    />
                    <div className={styles.row}>
                        <Button
                            htmlType="button"
                            type="secondary"
                            size="small"
                            onClick={clearForm}
                        >
                            Отмена
                        </Button>
                        <Button
                            htmlType="button"
                            type="primary"
                            size="small"
                            extraClass="ml-2"
                            onClick={update}
                        >
                            Сохранить
                        </Button>
                    </div>
                </FormContainer>
            </PagesCenterContainer>
        </ProfilePageContainer>
    );
}
