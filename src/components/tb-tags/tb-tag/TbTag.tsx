import React, {useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { mobileLayoutFrom } from "../../../constants/mobileLayoutFrom";
import useHover from "../../../hooks/useHover";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { setMobileModalTrigger } from "../../../store/reducers/mobile-modal-reducer";
import {tbResetHoverAction, tbSetHoverAction } from "../../../store/reducers/tb-reducer";
import { TbInfo } from "../../tb-info/TbInfo";
interface TbSinInterface {
    tag:string,
    count:number
}
export const TbTag:React.FC <TbSinInterface> = ({tag,count}) =>{
    const refItem = useRef(null);
    const dispatch = useDispatch();
    const isHovering = useHover(refItem);
    const tbHoverState = useTypedSelector(state => state.tbReducer).hover;
    const slotHoverMatch = () => {
        if(!tbHoverState)return false;
        if(tbHoverState.type === "slot"){
            const {ego,identity} = tbHoverState.trigger;
            if(identity?.status.includes(tag)) return true;
            for(const key in ego) if(ego[key]?.status.includes(tag)) return true;
        }else if (tbHoverState.type === "slot-identity"){
            return tbHoverState.trigger.status.includes(tag);
        }else if (tbHoverState.type === "slot-ego"){
            return tbHoverState.trigger.status.includes(tag);
        }
        return false;
    }
    useEffect(()=>{
        if(isHovering){
            tbSetHoverAction(dispatch,{type:"tag",trigger:tag});
        }
        return ()=> {
            tbResetHoverAction(dispatch);
        } 
    },[isHovering]) 
    const HoverComponent = <TbInfo attribure={tag} type="tags"></TbInfo>;
    const handleClick = () => {
        if(window.innerWidth > mobileLayoutFrom) return;
        if(count !== 0 ) setMobileModalTrigger(dispatch,HoverComponent);
        
    }
    return(
    <div ref={refItem} onClick={()=>handleClick()} className={["tb-tags-tag" ,slotHoverMatch() ? "tb-tags-tag--active" : ""].join(" ")} key={tag}>
        { isHovering && window.innerWidth > mobileLayoutFrom && HoverComponent}
        <img src={`./images/tags/${tag}.png`} className="tb-sins-img" alt={tag}></img>
        <span>x{count}</span>
    </div>
    )
}
