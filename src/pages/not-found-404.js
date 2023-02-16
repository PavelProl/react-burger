import React from "react";
import { PagesCenterContainer } from "../components/pages-center-container/pages-center-container";
import { ProfilePageContainer } from "../components/profile-page-container/profile-page-container";

export const NotFound404 = () => {
    return (
        <PagesCenterContainer>
            <h1>Ой, страница не нашлась! </h1>
            <h2 className={"mt-10"}>Но ничего страшного :) </h2>
        </PagesCenterContainer>
    );
}
