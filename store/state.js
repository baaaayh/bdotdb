import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    persist: {
        enabled: true, // 새로운 persist 옵션 사용
        strategies: [
            {
                key: 'auth', // 데이터를 저장할 키 이름
                storage: persistedState.sessionStorage, // 저장소 선택 (localStorage, sessionStorage, cookiesStorage)
            },
        ],
    },
    state: () => ({
        authenticated: JSON.parse(JSON.stringify(useCookie('auth'))), // 초기값 설정
        user: null,
    }),
    actions: {
        async authenticateUser(user) {
            this.user = user;
            this.authenticated = true;
        },
        async logoutUser() {
            this.user = null;
            this.authenticated = false;
        },
    },
});
