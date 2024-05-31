<template>
	<aside class="aside">
		<slot name="aside" />
		<div class="aside__inner">
			<ul>
				<li>
					<nuxt-link to="/"><span class="aside__icon"></span>Home </nuxt-link>
				</li>
				<li>
					<nuxt-link to="/project"> <span class="aside__icon"></span>프로젝트</nuxt-link>
				</li>
			</ul>
		</div>
	</aside>
</template>
