 // calculates the position of the mouse
export function calcMousePos(elem,evt){
    let rect = elem.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.x - rect.left - root.scrollLeft;
    let mouseY = evt.y - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}