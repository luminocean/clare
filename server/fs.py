import os


def list_items(dir_path):
    """
    List names of files or dirs under the the given dir
    :param dir_path: files or dirs under which to be listed
    :return: a list of file or dir names
    """
    return os.listdir(dir_path)
