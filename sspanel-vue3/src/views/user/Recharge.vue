<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// 用户余额
const userBalance = ref(100)

// 充值选项
const rechargeOptions = [
  { value: 10, label: '¥10' },
  { value: 20, label: '¥20' },
  { value: 50, label: '¥50' },
  { value: 100, label: '¥100' },
  { value: 200, label: '¥200' },
  { value: 500, label: '¥500' }
]

// 充值表单
const rechargeForm = reactive({
  amount: 50,
  customAmount: '',
  paymentMethod: 'alipay',
  coupon: ''
})

// 支付方式
const paymentMethods = [
  { value: 'alipay', label: '支付宝', icon: 'alipay.svg' },
  { value: 'wechat', label: '微信支付', icon: 'wechat.svg' },
  { value: 'paypal', label: 'PayPal', icon: 'paypal.svg' },
  { value: 'crypto', label: '加密货币', icon: 'crypto.svg' }
]

// 充值状态
const isProcessing = ref(false)
const rechargeMessage = ref('')

// 充值记录
const rechargeHistory = ref([
  {
    id: 1,
    amount: 50,
    payment_method: 'alipay',
    status: 'success',
    created_at: '2023-06-15 14:30:22',
    trade_no: 'ALI123456789'
  },
  {
    id: 2,
    amount: 100,
    payment_method: 'wechat',
    status: 'success',
    created_at: '2023-05-20 09:15:45',
    trade_no: 'WX987654321'
  },
  {
    id: 3,
    amount: 20,
    payment_method: 'paypal',
    status: 'pending',
    created_at: '2023-06-18 18:22:10',
    trade_no: 'PP123987456'
  }
])

// 计算实际充值金额（考虑优惠码等）
const actualAmount = computed(() => {
  // 这里可以添加优惠码逻辑
  return rechargeForm.customAmount ? parseFloat(rechargeForm.customAmount) : rechargeForm.amount
})

// 处理充值
const handleRecharge = async () => {
  if (actualAmount.value <= 0) {
    rechargeMessage.value = '请输入有效的充值金额'
    return
  }
  
  try {
    isProcessing.value = true
    rechargeMessage.value = ''
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 这里将来会调用实际的API进行充值
    // const response = await paymentService.createOrder({
    //   amount: actualAmount.value,
    //   payment_method: rechargeForm.paymentMethod,
    //   coupon: rechargeForm.coupon
    // })
    
    // 模拟成功
    const orderId = Math.floor(Math.random() * 1000000)
    
    // 重定向到支付页面或显示支付二维码
    alert(`订单创建成功，订单号: ${orderId}，即将跳转到支付页面`)
    
    // 重置表单
    rechargeForm.customAmount = ''
    rechargeForm.coupon = ''
    
  } catch (error) {
    rechargeMessage.value = '创建充值订单失败，请重试'
  } finally {
    isProcessing.value = false
  }
}

// 选择预设金额
const selectAmount = (amount: number) => {
  rechargeForm.amount = amount
  rechargeForm.customAmount = ''
}

// 使用自定义金额
const useCustomAmount = () => {
  rechargeForm.amount = 0
}

// 获取支付方式图标
const getPaymentIcon = (method: string) => {
  const payment = paymentMethods.find(p => p.value === method)
  return payment ? payment.icon : ''
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}

// 获取状态标签样式
const getStatusClass = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-success text-white'
    case 'pending':
      return 'bg-warning text-white'
    case 'failed':
      return 'bg-danger text-white'
    default:
      return 'bg-gray-200 text-gray-700'
  }
}

