<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
  <header class="mt-4" id="header-content">
    <div class="container-xl">
      <div class="row g-2 align-items-center">
        <div class="col-12 mb-3">
          <div class="page-pretitle">China Open Data Portal</div>
          <h1 class="page-title">全国公共数据一站式搜索</h1>
        </div>

        <div class="col-12">
          <SearchBar defaultQuery="山东省教师资格认定" />
        </div>
      </div>
    </div>
  </header>
</template>
