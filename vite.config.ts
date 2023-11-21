// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { viteMockServe } from 'vite-plugin-mock';
import vue from '@vitejs/plugin-vue';
import path from 'path';
export default defineConfig(({ command, mode }) => {
	//获取各种环境下的变量
	let env = loadEnv(mode, process.cwd());
	return {
		plugins: [
			vue(),
			createSvgIconsPlugin({
				// Specify the icon folder to be cached 以后矢量图标就放在src/assets/icons
				iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
				// Specify symbolId format
				symbolId: 'icon-[dir]-[name]',
			}),
			viteMockServe({
				localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
			}),
		],
		resolve: {
			alias: {
				'@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
			},
		},
		//scss全局变量配置
		css: {
			preprocessorOptions: {
				scss: {
					javascriptEnabled: true,
					additionalData: '@import "./src/styles/variable.scss";',
				},
			},
		},
		//代理跨域
		server: {
			proxy: {
				[env.VITE_APP_BASE_API]: {
					//获取数据的服务器地址设置
					target: env.VITE_SERVE,
					//需要代理跨域
					changeOrigin: true,
					//路径重写
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
	};
});
