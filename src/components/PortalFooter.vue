<script setup lang="ts">
defineProps<{
  left_part: {
    logo_path: string
    org_name: string
    org_link: string
  }
  right_part: {
    name: string
    link: string
    toggle: boolean
  }[]
}>()

const beian_info = import.meta.env.VITE_BEIAN_NUMBER
</script>

<template>
  <footer class="footer footer-transparent d-print-none" id="footer-content">
    <div class="container-xl">
      <div class="row text-center align-items-center flex-row-reverse">
        <div class="col-lg-auto ms-lg-auto">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item" v-for="(item, index) in right_part" :key="index">
              <a
                class="link-secondary"
                :target="item.toggle ? undefined : '_blank'"
                :rel="item.toggle ? undefined : 'noopener'"
                :data-bs-toggle="item.toggle ? 'offcanvas' : null"
                :href="item.toggle ? `#${item.link}` : item.link"
                :aria-controls="item.toggle ? `${item.link}` : undefined"
              >
                {{ item.name }}
              </a>
            </li>
            <li class="list-inline-item">
              <a class="link-secondary" href="https://beian.miit.gov.cn" target="_blank">
                {{ beian_info }}
              </a>
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-auto mt-3 mt-lg-0">
          <ul class="list-inline list-inline-dots mb-0">
            <li class="list-inline-item">
              <a :href="left_part.org_link" class="link-secondary" rel="noopener">
                <img alt="" class="bi" width="30" height="30" :src="left_part.logo_path" />
                {{ left_part.org_name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
