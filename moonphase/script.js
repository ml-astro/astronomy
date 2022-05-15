///algorithm for the moon longitude from https://www.aa.quae.nl/en/reken/hemelpositie.html#4

//display current date and time
const now = new Date();
const paragraph = document.querySelector('.date');
paragraph.innerHTML+=`${now.toLocaleDateString()} ${now.getHours()}:${now.getMinutes()<10?('0'+now.getMinutes()):now.getMinutes()}`;
///////////////

//variables for the current moonphase calculation
const day0 = new Date(Date.UTC(2000,0,1,12,0,0)).getTime();
//const today = new Date(Date.UTC(2022,4,14,12,0,0)).getTime();
const today = new Date().getTime();
const interval = (today - day0)/86400000;
let angle = getMoonAngle(interval,today);
////////////
//calculates longitude for the provided day
//returns angle difference between sun and moon (phase)
function getMoonAngle(days,dayNow){
    let L = (218.316 + 13.176396*(days))%360;
    let M = (134.963 + 13.064993*(days))%360;
    let moonLongitude = L + 6.289 * Math.sin(M*0.0174533);
    let equinox = new Date(Date.UTC(2022,2,20,15,33,0)).getTime();
    let sunLongitude = ((dayNow - equinox)/86400000)/365.256*360;
    let angle = moonLongitude - sunLongitude;
    if(angle < 0){
        //not sure if this is right
        angle += 360;
    }
    if(angle > 360){
        angle = angle % 360;
    }
    return angle;
}

//how close is the calculated phase to a main phase
function proximityToPhase(a){
    let remain = a%90;
    if(Math.abs(remain-90)<remain){
        return(Math.abs(remain-90));
    }
        return remain
}

//converts interval to date
function intervalToDate(days){
    let date = new Date(day0);
    date.setDate(date.getDate()+days);
    return date.toDateString();
}

function addLeadZero(number){
    if(number < 10){
        return number = '0'+number;
    }
    return number;
}

//do the month forecast for moon phases
function makeForecast(){
    let dateNow = new Date (intervalToDate(Math.floor(interval))).getTime();
    let forecast = []
    let newInterval = Math.floor(interval);
    let angularDifference = 90;
    let currentAngle, newBestDay, oldComparisonAngle, newComparisonAngle,proximity;
    
    while(forecast.length < 4){
        newInterval++;
        dateNow+=86400000;
        currentAngle = getMoonAngle(newInterval,(dateNow));
        //comparing to an angle a bit smaller
        //if the angle is less than 90, add 360 to do right comparison with the previous date which was almost 360
        if(currentAngle<20){
            currentAngle+=360
        }

        newComparisonAngle = getComparisonAngle(currentAngle-15);
        proximity = proximityToPhase(currentAngle);

        if(proximity < angularDifference) {
            newBestDay = newInterval;
            angularDifference = Math.abs(newComparisonAngle - currentAngle);
            bestAngle = currentAngle;
            oldComparisonAngle = newComparisonAngle;
        }
        if(proximity > angularDifference){
            newComparisonAngle = getComparisonAngle(currentAngle-15);
            angularDifference = 90;
            forecast.push([intervalToDate(newBestDay),oldComparisonAngle])
        }
        let date = new Date(day0);
        date.setDate(date.getDate()+newInterval);
    }
    return forecast;
}
let forecast = makeForecast();

//nearest main phase
//receives moon-sun angle
//returns main phase angle
function getComparisonAngle(angle){
    switch (true) {
        case angle < 90:
            comparison = 90
            break
        case angle < 180:
            comparison = 180
            break
        case angle < 270:
            comparison = 270
            break
        case angle < 360:
            comparison = 360
    }
    return comparison;
}

//display phase name
function getPhaseName(phaseAngle){
    let moonName;
    switch (true) {
        case phaseAngle < 10 || phaseAngle >= 350:
            moonName = 'Новолуние';
            break;
        case phaseAngle < 80:
            moonName = 'Молодая Луна';
            break;
        case phaseAngle < 100:
            moonName = 'Первая четверть';
            break;
        case phaseAngle < 160:
            moonName = 'Растущая Луна';
            break;
        case phaseAngle < 200:
            moonName = 'Полнолуние';
            break;
        case phaseAngle < 260:
            moonName = 'Убывающая Луна';
            break;
        case phaseAngle < 280:
            moonName = 'Последняя чеверть';
            break;
        case phaseAngle < 350:
            moonName = 'Старая Луна';
            break;
    }
    return moonName;
}

//calculating the phase %
switch(true){
    case angle < 90:
        //(R-b)/2R
        //0.0174533 = 1 degree in radians
        phase = Math.round(((1-Math.cos(angle*0.017453292))/2)*100);
        break;
    case angle < 180:
        //180-A
        //(R+b)/2R
        phase = Math.round(((1+Math.cos((180-angle)*0.017453292))/2)*100);
        break;
    case angle < 270:
        //A-180
        //(R+b)/2R
        phase = Math.round(((1+Math.cos((angle-180)*0.017453292))/2)*100);
        break;
    case angle < 360:
        //360-A
        //(R-b)/2R
        phase = Math.round(((1-Math.cos((360-angle)*0.017453292))/2)*100);
        break;
}

//displays the description
document.querySelector('.description').innerHTML=`
Луна освещена на ${phase}%`;
document.querySelector('.phase').innerHTML = `<b>${getPhaseName(angle)}</b>`;

document.querySelector('.forecast').innerHTML+='<ul>'
for(i=0; i<forecast.length; i++){
    let date = new Date(forecast[i][0]).getDate();
    let month = new Date(forecast[i][0]).getMonth()+1;
    let year = new Date(forecast[i][0]).getFullYear();
    document.querySelector('.forecast').innerHTML+=`<li><img src='${forecast[i][1]}.png'>${addLeadZero(date)}.${addLeadZero(month)}.${year}</li>`
}
document.querySelector('.forecast').innerHTML+='</ul>'


//draws moon phase
switch (true){
    case angle < 90:
        drawMoon('#EEE','#2a303a','#2a303a',100-phase*2,100,-1);
        break;
    case angle < 180:
        drawMoon('#EEE','#2a303a','#EEE',100,(phase-50)*2,1);
        break;
    case angle < 270:
        drawMoon('#2a303a','#EEE','#EEE',(phase-50)*2,100,-1);
        break;
    case angle <= 360:
        drawMoon('#2a303a','#EEE','#2a303a',100,100-phase*2,1);
        break;
}

function drawMoon(color1,color2,color3,radius1,radius2,sign){
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Лунный диск
    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.ellipse(100, 100, 100, 100, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();

    //ночная часть
    ctx.fillStyle = color2;
    ctx.beginPath();
    ctx.ellipse(100, 100, 100, radius1, sign*Math.PI/2, 0, Math.PI);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = color3;
    ctx.beginPath();
    ctx.ellipse(100, 100, 100, radius2, Math.PI/2, 0, Math.PI);
    ctx.fill();
    ctx.stroke();
}
