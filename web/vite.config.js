import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {PrimeVueResolver} from '@primevue/auto-import-resolver';
import * as app_config from 'config';

// https://vite.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  const base_path = process.env.VITE_BASE_PATH || './';
  console.log(`* NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`* mode: ${mode}`);
  console.log(`* base_path: ${base_path}`);

  return defineConfig({
    base: base_path,

    server: {
      host: '0.0.0.0',
      port: 6060,
    },

    define: {
      app_config: app_config.default,
      'import.meta.env': JSON.stringify(process.env),
    },

    plugins: [
      vue(),
      Components({
        resolvers: [
          PrimeVueResolver()
        ]
      }),
    ],
  })
}
