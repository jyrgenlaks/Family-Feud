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

    var drawElement: HTMLVideoElement = media.vid["anim" + id];
 
    //setTimeout(animateTurnToText(ctx, id), 5000);
}

function playSound(soundType:String) {
    console.log("Implement playSound for " + soundType);
};

function animateTurnToText(ctx: CanvasRenderingContext2D, id: Number) {
    var animation: HTMLVideoElement = media.vid["anim" + id];
    //var finish: HTMLImageElement = media.img[id + "-1"];

    var startTime = null;

    playSound("clang");
    animation.play();

    // Update for 0.6 seconds
    function step(timestamp: any) {
        if (!startTime) {
            startTime = timestamp;
        }
        var progress = timestamp - startTime;
        ctx.drawImage(animation, 0, 0);
        if (progress < 600) {
            window.requestAnimationFrame(step);
        }
    }
    


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
    
    
    // initialiže canvases with video sizes
    var index = 0;
    _.forEach(canvases, (canvas: HTMLCanvasElement) => {
        index += 1;
        editCanvas(canvas, index);
        
    });
    

};