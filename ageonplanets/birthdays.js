const planets = new Map([
    ['mercury', 87.969*86400],
    ['venus', 224.701*86400],
    ['mars', 686.98*86400],
    ['jupiter', 4332.589*86400],
    ['saturn', 10759.22*86400],
    ['uranus', 30685.4*86400],
    ['neptune', 60190.03*86400]
])

const months=[
   'января',
   'февраля',
   'марта',
   'апреля',
   'мая',
   'июня',
   'июля',
   'августа',
   'сентября',
   'октября',
   'ноября',
   'декабря',
];

function ageFormat (age){
	let txt;
	count = age % 100;
	if (count >= 5 && count <= 20) {
		txt = 'лет';
	} else {
		count = count % 10;
		if (count == 1) {
			txt = 'год';
		} else if (count >= 2 && count <= 4) {
			txt = 'года';
		} else {
			txt = 'лет';
		}
	}
	return age+" "+txt;
}

function currentAge (){
    let birthday = new Date(document.getElementById('birthdate').value)
    let today = new Date()
    let range = today - birthday
    planets.forEach((period, planet) => {
        document.getElementById(planet+'Age').innerHTML='<b>'+ageFormat(Math.floor(range/(period*1000)))+'</b>'
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
        document.getElementById(planet+'BD').innerHTML='<b>'+nextBday.getDate()+' '+months[(nextBday.getMonth())]+' '+nextBday.getFullYear()+'&nbsp;года</b>'
        nextBday = new Date (birthday)
    })
    
}

function calculate(){
    if(document.getElementById('birthdate').value){
        currentAge()
        nextDate()
        document.getElementById('unhide').style.display='initial'
    }

}