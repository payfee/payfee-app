<template>
  <div v-if="show">
    <div class="modal-backdrop fade show" style="z-index: 9999"></div>
    <div
      class="modal fade show"
      tabindex="-1"
      style="display: block; z-index: 9999"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PayfeeModal extends Vue {
  @Prop({ default: false, type: Boolean })
  private show!: boolean;
}
</script>
