import {Dispatcher} from 'flux'
import treeStore from '../store/TreeStore'
import editorStore from '../store/EditorStore'
import * as C from '../util/constants'

const match = (type, prefix) => {
    return type.startsWith(prefix);
};

// const dispatchEditorActions = (action) => {return};
const dispatchTreeActions = (action) => {
    switch(action.type){
        case C.TREE_INIT: treeStore.init(); break;
        case C.TREE_EXPAND_NODE: treeStore.expendDirectory(action.path); break;
    }
};

const dispatchEditorActions = (action) => {
    switch(action.type) {
        case C.EDITOR_OPEN_FILE: editorStore.openFile(action.path); break;
    }
};

const dispatcher = new Dispatcher();

dispatcher.register((action) => {
    let type = action.type;
    switch(true){
        case match(type, C.TREE_): dispatchTreeActions(action); break;
        case match(type, C.EDITOR_): dispatchEditorActions(action); break;
    }
});

export default dispatcher;