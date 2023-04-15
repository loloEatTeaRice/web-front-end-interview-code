function removeDuplicateLetters(arr) {
    const map = new Map();
    const res = [];
    for (let value of arr) {
        if (!map.has(value)) {
            map.set(value, true);
            res.push(value);
        }
    }
    return res;
}

let res = removeDuplicateLetters(['a', 'a', 'b', 'b', 'c', 'c']);
console.log(res); // [ 'a', 'b', 'c' ]