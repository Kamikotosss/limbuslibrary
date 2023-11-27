import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { filterResetAllAction } from "../../store/reducers/filter-reducer";
import { setMobileModalTrigger } from "../../store/reducers/mobile-modal-reducer";
import { Search } from "../search/Search";
import { ClearFilterSVG } from "../svg/ClearFilterSVG";
import { FilterSVG } from "../svg/FilterSVG";
import { FiltersList } from "./filters-list/FiltersList";
import { FiltersSection2 } from "./filters-section2/FiltersSection2";
import "./Filters.css";

export const Filters:React.FC = () => {
    const location =useLocation().pathname;
    const dispatch = useDispatch();
    const {t} = useTranslation();
    return (
        <section className={"filters"}>
            <header className="filters-main-header">{t("Filters.header")} </header>
                <FiltersList/>
                <button onClick={()=>{setMobileModalTrigger(dispatch,
                    <div className="filters-modal-wrapper">
                    <FiltersList/>
                    <FiltersSection2/>
                    </div>)}} className="show-filters btn-filters"><FilterSVG/>{t("Filters.showFilters")} </button>
                <button onClick={()=>filterResetAllAction(dispatch)} className="clear-filters btn-filters"><ClearFilterSVG/>{t("Filters.clearFilters")} </button>
                {!location.includes("/teambuilder") && <Search/>}
                <FiltersSection2/>
        </section>
    )
}
