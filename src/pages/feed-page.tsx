import React from "react";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import { ProfilePageContainer } from "../components/profile-page-container/profile-page-container";

export const FeedPage = () => {
    return (
        <ProfilePageContainer>
            <ProfileMenu />
            <PagesCenterContainer>
                <h1>Лента заказов</h1>
            </PagesCenterContainer>
        </ProfilePageContainer>
    );
}
