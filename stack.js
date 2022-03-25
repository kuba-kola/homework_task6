const stackMaxSize = 10

class Entry {
    constructor(value, prev, index) {
        this.value = value
        this.prev = prev
        this.index = index
    }

    toArray() {
        return [this.value, ...(this.prev ? this.prev.toArray() : [])]
    }
}

class Stack {
    constructor(itemsLimit = stackMaxSize) {
        const isLimitIncorrect = !Number.isInteger(itemsLimit) || itemsLimit <= 0 || itemsLimit > stackMaxSize

        if(isLimitIncorrect) {
            throw new Error(`Лимит должен быть числом от 1 до ${stackMaxSize}, ${itemsLimit}`);
        }

        this.topEntry = null
        this.ignoreLimit = false
    }

    push(item) {
        if(!this.ignoreLimit && this.topEntry?.index === stackMaxSize) {
            throw new Error(`Стэк переполнен`);
        }

        this.stack = [...this.stack, item];
        this.top++;
    }

    pop() {
        if(this.stack.length === 0) {
            throw new Error(`Стэк пуст`);
        }

        const[item, ...rest] = [...this.stack].reverse();
        this.stack = rest.reverse();
        this.top--;

        return item;
    }

    peek() {
        return this.isEmpty() ? null : this.stack[this.top - 1];
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    toArray() {
        return [...this.stack];
    }

    static fromIterable(iterable) {
        if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error(`Объект не является итерируемым`);
        }

        const stack = new Stack();
        stack.ignoreLimit = true;
        const arr = [...iterable];
        arr.forEach(item => stack.push(item));

        return stack;
    }
}

module.exports = { Stack };