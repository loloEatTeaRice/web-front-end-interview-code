function removeDuplicateLetters(arr) {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    })
}

let res = removeDuplicateLetters(['a', 'a', 'b', 'b', 'c', 'c']);
console.log(res);  // [ 'a', 'b', 'c' ]