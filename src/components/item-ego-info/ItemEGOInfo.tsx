import React from "react";
import { sinTypes } from "../../constants/skillBasedTypes";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import "./ItemEGOInfo.css";
interface ItemEGOInfoInterface{
    entity:EGOInterface;
}
export const ItemEGOInfo:React.FC<ItemEGOInfoInterface> = ({entity}) => {
    const {egoTier,sanity,dmgType,egoRes} = entity;
    return (
        <div  className={`item-entity-info-container`} >
             <div className={"item-ego-info-skills"}>
                <div className="item-ego-info-sin">
                    <img src={`./images/sanity.png`} alt="sanity"/>
                    {sanity}
                </div>
                <div  className="item-ego-info-sin">
                    <img  src={`./images/dmg-type/${dmgType}.png`} alt={dmgType}/>
                    <div className={["item-ego-info-line", `${egoRes}-sin-color`].join(" ")}/>
                </div>
           </div>

            <div className={"item-ego-info-skills"}>
                {sinTypes.map((sin)=>{
                    if(!entity[sin]) return null
                    return (
                        <div key={`${sin}`} className="item-ego-info-sin">
                            <img src={`./images/sins/${sin}.png`} alt={sin}/>
                            {"x"+entity[sin]}
                            <div className={["item-ego-info-line", `${sin}-sin-color`].join(" ")}/>
                        </div>
                    )
                })}
           </div>
          
           <span className={["item-ego-info-tier-rank", `item-ego-info-tier-rank--${egoTier}`].join(" ")} >{egoTier}</span>
            <div className={"item-ego-info-arrow"}/>
        </div>
    )
}