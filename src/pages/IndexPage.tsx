import React from "react";
import { MainInfo } from "../components/main-info/MainInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { SEOHelmet } from "./SEOHelmet";

export const IndexPage:React.FC = () => {
    return  <CommonPageLayout>
        <LoadingPageWrapper queryKeys={["ego","identities","statuses"]}>
            <SEOHelmet titleText={"Great Limbus Library"} descriptionText=""/>
            <MainInfo/>
        </LoadingPageWrapper>
</CommonPageLayout> 
}
