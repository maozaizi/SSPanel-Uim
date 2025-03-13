<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// 套餐数据
const packages = ref([
  {
    id: 1,
    name: '入门套餐',
    price: 19.9,
    transfer: 50, // GB
    days: 30,
    class: 1,
    class_name: '普通用户',
    node_speedlimit: 100, // Mbps
    node_connector: 3,
    reset_price: 19.9,
    status: 'active',
    description: '适合轻度使用的用户，满足基本需求',
    tags: ['入门', '经济实惠']
  },
  {
    id: 2,
    name: '标准套餐',
    price: 29.9,
    transfer: 100, // GB
    days: 30,
    class: 2,
    class_name: '高级用户',
    node_speedlimit: 200, // Mbps
    node_connector: 5,
    reset_price: 29.9,
    status: 'active',
    description: '适合日常使用的用户，提供更多流量和更快的速度',
    tags: ['畅销', '性价比']
  },
  {
    id: 3,
    name: '专业套餐',
    price: 49.9,
    transfer: 200, // GB
    days: 30,
    class: 3,
    class_name: 'VIP用户',
    node_speedlimit: 500, // Mbps
    node_connector: 8,
    reset_price: 49.9,
    status: 'active',
    description: '适合重度使用的用户，提供大量流量和高速连接',
    tags: ['高速', '无限制']
  },
  {
    id: 4,
    name: '至尊套餐',
    price: 99.9,
    transfer: 500, // GB
    days: 30,
    class: 4,
    class_name: '至尊VIP',
    node_speedlimit: 1000, // Mbps
    node_connector: 12,
    reset_price: 99.9,
    status: 'active',
    description: '适合对速度和稳定性有极高要求的用户',
    tags: ['至尊', '最高优先级']
  },
  {
    id: 5,
    name: '年度套餐',
    price: 199.9,
    transfer: 100, // GB每月
    days: 365,
    class: 2,
    class_name: '高级用户',
    node_speedlimit: 200, // Mbps
    node_connector: 5,
    reset_price: 199.9,
    status: 'active',
    description: '标准套餐的年付版本，每月重置流量，比月付更加优惠',
    tags: ['年付优惠', '每月重置']
  }
])

// 用户余额
const userBalance = ref(100)

// 购买表单
const purchaseForm = reactive({
  packageId: null as number | null,
  quantity: 1,
  coupon: ''
})

// 购买状态
const isPurchasing = ref(false)
const purchaseMessage = ref('')

// 筛选和排序
const sortOption = ref('default')
const searchQuery = ref('')

// 排序选项
const sortOptions = [
  { value: 'default', label: '默认排序' },
  { value: 'price-asc', label: '价格从低到高' },
  { value: 'price-desc', label: '价格从高到低' },
  { value: 'traffic-asc', label: '流量从低到高' },
  { value: 'traffic-desc', label: '流量从高到低' }
]

// 筛选后的套餐
const filteredPackages = computed(() => {
  let result = packages.value

  // 搜索筛选
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(pkg => 
      pkg.name.toLowerCase().includes(query) || 
      pkg.description.toLowerCase().includes(query) ||
      pkg.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // 排序
  switch (sortOption.value) {
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price)
      break
    case 'traffic-asc':
      result = [...result].sort((a, b) => a.transfer - b.transfer)
      break
    case 'traffic-desc':
      result = [...result].sort((a, b) => b.transfer - a.transfer)
      break
    default:
      // 默认排序，保持原顺序
      break
  }
  
  return result
})

// 计算总价
const totalPrice = computed(() => {
  if (!purchaseForm.packageId) return 0
  
  const selectedPackage = packages.value.find(p => p.id === purchaseForm.packageId)
  if (!selectedPackage) return 0
  
  return selectedPackage.price * purchaseForm.quantity
})

// 获取套餐信息
onMounted(() => {
  // 这里将来会调用实际的API获取套餐数据
  // const response = await shopService.getPackages()
  // packages.value = response.data
  
  // 获取用户余额
  // const userResponse = await userService.getBalance()
  // userBalance.value = userResponse.data.balance
})

// 选择套餐
const selectPackage = (packageId: number) => {
  purchaseForm.packageId = packageId
  purchaseMessage.value = ''
}

