import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import "./EventsSection.css"
export const EventsSection: React.FC = () => {
    const {t} = useTranslation();
    const events = [
        {
            startDate:new Date('November 23, 2023 12:00:00 GMT+09:00'),
            endDate:new Date('December 07, 2023 9:59:00 GMT+09:00'),
            name:"",
            imgSrc:`${process.env.PUBLIC_URL}/images/banner10.png`
        },
        {
            startDate:new Date('November 16, 2023 12:00:00 GMT+09:00'),
            endDate:new Date('November 30, 2023 9:59:00 GMT+09:00'),
            name:"",
            imgSrc:`${process.env.PUBLIC_URL}/images/ban2342.webp`
        },
        {
            startDate:new Date('November 16, 2023 12:00:00 GMT+09:00'),
            endDate:new Date('November 30, 2023 9:59:00 GMT+09:00'),
            name:"",
            imgSrc:`${process.env.PUBLIC_URL}/images/ban3.webp`
        },
        {
            startDate:new Date('November 16, 2023 12:00:00 GMT+09:00'),
            endDate:new Date('March 14, 2024 05:59:59 GMT+09:00'),
            name:"",
            imgSrc:`${process.env.PUBLIC_URL}/images/bps3.webp`
        },
       
    ]
    const EventSector:React.FC<{event:{startDate:Date ,endDate:Date,name:string,imgSrc:string}}> = ({event}) =>{
    const [date,setDate] = useState<null|Date>(null);
    const containerRef = useRef(null);
    const {isVisible} = useIntersectionObserver(containerRef,0.1);
    const displayDateAndTimezone = () =>{
        const currentDate = new Date();
        setDate(currentDate)
    }
    const handleTimeDifference = (startDate:Date ,endDate:Date) =>{
        const currentDate = new Date();
        let difference = startDate.getTime() - currentDate.getTime();
        let info =  t("EventsSection.eventStarts");
        if(difference <= 0){
            difference = endDate.getTime() - currentDate.getTime();
            info = t("EventsSection.eventEnds");
        }
        const millisecondsInOneDay = 86_400_000;
        const deltaDays = difference/millisecondsInOneDay;
        const deltaHours = deltaDays%1*24;
        const deltaMinutes = deltaHours%1*60;
        const deltaSeconds = deltaMinutes%1*60;
        if (difference < 0) return <span> {t("EventsSection.eventEnded")}</span>
        return <span>
            {info} <br></br> {`${Math.trunc(deltaDays)} ${t("EventsSection.d")}. ${Math.trunc(deltaHours)} ${t("EventsSection.h")}. ${Math.trunc(deltaMinutes)} ${t("EventsSection.m")}. ${Math.trunc(deltaSeconds)} ${t("EventsSection.s")}.`} 
        </span>
    }

    useEffect(()=>{
        const timeInterval = setInterval(displayDateAndTimezone, 1000);
        return () => {
            clearInterval(timeInterval);
        }
    },[]);
    return <article ref={containerRef} className={`event-sector ${isVisible && "event-sector--animated"}`}>
        {handleTimeDifference(event.startDate, event.endDate)}
        <img src={event.imgSrc} alt={event.name} />
    </article>
    }
    return <section className="events-section">
        <h2> {t("EventsSection.header")} </h2>
        {events.map((event, index) => {
            return <EventSector  key={index} event={event}/>
        })}
    </section>
}