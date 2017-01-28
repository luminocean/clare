import url from 'url'
import path from 'path'
import axios from 'axios';
import * as config from '../configuration/config'
import {done, logAndThrow} from '../util/util'
import {openFile} from './editorAction'
import * as C from '../util/constants'

/**
 * list items on given path
 * each item looks like {name: 'NAME', type: 'TYPE', path: 'PATH'}
 * @param basePath need to be a relative path not start with /
 */
const listDirectory = (basePath) => {
    const address = url.resolve(`${config.apiURL}/directory/`, basePath);

    return axios.get(address)
        .catch(logAndThrow)
        .then((res) => res.data.items)
        // add full path which can be used as an unique id
        .then((items) => items.map((item) => {
            item.path = path.join(basePath, item.name);
            return item;
        }));
};

/** ACTIONS BELOW **/

export function initTree(){
    let path = '';
    return (dispatch) => {
        listDirectory(path)
            .then((items) => dispatch({
                type: C.TREE_DATA_UPDATED,
                path: path,
                items: items
            }))
            .catch(done);
    };
}

function openDir(path){
    return (dispatch) => {
        listDirectory(path)
            // update dir items
            .then((items) => dispatch({
                type: C.TREE_DATA_UPDATED,
                path: path,
                items: items
            }))
            // open
            .then(() => dispatch({
                type: C.TREE_OPEN_DIR,
                path: path,
            }))
            .catch(done);
    };
}

function collapseDir(path){
    return {
        type: C.TREE_CLOSE_DIR,
        path: path,
    };
}

export function treeNodeClicked(path, type, opened){
    if( type === 'file'){
        if(opened){
            // no-op
        }else{
            return openFile(path);
        }
    }else if(type === 'dir'){
        if(opened){
            return collapseDir(path);
        }else{
            return openDir(path);
        }
    }
}
