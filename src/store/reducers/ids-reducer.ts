import { dmgType, guardType, sinType } from "../../constants/types";


export interface IdentityInterface{
    imgUrl:string,
    sinner:string,

    nameRU:string,
    nameEN:string,

    rarity:string,
    season:number,
    hp:number,
    hpStun:number[],
    speed:string,
    defence:number,
    sin1:sinType,
    sin2:sinType,
    sin3:sinType,
    sinGuard:sinType,
    dmgType1:dmgType,
    dmgType2:dmgType,
    dmgType3:dmgType,
    guardType:guardType,
    basicCoin:number[],
    growthPerCoin:number[],
    maxCoinValue:number[],
    damage:number[],

    nameSkillRU:string[],
    nameSkillEN:string[],

    countCoin:number[],
    weightCoin:number[],

    descriptionCoinEN:string,
    descriptionCoinRU:string,

    idTier:string,
    passive1Tier:string,
    passive2Tier:string,

    namePassiveRU:string[],
    namePassiveEN:string[],

    sinPassive1:string,
    countPassive1:number,
    sinPassive2:string,
    countPassive2:number,
    passive1Condition:string,
    passive2Condition:string,

    descriptionPassive1RU:string,
    descriptionPassive2RU:string,
    descriptionPassive1EN:string,
    descriptionPassive2EN:string,

    slash:string,
    pierce:string,
    blunt:string,
    releaseDate:number,
    minPossibleDmg:string[],
    maxPossibleDmg:string[],
    isNew:string
}

export enum IdsActionTypes {
    FETCH_IDS = "FETCH_IDS",
    FETCH_IDS_SUCCESS = "FETCH_IDS_SUCCESS",
    FETCH_IDS_ERROR = "FETCH_IDS_ERROR",
}
export interface IdsState {
    ids:null|Array<IdentityInterface>;
    loading:boolean;
    error: null|string;
}

export interface FetchIdsAction {
    type: IdsActionTypes.FETCH_IDS;
}
export interface FetchIdsActionSuccess {
    type: IdsActionTypes.FETCH_IDS_SUCCESS;
    payload: Array<IdentityInterface>;
}
export interface FetchIdsActionError {
    type: IdsActionTypes.FETCH_IDS_ERROR;
    payload: string;

}
export type IdsAction = FetchIdsAction | FetchIdsActionError | FetchIdsActionSuccess ;

const initialState : IdsState = {
    ids:null,
    loading:false,
    error: null
}

export const idsReducer = (state = initialState,action : IdsAction):IdsState =>{
    switch(action.type){
        case IdsActionTypes.FETCH_IDS:
            return {loading: true , error: null ,ids:null }
        case IdsActionTypes.FETCH_IDS_SUCCESS:
            return {loading: false , error: null ,ids: action.payload}
        case IdsActionTypes.FETCH_IDS_ERROR:
            return {loading: false , error: action.payload ,ids:null} 
        default: 
            return state
    }
}

//export const fetchIdsAction = (payload) => ({type:IdsActionTypes.FETCH_IDS,payload});

