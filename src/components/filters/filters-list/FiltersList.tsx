import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { damageTypes, guardTypes, rarityIdentityTypes, sinnerTypes, sinTypes } from "../../../constants/skillBasedTypes";
import { rarityEGOType } from "../../../constants/types";
import { FiltersSection } from "../filters-section/FiltersSection";

export const FiltersList:React.FC = () => {
    const {t} = useTranslation();
    const location = useLocation().pathname;
    const params = new URLSearchParams(useLocation().search);
    const paramsType = params.get("type");
    const egosMap:Array<{rarity:rarityEGOType;glyph:string}> = [
        {
            rarity:"ZAYIN",
            glyph:"ז",
        },
        {
            rarity:"TETH",
            glyph:"ו",
        },
        {
            rarity:"HE",
            glyph:"ה",
        },
        {
            rarity:"WAW",
            glyph:"ℵ",
        },
        {
            rarity:"ALEPH",
            glyph:"ט",
        },
        
    ];
    const filters = [
        {
            type:"sin" ,
            imgsFolder:"sins",
            imgExtension:".png",
            data:sinTypes,
            visible:true,
            header:t("FiltersList.header.sin")
        },
        {
            type:"dmgType" ,
            imgsFolder:"dmg-type",
            imgExtension:".png",
            data:damageTypes,
            visible:true,
            header:t("FiltersList.header.dmgType")

        },
        {
            type:"guardType" ,
            imgsFolder:"guard-type",
            imgExtension:".png",
            data:guardTypes,
            header:t("FiltersList.header.guardType"),
            visible:paramsType === "identities"||paramsType === "passives"||location.includes("/teambuilder")||location.includes("/identities")

        },
        {
            type:"rarityIdentity" ,
            imgsFolder:"id-rarity",
            imgExtension:".png",
            data:rarityIdentityTypes,
            header:t("FiltersList.header.rarity"),
            visible:paramsType === "passives"||paramsType === "identities"||location.includes("/teambuilder")||location.includes("/identities")

        },
        {
            type:"rarityEGO",
            imgsFolder:null,
            imgExtension:"",
            data:egosMap,
            header:t("FiltersList.header.dangerLvl"),
            visible:paramsType === "ego"||location.includes("/teambuilder")||location.includes("/ego")

        },
        {
            type:"sinner" ,
            imgsFolder:"sinners-icons",
            imgExtension:".webp",
            data:sinnerTypes,
            header:t("FiltersList.header.sinner"),
            visible:true

        },
       
       
    ];
    return<>
    {filters.map((filter,index)=>{
        if(!filter.visible) return null
        return  <FiltersSection key={index} filter={filter}/>
    })
    }
    </> 
}