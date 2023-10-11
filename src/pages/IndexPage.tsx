import React from "react";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { LeftMenu } from "../components/left-menu/LeftMenu";

export const IndexPage:React.FC = () => {
    
    return  <>
        <LeftMenu/>
        <DisclaimerBanner/>
        <main className={"global-content-wrapper"}>
            
        </main>
    </>
}
