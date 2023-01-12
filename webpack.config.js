const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );

const appEntries = {
    home: './src/js/pages/home.js'
};

module.exports = ( env = { mode: 'development' }, args ) => {
    const isProduction = args.mode === 'production';
    const outPath = isProduction ? 'dist' : 'dev';
    const outFileNaming = isProduction ? '[name].[contenthash].js' : '[name].[fullhash].js';

    const loaders = {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader', {
                    loader: 'sass-loader',
                    options: {
                        implementation: require( 'node-sass' )
                    }
                }]
            }
        ]
    };

    if ( isProduction ) {
        loaders.rules.push(
            {
                test: /\.js$/,
                exclude: /[\\/]node_modules[\\/](?!(lit-element|lit-html|lit)[\\/]).*/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false,
                                    targets: {
                                        ie: 11,
                                    },
                                },
                            ],
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    regenerator: true,
                                },
                            ]
                        ]
                    }
                }
            }
        );
    }

    const optimizations = {
        minimize: isProduction,
        minimizer: [
            new CssMinimizerPlugin()
        ],

        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    name: 'commons',
                    enforce: true
                }
            }
        }
    };

    const plugins = [
        new MiniCssExtractPlugin( {
            filename: '[name].[fullhash].css',
            chunkFilename: '[id].css',
            runtime: false,
            ignoreOrder: true
        } )
    ];

    return [
        // App entry points
        {
            entry: appEntries,
            output: {
                clean: true,
                filename: outFileNaming,
                path: path.resolve( __dirname, `static/js/${outPath}/pages/` ),
                publicPath: `/js/${outPath}/pages/`
            },
            target: isProduction ? ['web', 'es5'] : ['web'],
            module: loaders,
            optimization: optimizations,
            plugins
        }
    ];
}