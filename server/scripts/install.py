#! /usr/bin/env python

from __future__ import absolute_import, division, print_function, unicode_literals

import os
import shutil
import sys

import find_executable as fe

current_dir = os.path.abspath(os.path.dirname(__file__))
venv_path = os.path.abspath('%s/../venv' % current_dir)
options = {}


def ensure_python2():
    exe = fe.find_python2()
    if not exe:
        print('No Python 2.6 or Python 2.7 exists.', file=sys.stderr)
        exit(1)
    if sys.version_info >= (3, 0):
        print('Using python3 now, switch to python2')
        cmd = '%s %s' % (exe, sys.argv[0])
        print('Running %s' % cmd)
        os.system(cmd)
        exit(0)
    return exe


def create_virtual_env():
    python2_exe = ensure_python2()

    try:
        import virtualenv
    except ImportError:
        print('No virtualenv found.', file=sys.stderr)
        pip2_exe = fe.find_pip2()
        if not pip2_exe:
            print('No pip for python2 exists. You need to install a pip for python2 first.', file=sys.stderr)
        else:
            print('Run (sudo -H) %s install virtualenv to install.', file=sys.stderr)
        exit(1)

    lib_entry_path = virtualenv.__file__
    virtualenv_exe = os.path.abspath(os.path.join(lib_entry_path, '../../../../bin/virtualenv'))
    if os.path.exists(venv_path):
        print('Virtual environment directory %s already exists. Deleting it...'
              % venv_path, file=sys.stderr)
        shutil.rmtree(venv_path)

    cmd = '%s %s -p %s' % (virtualenv_exe, venv_path, python2_exe)
    os.system(cmd)


def install_dependencies():
    os.system('bash %s/install_dependencies.sh' % current_dir)


if __name__ == '__main__':
    create_virtual_env()
    install_dependencies()











