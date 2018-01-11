
export const isLeapYear= (year, startOrEnd) =>
{

 const yearIsLeapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year  % 400 === 0) ?  ' is a' : ' is not a'
 

 return `${startOrEnd} ${year} ${yearIsLeapYear} leap year! `
}
 
  
