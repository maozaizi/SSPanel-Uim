<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 用户数据
const userData = ref({
  username: '测试用户',
  email: 'test@example.com',
  balance: 0,
  class: 1,
  class_expire: '2023-12-31',
  node_speedlimit: 0,
  node_connector: 0,
  transfer_enable: 1099511627776, // 1TB in bytes
  transfer_used: 10737418240, // 10GB in bytes
  last_checkin_time: '2023-01-01 00:00:00',
  expire_in: 30,
  online_ip_count: 0,
  last_use_time: '2023-01-01 00:00:00'
})

// 转换流量单位
const formatTraffic = (bytes: number) => {
  const GB = 1024 * 1024 * 1024
  return (bytes / GB).toFixed(2) + ' GB'
}

// 计算流量使用百分比
const trafficUsedPercent = ref(0)

onMounted(() => {
  // 计算流量使用百分比
  trafficUsedPercent.value = Math.round((userData.value.transfer_used / userData.value.transfer_enable) * 100)
  
  // 这里将来会调用实际的API获取用户数据
  // const response = await userService.getUserInfo()
  // userData.value = response.data
})

// 签到功能
const isCheckingIn = ref(false)
const checkinMessage = ref('')

const handleCheckin = async () => {
  isCheckingIn.value = true
  checkinMessage.value = ''
  
  try {
    // 这里将来会调用实际的签到API
    // const response = await userService.checkin()
    
    // 模拟签到成功
    setTimeout(() => {
      isCheckingIn.value = false
      checkinMessage.value = '签到成功，获得了 50MB 流量'
      
      // 更新用户数据
      userData.value.transfer_enable += 50 * 1024 * 1024 // 增加50MB流量
      userData.value.last_checkin_time = new Date().toISOString().replace('T', ' ').substring(0, 19)
    }, 1000)
  } catch (error) {
    isCheckingIn.value = false
    checkinMessage.value = '签到失败，请稍后再试'
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">用户中心</h1>
    
    <!-- 欢迎卡片 -->
    <div class="card mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-xl font-bold mb-2">欢迎回来，{{ userData.username }}</h2>
          <p class="text-gray-600">上次使用：{{ userData.last_use_time }}</p>
        </div>
        <div>
          <button 
            @click="handleCheckin" 
            class="btn btn-primary"
            :disabled="isCheckingIn"
          >
            <span v-if="isCheckingIn" class="mr-2">
              <!-- 加载图标 -->
              <svg class="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
            {{ isCheckingIn ? '签到中...' : '每日签到' }}
          </button>
        </div>
      </div>
      <p v-if="checkinMessage" class="mt-2 text-success">{{ checkinMessage }}</p>
    </div>
    
    <!-- 信息卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <!-- 账户信息 -->
      <div class="card">
        <h3 class="text-lg font-bold mb-4">账户信息</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">等级</span>
            <span>VIP {{ userData.class }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">等级到期时间</span>
            <span>{{ userData.class_expire }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">账户余额</span>
            <span>¥ {{ userData.balance.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">账户到期</span>
            <span>{{ userData.expire_in }} 天后</span>
          </div>
        </div>
      </div>
      
      <!-- 使用限制 -->
      <div class="card">
        <h3 class="text-lg font-bold mb-4">使用限制</h3>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">在线设备数</span>
            <span>{{ userData.online_ip_count }} / {{ userData.node_connector || '不限制' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">速度限制</span>
            <span>{{ userData.node_speedlimit ? userData.node_speedlimit + ' Mbps' : '不限制' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">上次签到</span>
            <span>{{ userData.last_checkin_time }}</span>
          </div>
        </div>
      </div>
      
      <!-- 流量使用 -->
      <div class="card">
        <h3 class="text-lg font-bold mb-4">流量使用</h3>
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-gray-600">已用流量</span>
            <span>{{ formatTraffic(userData.transfer_used) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">总流量</span>
            <span>{{ formatTraffic(userData.transfer_enable) }}</span>
          </div>
          <div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                class="bg-primary h-2.5 rounded-full" 
                :style="{ width: trafficUsedPercent + '%' }"
                :class="{ 'bg-warning': trafficUsedPercent > 70, 'bg-danger': trafficUsedPercent > 90 }"
              ></div>
            </div>
            <div class="text-right text-sm mt-1">{{ trafficUsedPercent }}%</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 快速操作 -->
    <div class="card">
      <h3 class="text-lg font-bold mb-4">快速操作</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <router-link to="/user/nodes" class="btn btn-primary text-center">
          查看节点
        </router-link>
        <router-link to="/user/profile" class="btn btn-secondary text-center">
          个人资料
        </router-link>
        <router-link to="/user/shop" class="btn bg-success text-white text-center">
          购买套餐
        </router-link>
        <router-link to="/user/recharge" class="btn bg-info text-white text-center">
          充值余额
        </router-link>
      </div>
    </div>
  </div>
</template> 