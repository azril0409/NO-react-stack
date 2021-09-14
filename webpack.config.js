const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index',
    output: {
        library: 'no-react-stack',
        libraryTarget: 'umd',
        path: path.join(__dirname, 'lib'),
        filename: 'lib.js',
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        },
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
        }],
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
};
