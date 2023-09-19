import {
  defineConfig,
  PluginOption,
  splitVendorChunkPlugin,
  loadEnv,
} from 'vite'
import path from 'path'
import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react-swc'
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css'
import commonjs from 'rollup-plugin-commonjs'
import externalGlobals from 'rollup-plugin-external-globals'
import { visualizer } from 'rollup-plugin-visualizer'
import svgr from 'vite-plugin-svgr'

export default ({ mode }: { mode: any }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), ''),
  }

  return defineConfig({
    base: process.env.VITE_VITE_BASE,
    plugins: [
      basicSsl(),
      react(),
      svgr(),
      reactScopedCssPlugin() as PluginOption,
      splitVendorChunkPlugin(),
      ...(process.env.BUILD_ANALYZE === 'true'
        ? [
            visualizer({
              open: true,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
    server: {
      host: '0.0.0.0',
      port: 6800,
      https: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react-router-dom',
          'lodash',
          'dayjs',
          'axios',
          'antd',
          '@ant-design/pro-components',
          '@ant-design/icons',
          'xgplayer',
        ],
        plugins: [
          commonjs(),
          externalGlobals({
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            lodash: '_',
            dayjs: 'dayjs',
            axios: 'axios',
            antd: 'antd',
            '@ant-design/pro-components': 'ProComponents',
            '@ant-design/icons': 'icons',
            xgplayer: 'Player',
          }),
        ],
      },
    },
  })
}
