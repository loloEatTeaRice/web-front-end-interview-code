let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
// 如果月和天这两个值小于10，那么要在前面补0
if (month < 10) {
    month = '0' + month;
}
if (day < 10) {
    day = '0' + day;
}
let nowDate = year + '-' + month + '-' + day;
console.log(nowDate);