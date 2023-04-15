function myInstanceof(left, right) {
    if (!['function', 'object'].includes(typeof left) || left === null) {
        return false;
    }
    let proto = left.__proto__;
    let prototype = right.prototype;
    while (true) {
        if (proto === null) {
            return false;
        }
        if (proto === prototype) {
            return true;
        }
        proto = proto.__proto__;
    }
}

console.log(1 instanceof Number); // false
console.log(myInstanceof(1, Number)); // false
console.log({} instanceof Object); // true
console.log(myInstanceof({}, Object)); // true