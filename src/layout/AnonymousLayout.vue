<template>
  <main class="main-content main-content-bg mt-0 ps">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
              <slot></slot>
            </div>
            <div class="col-md-6">
              <div
                class="oblique position-absolute top-0 h-100 d-md-block d-none me-n8"
              >
                <div
                  class="oblique-image bg-cover position-absolute fixed-top ms-auto h-100 z-index-0 ms-n6"
                  :style="{
                    'background-image':
                      'url(https://images.unsplash.com/photo-' +
                      unsplashId +
                      '?auto=format&fit=crop&w=1000)'
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.payfee-logo {
  font-family: "Poppins", sans-serif;
  font-weight: 200;
  font-size: 50px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AnonymousLayout extends Vue {
  @Prop({
    default: "1626266061368-46a8f578ddd6"
  })
  public unsplashId!: string;
}
</script>
