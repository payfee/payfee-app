<template>
  <div>
    <app-sidenav></app-sidenav>
    <main
      class="main-content position-relative max-height-vh-100 h-100 border-radius-lg "
    >
      <app-navbar/>
      <div class="container-fluid py-4">
        <div class="row">
          <router-view></router-view>
        </div>
      </div>

      <notifications />
    </main>
  </div>
</template>

<script lang="ts">
import Notifications from "@/modules/accounts/components/Notifications.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import AppNavbar from "./AppNavbar.vue";
import AppSidenav from "./AppSidenav.vue";

@Component({
  components: {
    Notifications,
    AppSidenav,
    AppNavbar
  }
})
export default class AuthenticationLayout extends Vue {}
</script>
