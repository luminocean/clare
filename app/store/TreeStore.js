import EventEmitter from 'events'
import url from 'url'
import uuid from 'uuid'
import axios from 'axios';

import * as config from '../configuration/config'

/**
 * list items on given path
 * each item looks like {name: 'NAME', type: 'TYPE'}
 * @param basePath need to be a relative path not start with /
 */
const listDirectory = (basePath) => {
    const path = url.resolve(`${config.apiURL}/directory/`, basePath);
    return axios.get(path)
        .then((res) => res.data.items)
        .catch((e) => console.error(`List Directory on server failed: ${e}`));
};

class TreeStore extends EventEmitter{
    init(){
        return listDirectory('')
            // add uuid
            .then((items) => items.map((item) => {
                item.id = uuid.v4();
                return item;
            }))
            // set to root
            .then((items) => this.root = items)
            // root update done
            .then(() => {
                this._notify(this.root);
            });
    }

    expendDirectory(id){
        let names = this._locatePath(this.root, id);
        let path = names.join('_');
        console.log(path);
    }

    _notify(root){
        this.emit('TREE_DATA_UPDATED', root);
    }

    _locatePath(items, id){
        for(let i=0; i<items.length; i++){
            let item = items[i];

            if( item.id === id ) return [item.name];
            if( item.children && item.children.length ){
                let descendantNames = this._locatePath(item.children. id);
                if( descendantNames.length > 0 ){
                    return [item.name].concat(descendantNames);
                }
            }
        }
        return [];
    }
}

export default new TreeStore();
