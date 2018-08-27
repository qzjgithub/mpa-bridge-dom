module.exports = {
    mode: 'production',
    entry : './src/index.js',
    output: {
        path: __dirname,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-0'],
                    }
                },
                exclude: /node_modules/
            }
        ]
    }
}