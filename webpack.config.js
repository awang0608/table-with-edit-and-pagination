// table-with-edit-and-pagination/webpack.config.js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

module.exports = {
  mode: 'production', 
  
  entry: {
    index: './src/index.ts'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, "lib"),
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        loaders: ['babel-loader', 'ts-loader']
      },
      { 
        test: /\.(css|less)$/, 
        exclude: /node_modules/, 
        use: [
          require.resolve('style-loader'),
          {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: true,
              },
          },
          {
            loader: require.resolve('less-loader'), // compiles Less to LESS
            options: {
              importLoaders: 2,
              modules: true,   
              getLocalIdent: getCSSModuleLocalIdent,
              localIdentName: '[local]--[hash:base64:5]'
            },
          },
        ]
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin()
  ],

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      react: path.resolve('./node_modules/react') ,
      'react-dom': path.resolve('./node_modules/react-dom') ,
    }
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
    }
  }
}