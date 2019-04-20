const path = require('path');

module.exports = {
    entry: './src/PD.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'PD.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'demo'),
        port: 9000,
        index: 'index.html'
    }
}