This site is available on [gll-fun.com](https://gll-fun.com)
Example of creation a description for skills and passives
``` javascript
const conditionsMap = {
  "[onhit]": "[On Hit] ",
  "[clashwin]": "[On Clash Victory] ",
  "[combatstart]": "[Combat Start] ",
  "[clashlose]": "[On Clash Defeat] ",
  "[onuse]": "[On Use] ",
  "[onkill]": "[On Kill] ",
  "[onevade]": "[On Evade] ",
  "[headshit]": "[Heads Coin Flip] ",
  "[hitafterclashwin]": "[Hit After Clash Victory] ",
  "[afterattack]": "[After Attack] ",
  "[beforeattack]": "[Before Attack] ",
  "[reuse-headshit]": "[Reuse - Heads Coin Flip] ",
  "[tailshit]": "[Tails Coin Flip] ",
  "[oncrit]": "[On Critical Hit] ",
  "[indiscriminate]": "[Indiscriminate] ",
  "[headsattackend]": "[Attack Ends with Heads Coin Flip] ",
  "[tailsattackend]": "[Attack Ends without Coin Flip] ",
  "[failedkill]": "[Failed to Kill] ",
  "[critattackend]": "[Attack Ends with Critical Hit] ",
};

const coinsConditionsMap:{
  [key:string]:string;
} = {
  "fc" : "Final Coin",
  "bc" : "Base Coin",
  "cg" : "Coin Growth",
  "cp" : "Clash Power",
}
const coinsConditionsFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
  let keyVal = "";
  let numberVal = "";
  for (let i = 0 ; i < value.length; i++ ){ 
      const currChar = value[i];
      if(isNaN(+currChar) && !(["-","+"].includes(currChar)))  keyVal += currChar;
      else if (currChar !== " ") numberVal += currChar;
  }
  keyVal = keyVal.toLowerCase();
  return <React.Fragment key={result.length}>
  <span className={`coins-coditions coins-coditions--${keyVal}`}>
      {numberVal} 
      {t(`SkillCoinDescription.${keyVal}`)}
  </span>
  </React.Fragment>
}
const coinFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
  if(isNaN(+value)) return value;
  return <React.Fragment key={result.length}>
  {!!result.length && <br/> }
  <img className="coin" src={`${process.env.PUBLIC_URL}/images/general/coin${value}.png`} alt="coinN"/>
  </React.Fragment>
}
const conditionFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
  const valueAsKey = value.toLowerCase().replace(/\s/g, '');

  const isCloseToCoin = tracked.coinIndex + 1 === tracked.index;

  if( valueAsKey in coditionsMap) 
  return <React.Fragment key={result.length}>
  {(!isCloseToCoin && !!result.length) && <br/>}
  <span className={`condition condition--${valueAsKey.substr(1,valueAsKey.length-2)}`}>
      { t(`SkillCoinDescription.${valueAsKey}`)}
  </span>
  </React.Fragment>
  return "";
}
const tagFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
  const status = statuses.find( s => s.id === value);
  if(!status) return value;
  
  const descriptionKey = `description${i18n.language.toUpperCase()}` as keyof typeof status;
  const description = status[descriptionKey] as string;

  const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
  const name = status[nameKey] as string;

  const imgHTML = <img className="status" src={`${process.env.PUBLIC_URL}/images/tags/${value}.webp`} alt={value} />;
  const mobileModalHTML = <TooltipMobile image={imgHTML} header={name} text={description}/>
  return <React.Fragment key={result.length}>
  {imgHTML}
  <span onClick={()=>{setMobileModalTrigger(
      dispatch,
      mobileModalHTML
  );}} className={`status-name status-name--${value} tooltip-container tooltip--status`}>
      {name}
      <span className="entityFullInfo-tooltip tooltip-container--status">
          {t("SkillCoinDescription.clickToSeeDescription")}
      </span>
  </span>
  </React.Fragment> 
}
const weightFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
  const [growth , maxCount] = value.split(",");
  const maxCountToNumber = Number(maxCount);
  return <span className="description-weight">
      {Math.sign(+growth) === -1 ? growth : `+${growth}`} {t("SkillCoinDescription.weigth")} 
      {!isNaN(maxCountToNumber) ? ` (Mакс. ${maxCountToNumber})` : ""}
  </span>
}
const specialsMap = {
  "@":coinFunc,
  "$":conditionFunc,
  "#":tagFunc,
  "&":coinsConditionsFunc,
  "?":weightFunc,
}

const  createDescriptionDangerousHTML = (str:string) =>{
  if(!str) return "";
  let result:React.ReactNode[] = [];
  let tracked = {value:"",index:-1,coinIndex:0};
  for(let i = 0 ; i < str.length;i++){
      const currentChar = str[i];
      if(currentChar === "@") tracked.coinIndex = i;
      if(currentChar in specialsMap){
          if(currentChar === tracked.value){
              const variableVal = str.substring(tracked.index + 1, i);
              const func = specialsMap[currentChar as keyof typeof specialsMap];
              const textVal = func(variableVal,result,tracked);
              if(textVal !== "") result.push(textVal);
              tracked = {...tracked, value:"",index:i};
          }else{
              const textVal = str.substring(tracked.index + 1, i)
              if(tracked.value !=="@" && textVal !== ""){
                  const textValSpecial = textVal.replaceAll("%",`<span class="perCent-special-font">%</span>`);
                  result.push(<span key={result.length} dangerouslySetInnerHTML={{__html:textValSpecial}}/>);
              }
              tracked = {...tracked, value:currentChar,index:i};
          }
      }
  }
  const textVal = str.substring(tracked.index + 1, str.length);
  if(textVal !== ""){
      const textValSpecial = textVal.replaceAll("%",`<span class="perCent-special-font">%</span>`);
      result.push(<span key={result.length} dangerouslySetInnerHTML={{__html:textValSpecial}}/>);
  }
  return result;
}

```
