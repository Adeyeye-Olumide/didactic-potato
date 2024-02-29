import {Calendar} from './calandar.js'

import { CalendarHols } from './calendarHols.js'



function getData(data){
    
    this.allDays.forEach((td,i)=> {
        td.setAttribute("data-value", "None")
        if(td.textContent && td.className){
            let day = td.textContent.padStart(2,"0")

            let year = this._selectedYear?
            this._selectedYear.textContent: this._presentYear.textContent

            let monthIndex = this.months.indexOf(td.closest(".month")
            .previousElementSibling.textContent)+1

            

            let dateFormat = `${year}-${monthIndex.toString().padStart(2,"0")}-${day}`

            data.forEach(holiday=>{
                if(holiday.date== dateFormat){
                    td.dataset.value = holiday.name
                    td.classList.add("pubhols")
                }
            })
        }
    })

}



const calendarHols = new CalendarHols()


class CalendarView extends Calendar {
    _boxElement = document.querySelector(".box")
    dateTarget
    allDays 

    constructor(){
        super()
        this.clicker()
        this.createMonth()
        this.deleteMarkup()
        this.renderviewHols()
        this.retrieveData()
        this.renderbox()
        this.changeToCurrentYear()
        
        
    }


    async renderviewHols(year = "2023"){
        

        this.allDays = this._parentElement.querySelectorAll('td')
        calendarHols.getHoliday(year, getData.bind(this))

       
    

       
    }

   
    renderbox(){
        this._parentElement.addEventListener("click", e=> {

            if(e.target.hasAttributes("class") && +e.target.textContent){
                this.dateTarget = e.target

                if(!this.dateTarget.id) this.dateTarget.setAttribute("Id", "")

                console.log(this.dateTarget)
                this._boxElement.classList.remove("hidden")

                this._boxElement.querySelector(".date").textContent = 
                `Date: ${e.target.className.split(" ")[0]}, ${'\u00A0'}${e.target.closest(".month")
                .previousElementSibling.textContent}
                ${'\u00A0'}${e.target.textContent}`


                this._boxElement.querySelector(".holiday").textContent = `Holiday: ${e.target.dataset.value}`



                
                this._boxElement.querySelector(".birthday")
                .textContent = !this.dateTarget.id?`Birthday: None`:`Birthday: ${this.dateTarget.id}`

                if(!this.dateTarget.id || this.dateTarget.id==""){
                    this._boxElement.querySelector(".birthday")
                    .textContent = `Birthday: None`
                }

                else {
                    this._boxElement.querySelector(".birthday")
                    .textContent = `Birthday: ${this.dateTarget.id}`
                }




                this._boxElement.addEventListener("click", e=> {
                    
                    if (e.target.classList.contains("close")){
                        this._boxElement.classList.add("hidden")

                    }

                    if (e.target.classList.contains("menu")){
                        this._boxElement.querySelector(".form").classList.remove("hidden")

                        this._boxElement.querySelector(".form")
                        .addEventListener("submit", this.boxElementFormHandler.bind(this._boxElement))
                        
                    }

                    if (e.target.classList.contains("trash")) this.deleteData()
                })

            }

        })
        
    }

    boxElementFormHandler(e){
        e.preventDefault()

        console.log(e.target)
        console.log(calendarView.dateTarget)

        let inputValue = this.querySelector("input").value

        calendarView.dateTarget.classList.add("birth")

        if(!inputValue) return

        calendarView.dateTarget.id == ""? calendarView.dateTarget.id = inputValue: undefined

        
        this.querySelector(".birthday").textContent = 
        `Birthday: ${calendarView.dateTarget.id}`


        let item = {
            day: calendarView.dateTarget.textContent,

            month: calendarView.dateTarget.closest(".month")
            .previousElementSibling.textContent,

            occasion: inputValue
        }
        let storedValue = []

        calendarView.storeData(storedValue, item)

        console.log(calendarView.dateTarget)




    

        this.querySelector("input").value = ''
        this.querySelector(".form").classList.add("hidden")

        this.removeEventListener("submit", calendarView.boxElementHandler)
        


    }

