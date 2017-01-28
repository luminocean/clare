import EventEmitter from 'events'
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

    /**
     * open a tab in tab bar
     * @param path
     * @private
     */
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
                // name: path, // name is the same as path before simplification
                focused: true
            };
            this.tabs.push(tab);
        }
        // existing tab
        else{
            let tab = this.tabs[index];
            tab.focused = true;
        }

        this._setTabNames(this.tabs);
        this.emit(C.EDITOR_TAB_UPDATED, this.tabs);
    }

    /**
     * load text into editor
     * @param path
     * @private
     */
    _loadText(path){
        fetchText(path).then((text) => {
            this.emit(C.EDITOR_TEXT_LOADED, path, text);
        }).catch(done);
    }

    _setTabNames(tabs){
        let root = new Map();

        tabs.forEach((tab) => {
            let lastMap = root;
            let splits = tab.path.split('/').reverse();
            splits.forEach((split) => {
                // add a new node
                if(!lastMap.get(split)){
                    let newNode = {
                        split: split,
                        count: 1,
                        children: new Map(),
                        lastRelatedTab: tab
                    };
                    lastMap.set(split, newNode);
                }else{
                    lastMap.get(split).count += 1;
                }

                // step in
                lastMap = lastMap.get(split).children;
            });

            // iterate next tab
            lastMap = root;
        });

        const setTabNames = (map, suffix) => {
            let nodes = [...map.values()];
            for(let i=0; i<nodes.length; i++){
                let {split, count, children, lastRelatedTab} = nodes[i];

                let name = split + (suffix ? '/'+suffix :'');
                if(count === 1){
                    lastRelatedTab.name = name;
                }else{
                    setTabNames(children, name);
                }
            }
        };
        setTabNames(root);

        return tabs;
    }
}

export default new EditorStore();