import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	alias: {
		'element-plus/dist/index.css':resolve(__dirname,'./node_modules/element-plus/dist/index.css'),
		'element-plus':resolve(__dirname,'./node_modules/element-plus/dist/index.full.js'),
	},
	plugins:['~/plugins/element'],
	vite: {
		optimizeDeps: {
			include: ['element-plus']
		}
	},
	ssr: false,
	nitro: {
		serveStatic: false
	},
	css: ["@/assets/scss/main.scss"]
})
