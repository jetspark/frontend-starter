const mix = require('laravel-mix');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

mix.disableSuccessNotifications()
    .webpackConfig({
        plugins: [
            new SVGSpritemapPlugin('src/svg/**/*.svg', {
                output: {
                    filename: 'public/assets/img/sprite.svg'
                }
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve('src/js'),
                'vue$': 'vue/dist/vue.esm.js',
            },
        },
    })
    .browserSync({
        proxy: 'frontend-starter.loc',
        host: 'frontend-starter.loc',
        open: false,
        notify: false,
        minify: false,
        files: ['src/**/*', 'public/**/*.html', 'public/**/*.php']
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
