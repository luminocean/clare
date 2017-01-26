import os


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
