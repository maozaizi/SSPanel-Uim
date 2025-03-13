<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// 用户资料数据
const userProfile = reactive({
  username: 'user123',
  email: 'user@example.com',
  telegram: '',
  discord: '',
  method: 'aes-256-gcm',
  theme: 'light',
  created_at: '2023-01-15',
  last_login_at: '2023-06-20',
  last_login_ip: '192.168.1.1'
})

// 修改密码表单
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 修改连接密码表单
const connectionPasswordForm = reactive({
  newConnectionPassword: ''
})

// 表单状态
const isPasswordFormSubmitting = ref(false)
const isConnectionPasswordFormSubmitting = ref(false)
const isProfileFormSubmitting = ref(false)

// 消息提示
const passwordMessage = ref('')
const connectionPasswordMessage = ref('')
const profileMessage = ref('')

// 获取用户资料
onMounted(() => {
  // 这里将来会调用实际的API获取用户资料
  // const response = await userService.getProfile()
  // Object.assign(userProfile, response.data)
})

// 修改密码
const updatePassword = async () => {
  // 表单验证
  if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
    passwordMessage.value = '请填写所有密码字段'
    return
  }
  
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordMessage.value = '新密码与确认密码不匹配'
    return
  }
  
  if (passwordForm.newPassword.length < 8) {
    passwordMessage.value = '新密码长度至少为8位'
    return
  }
  
  try {
    isPasswordFormSubmitting.value = true
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里将来会调用实际的API修改密码
    // await userService.updatePassword(passwordForm)
    
    // 重置表单
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    
    passwordMessage.value = '密码修改成功'
  } catch (error) {
    passwordMessage.value = '密码修改失败，请重试'
  } finally {
    isPasswordFormSubmitting.value = false
  }
}

// 修改连接密码
const updateConnectionPassword = async () => {
  // 表单验证
  if (!connectionPasswordForm.newConnectionPassword) {
    connectionPasswordMessage.value = '请填写新的连接密码'
    return
  }
  
  try {
    isConnectionPasswordFormSubmitting.value = true
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里将来会调用实际的API修改连接密码
    // await userService.updateConnectionPassword(connectionPasswordForm)
    
    // 重置表单
    connectionPasswordForm.newConnectionPassword = ''
    
    connectionPasswordMessage.value = '连接密码修改成功'
  } catch (error) {
    connectionPasswordMessage.value = '连接密码修改失败，请重试'
  } finally {
    isConnectionPasswordFormSubmitting.value = false
  }
}

// 更新用户资料
const updateProfile = async () => {
  try {
    isProfileFormSubmitting.value = true
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里将来会调用实际的API更新用户资料
    // await userService.updateProfile(userProfile)
    
    profileMessage.value = '个人资料更新成功'
  } catch (error) {
    profileMessage.value = '个人资料更新失败，请重试'
  } finally {
    isProfileFormSubmitting.value = false
  }
}

// 生成新的UUID
const generateNewUUID = async () => {
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里将来会调用实际的API生成新的UUID
    // const response = await userService.generateNewUUID()
    // userProfile.uuid = response.data.uuid
    
    alert('新的UUID已生成')
  } catch (error) {
    alert('生成UUID失败，请重试')
  }
}

