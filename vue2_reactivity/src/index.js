import observe from "./observe";
import Watcher from './Watcher';

let obj = {
    // name: 'lolo',
    school: {
        name: 'jinan',
        address: 'tianhe'
    },
    // arrayTest: [1, 2, 3, 4, 5]
};

observe(obj);
// obj.arrayTest.push(7);
new Watcher(obj, "school.name", (val) => {
    console.log("watcher监听", val);
});
obj.school.name = 'huashi';