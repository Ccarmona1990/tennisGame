
// function to create rects
export function colorRect(ctx,leftY, topY, width, height, color){

    ctx.fillStyle = color;
    ctx.fillRect(leftY, topY, width, height)
}

// function to create circles
export function colorCircle(ctx,leftY, topY, width, height, radious, state, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(leftY, topY, width, height, radious, state)
    ctx.fill()
}