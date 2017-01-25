import os

from flask import Flask, jsonify

import fs

cwd_path = os.path.abspath('.')


def path_in_fs(path):
    """
    convert a path requested by user into the real path in the file system
    the result shall not go out of current directory (which will be a disaster for security)
    :param path: path requested by user
    :return: the real path in the file system
    """
    p = os.path.abspath(os.path.join('.', path))
    if len(p) < len(cwd_path):
        raise Exception('Invalid path %s: out of range' % path)
    return p

app = Flask(__name__)


@app.route('/items/')
@app.route('/items/<path>')
def route_items(path='.'):
    fs_path = path_in_fs(path)
    items = fs.list_items(fs_path)
    res = {
        'items': items
    }
    return jsonify(**res)


if __name__ == '__main__':
    app.run(port=4132, debug=True)
