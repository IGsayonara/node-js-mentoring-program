import {EventEmitter} from "./eventEmiter.ts";

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        const beginTime = Date.now();
        this.emit('begin', {
            asyncFunc,
            beginTime,
        });
        const asyncWrapFunction = async () => {
            return await asyncFunc(...args);
        }
        asyncWrapFunction().then((data) => {
            const endTime = Date.now();
            this.emit('end', {
                asyncFunc,
                beginTime,
                endTime,
                execDuration: endTime - beginTime,
                result: data,
            });
        });
    }
}

const asyncFunc = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json());
}

const withTime = new WithTime();

withTime.on('begin', console.log);
withTime.on('end', console.log);

withTime.execute(asyncFunc);


console.log(withTime.rawListeners("end"));