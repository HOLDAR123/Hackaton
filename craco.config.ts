import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

interface Configuration {
    webpack: {
        configure: (
            webpackConfig: WebpackConfiguration & { devServer?: WebpackDevServerConfiguration }
        ) => WebpackConfiguration & { devServer?: WebpackDevServerConfiguration };
    };
}

const config: Configuration = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig!.resolve!.plugins = [
                new TsconfigPathsPlugin({
                    configFile: './tsconfig.json',
                }),
            ];
            return webpackConfig;
        },
    },
};

export default config;
