let arr = [1, 2, [3, [4, 5]]];

let res = [];

function flatten(arr) {
    if (arr === []) {
        return;
    }
    for (let item of arr) {
        if (Array.isArray(item)) {
            flatten(item);
        } else {
            res.push(item);
        }
    }
}

flatten(arr);
console.log(res); // [ 1, 2, 3, 4, 5 ]