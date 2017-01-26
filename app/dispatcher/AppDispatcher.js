import {Dispatcher} from 'flux'

import treeStore from '../store/TreeStore'

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

const dispatcher = new Dispatcher();

dispatcher.register((action) => {
    let type = action.type;
    switch(true){
        case match(type, 'TREE_'): dispatchTreeActions(action); break;
    }
});

export default dispatcher;