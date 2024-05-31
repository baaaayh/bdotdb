<template>
	<div class="project-view">
		<WriteButton class="button-wrap button-wrap--mb40" :deleteProject="deleteProject" />
		<div class="tbl">
			<table>
				<colgroup>
					<col style="width: 200px" />
					<col style="width: auto" />
				</colgroup>
				<tbody>
					<tr>
						<th>프로젝트</th>
						<td>
							{{ project?.project }}
						</td>
					</tr>
					<tr>
						<th>구분</th>
						<td>
							{{ project?.category === 'build' ? '구축' : '운영' }}
						</td>
					</tr>
					<tr>
						<th>공지사항</th>
						<td>{{ project?.notice }}</td>
					</tr>
					<tr>
						<th>계약기간</th>
						<td>
							{{ project?.period }}
						</td>
					</tr>
					<tr>
						<th>계약 주체</th>
						<td>
							{{ project?.contractor }}
						</td>
					</tr>
					<tr>
						<th>담당자</th>
						<td>
							{{ project?.manager }}
						</td>
					</tr>
					<tr>
						<th>이메일</th>
						<td>
							{{ project?.email }}
						</td>
					</tr>
					<tr>
						<th>연락처</th>
						<td>
							{{ project?.phone }}
						</td>
					</tr>
					<tr>
						<th>기획</th>
						<td>
							{{ project?.planning }}
						</td>
					</tr>
					<tr>
						<th>마크업</th>
						<td>
							{{ project?.markup }}
						</td>
					</tr>
					<tr>
						<th>디자인</th>
						<td>
							{{ project?.design }}
						</td>
					</tr>
					<tr>
						<th>프론트 URL</th>
						<td>
							{{ project?.frontUrl }}
						</td>
					</tr>

					<tr>
						<th>관리자 URL</th>
						<td>
							{{ project?.adminUrl }}
						</td>
					</tr>
					<tr>
						<th>관리자 ID</th>
						<td>
							{{ project?.adminId }}
						</td>
					</tr>
					<tr>
						<th>관리자 PW</th>
						<td>
							{{ project?.adminPw }}
						</td>
					</tr>
					<tr>
						<th>FTP</th>
						<td>
							{{ project?.ftp }}
						</td>
					</tr>
					<tr>
						<th>FTP ID</th>
						<td>
							{{ project?.ftpId }}
						</td>
					</tr>
					<tr>
						<th>FTP PW</th>
						<td>
							{{ project?.ftpPw }}
						</td>
					</tr>
					<tr>
						<th>호스팅</th>
						<td>
							{{ project?.hosting }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="button-wrap button-wrap--mt40 tac">
			<nuxt-link to="/project" class="btn btn--bd">목록</nuxt-link>
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import WriteButton from '@/pages/components/WriteButton.vue';
const route = useRoute();

const project = ref(null);
const params = ref(null);

const getProjectInfo = async () => {
	try {
		await axios.get(`/api/project/${params.value}`).then((res) => {
			project.value = res.data;
			useSeoMeta({
				title: project.value.project,
			});
		});
	} catch (err) {
		console.error(err);
	}
};

const deleteProject = async () => {
	try {
		const check = confirm('삭제 하시겠습니까?');
		if (check) {
			await axios.delete(`/api/project/${params.value}`).then((res) => {
				alert(res.data.msg);
				location.href = '/project';
			});
		} else {
			return;
		}
	} catch (err) {
		console.log(err);
	}
};

onMounted(() => {
	params.value = route.params.id;
	getProjectInfo();
});
</script>
