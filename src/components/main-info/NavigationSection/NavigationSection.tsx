import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver"
import { ArrowsRightNavigateSVG } from "../../svg/ArrowsRightNavigate"
import "./NavigationSection.css"
export const NavigationSection: React.FC = () => {
    const { t } =  useTranslation();
    const quickStartLinks = [
        {
            text:t("NavigationSection.teambuilder"),
            to:"/teambuilder"
        },
        {
            text:t("NavigationSection.identities"),
            to:"/identities"
        },
        {
            text:t("NavigationSection.ego"),
            to:"/ego"
        },
        {
            text:t("NavigationSection.statuses"),
            to:"/statuses"
        },
        {
            text:t("NavigationSection.tierlist"),
            to:"/tierlist/identities"
        },
    ]
    const NavLink:React.FC<{to:string,text:string}> = ({to,text}) =>{
        const containerRef = useRef(null);
        const {isVisible} = useIntersectionObserver(containerRef,0.1)
        return<li> 
        <Link to={to} ref={containerRef} className={`nav-link ${isVisible && "nav-link--animated"}`}>
            {text}
            <ArrowsRightNavigateSVG />
        </Link>
    </li>
    }
    return <section className="navigation-section">
        <h2> {t("NavigationSection.header")} </h2>
        <ul>
            {quickStartLinks.map((link, index) => {
                return <NavLink key={index} to={link.to} text={link.text}/>
            })}
        </ul>
    </section>
}