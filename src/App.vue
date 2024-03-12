<script setup lang="ts">
import { ref } from 'vue'
import type { RouterView } from 'vue-router'

import PortalHeader from '@/components/PortalHeader.vue'

import type { CanvasList, Footer } from '@/utils/types'

import websoft_logo from '@/assets/logo-websoft.png'

const canvas = ref<CanvasList>({
  about: {
    id: 'about-canvas',
    content: [
      '我们团队于2002年开始从事语义网前沿技术的研究，',
      '并于2009年11月在南京大学计算机科学与技术系建立万维网软件研究组（Websoft），',
      '主要研究方向包括语义网、知识图谱和智能软件新技术。',
      '当前，研究组聚焦于知识图谱的表示学习、搜索与问答、挖掘与融合、自然语言处理和神经符号计算等关键技术。',
      '我们的使命是开展知识图谱和智能软件领域的前沿研究，并力图使得语义网的愿景成为现实。'
    ].join('')
  },
  feedback: {
    id: 'feedback-canvas'
  }
})
const footer = ref<Footer>({
  left_part: {
    logo_path: websoft_logo,
    org_name: '南京大学万维网软件研究组',
    org_link: 'http://ws.nju.edu.cn/'
  },
  right_part: [{ name: '关于我们', link: canvas.value.about.id, toggle: true }]
})
</script>

<template>
  <div class="page">
    <PortalHeader />
    <RouterView :footer="footer" :canvas="canvas" />
  </div>
</template>
