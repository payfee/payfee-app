<template>
  <div class="card position-relative mx-auto mt-5" id="no-account">
    <div class="card-body pt-3 p-4">
      <img class="position-absolute coin-icon" src="@/assets/img/coin.png" />

      <h5>Nenhuma conta</h5>
      <p class="text-muted" style="width: 180px">
        Você ainda não possui uma conta. Que tal criar uma agora mesmo?
      </p>

      <button
        @click="$emit('onCreateNewAccount')"
        class="btn btn-light mt-3 mb-0"
      >
        Criar nova conta
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NoAccount extends Vue {}
</script>

<style lang="scss" scoped>
#no-account {
  width: 382px;
  min-height: 216px;
}

.coin-icon {
  top: -33px;
  right: -44px;
}
</style>
