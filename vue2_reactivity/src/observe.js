import Observer from './Observer';

export default function observe(value) {
    // 如果value不是对象，就什么都不做
    if (typeof value !== 'object') return;
    let ob;
    if (typeof value.__ob__ !== 'undefined') {
        ob = value.__ob__;
    } else {
        ob = new Observer(value);
    }
    return ob;
}