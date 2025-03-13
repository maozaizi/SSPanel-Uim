<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// 节点数据
const nodes = ref([
  {
    id: 1,
    name: '香港 IPLC 01',
    server: 'hk01.example.com',
    type: 'Shadowsocks',
    traffic_rate: 1,
    online: true,
    load: 15,
    tags: ['IPLC', '专线'],
    flag: '🇭🇰'
  },
  {
    id: 2,
    name: '日本 IPLC 01',
    server: 'jp01.example.com',
    type: 'V2Ray',
    traffic_rate: 1,
    online: true,
    load: 30,
    tags: ['IPLC', '专线'],
    flag: '🇯🇵'
  },
  {
    id: 3,
    name: '新加坡 IPLC 01',
    server: 'sg01.example.com',
    type: 'Trojan',
    traffic_rate: 1,
    online: true,
    load: 5,
    tags: ['IPLC', '专线'],
    flag: '🇸🇬'
  },
  {
    id: 4,
    name: '美国 IPLC 01',
    server: 'us01.example.com',
    type: 'Shadowsocks',
    traffic_rate: 1,
    online: false,
    load: 0,
    tags: ['IPLC', '专线'],
    flag: '🇺🇸'
  },
  {
    id: 5,
    name: '台湾 IPLC 01',
    server: 'tw01.example.com',
    type: 'V2Ray',
    traffic_rate: 1.5,
    online: true,
    load: 45,
    tags: ['IPLC', '专线', '倍率'],
    flag: '🇹🇼'
  }
])

// 搜索和筛选
const searchQuery = ref('')
const selectedType = ref('all')

// 筛选后的节点
const filteredNodes = computed(() => {
  return nodes.value.filter(node => {
    // 类型筛选
    if (selectedType.value !== 'all' && node.type !== selectedType.value) {
      return false
    }
    
    // 搜索筛选
    if (searchQuery.value && !node.name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
      return false
    }
    
    return true
  })
})

// 节点类型列表
const nodeTypes = [
  { value: 'all', label: '全部' },
  { value: 'Shadowsocks', label: 'Shadowsocks' },
  { value: 'V2Ray', label: 'V2Ray' },
  { value: 'Trojan', label: 'Trojan' }
]

// 获取节点信息
onMounted(() => {
  // 这里将来会调用实际的API获取节点数据
  // const response = await nodeService.getNodes()
  // nodes.value = response.data
})

// 复制节点链接
const copyNodeLink = (nodeId: number) => {
  // 这里将来会调用实际的API获取节点链接
  // const response = await nodeService.getNodeLink(nodeId)
  // const link = response.data.link
  
  // 模拟复制成功
  alert(`节点 ${nodeId} 的链接已复制到剪贴板`)
}

// 查看节点详情
const viewNodeDetail = (nodeId: number) => {
  // 这里将来会实现节点详情查看功能
  alert(`查看节点 ${nodeId} 的详情`)
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">节点列表</h1>
    
    <!-- 搜索和筛选 -->
    <div class="card mb-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex-grow">
          <input 
            v-model="searchQuery" 
            type="text" 
            class="form-input" 
            placeholder="搜索节点..."
          >
        </div>
        <div class="flex items-center space-x-2">
          <label for="node-type" class="text-gray-600">节点类型:</label>
          <select 
            id="node-type" 
            v-model="selectedType" 
            class="form-input"
          >
            <option v-for="type in nodeTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- 节点列表 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="node in filteredNodes" :key="node.id" class="card">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-lg font-bold flex items-center">
              <span class="mr-2">{{ node.flag }}</span>
              {{ node.name }}
              <span 
                :class="[
                  'ml-2 px-2 py-0.5 text-xs rounded-full', 
                  node.online ? 'bg-success text-white' : 'bg-danger text-white'
                ]"
              >
                {{ node.online ? '在线' : '离线' }}
              </span>
            </h3>
            <p class="text-gray-600 text-sm">{{ node.server }}</p>
          </div>
          <div>
            <span 
              :class="[
                'px-2 py-1 text-xs rounded-full', 
                node.traffic_rate > 1 ? 'bg-warning text-white' : 'bg-gray-200 text-gray-700'
              ]"
            >
              {{ node.traffic_rate }}x
            </span>
          </div>
        </div>
        
        <div class="mb-4">
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm text-gray-600">负载</span>
            <span class="text-sm">{{ node.load }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-primary h-2 rounded-full" 
              :style="{ width: node.load + '%' }"
              :class="{ 'bg-warning': node.load > 50, 'bg-danger': node.load > 80 }"
            ></div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="(tag, index) in node.tags" 
            :key="index"
            class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
          >
            {{ tag }}
          </span>
        </div>
        
        <div class="flex justify-between">
          <button 
            @click="copyNodeLink(node.id)" 
            class="btn btn-primary text-sm"
          >
            复制链接
          </button>
          <button 
            @click="viewNodeDetail(node.id)" 
            class="btn btn-secondary text-sm"
          >
            查看详情
          </button>
        </div>
      </div>
    </div>
    
    <!-- 无结果提示 -->
    <div v-if="filteredNodes.length === 0" class="card text-center py-8">
      <p class="text-gray-600">没有找到匹配的节点</p>
    </div>
  </div>
</template> 