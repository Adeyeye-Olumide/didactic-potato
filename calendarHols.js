import { Calendar } from "./calandar.js"
const api_key = "151e7e7b6f7149f981a236ba08116287"



export class CalendarHols extends Calendar{
    api_key = "151e7e7b6f7149f981a236ba08116287"

    constructor(){
        super()

    }

    async getHoliday(year= "2023"){
        console.log(year)
        try {
            const request = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/NG`)
            if(!request.ok) throw new Error("Connection not established")
            const data = await request.json()

            console.log(year)

            return data


            
        } 
        catch (error) {
            throw error.message
        }
        
    }
}



