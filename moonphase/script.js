//first new moon of 2022
let newMoon = new Date('2022-01-02T22:33:00').getTime();
let now = new Date().getTime();
//let now = new Date('2022-12-30T02:33:00').getTime();
let timeSpan = now-newMoon;
let synodic = 29.530588853*864e5;
let month = (timeSpan%synodic)/synodic;
let angle = (month*360);
let phase;
let phaseName;

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
