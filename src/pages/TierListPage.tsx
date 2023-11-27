import React, { useEffect, useTransition } from "react";
import { TierList } from "../components/tier-list/TierList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TierListNav } from "../components/tier-list-nav/TierListNav";
import { Filters } from "../components/filters/Filters";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { useTranslation } from "react-i18next";
import { H1Component } from "../components/h1-component/H1Component";
import { SEOHelmet } from "./SEOHelmet";


const getQuaryByParam = (param:string) => {
    if(param === "identities") return ["identities","statuses"];
    if(param === "passives") return ["identities","statuses"];
    return ["ego","statuses"];
}
export const TierListPage:React.FC = () => {
    const location = useLocation();
    const {i18n} = useTranslation();
    const params = useParams();
    const type = params['type'] || "redirect";
    const navigate = useNavigate();
    useEffect(()=>{
        if( !(["identities","ego","passives"].includes(type)))  navigate(`/${i18n.language}/tierlist/identities`);
    },[])
    const queryKeys = getQuaryByParam(type);
    const {t} = useTranslation();
    return <CommonPageLayout>
            <LoadingPageWrapper queryKeys={queryKeys}>
                <SEOHelmet titleText={t("TierListPage.title") + " | Great Limbus Library"} descriptionText=""/>
                <H1Component header={t("TierListPage.header")}/>
                <h2 style={{width:"90%" ,color:"white",marginTop:"-25px",marginBottom:"25px",fontWeight:"500"}}>{t("TierListPage.description")}</h2>
                <TierListNav/>
                <Filters/>
                <TierList/>
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
