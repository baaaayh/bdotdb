<template>
	<div class="project-write">
		<form id="projectInfo">
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
								<input type="text" name="project" :value="projectInfo ? projectInfo.project : ''" />
							</td>
						</tr>
						<tr>
							<th>구분</th>
							<td>
								<select name="category" id="category">
									<option value="build" :selected="projectInfo && projectInfo.category === 'build' ? true : false">구축</option>
									<option value="maintain" :selected="projectInfo && projectInfo.category === 'maintain' ? true : false">운영</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>썸네일</th>
							<td>
								<input type="file" name="thumbnail" id="thumbInput" />
							</td>
						</tr>
						<tr>
							<th>공지사항</th>
							<td>
								<input type="text" name="notice" :value="projectInfo ? projectInfo.notice : ''" />
							</td>
						</tr>
						<tr>
							<th>계약기간</th>
							<td>
								<input type="text" name="period" :value="projectInfo ? projectInfo.period : ''" />
							</td>
						</tr>
						<tr>
							<th>계약 주체</th>
							<td>
								<input type="text" name="contractor" :value="projectInfo ? projectInfo.contractor : ''" />
							</td>
						</tr>
						<tr>
							<th>담당자</th>
							<td>
								<input type="text" name="manager" :value="projectInfo ? projectInfo.manager : ''" />
							</td>
						</tr>
						<tr>
							<th>이메일</th>
							<td>
								<input type="text" name="email" :value="projectInfo ? projectInfo.email : ''" />
							</td>
						</tr>
						<tr>
							<th>연락처</th>
							<td>
								<input type="text" name="phone" :value="projectInfo ? projectInfo.phone : ''" />
							</td>
						</tr>
						<tr>
							<th>기획</th>
							<td>
								<input type="text" name="planning" :value="projectInfo ? projectInfo.planning : ''" />
							</td>
						</tr>
						<tr>
							<th>마크업</th>
							<td>
								<input type="text" name="markup" :value="projectInfo ? projectInfo.markup : ''" />
							</td>
						</tr>
						<tr>
							<th>디자인</th>
							<td>
								<input type="text" name="design" :value="projectInfo ? projectInfo.design : ''" />
							</td>
						</tr>
						<tr>
							<th>프론트 URL</th>
							<td>
								<input type="text" name="frontUrl" :value="projectInfo ? projectInfo.frontUrl : ''" />
							</td>
						</tr>

						<tr>
							<th>관리자 URL</th>
							<td>
								<input type="text" name="adminUrl" :value="projectInfo ? projectInfo.adminUrl : ''" />
							</td>
						</tr>
						<tr>
							<th>관리자 ID</th>
							<td>
								<input type="text" name="adminId" :value="projectInfo ? projectInfo.adminId : ''" />
							</td>
						</tr>
						<tr>
							<th>관리자 PW</th>
							<td>
								<input type="text" name="adminPw" :value="projectInfo ? projectInfo.adminPw : ''" />
							</td>
						</tr>
						<tr>
							<th>FTP</th>
							<td>
								<input type="text" name="ftp" :value="projectInfo ? projectInfo.ftp : ''" />
							</td>
						</tr>
						<tr>
							<th>FTP ID</th>
							<td>
								<input type="text" name="ftpId" :value="projectInfo ? projectInfo.ftpId : ''" />
							</td>
						</tr>
						<tr>
							<th>FTP PW</th>
							<td>
								<input type="text" name="ftpPw" :value="projectInfo ? projectInfo.ftpPw : ''" />
							</td>
						</tr>
						<tr>
							<th>호스팅</th>
							<td>
								<input type="text" name="hosting" :value="projectInfo ? projectInfo.hosting : ''" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="button-wrap button-wrap--mt40 tac">
				<nuxt-link to="/project" class="btn btn--bd">목록</nuxt-link>
				<button v-if="$route.path.includes('write')" type="submit" @click="handleSubmit" class="btn">등록</button>
				<button v-else-if="$route.path.includes('update')" type="button" @click="handleSubmit" class="btn">수정</button>
			</div>
		</form>
	</div>
</template>
<script setup>
import axios from 'axios';
import { ref, onBeforeMount, onMounted } from 'vue';
const route = useRoute();

const projectInfo = ref(null);
const params = ref(null);
const id = ref(null);

const getProjectInfo = async () => {
	if (params.value) {
		const projectData = await axios.get(`/api/project/${params.value}`).then((res) => {
			projectInfo.value = res.data;
		});
	}
};

const getIdFunc = async () => {
	const resId = await axios.get(`/api/project/get`).then((res) => {
		id.value = Number(res.data[res.data.length - 1].id);
	});
};

const handleSubmit = async (e) => {
	try {
		e.preventDefault(); // 폼의 기본 동작 방지

		const formData = new FormData(); // FormData 객체 생성
		const fileInput = document.querySelector("input[type='file']");
		const categorySelectBox = document.querySelector('#category');

		// 썸네일 파일이 있는 경우 FormData에 추가
		if (fileInput.files.length > 0) {
			formData.append('thumbFile', fileInput.files[0]);
		}

		if (categorySelectBox.value) {
			formData.append(categorySelectBox.name, categorySelectBox.value);
		}

		// 폼 데이터에 입력 필드 값 추가
		document.querySelectorAll('#projectInfo input').forEach((input) => {
			formData.append(input.name, input.value);
		});

		// for (let value of formData) {
		//   console.log(value);
		// }

		// 새로운 프로젝트 등록 또는 기존 프로젝트 업데이트에 따라 다른 API 엔드포인트 호출
		let response;
		if (e.target.type === 'submit') {
			// 등록 버튼 클릭 시
			formData.append('id', id.value + 1); // 새로운 프로젝트 ID 설정
			const time = new Date();
			formData.append('update', time.getTime());
			formData.append('made', time.getTime());
			response = await $fetch('/api/project/post', { method: 'POST', body: formData }); // 새로운 프로젝트 등록
		} else {
			// 수정 버튼 클릭 시
			formData.append('id', params.value); // 기존 프로젝트 ID 설정
			const time = new Date();
			formData.append('update', time.getTime());
			response = await $fetch(`/api/project/update/${id}`, { method: 'PATCH', body: formData });
		}

		// 서버 응답 처리
		if (response.msg) {
			alert(response.msg);
			location.href = '/project'; // 프로젝트 목록 페이지로 이동
		} else {
			alert('등록에 실패했습니다.');
		}
	} catch (err) {
		console.error(err);
		alert('등록 중 오류가 발생했습니다.');
	}
};

// 컴포넌트가 마운트되기 전에 호출되는 함수
onBeforeMount(() => {
	params.value = route.params.id; // URL에서 파라미터 값 설정
	getIdFunc(); // ID 값 설정 함수 호출
	getProjectInfo();
});
</script>
