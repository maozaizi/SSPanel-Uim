<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 侧边栏状态
const isSidebarOpen = ref(true)

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// 退出登录
const logout = () => {
  // 这里将来会调用实际的登出API
  // await authService.logout()
  
  // 跳转到登录页面
  router.push('/auth/login')
}

// 导航到首页
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-light">
    <!-- 顶部导航栏 -->
    <header class="bg-primary text-white shadow-md z-10">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <!-- 左侧 Logo 和菜单按钮 -->
          <div class="flex items-center">
            <button @click="toggleSidebar" class="mr-4 md:hidden">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <h1 @click="goHome" class="text-xl font-bold cursor-pointer">SSPanel UIM</h1>
          </div>
          
          <!-- 右侧用户菜单 -->
          <div class="flex items-center">
            <div class="relative group">
              <button class="flex items-center space-x-2">
                <span>用户名</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <router-link to="/user/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">个人资料</router-link>
                <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">退出登录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-grow">
      <!-- 侧边栏 -->
      <aside :class="['bg-white shadow-md w-64 transition-all', {'hidden': !isSidebarOpen, 'md:block': true}]">
        <nav class="p-4">
          <ul class="space-y-2">
            <li>
              <router-link to="/user/dashboard" class="block px-4 py-2 rounded hover:bg-light" active-class="bg-primary bg-opacity-10 text-primary">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                  <span>仪表盘</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/user/nodes" class="block px-4 py-2 rounded hover:bg-light" active-class="bg-primary bg-opacity-10 text-primary">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <span>节点列表</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/user/shop" class="block px-4 py-2 rounded hover:bg-light" active-class="bg-primary bg-opacity-10 text-primary">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  <span>商店</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/user/recharge" class="block px-4 py-2 rounded hover:bg-light" active-class="bg-primary bg-opacity-10 text-primary">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>充值</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/user/traffic-log" class="block px-4 py-2 rounded hover:bg-light" active-class="bg-primary bg-opacity-10 text-primary">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  <span>流量明细</span>
                </div>
              </router-link>
            </li>
            <li>
              <router-link to="/user/profile" class="block px-4 py-2 rounded hover:bg-light" active-class="bg-primary bg-opacity-10 text-primary">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  <span>个人资料</span>
                </div>
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- 主要内容区域 -->
      <main class="flex-grow p-6">
        <router-view />
      </main>
    </div>
  </div>
</template> 