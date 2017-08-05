const path = require('path');

module.exports = {
    //entry file for bundle
    entry: path.join(__dirname, 'client/src/app.jsx'),
    //resulting bindle file
    output:{
        path: path.join(__dirname, '/client/dist/js'),
        filename: 'app.js',
    },

    module: {
        //apply this to files that meet the given conditons
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, '/client/src'),
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }],
    },
    //lets webpack see changes and dynamically rebuild the bundle
    watch: true
};