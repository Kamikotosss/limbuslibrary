import React from 'react';
import { useTranslation } from 'react-i18next';
import { dmgType, guardType, sinType } from '../../../constants/types';
import { IdentityInterface } from '../../../store/reducers/ids-reducer';
import { EntityFullInfoPassive } from './entity-full-info-passive/EntityFullInfoPassive';
import { EntityFullInfoSkill } from './entity-full-info-skill/EntityFullInfoSkill';
import "./EntityFullInfoSkills.css"
interface IEntityFullInfoProps {
    identity:IdentityInterface;
}
export interface ISkill {
    index:number;
    dmgType:dmgType|guardType;
    sin:sinType;
}
export interface IPassive {
    index:number;
    sin:sinType;
    count:number;
    description:string;
    name:string;
    type:string;
    condition:string;
}
export const EntityFullInfoSkills:React.FC<IEntityFullInfoProps> = ({identity}) => {
    const {t,i18n} = useTranslation();
    const skills:ISkill[] = [0,1,2].map(n=>{
        let k = `sin${n+1}` as keyof typeof identity;
        let k2 = `dmgType${n+1}` as keyof typeof identity;
        return {
            index:n,
            sin:identity[k] as sinType,
            dmgType:identity[k2]as dmgType
        }
    })
    skills.push(
        {
            index:3,
            sin:identity.sinGuard as sinType,
            dmgType:identity.guardType as guardType
        }
    )
    const passives:IPassive[] = [0,1].map((n,index)=>{
        let k = `sinPassive${n+1}` as keyof typeof identity;
        let k2 = `countPassive${n+1}` as keyof typeof identity;
        let k3 = `descriptionPassive${n+1}${i18n.language.toUpperCase()}` as keyof typeof identity;
        let k4 = `passive${n+1}Condition` as keyof typeof identity;
        let k5 = `namePassive${i18n.language.toUpperCase()}` as keyof typeof identity;
        let type = index === 0 ? t("EntityFullInfoSkills.battlePassive") : t("EntityFullInfoSkills.supportPassive") ;
        return {
            index:index,
            sin:identity[k] as sinType,
            count:identity[k2] as number,
            description:identity[k3] as string,
            name:(identity[k5] as string[])[index],
            condition:identity[k4] as string,
            type:type,
        }
    })
    return (
        <section className={`${'entityFullInfo-skills'}`} >
            {
                skills.map(
                    (skill,index)=>{
                        return <EntityFullInfoSkill skill={skill} key={index} identity={identity}/>
                    }
                )
            }
            {
                passives.map(
                    (passive,index)=>{
                        return <EntityFullInfoPassive passive={passive} key={index} identity={identity}/>
                    }
                )
            }
        </section>
    );
};