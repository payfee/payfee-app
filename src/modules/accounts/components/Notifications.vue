<template>
  <div
    v-if="!!notifications.length"
    class="position-fixed bottom-1 end-1"
    style="z-index: 9990"
  >
    <template v-for="(notification, key) of notifications">
      <div :key="key" class="toast fade p-2 bg-white show mb-2" role="alert">
        <div class="toast-header border-0">
          <i class="ni ni-check-bold text-success me-2"></i>
          <span class="me-auto font-weight-bold">{{ notification.title }}</span>
        </div>
        <template v-if="!!notification.message">
          <hr class="horizontal dark m-0" />
          <div class="toast-body">
            {{ notification.message }}
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const notificationsModule = namespace("notifications");

@Component
export default class Notifications extends Vue {
  @notificationsModule.State
  public notifications!: Notification[];
}
</script>