// 重置订阅链接
const resetSubscriptionUrl = async () => {
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里将来会调用实际的API重置订阅链接
    // const response = await userService.resetSubscriptionUrl()
    // userProfile.subscription_url = response.data.subscription_url
    
    alert('订阅链接已重置')
  } catch (error) {
    alert('重置订阅链接失败，请重试')
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">个人资料</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 基本资料 -->
      <div class="card">
        <h2 class="text-xl font-semibold mb-4">基本资料</h2>
        
        <form @submit.prevent="updateProfile" class="space-y-4">
          <div class="form-group">
            <label for="username" class="form-label">用户名</label>
            <input 
              id="username" 
              v-model="userProfile.username" 
              type="text" 
              class="form-input" 
              disabled
            >
            <p class="text-xs text-gray-500 mt-1">用户名无法修改</p>
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">邮箱</label>
            <input 
              id="email" 
              v-model="userProfile.email" 
              type="email" 
              class="form-input" 
              disabled
            >
            <p class="text-xs text-gray-500 mt-1">邮箱无法修改</p>
          </div>
          
          <div class="form-group">
            <label for="telegram" class="form-label">Telegram</label>
            <input 
              id="telegram" 
              v-model="userProfile.telegram" 
              type="text" 
              class="form-input" 
              placeholder="Telegram 用户名"
            >
          </div>
          
          <div class="form-group">
            <label for="discord" class="form-label">Discord</label>
            <input 
              id="discord" 
              v-model="userProfile.discord" 
              type="text" 
              class="form-input" 
              placeholder="Discord 用户名"
            >
          </div>
          
          <div class="form-group">
            <label for="method" class="form-label">加密方式</label>
            <select id="method" v-model="userProfile.method" class="form-input">
              <option value="aes-256-gcm">aes-256-gcm</option>
              <option value="chacha20-poly1305">chacha20-poly1305</option>
              <option value="2022-blake3-aes-256-gcm">2022-blake3-aes-256-gcm</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="theme" class="form-label">主题</label>
            <select id="theme" v-model="userProfile.theme" class="form-input">
              <option value="light">浅色</option>
              <option value="dark">深色</option>
              <option value="auto">跟随系统</option>
            </select>
          </div>
          
          <div v-if="profileMessage" class="alert" :class="{ 'alert-success': profileMessage.includes('成功'), 'alert-danger': profileMessage.includes('失败') }">
            {{ profileMessage }}
          </div>
          
          <button 
            type="submit" 
            class="btn btn-primary w-full" 
            :disabled="isProfileFormSubmitting"
          >
            {{ isProfileFormSubmitting ? '更新中...' : '更新资料' }}
          </button>
        </form>
      </div>
      
      <!-- 账户信息 -->
      <div class="space-y-6">
        <!-- 修改密码 -->
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">修改密码</h2>
          
          <form @submit.prevent="updatePassword" class="space-y-4">
            <div class="form-group">
              <label for="old-password" class="form-label">当前密码</label>
              <input 
                id="old-password" 
                v-model="passwordForm.oldPassword" 
                type="password" 
                class="form-input" 
                placeholder="输入当前密码"
              >
            </div>
            
            <div class="form-group">
              <label for="new-password" class="form-label">新密码</label>
              <input 
                id="new-password" 
                v-model="passwordForm.newPassword" 
                type="password" 
                class="form-input" 
                placeholder="输入新密码"
              >
            </div>
            
            <div class="form-group">
              <label for="confirm-password" class="form-label">确认新密码</label>
              <input 
                id="confirm-password" 
                v-model="passwordForm.confirmPassword" 
                type="password" 
                class="form-input" 
                placeholder="再次输入新密码"
              >
            </div>
            
            <div v-if="passwordMessage" class="alert" :class="{ 'alert-success': passwordMessage.includes('成功'), 'alert-danger': !passwordMessage.includes('成功') }">
              {{ passwordMessage }}
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary w-full" 
              :disabled="isPasswordFormSubmitting"
            >
              {{ isPasswordFormSubmitting ? '更新中...' : '更新密码' }}
            </button>
          </form>
        </div>
        
        <!-- 连接密码 -->
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">连接密码</h2>
          
          <form @submit.prevent="updateConnectionPassword" class="space-y-4">
            <div class="form-group">
              <label for="connection-password" class="form-label">新的连接密码</label>
              <input 
                id="connection-password" 
                v-model="connectionPasswordForm.newConnectionPassword" 
                type="password" 
                class="form-input" 
                placeholder="输入新的连接密码"
              >
              <p class="text-xs text-gray-500 mt-1">用于连接节点的密码</p>
            </div>
            
            <div v-if="connectionPasswordMessage" class="alert" :class="{ 'alert-success': connectionPasswordMessage.includes('成功'), 'alert-danger': !connectionPasswordMessage.includes('成功') }">
              {{ connectionPasswordMessage }}
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary w-full" 
              :disabled="isConnectionPasswordFormSubmitting"
            >
              {{ isConnectionPasswordFormSubmitting ? '更新中...' : '更新连接密码' }}
            </button>
          </form>
        </div>
      </div>
    </div>
    
    <!-- 高级选项 -->
    <div class="card mt-6">
      <h2 class="text-xl font-semibold mb-4">高级选项</h2>
      
      <div class="space-y-4">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 class="font-medium">UUID</h3>
            <p class="text-sm text-gray-600">用于 V2Ray 等协议的唯一标识符</p>
          </div>
          <button @click="generateNewUUID" class="btn btn-secondary">
            生成新的 UUID
          </button>
        </div>
        
        <hr class="border-gray-200">
        
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 class="font-medium">订阅链接</h3>
            <p class="text-sm text-gray-600">重置后，旧的订阅链接将失效</p>
          </div>
          <button @click="resetSubscriptionUrl" class="btn btn-secondary">
            重置订阅链接
          </button>
        </div>
        
        <hr class="border-gray-200">
        
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 class="font-medium">账户创建时间</h3>
            <p class="text-sm text-gray-600">{{ userProfile.created_at }}</p>
          </div>
        </div>
        
        <hr class="border-gray-200">
        
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 class="font-medium">最后登录时间</h3>
            <p class="text-sm text-gray-600">{{ userProfile.last_login_at }}</p>
          </div>
        </div>
        
        <hr class="border-gray-200">
        
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 class="font-medium">最后登录 IP</h3>
            <p class="text-sm text-gray-600">{{ userProfile.last_login_ip }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 