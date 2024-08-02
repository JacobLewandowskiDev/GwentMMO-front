const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillStyle = 'white';
ctx.fillRect(50,50, canvas.width, canvas.height);



const map = new Image();
map.src = '/src/assets/images/tavern_map.png';

const playerimage = new Image();
playerimage.src = '/src/assets/images/playerDown.png';

map.onload = () => {
    ctx.drawImage(map, -1400, -1500)
    ctx.drawImage(
        playerimage, 
        0,
        0,
        playerimage.width / 4,
        playerimage.height,
        canvas.width / 2 - playerimage.width / 2, 
        canvas.height / 2 - playerimage.height / 2,
        playerimage.width / 4,
        playerimage.height
    )
}
