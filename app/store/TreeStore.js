import EventEmitter from 'events'
import url from 'url'
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
            .then((items) => this.root = items)
            .then(() => {
                this.notify(this.root);
            });
    }

    notify(root){
        this.emit('TREE_DATA_UPDATED', root);
    }
}

export default new TreeStore();
