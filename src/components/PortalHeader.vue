<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
  <header class="mt-4" id="header-content">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <router-link class="col-auto mb-3 no-link-style" to="/">
          <div class="page-pretitle">China Public Data Search</div>
          <h1 class="page-title">全国公共数据一站式搜索</h1>
        </router-link>

        <div class="col-12">
          <SearchBar defaultQuery="山东 教师资格认定" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.no-link-style {
  text-decoration: none;
  color: inherit;
}
</style>
