
export function get(element){
    if (element){
        return document.querySelector(element);
    }
    else 
    throw new Error(`There was a error finding this ${element} check ${element} to find out about the problem`)
}

export function gets(elements){
    if (elements){
        return document.querySelectorAll(elements);
    }
    else 
    throw new Error(`There was a error finding these ${elements} check ${elements} to find out about the problem`)
}
