module.export = {
    configureWebpack: {
        resolve: {
            alias: {
                assets: "@/assets",
                components: "@/components",
                view: "@/views",
                network: '@/network'
            },
        },
    },
    publicPath: "./",
};
