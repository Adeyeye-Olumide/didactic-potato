import { Calendar } from "./calandar.js"



const api_key = "151e7e7b6f7149f981a236ba08116287"



export class CalendarHols extends Calendar{
    api_key = "151e7e7b6f7149f981a236ba08116287"
   

   

    constructor(){
        super()
        

    }

    async getHoliday(year= "2023", func){

        const api_key = '2591ea6278e824b4fbbf6d3736ee6120'
        
        navigator.geolocation.getCurrentPosition(async (pos)=> {
           

            const {latitude: lat, longitude: lon} = pos.coords

            

            const request1 = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${api_key}`)
            if(!request1.ok) throw new Error("Connection not established")
            const response = await request1.json()
            
            const countryCode = response[0].country

            const request2 = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
            if(!request2.ok) throw new Error("Connection not established")
            const data = await request2.json()

            console.log(data)

           func(data)
            
                
           
            
            
        }, err => reject(err))

    
        

        
    }

    // async returnCountryCode(latLong){
    //     const api_key = '2591ea6278e824b4fbbf6d3736ee6120'
    //     const {latitude: lat, longitude: lon} = latLong

    //     try {

    //         const request = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${api_key}`)
    //         const response = await request.json()
    //         console.log(response[0].country)
            
    //     } 
        
    //     catch (error) {
            
    //     }
    // }

    // async getHoliday(year= "2023"){
    //     console.log(year)

       


    //     try {
    //         const request = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/DE`)
    //         if(!request.ok) throw new Error("Connection not established")
    //         const data = await request.json()

    //         console.log(year)

    //         return data


            
    //     } 
    //     catch (error) {
    //         throw error.message
    //     }
        
    // }
}



