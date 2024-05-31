export default defineNuxtRouteMiddleware((to, from, toContext) => {
	useSeoMeta(to.meta);
});
