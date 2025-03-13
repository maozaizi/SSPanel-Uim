<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-light">
    <!-- 简化的导航栏 -->
    <header class="bg-primary text-white shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center">
          <h1 @click="goHome" class="text-2xl font-bold cursor-pointer">SSPanel UIM</h1>
        </div>
      </div>
    </header>

    <!-- 认证内容区域 -->
    <main class="flex-grow flex items-center justify-center py-12">
      <div class="w-full max-w-md">
        <router-view />
      </div>
    </main>

    <!-- 简化的页脚 -->
    <footer class="bg-dark text-white py-4">
      <div class="container mx-auto px-4 text-center">
        <p>&copy; {{ new Date().getFullYear() }} SSPanel UIM. 保留所有权利。</p>
      </div>
    </footer>
  </div>
</template> 