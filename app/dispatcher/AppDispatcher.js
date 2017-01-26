import {Dispatcher} from 'flux'
import path from 'path'
import treeStore from '../store/TreeStore'
import editorStore from '../store/EditorStore'

const match = (type, prefix) => {
    return type.startsWith(prefix);
};

// const dispatchEditorActions = (action) => {return};
const dispatchTreeActions = (action) => {
    switch(action.type){
        case 'TREE_INIT': treeStore.init(); break;
        case 'TREE_EXPAND_NODE': treeStore.expendDirectory(action.id); break;
    }
};

const dispatchEditorActions = (action) => {
    switch(action.type) {
        case 'EDITOR_LOAD_FILE': editorStore.loadFile(path.join(action.basePath, action.name)); break;
    }
};

const dispatcher = new Dispatcher();

dispatcher.register((action) => {
    let type = action.type;
    switch(true){
        case match(type, 'TREE_'): dispatchTreeActions(action); break;
        case match(type, 'EDITOR_'): dispatchEditorActions(action); break;
    }
});

export default dispatcher;