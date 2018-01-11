const api = "http://numbersapi.com"

const headers = {
  'Accept': 'application/json'
  
}

export const getFamousEvent = (month,day) =>
  fetch(`${api}/${month}/${day}`, )
    .then(res => res.text())
   
  
    

