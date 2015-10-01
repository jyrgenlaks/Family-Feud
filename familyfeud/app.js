/// <reference path="Scripts\typings\lodash\lodash.d.ts" />
var canvas;
var ctx;
var videos;
var answers = [
    "U. Saar", 42,
    "T. Jürgenstein", 24,
    "U. Saar", 10,
    "H. Kiisel", 5
];
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
var answersRounds = [
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
var shown = [
    false, false, false, false
];
var boxLocations = [
    80, 230,
    80, 535,
    1020, 230,
    1020, 535
];
var numLocations = [
    755, 230,
    755, 535,
    1720, 230,
    1720, 535
];
var teamScore = [0, 0];
var curTeamScore = [0, 0];
var curTeam;
var curRound = 0;
function resetToNewRound() {
    for (var i = 0; i < curTeamScore.length; ++i) {
        teamScore[i] += curTeamScore[i];
        curTeamScore[i] = 0;
    }
    ctx.clearRect(0, 0, 1920, 1080);
    var reset = document.getElementById("reset");
    reset.currentTime = 0;
    reset.style.display = "block";
    _.forEach(videos, function (video) {
        video.style.display = "none";
        video.currentTime = 0;
    });
    reset.play();
    drawLowerText(0, 0);
    setTimeout(function () {
        _.forEach(videos, function (video) {
            video.style.display = "block";
        });
        reset.style.display = "none";
        reset.currentTime = 0;
    }, 1000);
    for (var i = 0; i < shown.length; ++i) {
        shown[i] = false;
    }
    curRound += 1;
}
function drawLowerText(score1, score2) {
    ctx.font = "400px Bebas Neue ";
    var offsetFromCenter = 400;
    ctx.clearRect(canvas.width / 2 - offsetFromCenter, 1010 - 400, offsetFromCenter * 2 + 400, 450);
    ctx.fillText(score1, canvas.width / 2 - 200, 1010);
    ctx.fillText(score2, canvas.width / 2 + 200, 1010);
}
function drawFinish() {
    ctx.clearRect(0, 0, 1920, 1080);
    _.forEach(videos, function (video) {
        video.style.display = "none";
        video.currentTime = 0;
    });
    var reset = document.getElementById("reset");
    reset.currentTime = 0;
    reset.style.display = "block";
    reset.play();
    setTimeout(function () {
        reset.style.display = "none";
        reset.currentTime = 0;
    }, 350);
    ctx.font = "600px Bebas Neue ";
    var offsetFromCenter = 500;
    ctx.clearRect(canvas.width / 2 - offsetFromCenter, 500 - 400, offsetFromCenter * 2 + 400, 450);
    ctx.fillText(teamScore[0], canvas.width / 2 - offsetFromCenter, 500);
    ctx.fillText(teamScore[1], canvas.width / 2 + offsetFromCenter, 500);
}
function turnText(boxId) {
    if (curRound === answersRounds.length) {
        drawFinish();
    }
    else if (!shown[boxId]) {
        videos[boxId].play();
        setTimeout(function () {
            if (curTeam !== -1) {
                curTeamScore[curTeam] += answersRounds[curRound][boxId][1];
            }
            ctx.font = "200px Bebas Neue";
            ctx.fillStyle = "white";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            ctx.clearRect(boxLocations[boxId * 2 + 0], boxLocations[boxId * 2 + 1] - 300, 850, 350);
            ctx.fillText(answersRounds[curRound][boxId][0], boxLocations[boxId * 2 + 0], boxLocations[boxId * 2 + 1], 650);
            ctx.fillText(answersRounds[curRound][boxId][1], numLocations[boxId * 2], numLocations[boxId * 2 + 1]);
            drawLowerText(curTeamScore[0], curTeamScore[1]);
        }, 450);
    }
    shown[boxId] = true;
}
function wrongAnswer(wrongNum) {
    var cross = document.getElementById("cross" + wrongNum);
    cross.style.display = "block";
    cross.play();
    setTimeout(function () {
        cross.style.display = "none";
    }, 1000);
}
function gotAnswer(team) {
    curTeam = team;
}
function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';
}
window.onload = function () {
    unloadScrollBars();
    canvas = document.getElementById('vastus');
    ctx = canvas.getContext("2d");
    videos = document.getElementsByClassName('anim');
};
window.addEventListener('mousedown', function (event) {
    console.log("X: " + event.clientX + " Y: " + event.clientY);
});
window.addEventListener("keypress", function (event) {
    if (event.charCode == 49) {
        turnText(0);
    }
    else if (event.charCode == 50) {
        turnText(1);
    }
    else if (event.charCode == 51) {
        turnText(2);
    }
    else if (event.charCode == 52) {
        turnText(3);
    }
    else if (event.charCode == 53) {
        wrongAnswer(1);
    }
    else if (event.charCode == 54) {
        wrongAnswer(2);
    }
    else if (event.charCode == 55) {
        wrongAnswer(3);
    }
    else if (event.charCode == 106) {
        gotAnswer(0);
    }
    else if (event.charCode == 107) {
        gotAnswer(1);
    }
    else if (event.charCode == 114) {
        resetToNewRound();
    }
    else {
        console.log(event.charCode);
    }
});
