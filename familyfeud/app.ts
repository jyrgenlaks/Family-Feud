/// <reference path="Scripts\typings\lodash\lodash.d.ts" />

var canvas;
var ctx: CanvasRenderingContext2D;
var videos;

var answersRounds1 = [
    [
        ['M. Reemann', 32],
        ['T. Jürgenstein', 25],
        ['E. Paabo', 8],
        ['P. Beier', 7]
    ], [
        ['M. Jõgiste', 16],
        ['M. Piirimäe', 11],
        ['E. Timak', 10],
        ['L. Astover', 9]
    ], [
        ['U. Saar', 23],
        ['Ü. Keerberg', 20],
        ['A. Pettai', 14],
        ['H. Köhler', 11]
    ], [
        ['K. Punga', 44],
        ['O. Titova', 8],
        ['J. Paaver', 7],
        ['A. Saarva', 6]
    ], [
        ['H. Tering', 21],
        ['H. Kiisel', 18],
        ['L. Tepp', 11],
        ['T. Pluum', 10]
    ]
];
var answersRounds = 
[
    [
        ["JavaScript", 99],
        ["Java", 70],
        ["Ruby", 40],
        ["PHP", 20]
    ],
    [
        ["Õpid ise", 99],
        ["Ülikoolis", 70],
        ["Tööl kursustel", 40],
        ["Netikursustel", 20]
    ],
    [
        ["Windows 7", 99],
        ["Mac OS X", 70],
        ["Linux", 40],
        ["Windows 8", 20]
    ],
    [
        ["NotePad++", 99],
        ["Sublime Text", 70],
        ["Vim", 40],
        ["Emacs", 20]
    ],
    [
        ["Tabid", 99],
        ["Tühikud", 50],
        ["Oleneb", 30],
        ["Ei tea", 0]
    ]
    ];

//TODO: re mux with new audio

var turnedBox = [
    false, false, false, false        
];

var boxLocations: Array<number> = [
//  X   Y
    80, 230,
    80, 535,
    1020, 230,
    1020, 535
];
var numLocations: Array<number> = [
//  X   Y
    755, 230,
    755, 535,
    1720, 230,
    1720, 535
];

var teamScore: Array<number> = [0, 0];
var curTeamScore: Array<number> = [0, 0];
var curTeam = 0;
var curWrongAnswer = [0, 0];
var curRound = 0;

function resetToNewRound() {
    for (var i = 0; i < curTeamScore.length; ++i) {
        teamScore[i] += curTeamScore[i];
        curTeamScore[i] = 0;
        curWrongAnswer[i] = 0;
    }
    ctx.clearRect(0, 0, 1920, 1080);

    var reset = document.getElementById("reset");
    reset.currentTime = 0;
    reset.style.display = "block";

    _.forEach(videos, (video:HTMLVideoElement) => {
        video.style.display = "none";
        video.currentTime = 0;
    });

    reset.play();
    drawLowerText(0, 0);

    setTimeout(() => {
        _.forEach(videos, (video: HTMLVideoElement) => {
            video.style.display = "block";
        });
        reset.style.display = "none";
        reset.currentTime = 0;
        
    }, 1000);

    for (var i = 0; i < turnedBox.length; ++i) {
        turnedBox[i] = false;
    }
    curRound += 1;
}

function pointsSteal() {
    curTeamScore[curTeam] += curTeamScore[Math.abs(curTeam - 1)];
    curTeamScore[Math.abs(curTeam - 1)] = 0;
    resetToNewRound();
}

function drawLowerText(score1:number, score2:number) {
    ctx.font = "400px Bebas Neue ";
    var textSize = 400;
    ctx.clearRect(canvas.width / 2 - textSize*2, 1010 - 400, textSize * 4, 450);
    ctx.fillText(score1, 250, 1010);
    ctx.fillText(score2, 1310 , 1010);
}
var finished = false;
function drawFinish() {
    if (finished) {
        return;
    }
    finished = true;
    ctx.clearRect(0, 0, 1920, 1080);

    animate("ending", 1000);
    _.forEach(videos, (video: HTMLVideoElement) => {
        video.style.display = "none";
        video.currentTime = 0;
    });


    ctx.font = "600px Bebas Neue ";
    
    ctx.fillText(teamScore[0] + "   " + teamScore[1], 100, 800, 1800);
}