    retrieveData(){
        let data = localStorage.getItem("birthday")
        const allDays  = this._parentElement.querySelectorAll("td")
        console.log(data)
        if(data){
            let dataArray = JSON.parse(data)
            console.log(dataArray)
            allDays.forEach((day,i)=> {

                dataArray.forEach(item=> {
                    if(day.textContent == item.day && day.closest(".month")
                    .previousElementSibling.textContent== item.month){
                    day.classList.add("birth")

                    day.setAttribute("Id", item.occasion)
                }

                })
                
                

            })

        }
    }

    storeData(storedValue, item){
        let data = JSON.parse(localStorage.getItem("birthday"))
        console.log(data)

        
        if (data){
            let condition = data.some(d=> d.day==item.day 
                && d.month == item.month 
                && d.occasion == item.occasion)

            if(condition) return

            data.push(item)

            localStorage.setItem("birthday", JSON.stringify(data))
            console.log(data)

        }

        else{
            storedValue.push(item)
            localStorage.setItem("birthday", JSON.stringify(storedValue))

        }

    }

    deleteData(){

        let data = JSON.parse(localStorage.getItem("birthday")) 

        if(data){
            
            data = data.filter(item=> item.day != this.dateTarget.textContent 
            && item.month!= this.dateTarget.closest(".month")
            .previousElementSibling.textContent)

           

            this._boxElement.querySelector(".birthday")
            .textContent = `Birthday: None`

            this.dateTarget.id = ''

            this.dateTarget.classList.remove("birth")



            localStorage.setItem("birthday", JSON.stringify(data))




        }

        

        

    }

    

    clicker(){
        
        this._presentYear = this._headerContainer.querySelector(".centre")


        
        this._headerContainer.addEventListener("click", (e)=> {
            this.clickerLogic(e.target.closest(".arrow"))

            console.log(document.querySelectorAll('.arrow')[1], e.target.closest(".arrow"))
            

            
        })

       
    }

    clickerLogic(arrow = ''){

        this._presentYear = this._headerContainer.querySelector(".centre")
            // let arrow = e.target.closest(".arrow")
            this._selectedYear = document.createElement("h1")

            
            
            console.log(this._presentYear, arrow)
            if (!arrow) return

            this._yearContainer.appendChild(this._selectedYear)
            if (arrow.classList.contains("front")){
                console.log(arrow, 'hello')
                this._selectedYear.textContent = +this._presentYear.textContent + 1
                this.yearChangeFunc("left")
                this.clearUi() 
                // if(this._selectedYear.textContent == "2023"){
                //     return location.reload()

                // }
                this.createMonth()
                // this.renderviewHols(this._selectedYear.textContent)
                // this.retrieveData()
                // this.renderbox()

               
               
            }

            else {
                this._selectedYear.textContent = +this._presentYear.textContent - 1
                this.yearChangeFunc("right")
                this.clearUi()
                // if(this._selectedYear.textContent == "2023" && this){
                //     return location.reload()

                // }


                this.createMonth('next')
                
                
                //this.createMonth()
            }

            this.renderviewHols(this._selectedYear.textContent)
            this.retrieveData()
            this.renderbox()
                

            return +this._selectedYear.textContent


    }

