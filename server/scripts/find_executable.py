from __future__ import absolute_import, division, print_function, unicode_literals
import os
import re
import subprocess


def _exe_in_path(program_name, paths):
    for path in paths:
        file_path = os.path.join(path, program_name)
        if os.path.isfile(file_path) and os.access(file_path, os.X_OK):
            return True
    return False


def _search(search_list, fallback_list):
    paths = os.environ['PATH'].split(os.pathsep)
    for exe in search_list:
        if _exe_in_path(exe, paths):
            return exe

    for exe, regex in fallback_list:
        if _exe_in_path(exe, paths):
            p = subprocess.Popen([exe, '-V'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            out, err = p.communicate()
            result = out or err or ''
            # use regex to check here
            if re.match(regex, result):
                return exe
    return None


def find_python2():
    search_list = ['python2.7', 'python2.6']
    fallback_list = [('python', r'^Python\s2\.')]
    return _search(search_list, fallback_list)


def find_pip2():
    search_list = ['pip-2.7', 'pip-2.6']
    fallback_list = [('pip', r'\(python\s2\.')]
    return _search(search_list, fallback_list)
