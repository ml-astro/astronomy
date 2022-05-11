///algorithm from https://www.aa.quae.nl/en/reken/hemelpositie.html#4
let day0 = new Date(Date.UTC(2000,0,1,12,0,0)).getTime();
let today = new Date().getTime();
let interval = (today - day0)/86400000;
let L = (218.316 + 13.176396*(interval))%360;
let M = (134.963 + 13.064993*(interval))%360;
let moonLongitude = L + 6.289 * Math.sin(M*0.0174533);
let equinox = new Date(Date.UTC(2022,2,20,15,33,0)).getTime();
let sunLongitude = ((today - equinox)/86400000)/365*360;
let angle = moonLongitude - sunLongitude;
if(angle < 0){
    //not sure if this is right
    angle += 360;
}
if(angle > 360){
    angle = angle % 360;
}

//display phase name
switch (true) {
    case angle < 10 || angle >= 350:
        phaseName = 'Новолуние';
        break;
    case angle < 80:
        phaseName = 'Молодая Луна';
        break;
    case angle < 100:
        phaseName = 'Первая четверть';
        break;
    case angle < 170:
        phaseName = 'Растущая Луна';
        break;
    case angle < 190:
        phaseName = 'Полнолуние';
        break;
    case angle < 260:
        phaseName = 'Убывающая Луна';
        break;
    case angle < 280:
        phaseName = 'Последняя чеверть';
        break;
    case angle < 350:
        phaseName = 'Старая Луна';
        break;
}

switch(true){
    case angle < 90:
        //(R-b)/2R
        //0.0174533 = 1 degree in radians
        phase = Math.round(((1-Math.cos(angle*0.0174533))/2)*100);
        break;
    case angle < 180:
        //180-A
        //(R+b)/2R
        phase = Math.round(((1+Math.cos((180-angle)*0.0174533))/2)*100);
        break;
    case angle < 270:
        //A-180
        //(R+b)/2R
        phase = Math.round(((1+Math.cos((angle-180)*0.0174533))/2)*100);
        break;
    case angle < 360:
        //360-A
        //(R-b)/2R
        phase = Math.round(((1-Math.cos((360-angle)*0.0174533))/2)*100);
        break;
}
document.querySelector('p span').innerHTML = `${phase}%<br>${phaseName}`;

//draw moons
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
