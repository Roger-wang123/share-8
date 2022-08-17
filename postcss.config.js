module.exports = {
    plugins: [
        [
            "postcss-preset-env",
            {
                browsers: 'last 2 versions'
            },
        ],
        require('postcss-px-to-viewport')({
            unitToConvert: 'px',
            viewportWidth: 375,
            unitPrecision: 5
        }),
        require('cssnano')({
            preset: ['default', {
                discardComments: true
            }]
        })
    ],
};