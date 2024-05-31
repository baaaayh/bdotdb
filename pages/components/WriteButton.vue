<template>
	<div class="button-wrap">
		<nuxt-link v-if="$route.path === '/project'" :to="`${$route.path}/write`" class="btn">등록하기</nuxt-link>
		<nuxt-link v-if="$route.params.id" :to="`/project/update/${$route.params.id}`" class="btn">수정하기</nuxt-link>
		<button v-if="$route.params.id" class="btn btn--bd" @click="deleteProject">삭제하기</button>
	</div>
</template>

<script setup>
const { deleteProject } = defineProps(['deleteProject']);
</script>
