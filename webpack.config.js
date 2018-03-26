const webpack = require("webpack");
const path = require("path");

const webpackConfig = {
    watch: true,
    entry: "./public/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["babel-preset-env", "babel-preset-react"]
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ["style-loader", "css-loader"]
            }
        ]
    },
    optimization: {
        minimize: false
    }
};

if (process.argv[2] === "-p") {
    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify("production")
                }
            }
        })
    );
    webpackConfig.optimization.minimize = true;
}
