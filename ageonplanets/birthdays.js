let planets = new Map([
    ['mercury', 87.969*86400*1000],
    ['venus', 224.701*86400*1000],
    ['mars', 686.98*86400*1000],
    ['jupiter', 4332.589*86400*1000],
    ['saturn', 10759.22*86400*1000],
    ['uranus', 30685.4*86400*1000],
    ['neptune', 60190.03*86400*1000]
])

/*const mercury = 87.969*86400*1000
const venus = 224.701*86400*1000
const mars = 686.98*86400*1000
const jupiter = 4332.589*86400*1000
const saturn = 10759.22*86400*1000
const uranus = 30685.4*86400*1000
const neptune = 60190.03*86400*1000*/

function currentAge (){
    let birthday = new Date(document.getElementById('birthdate').value)
    let today = new Date()
    let range = today - birthday
    planets.forEach((period, planet) => {
        document.getElementById(planet+'Result').value=Math.floor(range/period)
    })
}

function nextDate (){
    let birthday = new Date(document.getElementById('birthdate').value)
    let today = new Date()
    let nextBday = new Date (birthday)
    planets.forEach((period,planet)=>{
        while (today > nextBday){
            nextBday =  new Date (nextBday.setMilliseconds(nextBday.getMilliseconds()+period))
        }
        document.getElementById(planet+'BD').value=nextBday.getDate()+'.'+(nextBday.getMonth()+1)+'.'+nextBday.getFullYear()
        nextBday = new Date (birthday)
    })
    
}

function calculate(){
    currentAge()
    nextDate()
}
