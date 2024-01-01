<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
<template>
  <div class="hr-text">{{ text }}</div>
</template>