    changeToCurrentYear(){
        // if (+this._selectedYear.textContent < 2024) return
        while (+this._presentYear.textContent  != new Date().getFullYear()) {

            this._presentYear.textContent = this.clickerLogic(document.querySelectorAll('.arrow')[1])
            
        }
    }

    
    yearChangeFunc(className =""){
        this._presentYear.classList.remove("centre")
        this._presentYear.classList.add(className)

        this._selectedYear.classList.add("year")
        this._selectedYear.classList.add("centre")
    }

    
    createMonth(className = ''){
        let months
        !className? months = this.months: months = [...this.months].reverse()
        months.forEach(month=> {
            // if(month == "January"&& !this._selectedYear) return

            //else this._parentElement.innerHTML = '
            // if(month != "January" || +this._selectedYear.textContent != 2023){
            //     console.log(this._selectedYear?.textContent)
            //     let str

            //     !className? str = "beforeend": str = "afterbegin"

            //     this._monthContainer.insertAdjacentHTML(str, this.returnMarkup(month))

            //     !className? this.fillMonthNextYear(month): this.fillMonthPrevYear(month, months)
            //     this.deleteMarkup()
            // }


            let str

            !className? str = "beforeend": str = "afterbegin"

            this._monthContainer.insertAdjacentHTML(str, this.returnMarkup(month))

            !className? this.fillMonthNextYear(month): this.fillMonthPrevYear(month, months)
            this.deleteMarkup()
            
            
            
        })

            

            
    }

    returnMarkup(month){
        return`
        <div class="month-container">
        <table class="month ${month}">
                <div class="month-heading"><h2>${month}</h2></div>
                <tr class="days">
                <td>Sun</td >
                <td>Mon</td>
                <td>Tues</td>
                <td>Wed</td>
                <td>Thur</td>
                <td>Fri</td>
                <td>Sat</td>
            </tr>
            <tr class="dates">
                <td class="Sun"></td>
                <td class="Mon"></td>
                <td class="Tues"></td>
                <td class="Wed"></td>
                <td class="Thur"></td>
                <td class="Fri"></td>
                <td class="Sat"></td>
            </tr>
            <tr class="dates">
                <td class="Sun"></td>
                <td class="Mon"></td>
                <td class="Tues"></td>
                <td class="Wed"></td>
                <td class="Thur"></td>
                <td class="Fri"></td>
                <td class="Sat"></td>
            </tr>

            <tr class="dates">
                <td class="Sun"></td>
                <td class="Mon"></td>
                <td class="Tues"></td>
                <td class="Wed"></td>
                <td class="Thur"></td>
                <td class="Fri"></td>
                <td class="Sat"></td>
            </tr>

            <tr class="dates">
                <td class="Sun"></td>
                <td class="Mon"></td>
                <td class="Tues"></td>
                <td class="Wed"></td>
                <td class="Thur"></td>
                <td class="Fri"></td>
                <td class="Sat"></td>
            </tr>

            <tr class="dates">
                <td class="Sun"></td>
                <td class="Mon"></td>
                <td class="Tues"></td>
                <td class="Wed"></td>
                <td class="Thur"></td>
                <td class="Fri"></td>
                <td class="Sat"></td>
            </tr>
            </table>
            </div>`
    }

    
    addMarkUp(month, arr, className = ''){
        let markup = `
        <td class="Sun"></td>
        <td class="Mon"></td>
        <td class="Tues"></td>
        <td class="Wed"></td>
        <td class="Thur"></td>
        <td class="Fri"></td>
        <td class="Sat"></td>
        `
        let monthEl = this._parentElement.querySelector(`.${month}`)

        let tr = document.createElement("tr")
        tr.classList.add("dates")
        tr.setAttribute("id", "Id")
        tr.innerHTML = markup

        if (className){
            let firstEl = monthEl.children[0].children[1]
            let list = [...tr.querySelectorAll("td")]
            
            firstEl.parentElement.insertBefore(tr, firstEl)
            list.reverse().forEach((td)=>arr.unshift(td))
        }

        else {
            monthEl.children[0].appendChild(tr)
            tr.querySelectorAll("td").forEach(td=>arr.push(td))
        }

    }

    deleteMarkup(){
        let element = this._parentElement.querySelectorAll("tr")

        element.forEach(tr=> {
            let list = [...tr.children].every(item=>!item.textContent)
            if(list) tr.classList.add("hide")
        })
    }

    
    clearUi(){
        console.log("work")
        // this._parentElement
        // .querySelectorAll(".month-container").forEach(el=> el.innerHTML = '')

        this._parentElement.querySelector(".all-months").innerHTML = ''
    }


}

const calendarView = new CalendarView()
