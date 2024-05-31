import { storeToRefs } from 'pinia'; // import storeToRefs and watch helper hooks from pinia
import { useAuthStore } from '@/store/state.js'; // import the auth store we just created

export default defineNuxtRouteMiddleware((to, from) => {
	const { authenticated, user } = storeToRefs(useAuthStore());

	watch(authenticated, (newValue) => {
		if (!newValue && to.path !== '/login') {
			navigateTo('/login');
		}
		if (newValue && to.path === '/login') {
			navigateTo('/');
		}
	});

	if (!authenticated.value && to.path !== '/login') {
		return navigateTo('/login');
	}
});
