<template>
  <div class="alert alert-danger text-white">
    Erro ao realizar operação
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppError extends Vue {}
</script>