function animate(element: string, duration) {
    var animation = document.getElementById(element);
    animation.currentTime = 0;
    animation.style.display = "block";

    animation.play();

    setTimeout(() => {
        animation.style.display = "none";
    }, duration);
}

var startUsed = false;
function start() {
    if (startUsed === true) {
        return;
    }
    // Hide logo
    var logo = document.getElementById("logo");
    logo.style.display = "none";

    // Show appearing boxes
    animate("beginning", 1000);

    // Put boxes on screen
    setTimeout(() => {
        _.forEach(videos, (video) => {
            video.style.display = "block";
            video.currentTime = 0;
        }
    }, 700);
}

function turnText(boxId: number) {
   
    if (curRound >= answersRounds.length) {
        drawFinish();
    }else if (!turnedBox[boxId]) {
       
        videos[boxId].play();

        

        setTimeout(() => {
            // add the score to the teams current score
            if (curTeam !== -1) {
                curTeamScore[curTeam] += answersRounds[curRound][boxId][1];
            }

            ctx.font = "200px Bebas Neue";
            ctx.fillStyle = "white";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;

            // clear previous fill
            ctx.clearRect(boxLocations[boxId * 2 + 0], boxLocations[boxId * 2 + 1] - 300, 850, 350);
 
            // draw name
            ctx.fillText(answersRounds[curRound][boxId][0], boxLocations[boxId * 2 + 0], boxLocations[boxId * 2 + 1], 650);
            // draw the score the name gives
            ctx.fillText(answersRounds[curRound][boxId][1], numLocations[boxId * 2], numLocations[boxId * 2 + 1]);

            drawLowerText(curTeamScore[0], curTeamScore[1]);

        }, 450);
    }
    turnedBox[boxId] = true;

}

function wrongAnswer(wrongNum: number) {
    if (wrongNum < 1 || wrongNum > 3) {
        console.log("error in wrong number");
        return;
    }
    var cross = document.getElementById("cross" + wrongNum);

    cross.style.display = "block";
    cross.play();
    setTimeout(() => {
        cross.style.display = "none";
    }, 1000);
}

function wrongAnswerTeams() {
    console.log("Current team false: " + curTeam);
    curWrongAnswer[curTeam] += 1;
    wrongAnswer(curWrongAnswer[curTeam]);
    if (curWrongAnswer[curTeam] === 3) {
        switchTeam();
    }
}
function selectTeam(team: number) {
    // TODO: when otehr team guesses the maximum, they get all the score!
    curTeam = team;
}
function switchTeam() {
    if (curTeam === 1) {
        curTeam = 0;
    } else {
        curTeam = 1;
    }

}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
}

window.onload = () => {
    unloadScrollBars();
    canvas = document.getElementById('vastus');
    ctx = canvas.getContext("2d");
    videos = document.getElementsByClassName('anim');

    // Fix for some weird bug that sometimes the font wasn't correct in the beginning

    
};

window.addEventListener('mousedown', function(event) {
    console.log("X: " + event.clientX + " Y: " + event.clientY);
});

window.addEventListener("keypress", function (event: Event) {
    if (event.charCode == 49) { // 1
        turnText(0);
    } else if (event.charCode == 50) { // 2
        turnText(1);
    } else if (event.charCode == 51) { // 3
        turnText(2);
    } else if (event.charCode == 52) { // 4
        turnText(3);
    } else if (event.charCode == 53) { // 5
        wrongAnswer(1);
    } else if (event.charCode == 54) { // 6
        wrongAnswer(2);
    } else if (event.charCode == 55) { // 7
        wrongAnswer(3);
    } else if (event.charCode == 106) { // j
        selectTeam(0);
    } else if (event.charCode == 107) { // k
        selectTeam(1);
    } else if (event.charCode == 114) { // r
        resetToNewRound();
    } else if (event.charCode == 113) { // q
        wrongAnswerTeams();
    } else if (event.charCode == 115) { // s
        start();
    } else if (event.charCode == 105) { // i
        pointsSteal();
    } else {
        console.log(event.charCode);        
    }
});
