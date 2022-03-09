<template>
	<router-link v-if="!!item.to" :to="item.to">
		<slot />
	</router-link>
	<span v-else>
		<slot />
	</span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AppBreadcrumbItem extends Vue {
	@Prop({ type: Object, required: true })
	public item!: object;
}
</script>
