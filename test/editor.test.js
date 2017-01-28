import editorStore from '../app/store/EditorStore'

describe('Editor tab bar', () => {
    it('should simplify file paths showed in tabs', () => {
        let tabs = [{
            path: 'aa/bb/ww.js'
        },{
            path: 'aa/cc/ww.js'
        },{
            path: 'cc/dd/qq.js'
        }];

        expect(editorStore._setTabNames(tabs)).toEqual([{
            path: 'aa/bb/ww.js',
            name: 'bb/ww.js'
        },{
            path: 'aa/cc/ww.js',
            name: 'cc/ww.js'
        },{
            path: 'cc/dd/qq.js',
            name: 'qq.js'
        }]);
    });
});