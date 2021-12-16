import {get} from './Utils/getElement.js';
import {colorRect, colorCircle} from './Utils/shapes.js';
import {calcMousePos} from './Utils/mousePos.js';

// variables
const canvas = get('.cg');
let canvasHeightLimit = 15;
let canvasWidthLimit = 25;
let ctx;
let ballX = 16;
let ballY = 48; 
let ballWidth = 10;
let ballHeight = 0; 
let ballSpeedX = 20;
let ballSpeedY = 2;
let framePerSec = 40;
let ballColor = 'red';

// Size
canvas.width = window.innerWidth;
canvas.height = 500;


// paddles
let paddle1Y = 50;
let paddle2Y = 50;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const PADDLE1_POSITION = 0;
const PADDLE2_POSITION = 1;
let machineSpeedLvl = 10;

// scores
let player1Score = 0;
let player2Score = 0;
let winner;
const WINNING_SCORE = 5;

// stops the game
let showingWinScreen = false;


window.addEventListener('DOMContentLoaded', ()=>{
ctx = canvas.getContext('2d');

// Game visuals
setInterval(()=> {
    drawBackGround();
    drawBall();
    ballCollition(); 
    players(); 
    pcMovement(); 
    scores(); 
    drawNet();
},framePerSec);

// click event to restart the game
canvas.addEventListener('click', gameRestart);

// click event to restart the ball
// canvas.addEventListener('click', ballRestart);

// mouse movement functionality
canvas.addEventListener('mousemove', function (event) {
    const mousePos = calcMousePos(canvas,event);
    // adds the position of the mouse to the paddle
    // (PADDLE_HEIGHT/2) centers the mouse to the paddle 
    paddle1Y = mousePos.y - (PADDLE_HEIGHT/2) ;
})
})

// Restarts the game
function gameRestart(){
    if (showingWinScreen){
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

// draws the net
function drawNet(){
    if (showingWinScreen) return;
    for (let i = 0; i < canvas.height; i+=20){
        colorRect(ctx, canvas.width/2-1, i, 2, 10, 'white')
    }
}

// resets the direction of the ball
function ballReset (){
    // provides the name of the winner
    if (player1Score === WINNING_SCORE){
            winner = 'player1';
        } else if (player2Score === WINNING_SCORE){
            winner = 'player2' ;
        }
        // stops current game
    if (player1Score >= WINNING_SCORE || 
        player2Score >= WINNING_SCORE){
            showingWinScreen = true;
        }
    // resets the ball to the center of the screen
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;

}

// creates automatic movement for the paddle2
function pcMovement (){
    const paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if (paddle2YCenter < ballY -20){
        paddle2Y += machineSpeedLvl;
    } else if (paddle2YCenter > ballY +20){
        paddle2Y -= machineSpeedLvl;
    }
}

// Draws the background
function drawBackGround (){
    // background Color
    colorRect(ctx, 0, 0, canvas.width, canvas.height,'black');
}

// shows the scores on the screen
function scores(){
    const p1ScoreWidth = 20;
    const p2ScoreWidth = canvas.width-40;
    const psScoreHeight = 20;

    ctx.font = '20px Arial';
    ctx.fillText(player1Score,p1ScoreWidth,psScoreHeight); // player1
    ctx.fillText(player2Score,p2ScoreWidth,psScoreHeight); // player2
}

function drawBall(){
    if (showingWinScreen) return;
    // ball shape
    colorCircle(ctx,ballX, ballY, ballWidth, ballHeight,Math.PI*2, true, ballColor);
}

// players paddles
function players (){
    if (showingWinScreen) {
        const winningMessage = `Congratulations ${winner}!!`;
        const resetMessage = `Click to play again`;

        ctx.fillStyle = "white";
        ctx.font = "20px Arial"
        ctx.fillText(winningMessage,canvas.width/2.6,canvas.height/3)
        ctx.fillText(resetMessage,canvas.width/2.5,canvas.height/2)
        return;}

    // player1 tennis raquet
    colorRect(ctx,PADDLE1_POSITION,paddle1Y,PADDLE_WIDTH,PADDLE_HEIGHT, 'lightblue');
    // machine tennis raquet
    colorRect(ctx,canvas.width-(PADDLE_WIDTH+PADDLE2_POSITION),paddle2Y,PADDLE_WIDTH,PADDLE_HEIGHT, 'lightblue');
}


// ball functionality
function ballCollition (){
    // shuts down the screen
    if (showingWinScreen) return;

    // gives the ball movement horizontally
    ballX += ballSpeedX;
    // gives the ball movement vertically
    ballY += ballSpeedY;


    // All the IFs, check when the ball reaches the end of the canvas
    if (ballX < (canvasWidthLimit + PADDLE_WIDTH) ){
        
        if (ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){

            // bounces the ball back when hits the paddle
            ballSpeedX = -ballSpeedX;

            // bounces the ball back with a different speed and direction
            let deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }else if (ballX < 0) {
            player2Score ++; // must be BEFORE ballReset
            ballReset();
        }
        
    }
    if (ballX > (canvas.width - 20)){

        if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
            // bounces the ball back when hits the paddle
            ballSpeedX = -ballSpeedX;

            // bounces the ball back with a different speed and direction
            let deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }
        else if (ballX > canvas.width ) {
            player1Score++; // must be BEFORE ballReset
            machineSpeedLvl++;// must be BEFORE ballReset
            ballReset();
        }
    } 
    if (ballY <= canvasHeightLimit){
        // bounces the ball from the top
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > (canvas.height-canvasHeightLimit)){
        // bounces the ball from the bottom
        ballSpeedY = -ballSpeedY;
    } 

}



