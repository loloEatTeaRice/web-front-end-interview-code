let arr = [1, 2, [3, [4, 5]]];
let res = arr.toString().split(',').map((item) => Number(item));
console.log(res);