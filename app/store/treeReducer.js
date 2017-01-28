import * as C from '../util/constants'
import {imm} from '../util/util'

const initState = {
    root: [
        // {
        //     name: '',
        //     path: '',
        //     type: 'file', // or 'dir'
        //     opened: false, // or true
        //     children: []
        // }
    ]
};

const locateTreeItem = (items, path) => {
    for(let i=0; i<items.length; i++){
        let item = items[i];
        if(item.path === path) return item;
        if(item.children){
            let res = locateTreeItem(item.children, path);
            if(res) return res;
        }
    }
};

const isArrayIdentical = (arr1, arr2) => {
    // assume the two arrays are all made of strings
    if(arr1.length !== arr2.length) return false;

    arr1 = arr1.sort();
    arr2 = arr2.sort();
    for(let i=0; i<arr1.length; i++){
        if(arr1[i] !== arr2[i]) return false;
    }
    return true;
};

const treeDataUpdated = (state, path, items) => {
    if( path === '' ){
        return imm.dup(state, {
            root: items
        });
    }

    let newState = imm.deepCopyJSON(state);

    let dir = locateTreeItem(newState.root, path);
    if(!dir.children
        || !isArrayIdentical(dir.children.map((e) => e.path), items.map((e) => e.path))){
        dir.children = items;
    }
    return newState;
};

const toggleDir = (state, path, open) => {
    let newState = imm.deepCopyJSON(state);
    let dir = locateTreeItem(newState.root, path);
    dir.opened = open;
    return newState;
};

export default function treeReducer(state = initState, action){
    switch(action.type){
        case C.TREE_DATA_UPDATED:
            return treeDataUpdated(state, action.path, action.items);
        case C.TREE_OPEN_DIR:
            return toggleDir(state, action.path, true);
        case C.TREE_CLOSE_DIR:
            return toggleDir(state, action.path, false);
        default:
            return state;
    }
}