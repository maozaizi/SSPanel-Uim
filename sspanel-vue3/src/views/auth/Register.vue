<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const inviteCode = ref('')
const agreeTerms = ref(false)

// 表单状态
const isLoading = ref(false)
const errorMessage = ref('')

// 注册处理
const handleRegister = async () => {
  // 表单验证
  if (!email.value || !username.value || !password.value || !confirmPassword.value) {
    errorMessage.value = '请填写所有必填字段'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }
  
  if (!agreeTerms.value) {
    errorMessage.value = '请阅读并同意服务条款'
    return
  }
  
  // 重置错误消息
  errorMessage.value = ''
  isLoading.value = true
  
  try {
    // 这里将来会调用实际的注册API
    // const response = await authService.register({
    //   email: email.value,
    //   username: username.value,
    //   password: password.value,
    //   inviteCode: inviteCode.value
    // })
    
    // 模拟注册成功
    setTimeout(() => {
      isLoading.value = false
      // 注册成功后跳转到登录页面
      router.push('/auth/login')
    }, 1000)
  } catch (error) {
    isLoading.value = false
    errorMessage.value = '注册失败，请稍后再试'
  }
}

// 跳转到登录页面
const goToLogin = () => {
  router.push('/auth/login')
}

// 查看服务条款
const viewTerms = () => {
  // 这里可以打开服务条款弹窗或跳转到服务条款页面
  window.open('/terms', '_blank')
}
</script>

<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-center mb-6">注册</h2>
    
    <!-- 错误提示 -->
    <div v-if="errorMessage" class="bg-danger bg-opacity-10 text-danger px-4 py-3 rounded mb-4">
      {{ errorMessage }}
    </div>
    
    <!-- 注册表单 -->
    <form @submit.prevent="handleRegister">
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
      
      <!-- 用户名输入 -->
      <div class="mb-4">
        <label for="username" class="form-label">用户名</label>
        <input 
          id="username" 
          v-model="username" 
          type="text" 
          class="form-input" 
          placeholder="请输入用户名"
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
      
      <!-- 确认密码输入 -->
      <div class="mb-4">
        <label for="confirm-password" class="form-label">确认密码</label>
        <input 
          id="confirm-password" 
          v-model="confirmPassword" 
          type="password" 
          class="form-input" 
          placeholder="请再次输入密码"
          required
        >
      </div>
      
      <!-- 邀请码输入 -->
      <div class="mb-4">
        <label for="invite-code" class="form-label">邀请码 (可选)</label>
        <input 
          id="invite-code" 
          v-model="inviteCode" 
          type="text" 
          class="form-input" 
          placeholder="请输入邀请码"
        >
      </div>
      
      <!-- 服务条款同意 -->
      <div class="flex items-center mb-6">
        <input 
          id="agree-terms" 
          v-model="agreeTerms" 
          type="checkbox" 
          class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          required
        >
        <label for="agree-terms" class="ml-2 block text-sm text-gray-700">
          我已阅读并同意
          <button 
            type="button" 
            @click="viewTerms" 
            class="text-primary hover:text-primary-dark"
          >
            服务条款
          </button>
        </label>
      </div>
      
      <!-- 注册按钮 -->
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
        {{ isLoading ? '注册中...' : '注册' }}
      </button>
    </form>
    
    <!-- 登录链接 -->
    <div class="text-center mt-6">
      <p class="text-sm text-gray-600">
        已有账号？
        <button 
          type="button" 
          @click="goToLogin" 
          class="text-primary hover:text-primary-dark font-medium"
        >
          立即登录
        </button>
      </p>
    </div>
  </div>
</template> 