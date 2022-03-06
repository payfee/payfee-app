<template>
  <component
    @click="$emit('click')"
    :is="tag"
    class="btn btn-icon bg-gradient-primary"
  >
    <span
      v-if="isLoading"
      class="spinner-grow spinner-grow-sm"
      role="status"
    ></span>
    <slot />
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PayfeeButton extends Vue {
  @Prop({ default: "button" }) tag!: string;
  @Prop({ default: false }) isLoading!: boolean;
}
</script>
