<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const email = ref('')

// 表单状态
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// 重置密码处理
const handleResetPassword = async () => {
  // 表单验证
  if (!email.value) {
    errorMessage.value = '请填写邮箱'
    return
  }
  
  // 重置消息
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true
  
  try {
    // 这里将来会调用实际的重置密码API
    // const response = await authService.resetPassword(email.value)
    
    // 模拟重置密码成功
    setTimeout(() => {
      isLoading.value = false
      successMessage.value = '重置密码链接已发送到您的邮箱，请查收'
    }, 1000)
  } catch (error) {
    isLoading.value = false
    errorMessage.value = '重置密码失败，请稍后再试'
  }
}

// 跳转到登录页面
const goToLogin = () => {
  router.push('/auth/login')
}
</script>

<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-center mb-6">重置密码</h2>
    
    <!-- 错误提示 -->
    <div v-if="errorMessage" class="bg-danger bg-opacity-10 text-danger px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>
    
    <!-- 成功提示 -->
    <div v-if="successMessage" class="bg-success bg-opacity-10 text-success px-4 py-3 rounded mb-4">
      {{ successMessage }}
    </div>
    
    <!-- 重置密码表单 -->
    <form @submit.prevent="handleResetPassword" v-if="!successMessage">
      <p class="text-gray-600 mb-4">
        请输入您的注册邮箱，我们将向您发送重置密码的链接。
      </p>
      
      <!-- 邮箱输入 -->
      <div class="mb-6">
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
      
      <!-- 提交按钮 -->
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
        {{ isLoading ? '提交中...' : '发送重置链接' }}
      </button>
    </form>
    
    <!-- 成功后显示 -->
    <div v-if="successMessage" class="text-center">
      <button 
        type="button" 
        @click="goToLogin" 
        class="btn btn-primary"
      >
        返回登录
      </button>
    </div>
    
    <!-- 登录链接 -->
    <div class="text-center mt-6" v-if="!successMessage">
      <p class="text-sm text-gray-600">
        记起密码了？
        <button 
          type="button" 
          @click="goToLogin" 
          class="text-primary hover:text-primary-dark font-medium"
        >
          返回登录
        </button>
      </p>
    </div>
  </div>
</template> 