import {EventEmitter} from "./eventEmiter.ts";

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        const beginTime = Date.now();
        super.emit('begin', {
            asyncFunc,
            beginTime,
        });
        const asyncWrapFunction = async () => {
            return await asyncFunc(...args);
        }
        asyncWrapFunction().then((data) => {
            const endTime = Date.now();
            super.emit('end', {
                asyncFunc,
                beginTime,
                endTime,
                execDuration: endTime - beginTime,
                result: data,
            });
        });
    }
    emit(eventName: string, ...args) {
        const reservedNames = ['begin', 'end'];
        if(!reservedNames.includes(eventName)) super.emit(eventName, ...args);
        else console.error(eventName + ' is reserved name');
    }
}

const asyncFunc = async () => {
    return await fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json());
}

const withTime = new WithTime();

withTime.on('begin', console.log);
withTime.on('end', console.log);
withTime.emit('end', 123);

withTime.execute(asyncFunc);


console.log(withTime.rawListeners("end"));