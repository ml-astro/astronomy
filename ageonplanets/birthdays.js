let planets = new Map([
    ['mercury', 87.969*86400],
    ['venus', 224.701*86400],
    ['mars', 686.98*86400],
    ['jupiter', 4332.589*86400],
    ['saturn', 10759.22*86400],
    ['uranus', 30685.4*86400],
    ['neptune', 60190.03*86400]
])

function ageFormat (age){
    if(age%10 == 2 || age%10 == 3 || age%10 == 3){
        return age+' года'
    }
    else if(age%10 == 1){
        return age+' год'
    }
    return age+' лет'
}

function currentAge (){
    let birthday = new Date(document.getElementById('birthdate').value)
    let today = new Date()
    let range = today - birthday
    planets.forEach((period, planet) => {
        document.getElementById(planet+'Age').innerHTML=ageFormat(Math.floor(range/(period*1000)))
        //document.getElementById(planet+'Age').innerHTML=Math.floor(range/(period*1000))
    })
}

function nextDate (){
    let birthday = new Date(document.getElementById('birthdate').value)
    let today = new Date()
    let nextBday = new Date (birthday)
    planets.forEach((period,planet)=>{
        while (today > nextBday){
            nextBday =  new Date (nextBday.setSeconds(nextBday.getSeconds()+period))
        }
        document.getElementById(planet+'BD').innerHTML=nextBday.getDate()+'.'+(nextBday.getMonth()+1)+'.'+nextBday.getFullYear()
        nextBday = new Date (birthday)
    })
    
}

function calculate(){
    currentAge()
    nextDate()
}