import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 配置别名 例如@src == ../src
      // '@utils': resolve(__dirname, './src/common/utils.js'),
      // "@": resolve(__dirname, "./src"),
    },
  },
})
