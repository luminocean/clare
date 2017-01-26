import url from 'url'
import axios from 'axios';

import * as config from '../configuration/config'

/**
 * @param basePath need to be a relative path not start with /
 */
export function listDirectory(basePath){
    const path = url.resolve(`${config.apiURL}/directory/`, basePath);
    return axios.get(path)
        .then((res) => res.data.items);
}