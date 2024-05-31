<template>
	<div class="search">
		<input type="text" name="textChange" v-model="inputText" @keyup="findProject" placeholder="검색어를 입력하세요" />
		<select name="categoryChange" id="categoryChange" @change="findProject">
			<option value="" disabled selected>프로젝트 구분</option>
			<option value="build">구축</option>
			<option value="maintain">운영</option>
		</select>
	</div>
	<div class="project">
		<div class="project__list">
			<ul>
				<li v-for="project in projectList" class="project__item">
					<div class="project__inner">
						<div class="project__thumb">
							<nuxt-link :to="`/project/${project.id}`">
								<img v-if="project.thumbFileName" :src="`/uploads/${project.thumbFileName}`" alt="" />
								<span :class="`project__category ${project.category}`">
									{{ project?.category === 'build' ? '구축' : '운영' }}
								</span>
							</nuxt-link>
						</div>
						<div class="project__contents">
							<div class="project__info">
								<nuxt-link :to="`/project/${project.id}`">
									<div v-if="project.notice" :class="`project__notice ${project.notice ? 'active' : ''}`">
										{{ project.notice }}
									</div>
									<div class="project__period" v-if="project.period">{{ project.period }}</div>
									<div class="project__name">{{ project.project }}</div>

									<div class="project__team">
										<div>기획 담당자 : {{ project.planning }}</div>
										<div>마크업 담당자 : {{ project.markup }}</div>
										<div>디자인 담당자 : {{ project.design }}</div>
									</div>
								</nuxt-link>
							</div>

							<div class="project__bottom">
								<div class="project__link">
									<span>프론트 URL :</span>
									<a :href="`${project.frontUrl}`" target="_blank">{{ project.frontUrl }}</a>
								</div>
								<div class="project__link">
									<span>관리자 URL :</span>
									<a :href="`${project.adminUrl}`" target="_blank">{{ project.adminUrl }}</a>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<WriteButton class="button-wrap button-wrap--mt40" />
		<Pagination :totalPages="totalPages" :currentPage="currentPage" :pageSize="pageSize" @page-changed="handlePageChange" />
	</div>
</template>

<script setup>
import WriteButton from '@/pages/components/WriteButton.vue';
import Pagination from '@/pages/components/Pagination.vue';
import { onMounted, ref } from 'vue';
import axios from 'axios';
const inputText = ref('');
const condition = ref({
	text: '',
	ctg: '',
});
let projectList = ref([]);

const currentPage = ref(1);
const totalPages = ref(0);
const pageSize = 5; // 한 페이지에 보여줄 프로젝트 수

const getProjectList = async () => {
	try {
		const response = await axios.post('/api/project/get', {
			params: {
				page: currentPage.value,
				pageSize: pageSize,
			},
		});
		projectList.value = response.data.projects;
		totalPages.value = response.data.totalPages;
	} catch (err) {
		alert(err);
	}
};

const findProject = async (e) => {
	try {
		if (e.target.name === 'categoryChange') {
			condition.value.ctg = e.target.value;
		} else {
			condition.value.text = e.target.value;
		}
		const response = await axios.post('/api/project/get', {
			params: {
				ctg: condition.value.ctg,
				text: condition.value.text,
				page: currentPage.value,
				pageSize: pageSize,
			},
		});
		projectList.value = response.data.projects;
		totalPages.value = response.data.totalPages;
	} catch (err) {
		alert(err);
	}
};

const handlePageChange = (newPage) => {
	currentPage.value = newPage;
	if (condition.value.text) {
		findProject({ target: { text: condition.value.text, ctg: condition.value.ctg } });
	} else {
		getProjectList();
	}
};

onBeforeMount(() => {
	getProjectList();
});
</script>
