var webpack = require('webpack'); 
var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        client: ['babel-polyfill','./src/client/index.jsx']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: ['.js','.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['react','env','stage-3'],
                        plugins: ['transform-class-properties']
                    }
                }
            },   
            {
                test: /\.(png|svg|jpg|gif)$/, 
                use:[  
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
/*            {
                test: /\.css$/, 
                use: MiniCssExtractPlugin.extract({
                    fallback:'style-loader',
                    use: [
                        { 
                            loader: 'css-loader',
                            options: {minimize:true}
                        }
                    ]
                })
            }
*/
        ]
    },
    plugins: [new MiniCssExtractPlugin({
      filename: 'styles.css',
    })]
};
