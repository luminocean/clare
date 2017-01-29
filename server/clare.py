import os

import json
from flask import Flask, jsonify, request
from flask_cors import CORS

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
CORS(app)


@app.route('/directory/')
@app.route('/directory/<path:path>')
def route_items(path='.'):
    fs_path = path_in_fs(path)
    items = fs.list_directory(fs_path)
    res = {
        'items': items
    }
    return jsonify(**res)


@app.route('/file/', methods=['GET', 'POST'])
@app.route('/file/<path:path>', methods=['GET', 'POST'])
def route__file(path):
    fs_path = path_in_fs(path)
    print fs_path

    if request.method == 'GET':
        text = fs.read_file(fs_path)
        res = {
            'text': text
        }
        return jsonify(**res)
    elif request.method == 'POST':
        requset_data = json.loads(request.data)
        path = requset_data['path']
        text = requset_data['text']

        fs_path = path_in_fs(path)
        fs.write_file(fs_path, text)
        res = {
            'response': 'OK'
        }
        return jsonify(**res)


if __name__ == '__main__':
    app.run(port=4132, debug=True)
