const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './index',
    output: {
        library: 'no-react-stack',
        libraryTarget: 'umd',
        path: path.join(__dirname, 'lib'),
        filename: 'index.js',
    },
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
    resolve: {extensions: ['', '.js', '.jsx']},
};
