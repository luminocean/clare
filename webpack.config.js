const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;

const stageIs = (str) => {
    return TARGET === str;
};

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    public: path.join(__dirname, 'public'),
    nodeModules: path.join(__dirname, 'node_modules')
};

const HtmlWebpackMinifyOption = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true
};

// some dependencies that go with client js scripts
const clientScriptDeps = stageIs('start')? [
    require.resolve('react-dev-utils/webpackHotDevClient')
]:[];

const common = {
    // supports multiple bundles
    entry: {
        index: clientScriptDeps.concat([
            PATHS.app + '/index.js'
        ])
    },
    output: {
        path: PATHS.build,
        // append hash only in production
        filename: `static/js/[name]${stageIs('build')?'.[hash:8]':''}.js`,
        chunkFilename: `static/js/[name]${stageIs('build')?'.[chunkhash:8]':''}.chunk.js`,
        // // this will be the prefix of the file name above whose default is ''
        // publicPath: '/',
    },
    // extension sequence used to resolve modules
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint',
                include: PATHS.app,
            }
        ],
        loaders: [
            // load other resources to output dir
            {
                exclude: [
                    /\.html$/,
                    /\.(js|jsx)$/,
                    /\.css$/,
                    /\.json$/
                ],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: `static/media/[name]${stageIs('build')?'.[hash:8]':''}.[ext]`
                }
            },
            // handle import of css files and inject them into bundled js files
            {
                test: /\.css$/,
                include: [PATHS.app, PATHS.nodeModules],
                loaders: ['style', 'css']
            },
            // handle js and jsx files by converting them into ES5 compatible js code
            {
                // supports both .js and .jsx files
                test: /\.jsx?$/,
                include: PATHS.app,
                loader: 'babel',
                query: {
                    // need this two parameters for babel to handle es6 and react related features
                    presets: ['es2015', 'react'],
                    // enables cache for faster recompilation
                    cacheDirectory: stageIs('start')
                }
            }
        ]
    },
    plugins: [
        // read the template html files, inject bundles from entries
        // and write the injected html files into output directory
        new HtmlWebpackPlugin({
            // injected file name
            filename: 'index.html',
            // chunks (defined in entry) you want to inject them into the template file
            chunks: ['index'],
            template: PATHS.public + '/index.html',
            // favicon: PATHS.public + '/favicon.ico',
            minify: stageIs('build')?HtmlWebpackMinifyOption : null
        }),
    ]
};

module.exports = common;

if (stageIs('start')) {
    module.exports = merge(module.exports, {
        devtool: 'source-map',
        // config for webpack-dev-server
        devServer: {
            // Actually webpack-dev-server doesn't need a concrete path.
            // It will serve built assets from a 'virtual' build path.
            // Here we specify the public dir as the contentBase so that
            // files can be served by webpack-dev-server from this dir al well as
            // the virtual build path
            contentBase: PATHS.public,
            hot: true,
            inline: true,
            // stats: 'errors-only'
            // progress: true,
            // historyApiFallback: true
        },
        plugins: [
            // support hot module replacement during development
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

if (stageIs('build')) {
    module.exports = merge(module.exports, {
        plugins: [
            // search entry points in the chunks options and extract their common modules into a single file
            // if the chunks option is not specified, all entry points will be used
            new webpack.optimize.CommonsChunkPlugin({
                chunks: ['index', /*, 'random'*/],
                name: 'common',
                filename: `static/js/[name]${stageIs('start')?'':'.[hash:8]'}.js`
            }),
            new webpack.optimize.DedupePlugin(),
            // used to produce production code for react,
            // instead of just minifing development code since some code used
            // in development only will be minified instead of completely removed
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false // disable annoying warnings
                }
            })
        ]
    });
}
