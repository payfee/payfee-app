<template>
  <!-- Navbar -->
  <nav
    class="navbar navbar-main navbar-expand-lg position-sticky mt-4 top-1 px-0 mx-4 shadow-none border-radius-xl z-index-sticky blur"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="container-fluid py-1 px-3">
      <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
        <a
          href="javascript:;"
          class="nav-link text-body p-0"
          id="iconNavbarSidenav"
        >
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </a>
      </li>

      <app-breadcrumbs />

      <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none ">
        <a href="javascript:;" class="nav-link text-body p-0">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </a>
      </div>
      <div
        class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
        id="navbar"
      >
        <ul class="ms-md-auto pe-md-3 navbar-nav justify-content-end">
          <li class="nav-item d-flex align-items-center">
            <div
              class="d-flex align-items-center nav-link text-body font-weight-bold px-0"
            >
              <i
                style="width: 35px; height: 35px"
                class="d-flex align-items-center justify-content-center bg-light text-dark border-radius-lg fa fa-user me-sm-1"
              ></i>
              <span class="d-sm-inline d-none ms-2">Yago Rocha</span>
            </div>
          </li>
          <li class="nav-item dropdown ms-2 pe-2 d-flex align-items-center">
            <a href="javascript:;" class="nav-link text-body p-0">
              <i class="fa fa-sign-out cursor-pointer"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppBreadcrumbs from "./AppBreadcrumbs.vue";

@Component({
  components: {
    AppBreadcrumbs
  }
})
export default class AppNavbar extends Vue {
  public mounted() {
    //     var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    // var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
    //   return new bootstrap.Dropdown(dropdownToggleEl)
    // })
  }
}
</script>
