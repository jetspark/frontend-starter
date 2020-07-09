const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

mix.disableSuccessNotifications()
    .webpackConfig({
        plugins: [
            new SVGSpritemapPlugin('src/svg/**/*.svg', {
                output: {
                    filename: 'public/assets/img/sprite.svg'
                }
            }),
            new LiveReloadPlugin({
                appendScriptTag: process.env.NODE_ENV !== 'production'
            })
        ],
        resolve: {
            alias: {
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
    // .extract()
    // .version()
    .sourceMaps();
