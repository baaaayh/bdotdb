<template>
    <div style="margin-top: 70px">
        <ul class="pagination">
            <li>
                <button type="button" :disabled="currentPage === 1" @click="handlePageChange(1)">처음</button>
            </li>
            <li>
                <button type="button" :disabled="currentPage === 1" @click="handlePageChange(currentPage - 1)">이전</button>
            </li>
            <li v-for="page in totalPages" :key="page">
                <button type="button" :class="{ active: currentPage === page }" @click="handlePageChange(page)">{{ page }}</button>
            </li>
            <li>
                <button type="button" :disabled="currentPage === totalPages" @click="handlePageChange(currentPage + 1)">다음</button>
            </li>
            <li>
                <button type="button" :disabled="currentPage === totalPages" @click="handlePageChange(totalPages)">마지막</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const { totalPages, currentPage, pageSize } = defineProps(['totalPages', 'currentPage', 'pageSize']);
const emit = defineEmits(['page-changed']);

const handlePageChange = (page) => {
    // 페이지 변경 이벤트를 부모 컴포넌트로 emit하여 처리합니다.
    emit('page-changed', page);
};
</script>
