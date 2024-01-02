<script setup lang="ts">
import PortalHeader from '@/components/PortalHeader.vue'
import HomeView from '@/views/HomeView.vue'
import { ref } from 'vue'

const canvas_ids = ref({
  about: 'about-canvas',
  feedback: 'feedback-canvas'
})
const footer = ref({
  left_part: {
    logo_path: 'src/assets/logo-websoft.png', // TODO: replace with relative path
    org_name: '南京大学万维网软件研究组',
    org_link: 'http://ws.nju.edu.cn/'
  },
  right_part: [
    { name: '关于', link: canvas_ids.value.about, toggle: true },
    { name: '源码', link: 'https://github.com/cqsss/ChinaOpenDataPortal', toggle: false },
    { name: '反馈', link: canvas_ids.value.feedback, toggle: true }
  ]
})
const about_canvas_content = [
  '我们团队于2002年开始从事语义网前沿技术的研究，',
  '并于2009年11月在南京大学计算机科学与技术系建立万维网软件研究组（Websoft），',
  '主要研究方向包括语义网、知识图谱和智能软件新技术。',
  '当前，研究组聚焦于知识图谱的表示学习、搜索与问答、挖掘与融合、自然语言处理和神经符号计算等关键技术。',
  '我们的使命是开展知识图谱和智能软件领域的前沿研究，并力图使得语义网的愿景成为现实。'
].join('')
</script>

<template>
  <div class="page">
    <PortalHeader />
    <HomeView
      :footer="footer"
      :canvas_ids="canvas_ids"
      :about_canvas_content="about_canvas_content"
    />
  </div>
</template>
