var webpack = require('webpack'); 
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    target: 'node',
    resolve: {
      extensions: ['.js','.jsx']
    },
    externals: [nodeExternals()],
    entry: [
        'babel-polyfill',
       './src/server/server.js'
    ],
    output: {
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react','env','stage-3'],
                        plugins: ['transform-class-properties']
                    }
                }
            },
            {
                
                test: /\.css$/, 
                use: {
                    loader: 'css-loader',
                    options: {
                        plugins:['css-modules-transform']
                    }
                }
            }, 
            {
                //test: /\.(png|svg|jpg|gif)$/, 
                //use: ['file-loader']

                test: /\.(png|svg|jpg|gif)$/, 
                use: [
                  {
                    loader:'file-loader',
                    options: {
                        name: '[name].[ext]'

                    }
                  }
/*
                    {
                        loader: 'image-webpack-loader',
                        options: {

                            mozjpeg: {
                                quality:80
                            },

                            svgo: {
                                quality:80

                            }
                        }
                    }
*/
                    ]
            },
        ]
    },
/*
    plugins: [
    ]
*/
};
