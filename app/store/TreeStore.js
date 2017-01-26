import EventEmitter from 'events'
import url from 'url'
import uuid from 'uuid'
import axios from 'axios';
import * as config from '../configuration/config'
import {done, logAndThrow} from '../util/util'

/**
 * list items on given path
 * each item looks like {name: 'NAME', type: 'TYPE'}
 * @param basePath need to be a relative path not start with /
 */
const listDirectory = (basePath) => {
    const path = url.resolve(`${config.apiURL}/directory/`, basePath);
    return axios.get(path)
        .catch(logAndThrow)
        .then((res) => res.data.items)
        // add uuid
        .then((items) => items.map((item) => {
            item.id = uuid.v4();
            item.basePath = basePath;
            return item;
        }));
};

class TreeStore extends EventEmitter{
    init(){
        return listDirectory('')
            // set to root
            .then((items) => this.root = items)
            // root update done
            .then(() => this.emit('TREE_DATA_UPDATED', this.root))
            .catch(done);
    }

    expendDirectory(id){
        let names = this._locatePath(this.root, id);
        let path = names.join('/');
        let target = this._locateItem(this.root, id);

        // fetch sub items
        listDirectory(path).then((items) => {
            target.children = items;
            this.emit('TREE_DATA_UPDATED', this.root);
        }).catch(done);
    }

    _locatePath(items, id){
        for(let i=0; i<items.length; i++){
            let item = items[i];

            if( item.id === id ) return [item.name];
            if( item.children && item.children.length ){
                let descendantNames = this._locatePath(item.children, id);
                if( descendantNames.length > 0 ){
                    return [item.name].concat(descendantNames);
                }
            }
        }
        return [];
    }

    _locateItem(items, id){
        for(let i=0; i<items.length; i++){
            let item = items[i];

            if( item.id === id ) return item;
            if( item.children && item.children.length ){
                let res = this._locateItem(item.children, id);
                if( res !== null ) return res;
            }
        }
        return null;
    }
}

export default new TreeStore();
