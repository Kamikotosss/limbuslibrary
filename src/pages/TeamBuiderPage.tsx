import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { H1Component } from "../components/h1-component/H1Component";
import { TbModal } from "../components/tb-modal/TbModal";
import { TbSins } from "../components/tb-sins/TbSins";
import { TbSlots } from "../components/tb-slots/TbSlots";
import { TbTags } from "../components/tb-tags/TbTags";
import { tbResetAllAction } from "../store/reducers/tb-reducer";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { SEOHelmet } from "./SEOHelmet";

export const TeamBuilderPage:React.FC = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    useEffect(() => {
        return ()=>{
            tbResetAllAction(dispatch);
        }
    }, []);
   
    return  <CommonPageLayout >
        <LoadingPageWrapper queryKeys={["ego","identities","statuses"]}>
                <SEOHelmet titleText={t("TeamBuilderPage.title") + " | Great Limbus Library"} descriptionText=""/>
                <H1Component header={t("TeamBuilderPage.header")}/>
                <TbSlots/>
                <TbSins/>
                <TbTags/>
        </LoadingPageWrapper>
    </CommonPageLayout> 
}
