<script setup lang="ts">
// 导入组件和钩子
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 导航到登录页
const navigateToLogin = () => {
  router.push('/auth/login')
}

// 导航到注册页
const navigateToRegister = () => {
  router.push('/auth/register')
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- 导航栏 -->
    <header class="bg-primary text-white shadow-md">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center">
          <h1 class="text-2xl font-bold">SSPanel UIM</h1>
        </div>
        <div class="flex items-center space-x-4">
          <button @click="navigateToLogin" class="btn btn-secondary">登录</button>
          <button @click="navigateToRegister" class="btn btn-primary">注册</button>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="flex-grow">
      <!-- 英雄区域 -->
      <section class="bg-gradient-to-r from-primary to-info py-20 text-white">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-4xl font-bold mb-6">欢迎使用 SSPanel UIM</h2>
          <p class="text-xl mb-8">高效、安全、易用的多用户管理面板</p>
          <button @click="navigateToRegister" class="btn bg-white text-primary hover:bg-gray-100 hover:shadow-hover text-lg px-8 py-3">
            立即开始
          </button>
        </div>
      </section>

      <!-- 特性区域 -->
      <section class="py-16 bg-light">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-12">为什么选择我们</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- 特性卡片 1 -->
            <div class="card">
              <div class="text-primary text-4xl mb-4">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3 class="text-xl font-bold mb-2">安全可靠</h3>
              <p class="text-gray-600">采用先进的加密技术，保障您的数据安全</p>
            </div>
            
            <!-- 特性卡片 2 -->
            <div class="card">
              <div class="text-primary text-4xl mb-4">
                <i class="fas fa-tachometer-alt"></i>
              </div>
              <h3 class="text-xl font-bold mb-2">高速稳定</h3>
              <p class="text-gray-600">全球节点覆盖，提供稳定高速的连接体验</p>
            </div>
            
            <!-- 特性卡片 3 -->
            <div class="card">
              <div class="text-primary text-4xl mb-4">
                <i class="fas fa-headset"></i>
              </div>
              <h3 class="text-xl font-bold mb-2">专业支持</h3>
              <p class="text-gray-600">7x24小时客户支持，解决您的任何问题</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 页脚 -->
    <footer class="bg-dark text-white py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p>&copy; {{ new Date().getFullYear() }} SSPanel UIM. 保留所有权利。</p>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="text-white hover:text-gray-300">服务条款</a>
            <a href="#" class="text-white hover:text-gray-300">隐私政策</a>
            <a href="#" class="text-white hover:text-gray-300">联系我们</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template> 