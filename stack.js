const stackMaxSize = 10;

class Entry {
    constructor(value, prev, index) {
        this.value = value;
        this.prev = prev;
        this.index = index;
    }

    toArray() {
        return [this.value, ...(this.prev ? this.prev.toArray() : [])];
    }
}

class Stack {
    constructor(itemsLimit = stackMaxSize) {
        const isLimitIncorrect = !Number.isInteger(itemsLimit) || itemsLimit <= 0 || itemsLimit > stackMaxSize;

        if(isLimitIncorrect) {
            throw new Error(`Лимит должен быть числом от 1 до ${stackMaxSize}, ${itemsLimit}`);
        }

        this.topEntry = null;
        this.ignoreLimit = false;
    }

    push(item) {
        if(!this.ignoreLimit && this.topEntry?.index === stackMaxSize) {
            throw new Error(`Стэк переполнен`);
        }

        const index = this.topEntry ? (this.topEntry.index + 1) : 0;
        this.topEntry = new Entry(item, this.topEntry, index);
    }

    pop() {
        if(!this.topEntry) {
            throw new Error(`Стэк пуст`);
        }

        const item = this.topEntry.value;
        this.topEntry = this.topEntry.prev;

        return item;
    }

    peek() {
        return this.topEntry ? this.topEntry.value : null;
    }

    isEmpty() {
        return !this.topEntry;
    }

    toArray() {
        return this.isEmpty() ? [] : this.topEntry.toArray().reverse();
    }

    static fromIterable(iterable) {
        if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error(`Объект не является итерируемым`);
        }
        const stack = new Stack();
        stack.ignoreLimit = true;
        const arr = [...iterable];
        arr.forEach((item, index) => stack.push(item));

        return stack;
    }
}

module.exports = { Stack };