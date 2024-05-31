<template>
	<div class="dashboard">
		<div class="notice">
			<div class="notice__box">
				<div class="notice__wrap">
					<div class="notice__category">구축 프로젝트</div>
					<ul class="notice__list">
						<li v-for="(item, index) in Object.values(projects.build).slice(0, 3)" :key="index" class="notice__item">
							<nuxt-link :to="`/project/${item.id}`" class="notice__inner">
								<div class="notice__head">
									<div class="notice__title">{{ item.project }}</div>
									<div class="notice__info" v-if="item.period">{{ item.period }}</div>
								</div>
								<div class="notice__text">{{ item.notice }}</div>
							</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
			<div class="notice__box">
				<div class="notice__wrap">
					<div class="notice__category">운영 프로젝트</div>
					<ul class="notice__list">
						<li v-for="(item, index) in Object.values(projects.maintain).slice(0, 3)" :key="index" class="notice__item">
							<nuxt-link :to="`/project/${item.id}`" class="notice__inner">
								<div class="notice__head">
									<div class="notice__title">{{ item.project }}</div>
									<div class="notice__info" v-if="item.period">{{ item.period }}</div>
								</div>
								<div class="notice__text">{{ item.notice }}</div>
							</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
const projects = ref({
	build: {},
	maintain: {},
});

import axios from 'axios';
const findProject = async (e) => {
	try {
		let response = await axios.get('/api/project/get');
		response.data.reverse();

		response.data.sort((a, b) => {
			const dateA = new Date(a['update']);
			const dateB = new Date(b['update']);
			return dateB - dateA;
		});

		projects.value.build = response.data.filter((item) => {
			return item.category === 'build';
		});
		projects.value.maintain = response.data.filter((item) => {
			return item.category === 'maintain';
		});
	} catch (err) {
		alert(err);
	}
};

onBeforeMount(() => {
	findProject();
});
</script>
