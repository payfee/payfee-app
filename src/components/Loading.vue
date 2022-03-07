<template>
	<div class="p-4 d-block text-center">
		<i class="spinner-border text-primary" style="width: 4rem; height: 4rem" />
		<h6 class="mt-3">Carregando...</h6>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoadingSpin extends Vue {}
</script>
