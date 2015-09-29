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


    var drawElement: HTMLVideoElement = media.img[id + "-0"];
    ctx.drawImage(drawElement, 0, 0);
    setTimeout(animateTurnToText(ctx, id), 8000);
}

function playSound(soundType:String) {
    console.log("Implement playSound for " + soundType);
};

function animateTurnToText(ctx: CanvasRenderingContext2D, id: Number) {
    var animation: HTMLVideoElement = media.vid["anim" + id];
    var background: HTMLImageElement = media.img["background"];
    //var finish: HTMLImageElement = media.img[id + "-1"];

    var startTime = null;

    

    playSound("clang");
    animation.play();

    // Update for 0.6 seconds
    function step(timestamp: any) {
        if (!startTime) {
            startTime = timestamp;
        }
        console.log("step");
        var progress = timestamp - startTime;
        // TODO: make canvas transparent before drawing new frame
        // TODO: throw videos out of canvas and show them in video tags, to get HW acc
        //ctx.drawImage(background, 0, 0);
        ctx.drawImage(animation, 0, 0);
        if (progress < 2000) {
            window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);


}

function mapClassToId(map, classname: string) {
    var temp = document.getElementsByClassName(classname);
    _.forEach(temp, (element:HTMLElement, index:Number) => {
        map[element.id] = element;
    });
}

function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
}

window.onload = () => {
    unloadScrollBars();
    var canvases = document.getElementsByClassName('vastus');
    
    // map media to their ids
    mapClassToId(media.vid, "vid");
    mapClassToId(media.img, "img");
    
    
    // initialiže canvases with video sizes
    var index = 0;
    _.forEach(canvases, (canvas: HTMLCanvasElement) => {
        index += 1;
        editCanvas(canvas, index);
        
    });
    

};