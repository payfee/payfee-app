<template>
	<component
		@click="handleClick"
		:is="tag"
		class="btn btn-icon bg-gradient-primary"
	>
		<template v-if="isLoading">
			<span class="spinner-grow spinner-grow-sm" role="status"></span>
			{{ loadingText }}
		</template>
		<slot v-else />
	</component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PayfeeButton extends Vue {
	@Prop({ default: "button" }) tag!: string;
	@Prop({ default: false }) isLoading!: boolean;
	@Prop() loadingText!: string;

	private handleClick() {
		if (!this.isLoading) {
			this.$emit("click");
		}
	}
}
</script>
