<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
      <template v-for="(breadcrumb, key) of $route.meta.breadcrumb">
        <li :key="key" class="breadcrumb-item text-sm">
          <app-breadcrumb-item
            :item="breadcrumb"
            class="text-dark"
            :class="{
              'opacity-5': !$route.meta.breadcrumb[key + 1]
            }"
          >
            <payfee-icon
              v-if="!!breadcrumb.icon"
              :icon="`fad fa-` + breadcrumb.icon"
            />
            <span v-if="!!breadcrumb.name">{{ breadcrumb.name }}</span>
          </app-breadcrumb-item>
        </li>
      </template>
    </ol>
    <h6 class="font-weight-bolder mb-0">
      {{ $route.meta.title || $route.name || "Untitled" }}
    </h6>
  </nav>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppBreadcrumbItem from "./AppBreadcrumbItem.vue";

@Component({
  components: {
    AppBreadcrumbItem
  }
})
export default class AppBreadcrumbs extends Vue {}
</script>
