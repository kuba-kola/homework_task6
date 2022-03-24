const stackMaxSize = 10;

class Stack {
    constructor(itemsLimit = stackMaxSize) {
        const isLimitIncorrect = !Number.isInteger(itemsLimit) || itemsLimit <= 0 || itemsLimit > stackMaxSize;
        
        if(isLimitIncorrect) {
            throw new Error(`Лимит должен быть числом от 1 до ${stackMaxSize}, ${itemsLimit}`);
        }

        this.stack = [];
        this.top = 0;
        this.ignoreLimit = false;
    }    
}

module.exports = { Stack };