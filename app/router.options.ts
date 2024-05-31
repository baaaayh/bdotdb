import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
	override: true,
	routes: (_routes) => [
		{
			name: '로그인',
			path: '/login',
			component: () => import('@/pages/login.vue'),
			meta: {
				layout: 'login',
				title: 'BDOT DB',
				description: 'BDOT CREATIVE DA523TABASE',
			},
		},
		{
			name: 'BDOT CREATIVE',
			path: '/',
			component: () => import('@/pages/dashboard.vue'),
			children: [
				{
					name: '대시보드',
					path: '',
					component: () => import('@/pages/dashboard/index.vue'),
					meta: {
						title: '대시보드 | BDOT DB',
						description: 'descriptio4142n',
					},
				},
			],
		},
		{
			name: '프로젝트',
			path: '/project',
			component: () => import('@/pages/project.vue'),
			children: [
				{
					name: '프로젝트 리스트',
					path: '',
					component: () => import('@/pages/project/index.vue'),
					meta: {
						title: '프로젝트 리스트 | BDOT DB',
					},
				},
				{
					name: '프로젝트 상세',
					path: ':id',
					component: () => import('@/pages/project/[id].vue'),
					meta: {
						title: '프로젝트 등록 | BDOT DB',
						description: 'BDOT CREATIVE DATABAS4E',
					},
				},
				{
					name: '프로젝트 등록',
					path: 'write',
					component: () => import('@/pages/project/write.vue'),
					meta: {
						title: '프로젝트 등록 | BDOT DB',
						description: 'BDOT CREATIVE DATABASE11',
					},
				},
				{
					name: '프로젝트 수정',
					path: 'update/:id',
					component: () => import('@/pages/project/update/[id].vue'),
					meta: {
						title: '프로젝트 수정 | BDOT DB',
						description: 'BDOT CREATIVE DATABASE12',
					},
				},
			],
		},
	],
};
