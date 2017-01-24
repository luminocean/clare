#!/usr/bin/env bash

dir=`dirname $0`

if [ ! -d $dir/venv/ ]; then
    echo 'Virtual environment not set. Installing...'
    /usr/bin/env python $dir/scripts/install.py
fi

source $dir/venv/bin/activate

python clare.py