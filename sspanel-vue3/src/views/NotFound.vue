<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-light">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-primary">404</h1>
      <h2 class="text-3xl font-bold mb-4">页面未找到</h2>
      <p class="text-gray-600 mb-8">您访问的页面不存在或已被移除</p>
      <button @click="goHome" class="btn btn-primary">
        返回首页
      </button>
    </div>
  </div>
</template> 