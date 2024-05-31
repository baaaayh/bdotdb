<template>
    <header class="header">
        <div class="header__inner">
            <div class="logo">
                <h1>
                    <nuxt-link to="/">BDOT</nuxt-link>
                </h1>
            </div>
            <div v-if="authenticated" class="header__right">
                <div class="header__user">{{ id }} 님, 반갑습니다!</div>
                <button @click="handleLogout">LOGOUT</button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '@/store/state.js'; // import the auth store we just created

const { logoutUser } = useAuthStore();

const { authenticated, user } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const id = ref(null);

id.value = user.value;

const handleLogout = async () => {
    logoutUser();
    await useNuxtApp().$auth.logout();
};
</script>
