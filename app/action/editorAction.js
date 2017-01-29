import url from 'url'
import axios from 'axios';
import * as config from '../configuration/config'
import {done, logAndThrow} from '../util/util'
import * as C from '../util/constants'

const fetchText = (path) => {
    const addr = url.resolve(`${config.apiURL}/file/`, path);

    return axios.get(addr)
        .catch(logAndThrow)
        .then((res) => res.data.text);
};

/** ACTIONS BELOW **/

export function openFile(path){
    return function(dispatch){
        fetchText(path)
            .then(text => dispatch({
                type: C.EDITOR_OPEN_FILE,
                path: path,
                text: text
            }))
            .catch(done);
    }
}

export function chooseFile(path){
    return {
        type: C.EDITOR_CHOOSE_FILE,
        path: path
    }
}

export function closeFile(path){
    return {
        type: C.EDITOR_CLOSE_FILE,
        path: path
    }
}

export function textModified(path, text){
    return {
        type: C.EDITOR_TEXT_MODIFIED,
        path: path,
        text: text
    }
}