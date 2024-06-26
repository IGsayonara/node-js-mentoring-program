interface Listeners<T> {
    [key: string]: T;
}

export class EventEmitter {
    listeners: Listeners<Function[]> = {};  // key-value pair

    addListener(eventName: string, fn: Function) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [fn];
        } else {
            this.listeners[eventName].push(fn);
        }
    }

    on(eventName: string, fn: Function) {}

    removeListener(eventName: string, fn: Function) {
        const index = this.listeners[eventName]?.findIndex((listener) => {
            return listener === fn;
        });
        if (index !== -1) {
            this.listeners[eventName].splice(index, 1)
        }
    }

    off(eventName: string, fn: Function) {}

    once(eventName: string, fn: Function) {
        const callback = (...args)=> {
            fn(...args);
            this.removeListener(eventName, callback);
        }
        this.addListener(eventName, callback);
    }

    emit(eventName: string, ...args) {
        this.listeners[eventName]?.forEach((fn) => {
            fn(...args);
        })
    }

    listenerCount(eventName: string) {
        return this.listeners[eventName]?.length || 0;
    }

    rawListeners(eventName: string) {
        return this.listeners[eventName] || [];
    }
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;