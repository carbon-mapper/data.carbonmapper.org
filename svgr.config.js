module.exports = {
    svgoConfig: {
        plugins: [
            'cleanupEnableBackground',
            'cleanupNumericValues',
            'removeDimensions',
            'removeDoctype',
            'removeXMLNS',
            'removeXMLProcInst',
            'removeStyleElement',
            'sortAttrs',
        ],
    },
};
