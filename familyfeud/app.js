/// <reference path="Scripts\typings\lodash\lodash.d.ts" />
var media = {
    vid: {},
    img: {}
};
function editCanvas(canvas, id) {
    var ctx;
    ctx = canvas.getContext("2d");
    // display video
    ctx.font = "56px Bebas Neue";
    ctx.fillStyle = "white";
    ctx.fillText("Hello world", 10, 50);
    var drawElement = media.vid["anim" + id];
    //setTimeout(animateTurnToText(ctx, id), 5000);
}
function playSound(soundType) {
    console.log("Implement playSound for " + soundType);
}
;
function animateTurnToText(ctx, id) {
    var animation = media.vid["anim" + id];
    var finish = media.img[id + "-1"];
    setInterval(function () {
        ctx.drawImage(animation, 0, 0);
    }, 16);
    playSound("turn");
    // after animation replace video with static element
    setTimeout(function () {
        ctx.drawImage(finish, 0, 0);
    }, 600);
}
function mapClassToId(map, classname) {
    var temp = document.getElementsByClassName(classname);
    _.forEach(temp, function (element, index) {
        map[element.id] = element;
    });
}
window.onload = function () {
    var canvases = document.getElementsByClassName('vastus');
    // map media to their ids
    mapClassToId(media.vid, "vid");
    mapClassToId(media.img, "img");
    // initialiže canvases with video sizes
    var index = 0;
    _.forEach(canvases, function (canvas) {
        index += 1;
        editCanvas(canvas, index);
    });
};
//# sourceMappingURL=app.js.map