import EventEmitter from 'events'
import url from 'url'
import axios from 'axios';
import * as config from '../configuration/config'
import {done, logAndThrow} from '../util/util'
import * as C from '../util/constants'

const fetchText = (basePath) => {
    const path = url.resolve(`${config.apiURL}/file/`, basePath);

    return axios.get(path)
        .catch(logAndThrow)
        .then((res) => res.data.text);
};

const clearAllFocused = (tabs) => {
    tabs.forEach((tab) => {
        tab.focused = false;
    });
};

class EditorStore extends EventEmitter{
    constructor(){
        super();
        /**
         * tab bar status. Each tab looks like:
         * {
         *   path: file path,
         *   focused: true or false
         * }
         * @type {Array}
         */
        this.tabs = [];
        /**
         * mapping from path to text
         */
        // this.fileTexts = {};
    }

    openFile(path){
        this._openTab(path);
        this._loadText(path);
    }

    _openTab(path){
        let index = -1;
        for(let i=0; i<this.tabs.length; i++){
            let tab = this.tabs[i];
            if(tab.path === path){
                index = i;
                break;
            }
        }

        clearAllFocused(this.tabs);

        // new tab
        if(index === -1){
            let tab = {
                path: path,
                focused: true
            };
            this.tabs.push(tab);
        }
        // existing tab
        else{
            let tab = this.tabs[index];
            tab.focused = true;
        }

        this.emit(C.EDITOR_TAB_UPDATED, this.tabs);
    }

    _loadText(path){
        // load text into editor
        fetchText(path).then((text) => {
            this.emit(C.EDITOR_TEXT_LOADED, path, text);
        }).catch(done);
    }
}

export default new EditorStore();