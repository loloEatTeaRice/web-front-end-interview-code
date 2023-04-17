function throttle (func, delay) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, delay);
        }
    };
}