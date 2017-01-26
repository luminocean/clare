import EventEmitter from 'events'
import {listDirectory} from '../io/TreeIO'

class TreeStore extends EventEmitter{
    init(){
        listDirectory('')
            .then((items) => this.notify(items))
            .catch((e) => console.error(`List Directory on server failed: ${e}`));
    }

    notify(items){
        this.emit('TREE_DATA_UPDATED', items);
    }
}

export default new TreeStore();
