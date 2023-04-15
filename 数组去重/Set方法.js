// 去除重复字符
function removeDuplicateLetters(arr) {
    return [...new Set(arr)];
    // return Array.from(new Set(arr));
}

let res = removeDuplicateLetters(['a', 'a', 'b', 'b', 'c', 'c']);
console.log(res); // [ 'a', 'b', 'c' ]