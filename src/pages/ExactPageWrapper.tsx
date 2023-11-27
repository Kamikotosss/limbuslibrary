import React, {useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface IExactPageWrapperProps {
    children:React.ReactElement,
    path:string
}
export const ExactPageWrapper:React.FC<IExactPageWrapperProps> = ({children,path}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    useEffect(()=>{
        const currPathArr = pathname.split("/");
        if(currPathArr.length !== path.split("/").length){
            if(pathname.at(-1) === "/")
            navigate(pathname.substring(0,pathname.length-1));
            else
            navigate("/");
            
        } 
    },[])
    return children;
}