// 获取状态文本
const getStatusText = (status: string) => {
  switch (status) {
    case 'success':
      return '成功'
    case 'pending':
      return '处理中'
    case 'failed':
      return '失败'
    default:
      return status
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">充值</h1>
    
    <!-- 余额信息 -->
    <div class="card mb-6">
      <div class="flex items-center">
        <div>
          <h2 class="text-lg font-semibold">当前余额</h2>
          <p class="text-2xl font-bold text-primary">¥ {{ userBalance.toFixed(2) }}</p>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 充值表单 -->
      <div class="lg:col-span-2">
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">充值金额</h2>
          
          <div class="mb-6">
            <div class="grid grid-cols-3 gap-3">
              <button 
                v-for="option in rechargeOptions" 
                :key="option.value"
                @click="selectAmount(option.value)"
                class="btn"
                :class="rechargeForm.amount === option.value && !rechargeForm.customAmount ? 'btn-primary' : 'btn-secondary'"
              >
                {{ option.label }}
              </button>
            </div>
            
            <div class="mt-4">
              <label for="custom-amount" class="form-label">自定义金额</label>
              <div class="flex">
                <span class="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                  ¥
                </span>
                <input 
                  id="custom-amount" 
                  v-model="rechargeForm.customAmount" 
                  @focus="useCustomAmount"
                  type="number" 
                  min="1" 
                  step="0.01" 
                  class="form-input rounded-l-none" 
                  placeholder="输入自定义金额"
                >
              </div>
            </div>
          </div>
          
          <h2 class="text-xl font-semibold mb-4">支付方式</h2>
          
          <div class="mb-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div 
                v-for="method in paymentMethods" 
                :key="method.value"
                @click="rechargeForm.paymentMethod = method.value"
                class="border rounded-lg p-4 cursor-pointer transition-colors duration-200"
                :class="rechargeForm.paymentMethod === method.value ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-gray-300'"
              >
                <div class="flex flex-col items-center justify-center">
                  <!-- 这里可以放支付方式图标 -->
                  <div class="w-10 h-10 mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                    {{ method.value.charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-sm">{{ method.label }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="coupon" class="form-label">优惠码 (可选)</label>
            <input 
              id="coupon" 
              v-model="rechargeForm.coupon" 
              type="text" 
              class="form-input" 
              placeholder="输入优惠码"
            >
          </div>
          
          <div v-if="rechargeMessage" class="alert alert-danger mb-4">
            {{ rechargeMessage }}
          </div>
          
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-600">充值金额:</p>
              <p class="text-xl font-bold text-primary">
                ¥ {{ actualAmount.toFixed(2) }}
              </p>
            </div>
            <button 
              @click="handleRecharge" 
              class="btn btn-primary" 
              :disabled="isProcessing || actualAmount <= 0"
            >
              {{ isProcessing ? '处理中...' : '立即充值' }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- 充值说明 -->
      <div class="lg:col-span-1">
        <div class="card mb-6">
          <h2 class="text-xl font-semibold mb-4">充值说明</h2>
          
          <div class="space-y-4 text-sm">
            <p>1. 充值后的余额可用于购买套餐或续费</p>
            <p>2. 充值金额最低为 ¥1</p>
            <p>3. 充值成功后，余额将立即到账</p>
            <p>4. 如遇到充值问题，请联系客服</p>
          </div>
        </div>
        
        <div class="card">
          <h2 class="text-xl font-semibold mb-4">常见问题</h2>
          
          <div class="space-y-4 text-sm">
            <div>
              <h3 class="font-medium">充值没到账怎么办？</h3>
              <p class="text-gray-600">请等待1-5分钟，如仍未到账，请联系客服</p>
            </div>
            <div>
              <h3 class="font-medium">支持哪些支付方式？</h3>
              <p class="text-gray-600">支持支付宝、微信支付、PayPal和加密货币</p>
            </div>
            <div>
              <h3 class="font-medium">充值有优惠吗？</h3>
              <p class="text-gray-600">关注我们的公告，不定期会发布充值优惠活动</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 充值记录 -->
    <div class="card mt-6">
      <h2 class="text-xl font-semibold mb-4">充值记录</h2>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单号</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金额</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支付方式</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="record in rechargeHistory" :key="record.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ record.trade_no }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥ {{ record.amount.toFixed(2) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ paymentMethods.find(p => p.value === record.payment_method)?.label || record.payment_method }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(record.status)">
                  {{ getStatusText(record.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(record.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="rechargeHistory.length === 0" class="text-center py-4 text-gray-500">
        暂无充值记录
      </div>
    </div>
  </div>
</template> 