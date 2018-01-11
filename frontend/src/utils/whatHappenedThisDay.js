import {getFamousEvent} from './API'

export const whatHappenedThisDay = (date) =>{
   
   const month  =  date.getMonth() + 1
   const day =  date.getDate()
 return getFamousEvent(month, day )

}