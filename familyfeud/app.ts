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
    var finish: HTMLImageElement = media.img[id + "-1"];

    setInterval(() => {
        ctx.drawImage(animation, 0, 0);
    }, 16 );
    
    playSound("turn");
    // after animation replace video with static element
    setTimeout(() => {
        ctx.drawImage(finish, 0, 0);
    }, 600);


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