<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="card-body p-3">
      <div class="row">
        <div class="col-8">
          <div class="numbers">
            <p class="text-sm mb-0 text-capitalize font-weight-bold">
              New Clients
            </p>
            <h5 class="font-weight-bolder mb-0">
              +3,462
              <span class="text-danger text-sm font-weight-bolder">-2%</span>
            </h5>
          </div>
        </div>
        <div class="col-4 text-end">
          <div
            class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
          >
            <i
              class="ni ni-paper-diploma text-lg opacity-10"
              aria-hidden="true"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
