/// <reference path="Scripts\typings\lodash\lodash.d.ts" />

var  media = {
        vid: {},
        img: {}
};
function editCanvas(canvas: HTMLCanvasElement, id:Number) {

    var ctx: CanvasRenderingContext2D;

    ctx = canvas.getContext("2d");
    
    // display video
    ctx.font = "56px Bebas Neue";
    ctx.fillStyle = "white";
    ctx.fillText("Hello world", 10, 50);

    ctx.drawImage(media.img[id + '-0'], 0, 0);

}

function mapClassToId(map, classname: string) {
    var temp = document.getElementsByClassName(classname);
    _.forEach(temp, (element:HTMLElement, index:Number) => {
        map[element.id] = element;
    });
}

window.onload = () => {

    var canvases = document.getElementsByClassName('vastus');
    
    // map media to their ids
    mapClassToId(media.vid, "vid");
    mapClassToId(media.img, "img");
    
    
    // initializze canvases with video sizes
    _.forEach(canvases, (canvas:HTMLCanvasElement, index:Number) => {
        canvas.width = media.vid["anim" + index].videoWidth;
        canvas.height = media.vid["anim" + index].videoHeigth;
        editCanvas(canvas, index);
    }
    
    
};