const path = require('path');

module.exports = {
    entry: './src/PD.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'PD.js'
    }
}