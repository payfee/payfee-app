<template>
  <div class="alert text-white text-sm" :class="'alert-' + kind">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SoftAlert extends Vue {
  @Prop({ required: true, type: String })
  public kind!:
    | "primary"
    | "secondary"
    | "info"
    | "danger"
    | "subtle-danger"
    | "warning"
    | "light"
    | "dark";
}
</script>
