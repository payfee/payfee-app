<template>
  <div class="d-block text-center">
    <div
      class="mx-auto alert d-inline-block p-4 alert-danger bg-danger-soft text-danger"
    >
      <payfee-icon
        icon="fad fa-triangle-exclamation"
        class="mx-auto d-block mb-4 fs-1"
      />
      Erro ao realizar operação
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppError extends Vue {}
</script>
