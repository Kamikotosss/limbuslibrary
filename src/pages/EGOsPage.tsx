import React from "react";
import { useTranslation } from "react-i18next";
import { Filters } from "../components/filters/Filters";
import { H1Component } from "../components/h1-component/H1Component";
import { ListEgo } from "../components/list-ego/ListEgo";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { SEOHelmet } from "./SEOHelmet";

export const EGOsPage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout>
        <LoadingPageWrapper queryKeys={["ego","statuses"]}>
            <SEOHelmet titleText={t("EGOsPage.title") + " | Great Limbus Library"} descriptionText=""/>
            <H1Component header={t("EGOsPage.header")}/>
            <Filters/>
            <ListEgo/>
        </LoadingPageWrapper>
    </CommonPageLayout> 
}
