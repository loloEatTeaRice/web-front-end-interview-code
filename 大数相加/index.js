// 思路
/*
    1、整数 -> 字符串 -> 数组 -> 数组翻转（从个位开始相加）
    2、数组每一位元素进行相加 + 进位 >= 10，取个位，进位 = 1
    3、数组每一位元素进行相加 + 进位 < 10，取个位，进位 = 0
    4、最后一位，仍然有进位，进位直接添加到结果里
*/

function bigNumberSum (str1, str2) {
    let arr1 = str1.split('').reverse();
    let arr2 = str2.split('').reverse();
    let maxLen = Math.max(arr1.length, arr2.length);
    let flag = 0; // 进位
    let res = [];
    for (let i = 0; i < maxLen; i++) {
        let num1 = Number(arr1[i]) || 0;
        let num2 = Number(arr2[i]) || 0;
        let sum = num1 + num2 + flag;
        res.push(sum % 10);
        flag = Math.floor(sum / 10);
    }
    if (flag) {
        res.push(flag);
    }
    return res.reverse().join('');
}

console.log(bigNumberSum('6453234253452432', '7326362323251323'));