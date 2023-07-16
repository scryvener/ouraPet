const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH=canvas.width=640
const CANVAS_HEIGHT = canvas.height=640

const petImage= new Image();
petImage.src = './Assets/Flowers_White_64x64_ForJS.png'

const spriteDim=64 //sprites assumed to be square

let animFrame=0;
const staggerFrames=10

let frameX= 0
let frameY= 0//not used for now, but for when there are different pet animations to scroll through

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)

    let position = Math.floor(animFrame/staggerFrames) % 7
    frameX=spriteDim * position

    ctx.drawImage(petImage,frameX,frameY*spriteDim,spriteDim,spriteDim,160,160,CANVAS_WIDTH/2,CANVAS_HEIGHT/2)


    animFrame++
    requestAnimationFrame(animate)

}

animate()