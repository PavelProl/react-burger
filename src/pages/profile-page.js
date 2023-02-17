import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components/form-container/form-container";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import { ProfilePageContainer } from "../components/profile-page-container/profile-page-container";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import {updateUser} from "../services/actions/user";
import styles from "./profile-page.module.css";
import { useForm } from "../hooks/useForm";

export const ProfilePage = () => {
    const dispatch = useDispatch();

    const user = useSelector(store => store.user.data);
    // console.log("USER FROM PROFILE", user);
    const { values, handleChange, setValues } = useForm({ email: user?.email, name: user?.name, password: "" });
    
    // временно оставлю тут закомментированный код
    // const [formValue, setFormValue] = useState({ email: user?.email, name: user?.name, password: "" }); 

    // временно оставлю тут закомментированный код
    // const handleInputChange = (e) => {
    //     setFormValue((prevState) => ({
    //     ...prevState,
    //     [e.target.name]: e.target.value,
    //     }));
    // };

    const update = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(updateUser(values))
        }
    );
    
    const clearForm = () => {
        setValues({ email: user?.email, name: user?.name, password: "" })
    };

    return (
        <ProfilePageContainer>
            <ProfileMenu />
            <PagesCenterContainer>
                {/* ФОРМА */}
                <FormContainer onFormClick={update}>
                    <Input
                        onChange={handleChange}
                        value={values.name}
                        type={'text'}
                        name={'name'}
                        placeholder={'Имя'}
                        icon="EditIcon"
                    />
                    <EmailInput
                        onChange={handleChange}
                        value={values.email}
                        name={"email"}
                        isIcon={false}
                        placeholder="Email"
                        icon="EditIcon"
                    />
                    <PasswordInput
                        onChange={handleChange}
                        value={values.password}
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
