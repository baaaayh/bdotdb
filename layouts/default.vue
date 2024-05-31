<template>
	<div class="wrap">
		<div class="container">
			<Header />
			<div class="contents">
				<Aside />
				<div class="view">
					<div class="view__inner">
						<div class="breadcrumb">
							<h2 class="page-title">
								{{ $route.name ? $route.name : 'Dashboard' }}
							</h2>
							<div class="current-nav">
								<ul>
									<li v-if="$route.name">
										<nuxt-link to="/">Home</nuxt-link>
									</li>
									<li v-if="$route.name !== '대시보드'">
										<nuxt-link :to="$route.path">{{ $route.name }}</nuxt-link>
									</li>
								</ul>
							</div>
						</div>
						<div class="view__wrap">
							<div class="viewport">
								<NuxtPage></NuxtPage>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import Header from '@/layouts/Header.vue';
import Aside from '@/layouts/Aside.vue';
</script>
