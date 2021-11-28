import {get} from './Utils/getElement.js';
import {colorRect, colorCircle} from './Utils/shapes.js';
import {calcMousePos} from './Utils/mousePos.js';

// variables
const canvas = get('.cg');
let ctx;
let ballX = 5;
let ballY = 50;  
let ballSpeedX = 8;
let ballSpeedY = 1;
let framePerSec = 50;

// canvas width and height
canvas.style.minWidth = `500px`;
canvas.style.minHeight = `300px`;
//canvas.style.width = `100%`;
//canvas.style.height = `100%`;

// paddles
let paddle1Y = 50;
let paddle2Y = 50;
const PADDLE_HEIGHT = 50;
const PADDLE_WIDTH = 6;
const PADDLE1_POSITION = 5;
const PADDLE2_POSITION = 5;
const PADDLE1_POSITION_BALL = PADDLE1_POSITION + 10;
const PADDLE2_POSITION_BALL = PADDLE2_POSITION + 10;

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
setInterval(()=> {drawBackGround(); Ball(); players(); pcMovement(); scores(); drawNet();},framePerSec);

// click event to restart the game
canvas.addEventListener('click', gameRestart);

// mouse movement functionality
canvas.addEventListener('mousemove', function (event) {
    const mousePos = calcMousePos(canvas,event);
    // adds the position of the mouse to the paddle
    // mousePos.y MUST be divided by 2, otherwise the mouse/paddle coordination fails
    // (PADDLE_HEIGHT/2) centers the mouse to the paddle 
    paddle1Y = mousePos.y/2 - (PADDLE_HEIGHT/2) ;
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
        paddle2Y += 2;
    } else if (paddle2YCenter > ballY +20){
        paddle2Y -= 2;
    }
}

// Draws the background
function drawBackGround (){
    // background Color
    colorRect(ctx, 0, 0, canvas.width, canvas.height,'black');
}

// shows the scores on the screen
function scores(){
    ctx.fillText(player1Score,10,10); // player1
    ctx.fillText(player2Score,canvas.width-15,10); // player2
}

// players paddles
function players (){
    if (showingWinScreen) {
        ctx.fillStyle = "white";
        ctx.fillText(`Congratulations ${winner} You've won the game`,45,canvas.height/2)
        ctx.fillText(`Click to play again`,105,canvas.height/2+15)
        return;}

    // player1 tennis raquet
    colorRect(ctx,PADDLE1_POSITION,paddle1Y,PADDLE_WIDTH,PADDLE_HEIGHT, 'lightblue');
    // machine tennis raquet
    colorRect(ctx,canvas.width-(PADDLE_WIDTH+PADDLE2_POSITION),paddle2Y,PADDLE_WIDTH,50, 'lightblue');
}

// ball functionality
function Ball (){
    // shuts down the screen
    if (showingWinScreen) return;

    // gives the ball movement horizontally
    ballX += ballSpeedX;
    // gives the ball movement vertically
    ballY += ballSpeedY;
    
    // All the IFs, check when the ball reaches the end of the canvas
    if (ballX < (PADDLE_WIDTH+PADDLE1_POSITION_BALL)){
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
    if (ballX > (canvas.width - (PADDLE_WIDTH+PADDLE2_POSITION_BALL))){
        if (ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
            // bounces the ball back when hits the paddle
            ballSpeedX = -ballSpeedX;

            // bounces the ball back with a different speed and direction
            let deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }else if (ballX > canvas.width ) {
            player1Score++; // must be BEFORE ballReset
            ballReset();
        }
    } 
    if (ballY <= 5){
        // bounces the ball from the top
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > (canvas.height-5)){
        // bounces the ball from the bottom
        ballSpeedY = -ballSpeedY;
    } 

    // ball shape
    colorCircle(ctx,ballX, ballY, 5, 0,Math.PI*2, true, 'red');

}



