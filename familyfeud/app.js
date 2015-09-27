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
    ctx.drawImage(media.img[id + '-0'], 0, 0);
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
    // initializze canvases with video sizes
    _.forEach(canvases, function (canvas, index) {
        canvas.width = media.vid["anim" + index].videoWidth;
        canvas.height = media.vid["anim" + index].videoHeigth;
        editCanvas(canvas, index);
    });
};
//# sourceMappingURL=app.js.map