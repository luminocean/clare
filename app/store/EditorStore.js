import EventEmitter from 'events'
import url from 'url'
import axios from 'axios';
import * as config from '../configuration/config'
import {done, logAndThrow} from '../util/util'

const fetchText = (basePath) => {
    const path = url.resolve(`${config.apiURL}/file/`, basePath);

    return axios.get(path)
        .catch(logAndThrow)
        .then((res) => res.data.text);
};

class EditorStore extends EventEmitter{
    loadFile(path){
        fetchText(path).then((text) => {
            this.emit('EDITOR_FILE_LOADED', text);
        }).catch(done);
    }
}

export default new EditorStore();