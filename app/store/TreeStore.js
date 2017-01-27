import EventEmitter from 'events'
import url from 'url'
import path from 'path'
import axios from 'axios';
import * as config from '../configuration/config'
import {done, logAndThrow} from '../util/util'
import * as C from '../util/constants'

/**
 * list items on given path
 * each item looks like {name: 'NAME', type: 'TYPE'}
 * @param basePath need to be a relative path not start with /
 */
const listDirectory = (basePath) => {
    const addr = url.resolve(`${config.apiURL}/directory/`, basePath);
    return axios.get(addr)
        .catch(logAndThrow)
        .then((res) => res.data.items)
        // add full path which can be used as an unique id
        .then((items) => items.map((item) => {
            item.path = path.join(basePath, item.name);
            return item;
        }));
};

class TreeStore extends EventEmitter{
    init(){
        return listDirectory('')
            // set root
            .then((items) => this.root = items)
            // root update done
            .then(() => this.emit(C.TREE_DATA_UPDATED, this.root))
            .catch(done);
    }

    expendDirectory(path){
        let target = this._locateItem(this.root, path);

        // fetch sub items
        listDirectory(path).then((items) => {
            target.children = items;
            this.emit(C.TREE_DATA_UPDATED, this.root);
        }).catch(done);
    }

    _locateItem(items, path){
        for(let i=0; i<items.length; i++){
            let item = items[i];

            if( item.path === path ) return item;
            if( item.children && item.children.length ){
                let res = this._locateItem(item.children, path);
                if( res !== null ) return res;
            }
        }
        return null;
    }
}

export default new TreeStore();
