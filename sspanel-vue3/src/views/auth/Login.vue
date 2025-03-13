<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

// 表单状态
const isLoading = ref(false)
const errorMessage = ref('')

// 登录处理
const handleLogin = async () => {
  // 表单验证
  if (!email.value || !password.value) {
    errorMessage.value = '请填写邮箱和密码'
    return
  }
  
  // 重置错误消息
  errorMessage.value = ''
  isLoading.value = true
  
  try {
    // 这里将来会调用实际的登录API
    // const response = await authService.login(email.value, password.value, rememberMe.value)
    
    // 模拟登录成功
    setTimeout(() => {
      isLoading.value = false
      // 登录成功后跳转到用户中心
      router.push('/user/dashboard')
    }, 1000)
  } catch (error) {
    isLoading.value = false
    errorMessage.value = '登录失败，请检查邮箱和密码'
  }
}

// 跳转到注册页面
const goToRegister = () => {
  router.push('/auth/register')
}

// 跳转到重置密码页面
const goToResetPassword = () => {
  router.push('/auth/reset-password')
}
</script>

<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-center mb-6">登录</h2>
    
    <!-- 错误提示 -->
    <div v-if="errorMessage" class="bg-danger bg-opacity-10 text-danger px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>
    
    <!-- 登录表单 -->
    <form @submit.prevent="handleLogin">
      <!-- 邮箱输入 -->
      <div class="mb-4">
        <label for="email" class="form-label">邮箱</label>
        <input 
          id="email" 
          v-model="email" 
          type="email" 
          class="form-input" 
          placeholder="请输入邮箱"
          required
        >
      </div>
      
      <!-- 密码输入 -->
      <div class="mb-4">
        <label for="password" class="form-label">密码</label>
        <input 
          id="password" 
          v-model="password" 
          type="password" 
          class="form-input" 
          placeholder="请输入密码"
          required
        >
      </div>
      
      <!-- 记住我选项 -->
      <div class="flex items-center mb-6">
        <input 
          id="remember-me" 
          v-model="rememberMe" 
          type="checkbox" 
          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        >
        <label for="remember-me" class="ml-2 block text-sm text-gray-700">
          记住我
        </label>
        <button 
          type="button" 
          @click="goToResetPassword" 
          class="ml-auto text-sm text-primary hover:text-primary-dark"
        >
          忘记密码？
        </button>
      </div>
      
      <!-- 登录按钮 -->
      <button 
        type="submit" 
        class="w-full btn btn-primary flex justify-center items-center"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="mr-2">
          <!-- 加载图标 -->
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
        {{ isLoading ? '登录中...' : '登录' }}
      </button>
    </form>
    
    <!-- 注册链接 -->
    <div class="text-center mt-6">
      <p class="text-sm text-gray-600">
        还没有账号？
        <button 
          type="button" 
          @click="goToRegister" 
          class="text-primary hover:text-primary-dark font-medium"
        >
          立即注册
        </button>
      </p>
    </div>
  </div>
</template> 