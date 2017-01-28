import * as C from '../util/constants'
import {imm} from '../util/util'

const initState = {
    buffers:[
        /*
         {
         path: '',
         tab: 'welcome',
         text: '// Start writing your code here!',
         focused: true,
         modified: false
         }
         */
    ]
};

const setBufferNames = (buffers) => {
    // copy
    buffers = buffers.map((buffer) => imm.dup(buffer));

    let root = new Map();

    buffers.forEach((buffer) => {
        let lastMap = root;
        let splits = buffer.path.split('/').reverse();
        splits.forEach((split) => {
            // add a new node
            if(!lastMap.get(split)){
                let newNode = {
                    split: split,
                    count: 1,
                    children: new Map(),
                    lastRelatedBuffer: buffer
                };
                lastMap.set(split, newNode);
            }else{
                lastMap.get(split).count += 1;
            }

            // step in
            lastMap = lastMap.get(split).children;
        });

        // iterate next tab
        lastMap = root;
    });

    const setTabNames = (map, suffix) => {
        let nodes = [...map.values()];
        for(let i=0; i<nodes.length; i++){
            let {split, count, children, lastRelatedBuffer} = nodes[i];

            let name = split + (suffix ? '/'+suffix :'');
            if(count === 1){
                lastRelatedBuffer.name = name;
            }else{
                setTabNames(children, name);
            }
        }
    };
    setTabNames(root);

    return buffers;
};

const clearFocused = (state) => {
    let ns = imm.dup(state);

    let focusedIndex = ns.buffers.findIndex((b) => b.focused);
    if( focusedIndex !== -1 ){
        ns.buffers = imm.replace(ns.buffers, focusedIndex, imm.dup(ns.buffers[focusedIndex], {
            focused: false
        }));
    }
    return ns;
};

const openFile = (state, path, text) => {
    // new state
    let ns = imm.dup(state);

    /**
     * cancel focused state of current focused buffer
     */
    ns = clearFocused(ns);

    /**
     * add new buffer and set focused
     */
    let bufIndex = ns.buffers.findIndex((b) => b.path === path);

    // open new buffer
    if(bufIndex === -1){
        ns.buffers = imm.push(ns.buffers, {
            path: path,
            text: text,
            focused: true
        });
    }
    // modify existing buffer
    else{
        let buf = ns.buffers[bufIndex];
        ns.buffers = imm.replace(ns.buffers, bufIndex, imm.dup(buf, {
            text: text
        }));
    }

    ns.buffers = setBufferNames(ns.buffers);
    return ns;
};

const closeFile = (state, path) => {
    let ns = imm.dup(state);
    let index = ns.buffers.findIndex((buffer) => buffer.path === path);
    if(index !== -1){
        let bufToRemove = ns.buffers[index];
        ns.buffers = imm.remove(ns.buffers, index);
        // refocus
        if(bufToRemove.focused && ns.buffers.length > 0){
            let bufferLen = ns.buffers.length;
            // the focused tab is removed, we need to pick another one to focus on
            // pick the last one would be natural
            ns.buffers = imm.replace(ns.buffers, bufferLen-1, imm.dup(ns.buffers[bufferLen-1], {
                focused: true
            }));
        }
    }

    return ns;
};

const chooseFile = (state, path) => {
    let ns = imm.dup(state);
    ns = clearFocused(ns);

    let index = ns.buffers.findIndex((buffer) => buffer.path === path);
    if(index !== -1){
        ns.buffers = imm.replace(ns.buffers, index, imm.dup(ns.buffers[index], {
            focused: true
        }));
    }

    return ns;
};

export default function editorReducer(state = initState, action){
    switch(action.type){
        case C.EDITOR_OPEN_FILE:
            return openFile(state, action.path, action.text);
        case C.EDITOR_CLOSE_FILE:
            return closeFile(state, action.path);
        case C.EDITOR_CHOOSE_FILE:
            return chooseFile(state, action.path);
        default:
            return state;
    }
}