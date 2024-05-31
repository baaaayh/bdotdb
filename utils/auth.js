import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
	const useAuthState = () => useState('auth', () => ({ user: null }));

	nuxtApp.$auth = {
		get user() {
			return useAuthState().value.user;
		},

		set user(value) {
			useAuthState().value.user = value;
		},

		async login(id, pw) {
			try {
				const response = await $fetch('/api/auth', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: { operation: 'login', data: { id, pw } },
				});

				if (response.success) {
					this.user = id;
				}

				navigateTo('/');

				return response;
			} catch (error) {
				console.error(error);
				return { success: false };
			}
		},

		async logout() {
			try {
				const response = await $fetch('/api/auth', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: { operation: 'logout' },
				});

				if (response.success) {
					this.user = null;
				}

				navigateTo('/login');

				return response;
			} catch (error) {
				console.error(error);
				return { success: false };
			}
		},

		async userInfo() {
			try {
				const user = useCookie('user_name');
				return user;
			} catch (error) {
				console.error('Failed to fetch user info:', error);
				return null;
			}
		},
	};
});
