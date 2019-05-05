import pageRoutes from './router.config';

export default {
  // add for transfer to umi
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loading.tsx',
        },
        dva: {
          hmr: true,
        },
        targets: {
          ie: 11,
        },
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        /* dynamicImport: {
          webpackChunkName: true,
        }, */
      },
    ],
  ],
  chainWebpack(config, { webpack }) {
    if (process.env.NODE_ENV !== 'development') {
      config.merge({
        optimization: {
          minimize: true,
          splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 3,
            automaticNameDelimiter: '.',
            cacheGroups: {
              vendor: {
                name: 'vendors',
                test({ resource }) {
                  return /[\\/]node_modules[\\/]/.test(resource);
                },
                priority: 10,
              },
            },
          },
        }
      });
    }
  },
  targets: {
    ie: 11,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': '#2F54EB',
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  // proxy: {
  //   '/server/api/': {
  //     target: 'https://preview.pro.ant.design/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/server': '' },
  //   },
  // },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,

  cssnano: {
    mergeRules: false,
  },

  // extra configuration for egg
  runtimePublicPath: true,
  hash: true,
  outputPath: '../public',
  manifest: {
    fileName: '../../config/manifest.json',
    publicPath: '',
  },
};
