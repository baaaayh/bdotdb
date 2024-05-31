export default defineNuxtConfig({
	ssr: true,
	devtools: { enabled: true },
	css: ['@/public/scss/common.scss'],
	modules: ['nuxt-server-utils', 'nuxt-mongoose', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
	runtimeConfig: {
		MONGODB_URI: 'mongodb+srv://baaaayh:baaaayh11@database.ud2ydem.mongodb.net/bdot',
	},
	nitro: {
		plugins: ['@/server/db/index.ts'],
	},
	mongoose: {
		uri: 'mongodb+srv://baaaayh:baaaayh11@database.ud2ydem.mongodb.net/bdot',
		options: {},
		modelsDir: '@/mongoose',
	},
	plugins: ['@/utils/auth.js'],
	pinia: {
		storesDirs: ['@/store/**'],
	},
});
