import def from './def';

const arrayPrototype = Array.prototype;

// 以Array.prototype为原型创建arrayMethod
export const arrayMethods = Object.create(arrayPrototype);

const methodsNeedChange = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse',
];

methodsNeedChange.forEach((methodName) => {
    // 备份原来的方法
    const original = arrayPrototype[methodName];

    // 定义新的方法
    def(
        arrayMethods,
        methodName,
        function() {
            console.log('array数据已经被劫持');

            // 恢复原来的数组功能
            const result = original.apply(this, arguments);
            const args = [...arguments];

            const ob = this.__ob__;

            // 有三种方法 push、unshift、splice能插入新项，要劫持（侦测）这些数据
            let inserted = [];
            switch (methodName) {
                case 'push':
                case 'unshift':
                    inserted = args;
                    break;
                case 'splice':
                    inserted = args.slice(2);
                    break;
            }

            if (inserted) {
                ob.observeArray(inserted);
            }

            // 发布订阅模式，通知dep
            // 向依赖发送消息
            ob.dep.notify();

            return result;
        },
        false
    )
})