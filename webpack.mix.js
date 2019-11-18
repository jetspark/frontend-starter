const mix = require('laravel-mix');
const glob = require('glob-all');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
require('laravel-mix-purgecss');

mix.disableSuccessNotifications()
    .webpackConfig({
        plugins: [
            new SVGSpritemapPlugin('src/svg/**/*.svg', {
                output: {
                    filename: 'public/assets/img/sprite.svg'
                }
            }),
            new ExtraWatchWebpackPlugin({
                files: [
                    'public/**/*.html',
                    'public/**/*.php'
                ],
            }),
            new LiveReloadPlugin({
                appendScriptTag: process.env.NODE_ENV !== 'production'
            })
        ],
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.runtime.esm.js',
                '@': path.resolve('src/js'),
            },
        },
    })
    .js('src/js/app.js', 'public/assets/js')
    .postCss('src/css/app.css', 'public/assets/css', [
        require('postcss-import'),
        require('postcss-nested'),
        require('tailwindcss'),
    ])
    .purgeCss({
        paths: () => glob.sync([
            path.join(__dirname, '/public/**/*.html'),
            path.join(__dirname, '/public/**/*.php'),
            path.join(__dirname, '/src/**/*.js'),
            path.join(__dirname, '/src/**/*.vue'),
        ]),
    })
    // .extract()
    // .version()
    .sourceMaps();