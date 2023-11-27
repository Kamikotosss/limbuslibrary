import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { TbItem } from "../tb-item/TbItem";

export const TbListIds: React.FC = () => {
    const ids = useQueryClient().getQueryData("identities") as IdentityInterface[]|null;
    const {t,i18n} = useTranslation();
    const {slots,modalTrigger} = useTypedSelector(store => store.tbReducer);
    const filterState = useTypedSelector(store => store.filterReducer);
    const searchState = useTypedSelector(store => store.searchReducer);
    const isSameSinner = (entity:IdentityInterface) => {
        let sinner = entity.sinner;

        for (const key in modalTrigger?.ego) {
            const currEGO = modalTrigger?.ego[key as keyof typeof  modalTrigger.ego];
            if (currEGO) return sinner === currEGO.sinner ;
        }  

        if (modalTrigger?.identity) return sinner === modalTrigger?.identity.sinner 

        return true; 
    }
    const isAvailibleSinner = (entity:IdentityInterface) => {
        let sinner = entity.sinner;
        for(let i =0;i < slots.length;i++){
            let currentSlot = slots[i];
            if(currentSlot === modalTrigger) continue;
            for (const key in currentSlot?.ego) {
                const currEGO = currentSlot?.ego[key];
                if (currEGO){
                    if (currEGO.sinner === sinner) return false;
                    break;
                } 
            }  
            if (currentSlot?.identity?.sinner === sinner) return false;
        }
        return true; 
    }
    const jsxElementsNew:React.ReactNode[] = []
    const jsxElements = ids?.reduceRight((acc:React.ReactNode[] , entity) => {
        if (modalTrigger !== null && !isSameSinner(entity) ) return acc;
        if (!isFilterMatching(filterState,searchState,entity,i18n.language)) return acc;
        if (!isAvailibleSinner(entity)) return acc;
        if (!!(+entity.isNew)){
            jsxElementsNew.push(<TbItem key={entity.imgUrl} entity={entity} />)
            return acc;
        } 
        acc.push(<TbItem key={entity.imgUrl} entity={entity} />)
        return acc;
    },[]);
    return <>
    <span className={"tb-list-header"} > {`${t("TbListIds.header")} (${(jsxElements?.length || 0) + jsxElementsNew.length})`}  </span>
    {
        !!((jsxElements?.length || 0) + jsxElementsNew.length )
        ? <div  className={"tb-list-content"} >
             {jsxElementsNew}
            {jsxElements}
        </div>
        : <p>{t("TbListIds.empty")}</p> 
    }
        
    </>;
};


