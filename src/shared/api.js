export const getData=()=>{
    fetch('api/config.json', {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
    
        })
        .then((response) => response.json())
        .then((config) => {})
    }