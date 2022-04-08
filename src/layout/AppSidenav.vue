<template>
  <aside
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3"
    id="sidenav-main"
  >
    <div class="sidenav-header">
      <i
        class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>

      <router-link class="navbar-brand m-0" to="/">
        <!-- <img src="../../assets/img/logo-ct-dark.png" class="navbar-brand-img h-100" alt="main_logo"> -->
        <span class="ms-1 font-weight-bold">Payfee</span>
      </router-link>
    </div>
    <hr class="horizontal dark mt-0" />
    <div
      class="overflow-hidden collapse navbar-collapse  w-auto h-auto h-100"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <template v-for="(menuItem, key) of menuItems">
          <li :key="key" class="nav-item">
            <router-link :to="menuItem.to" class="nav-link">
              <div
                class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center"
              >
                <payfee-icon
                  class="color-background"
                  :icon="`fa-duotone fa-` + menuItem.icon"
                />
                <!-- <i class="fa color-background" :class="`fa-` + menuItem.icon" /> -->
              </div>
              <span class="nav-link-text ms-1">
                {{ menuItem.title }}
              </span>
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </aside>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import i18n from "@/plugins/i18n";

@Component
export default class AppSidenav extends Vue {
  public menuItems = [
    {
      title: i18n.t("sidebar_menu.accounts"),
      to: "/",
      icon: "landmark"
    },
    {
      title: "Transações",
      to: "/transactions",
      icon: "list-tree"
    }
  ];
}
</script>