// 购买套餐
const purchasePackage = async () => {
  if (!purchaseForm.packageId) {
    purchaseMessage.value = '请选择一个套餐'
    return
  }
  
  try {
    isPurchasing.value = true
    
    const selectedPackage = packages.value.find(pkg => pkg.id === purchaseForm.packageId)
    
    if (!selectedPackage) {
      purchaseMessage.value = '套餐不存在'
      return
    }
    
    const totalPrice = selectedPackage.price * purchaseForm.quantity
    
    if (userBalance.value < totalPrice) {
      purchaseMessage.value = '余额不足，请先充值'
      return
    }
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 这里将来会调用实际的API购买套餐
    // await shopService.purchasePackage({
    //   package_id: purchaseForm.packageId,
    //   quantity: purchaseForm.quantity,
    //   coupon: purchaseForm.coupon
    // })
    
    // 更新余额
    userBalance.value -= totalPrice
    
    // 重置表单
    purchaseForm.packageId = null
    purchaseForm.quantity = 1
    purchaseForm.coupon = ''
    
    purchaseMessage.value = '购买成功！'
  } catch (error) {
    purchaseMessage.value = '购买失败，请重试'
  } finally {
    isPurchasing.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">商店</h1>
    
    <!-- 余额信息 -->
    <div class="card mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-lg font-semibold">当前余额</h2>
          <p class="text-2xl font-bold text-primary">¥ {{ userBalance.toFixed(2) }}</p>
        </div>
        <button class="btn btn-primary">充值</button>
      </div>
    </div>
    
    <!-- 搜索和筛选 -->
    <div class="card mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex-grow">
          <input 
            v-model="searchQuery" 
            type="text" 
            class="form-input" 
            placeholder="搜索套餐..."
          >
        </div>
        <div class="flex items-center space-x-2">
          <label for="sort-option" class="text-gray-600">排序方式:</label>
          <select 
            id="sort-option" 
            v-model="sortOption" 
            class="form-input"
          >
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- 套餐列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="pkg in filteredPackages" 
        :key="pkg.id" 
        class="card hover:shadow-lg transition-shadow duration-300"
        :class="{ 'border-primary': purchaseForm.packageId === pkg.id }"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold">{{ pkg.name }}</h3>
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="(tag, index) in pkg.tags" 
              :key="index"
              class="px-2 py-0.5 bg-primary bg-opacity-10 text-primary text-xs rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        
        <p class="text-gray-600 text-sm mb-4">{{ pkg.description }}</p>
        
        <div class="mb-4">
          <div class="text-3xl font-bold text-primary">
            ¥ {{ pkg.price.toFixed(2) }}
            <span class="text-sm text-gray-500 font-normal">/ {{ pkg.days }}天</span>
          </div>
        </div>
        
        <div class="space-y-2 mb-6">
          <div class="flex justify-between">
            <span class="text-gray-600">流量</span>
            <span class="font-medium">{{ pkg.transfer }} GB</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">等级</span>
            <span class="font-medium">{{ pkg.class_name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">速度限制</span>
            <span class="font-medium">{{ pkg.node_speedlimit }} Mbps</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">同时在线</span>
            <span class="font-medium">{{ pkg.node_connector }} 台设备</span>
          </div>
        </div>
        
        <button 
          @click="selectPackage(pkg.id)" 
          class="btn w-full" 
          :class="purchaseForm.packageId === pkg.id ? 'btn-primary' : 'btn-secondary'"
        >
          {{ purchaseForm.packageId === pkg.id ? '已选择' : '选择' }}
        </button>
      </div>
    </div>
    
    <!-- 无结果提示 -->
    <div v-if="filteredPackages.length === 0" class="card text-center py-8">
      <p class="text-gray-600">没有找到匹配的套餐</p>
    </div>
    
    <!-- 购买表单 -->
    <div v-if="purchaseForm.packageId" class="card mt-6">
      <h2 class="text-xl font-semibold mb-4">确认购买</h2>
      
      <form @submit.prevent="purchasePackage" class="space-y-4">
        <div class="form-group">
          <label for="quantity" class="form-label">数量</label>
          <input 
            id="quantity" 
            v-model.number="purchaseForm.quantity" 
            type="number" 
            min="1" 
            class="form-input" 
            placeholder="购买数量"
          >
          <p class="text-xs text-gray-500 mt-1">购买多个可以延长使用时间</p>
        </div>
        
        <div class="form-group">
          <label for="coupon" class="form-label">优惠码 (可选)</label>
          <input 
            id="coupon" 
            v-model="purchaseForm.coupon" 
            type="text" 
            class="form-input" 
            placeholder="输入优惠码"
          >
        </div>
        
        <div v-if="purchaseMessage" class="alert" :class="{ 'alert-success': purchaseMessage.includes('成功'), 'alert-danger': !purchaseMessage.includes('成功') }">
          {{ purchaseMessage }}
        </div>
        
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-gray-600">总价:</p>
            <p class="text-xl font-bold text-primary">
              ¥ {{ totalPrice.toFixed(2) }}
            </p>
          </div>
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="isPurchasing"
          >
            {{ isPurchasing ? '处理中...' : '立即购买' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template> 