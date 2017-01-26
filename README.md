# What is this?

This is an editor in browser.
You can use this tool to develop apps on any UNIX machines as an alternative to CUI editors like VIM or Emacs.


# Build

### 1. setup server side environment

Make sure you have Python 2.6 or 2.7 on your machine which is reachable from `PATH`.
Besides, you need to have pip and virtualenv installed as well.

Run:
```
./server/scripts/install.py
```
The server side environment will setup in virtual environment.

### 2. client compilation

You need to have Node.js installed and run:
```
npm run build
```

# Usage

`cd` to any directory you want to develop in.

Start server with:
```
PATH_TO_YOUR_CLARE_BUILDS/bin/clare
```

Open `PATH_TO_YOUR_CLARE_BUILDS/build/index.html` with your favourite browser and you are good to go.