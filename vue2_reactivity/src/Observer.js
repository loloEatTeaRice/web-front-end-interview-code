import def from './def';
import defineReactive from './defineReactive';
import observe from './observe';
import { arrayMethods } from './array';
import Dep from './Dep';

export default class Observer {
    constructor(value) {
        // 每个Observer实例中都有一个Dep的实例 用来收集依赖
        this.dep = new Dep();

        // 给实例添加__ob__属性，值是当前Observer的实例，不可枚举
        // __ob__的作用可以用来标记当前value是否已经被Observer转换成了响应式数据了
        // 而且可以通过value.__ob__来访问Observer的实例
        def(value, '__ob__', this, false);
        console.log('Observer构造器', value);

        // 判断是数组还是对象
        if (Array.isArray(value)) {
            // 是数组就将这个数组的原型指向arrayMethods
            Object.setPrototypeOf(value, arrayMethods);

            this.observeArray(value);
        } else {
            // 将一个正常的object转换为每个层级的属性都是响应式（可以被侦测）的object
            this.walk(value);
        }


    }

    // 对象遍历方式 遍历value的每一个key
    walk(value) {
        for (let key in value) {
            defineReactive(value, key);
        }
    }

    // 数组遍历方式
    observeArray(arr) {
        for (let i = 0, l = arr.length; i < l; i++) {
            // 逐项进行observe
            observe(arr[i]);
        }
    }
}