<template>
  <router-view></router-view>
</template>

<script>
import PerfectScrollbar from "perfect-scrollbar";

export default {
  mounted() {
    const isWindows = navigator.platform.indexOf("Win") > -1 ? true : false;

    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      if (document.getElementsByClassName("main-content")[0]) {
        const mainpanel = document.querySelector(".main-content");
        new PerfectScrollbar(mainpanel);
      }

      if (document.getElementsByClassName("sidenav")[0]) {
        const sidebar = document.querySelector(".sidenav");
        new PerfectScrollbar(sidebar);
      }

      if (document.getElementsByClassName("navbar-collapse")[0]) {
        const fixedplugin = document.querySelector(
          ".navbar:not(.navbar-expand-lg) .navbar-collapse"
        );
        new PerfectScrollbar(fixedplugin);
      }

      if (document.getElementsByClassName("fixed-plugin")[0]) {
        const fixedplugin = document.querySelector(".fixed-plugin");
        new PerfectScrollbar(fixedplugin);
      }
    }
  }
};
</script>
