
const date = new Date()

console.log(date.getTimezoneOffset())


export class Calendar{
    _parentElement = document.querySelector(".container")
    _monthContainer = this._parentElement.querySelector(".all-months")
    _headerContainer = this._parentElement.querySelector(".header-container")
    _yearContainer = this._headerContainer.querySelector(".year-container")

    

    allDays = this._parentElement.querySelectorAll('td')
    _presentYear
    _selectedYear
    filtered
    prevMonth = []

    firstMonthofyear
    lastMonthofyear 

    start = 1
    end = 32
    dates = []
    months = ['January','February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

    numOfdays = 31

    

    
    constructor(){
        
        this.iterator()
        //this.createMonth()
        //this.clicker()
        //this.deleteMarkup()
        
    }
    

    
    print(){
        
    }

    iterator(){
        for(let i=this.start; i<this.end; i++) this.dates.push(i)
    }
    




    fillMonthNextYear(month){
        if(this._selectedYear && month == "January") this.prevMonth = this.lastMonthofyear

        if(!this._selectedYear && month!= "January" || this._selectedYear && month != "January"){
            this.prevMonth = [...this._parentElement
                .querySelector(`.${this.months[this.months.indexOf(month)-1]}`).querySelectorAll("td")]
                .filter((td,i)=> i>28? !td.textContent: '')
                .map(td=> td.className)

        }
       let currMonth = []

       let Month = [...this._parentElement
        .querySelector(`.${month}`)
        .querySelectorAll("td")]
        .filter(td=> td.className)

        Month.forEach((td,i,arr)=> {
            if(i<=6){
                if(this.prevMonth.includes(arr[i].className)){
                    currMonth.push(td)
                }
            }

            else currMonth.push(td)
        })

        //console.log(currMonth)
        
        let a = 0
        this.dates.forEach((mn,i)=>{
            if(!currMonth[i]) return
            currMonth[i].textContent = ''

            if(!currMonth[i].textContent ) a++

        })

        if(a < this.monthDays(month))this.addMarkUp(month, currMonth)



        currMonth.forEach((mn,i)=> {
            if(i >= this.monthDays(month)) return
            currMonth[i].textContent = this.dates[i]
        })
        this.prevYear()

        this.nextYear(month)

        console.log({
            "firstMonth": this.firstMonthofyear,
            "lastMonth": this.lastMonthofyear
            })
        }

    fillMonthPrevYear(month= "December", arr){
        //if (month != "December") return
        console.log(month)
       let currMonth = []
       

       if(+this._selectedYear.textContent < +this._presentYear.textContent && month == "December") this.prevMonth = this.firstMonthofyear

       else if(+this._selectedYear.textContent < +this._presentYear.textContent && month!= "December"){
        this.prevMonth = [...this._parentElement
            .querySelector(`.${arr[arr.indexOf(month)-1]}`).querySelectorAll("td")]
            .filter((td)=> td.className && !td.parentElement.classList.contains("hide"))
            .filter((td,i)=> i<=6? !td.textContent: '')
            .map(td=> td.className)
        }

       //console.log({"prev":this.prevMonth}, {"first":this.firstMonthofyear})

    
       let Month = [...this._parentElement
        .querySelector(`.${month}`)
        .querySelectorAll("td")]
        .filter(td=> td.className)

        Month.forEach((td,i,arr)=> {
            if (this.prevMonth.length == 0) currMonth.push(td)

            else {
                if (i<=28) currMonth.push(td)
                if(i>=29){
                    if(this.prevMonth.includes(td.className)) currMonth.push(td)
                    
                }

            }
        

        })

        //console.log(currMonth)
        let a = 0
        let dates = [...this.dates].sort((a,b)=> b-a).filter(date=> date <= this.monthDays(month))
        

        // this.dates.forEach((mn,i)=>{
            
        // })

       currMonth.forEach((item,i)=> {
        if(i==0) return
        currMonth[currMonth.length-i].textContent = "da"

        if(currMonth[i].textContent) a++
       })

       if(a<this.monthDays(month)) this.addMarkUp(month, currMonth, "next")
       

       
       //console.log(dates)

       currMonth.forEach((item,i)=> {
        if(i==0) return
        currMonth[currMonth.length-i].textContent = dates[i-1]

        
       })

       this.prevYear()
       this.nextYear(month)

       console.log({
        "firstMonth": this.firstMonthofyear,
        "lastMonth": this.lastMonthofyear
        })



        
    }

    


    monthDays(month){
        if(month=='September'||month=='June'||month=='November'||month=='April') return this.numOfdays = 30
        if(+this._selectedYear?.textContent % 4 == 0 
            && +this._selectedYear?.textContent % 100 != 0  && month == "February" 
            || +this._selectedYear?.textContent % 400 == 0  && month == "February" ) return 29
        if (month == "February") return this.numOfdays = 28
        return this.numOfdays = 31
    }

    nextYear(month){
       if (month == "December"){
        this.lastMonthofyear = [...this._parentElement
        .querySelector(`.${month}`)
        .querySelectorAll("td")]
        .filter((td,i)=> i>28? !td.textContent: undefined)
        .map(td=> td.className)

        console.log(this._parentElement
            .querySelector(`.${month}`))

        
    }
        
    }

    prevYear(){
        if(this._parentElement.querySelector(".January")){
            let node

            if(this._parentElement
                .querySelector('.January').querySelector("#Id")){
                    node = [...this._parentElement
                        .querySelector('.January').querySelector("#Id").children]
                        .every(td=> !td.textContent)

                }
            


            if(!node){
                this.firstMonthofyear = [...this._parentElement
                    .querySelector('.January')
                    .querySelectorAll("td")]
                    .filter((td)=> td.className)
                    .filter((td,i)=> i<=6? !td.textContent:"")
                    .map(td=> td.className)
            }

            else {
                let list = [...this._parentElement
                    .querySelector('.January')
                    .querySelectorAll("tr")]
                    .filter((tr,i)=> tr.children[i].className)
                    .filter((tr,i)=> ![...tr.children].every(td=>!td.textContent))[0]

                this.firstMonthofyear = [...list.children]
                .filter((td,i)=> i<=6? !td.textContent:"")
                .map(td=> td.className)
                //console.log("inside code",this.firstMonthofyear)
            }

            //console.log("outside code",this.firstMonthofyear)
            

        }

        
          
        
      
        
    }

}

// const calendar = new Calendar()
//calendar.print()

// const obj = {
//     Sun: [1,8,15,22,29],
//     Mon: [],
//     Tues: [],
//     Wed: [],
//     Thur: [],
//     Fri: [],
//     Sat: []
// }



