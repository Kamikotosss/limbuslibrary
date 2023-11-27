import React from 'react';
import { useTranslation } from 'react-i18next';
import { dmgType, guardType, sinType } from '../../../constants/types';
import { EGOInterface } from '../../../store/reducers/ego-reducer';
import {  ISkill } from '../entity-full-info-skills/EntityFullInfoSkills';
import { EntityFullInfoPassiveEGO } from './entity-full-info-passive/EntityFullInfoPassive';
import { EntityFullInfoSkillEGO } from './entity-full-info-skill/EntityFullInfoSkill';
interface IEntityFullInfoProps {
    ego:EGOInterface;
}
export const EntityFullInfoSkillsEGO:React.FC<IEntityFullInfoProps> = ({ego}) => {
    const {dmgType,egoSin} =ego;
    const {i18n} = useTranslation();
    const descriptionCoinKey = `descriptionCoin${i18n.language.toUpperCase()}` as keyof typeof ego;
    const descriptionCoin = ego[descriptionCoinKey] as string;

    const skills:ISkill[] = descriptionCoin.includes("|") ? [
        {
            index:0,
            dmgType:dmgType[0] as dmgType,
            sin:egoSin as sinType
        },
        {
            index:1,
            dmgType:(dmgType[1] ? dmgType[1] : dmgType[0] ) as dmgType,
            sin:egoSin as sinType
        }
    ] : [
        {
            index:0,
            dmgType:dmgType[0] as dmgType,
            sin:egoSin as sinType
        }
    ];
    return (
        <section className={`${'entityFullInfo-skills'}`} >
            {
                skills.map(
                    (skill,index)=>{
                        return <EntityFullInfoSkillEGO skill={skill} key={index} ego={ego}/>
                    }
                )
            }
            <EntityFullInfoPassiveEGO  ego={ego}/>
        </section>
    );
};