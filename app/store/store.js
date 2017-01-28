import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import editorReducer from './editorRecuder'
import treeReducer from './treeReducer'

const logger = createLogger();

export function appStore(){
    return createStore(
        combineReducers({
            editor: editorReducer,
            tree: treeReducer
        }),
        applyMiddleware(
            thunkMiddleware,
            logger
        )
    );
}