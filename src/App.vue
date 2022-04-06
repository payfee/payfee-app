<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PerfectScrollbar from "perfect-scrollbar";
import { loadScript } from "@/services/script-loader";
import "bootstrap";

import { AuthStore } from "@/store/modules";

@Component
export default class App extends Vue {
  public mounted(): void {
    window.onload = () => {
      loadScript("assets/js/core.js");
    };
    const isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;

    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      if (document.getElementsByClassName("main-content")[0]) {
        const mainpanel = document.querySelector(".main-content");

        if (mainpanel != null) new PerfectScrollbar(mainpanel);
      }

      if (document.getElementsByClassName("sidenav")[0]) {
        const sidebar = document.querySelector(".sidenav");

        if (sidebar != null) new PerfectScrollbar(sidebar);
      }

      // if (document.getElementsByClassName("navbar-collapse")[0]) {
      //   const fixedplugin = document.querySelector(
      //     ".navbar:not(.navbar-expand-lg) .navbar-collapse"
      //   );

      //    if (fixedplugin != null)
      //    new PerfectScrollbar(fixedplugin);
      // }

      // if (document.getElementsByClassName("fixed-plugin")[0]) {
      //   const fixedplugin = document.querySelector(".fixed-plugin");
      //   new PerfectScrollbar(fixedplugin);
      // }

      // AuthStore.requestLogin();
    }
  }
}
</script>
