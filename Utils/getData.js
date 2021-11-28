
// Fetch data using ajax
export function getAjaxData(type, url, funct){
const xhr = new XMLHttpRequest();

xhr.open(type, url);

xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200){
        funct(xhr.responseText);
        //console.log(xhr.responseText);
    } else if (xhr.status !== 200){
        console.log(xhr.readyState);
        console.log(xhr.status);
    }
}
xhr.send();
}

/* start of data fetching with promise */
// Fetch data using promises
export function getPromiseData(type, url){
    return new Promise((res,rej)=>{
    const xhr = new XMLHttpRequest();
    xhr.open(type, url);
    xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200){
        res(xhr.responseText);
        //console.log(xhr.responseText);
    } else if (xhr.status !== 200){
        rej(
            console.log({
                state : xhr.readyState, 
                status : xhr.status
            }));
    }
}
xhr.send();
    })
}

// Fetch the data and resolve the promise
export function getResData (type, url, func) {
    getPromiseData(type, url)
    .then((res) => func(res))
    .catch((err)=> console.log(err));
}
/* End of data fetching with promise */


// Fetch data using fetch
export function getFetchData (url, func) {
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> func(data))
    .catch((err)=> console.log(err));
}

// Fetch data using async/await
export async function getAsyncData (url, func) {
    try {
    const data = await fetch(url);
    const res = await data.json();
    func(res);
    } catch (error) {
        console.log(error)
    }

}