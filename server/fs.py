import os
from functools import wraps


class ResourceError(Exception):
    pass


def check_resource(allows=None):
    allows = allows or []

    def decorator(func):
        @wraps(func)
        def func_wrapper(path, *args):
            if 'file' in allows and os.path.isfile(path):
                return func(path, *args)
            elif 'dir' in allows and os.path.isdir(path):
                return func(path, *args)
            raise ResourceError('Resource type not allowed')
        return func_wrapper

    return decorator


@check_resource(allows=['dir'])
def list_directory(dir_path):
    """
    List names of files or dirs under the the given dir
    :param dir_path: files or dirs under which to be listed
    :return: a list of file or dir items which look like {name: 'NAME', type: 'TYPE'}
    """
    items = []
    for file_name in os.listdir(dir_path):
        item = {
            'name': file_name
        }

        item_path = os.path.join(dir_path, file_name)

        if os.path.isdir(item_path):
            item['type'] = 'dir'
        elif os.path.isfile(item_path):
            item['type'] = 'file'

        items.append(item)

    return items


@check_resource(allows=['file'])
def read_file(file_path):
    with open(file_path) as f:
        text = f.read()
    return text


@check_resource(allows=['file'])
def write_file(file_path, text):
    with open(file_path, 'w') as f:
        f.write(text)

