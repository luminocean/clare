export const done = () => {};

export const logAndThrow = (e) => {
    console.error(e.message);
    throw e;
};

// duplicate an object
export const dup = (object, newObj) => {
    return Object.assign({}, object, newObj);
};

export const stopEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
};

class Imm{
    // duplicate an object and optionally merge ne attributes into it
    dup(object, newObj){
        return Object.assign({}, object, newObj);
    }

    // insert to array
    insert(arr, index, obj){
        return [
            ...arr.slice(0, index),
            obj,
            ...arr.slice(index)
        ];
    }

    // push to array
    push(arr, obj){
        return this.insert(arr, arr.length, obj);
    }

    // replace an object in array
    replace(arr, index, obj){
        return [
            ...arr.slice(0, index),
            obj,
            ...arr.slice(index+1)
        ];
    }

    remove(arr, index){
        return [
            ...arr.slice(0, index),
            ...arr.slice(index+1)
        ];
    }

    limit(arr, maxLen){
        if(arr.length <= maxLen) return arr;
        return arr.slice(0, maxLen);
    }

    deepCopyJSON(json){
        return JSON.parse(JSON.stringify(json));
    }
}
export const imm = new Imm();
