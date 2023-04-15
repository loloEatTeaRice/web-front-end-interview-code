let arr = [1, 2, [3, [4, 5]]];

function flatten(arr) {
    // return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

let res = flatten(arr);
console.log(res); // [ 1, 2, 3, 4, 5 ]