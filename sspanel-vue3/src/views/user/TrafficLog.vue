<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'

// 流量记录
const trafficLogs = ref([
  {
    id: 1,
    node_id: 1,
    node_name: '香港 IPLC 01',
    u: 1024 * 1024 * 50, // 上传流量 (bytes)
    d: 1024 * 1024 * 200, // 下载流量 (bytes)
    rate: 1, // 倍率
    traffic: (1024 * 1024 * 50 + 1024 * 1024 * 200) * 1, // 总流量 (bytes)
    log_time: '2023-06-20 15:30:22'
  },
  {
    id: 2,
    node_id: 2,
    node_name: '日本 IPLC 01',
    u: 1024 * 1024 * 30, // 上传流量 (bytes)
    d: 1024 * 1024 * 150, // 下载流量 (bytes)
    rate: 1, // 倍率
    traffic: (1024 * 1024 * 30 + 1024 * 1024 * 150) * 1, // 总流量 (bytes)
    log_time: '2023-06-19 10:15:45'
  },
  {
    id: 3,
    node_id: 3,
    node_name: '新加坡 IPLC 01',
    u: 1024 * 1024 * 20, // 上传流量 (bytes)
    d: 1024 * 1024 * 100, // 下载流量 (bytes)
    rate: 1, // 倍率
    traffic: (1024 * 1024 * 20 + 1024 * 1024 * 100) * 1, // 总流量 (bytes)
    log_time: '2023-06-18 22:10:33'
  },
  {
    id: 4,
    node_id: 5,
    node_name: '台湾 IPLC 01',
    u: 1024 * 1024 * 15, // 上传流量 (bytes)
    d: 1024 * 1024 * 80, // 下载流量 (bytes)
    rate: 1.5, // 倍率
    traffic: (1024 * 1024 * 15 + 1024 * 1024 * 80) * 1.5, // 总流量 (bytes)
    log_time: '2023-06-17 08:45:12'
  },
  {
    id: 5,
    node_id: 1,
    node_name: '香港 IPLC 01',
    u: 1024 * 1024 * 25, // 上传流量 (bytes)
    d: 1024 * 1024 * 120, // 下载流量 (bytes)
    rate: 1, // 倍率
    traffic: (1024 * 1024 * 25 + 1024 * 1024 * 120) * 1, // 总流量 (bytes)
    log_time: '2023-06-16 19:20:55'
  }
])

// 筛选和排序
const filterForm = reactive({
  node: 'all',
  dateRange: {
    start: '',
    end: ''
  },
  sortBy: 'time-desc'
})

// 节点列表
const nodes = computed(() => {
  const uniqueNodes = new Map()
  
  trafficLogs.value.forEach(log => {
    if (!uniqueNodes.has(log.node_id)) {
      uniqueNodes.set(log.node_id, {
        id: log.node_id,
        name: log.node_name
      })
    }
  })
  
  return Array.from(uniqueNodes.values())
})

// 排序选项
const sortOptions = [
  { value: 'time-desc', label: '时间 (最新优先)' },
  { value: 'time-asc', label: '时间 (最早优先)' },
  { value: 'traffic-desc', label: '流量 (从高到低)' },
  { value: 'traffic-asc', label: '流量 (从低到高)' }
]

// 筛选后的流量记录
const filteredLogs = computed(() => {
  let result = trafficLogs.value
  
  // 节点筛选
  if (filterForm.node !== 'all') {
    const nodeId = parseInt(filterForm.node)
    result = result.filter(log => log.node_id === nodeId)
  }
  
  // 日期筛选
  if (filterForm.dateRange.start) {
    const startDate = new Date(filterForm.dateRange.start)
    result = result.filter(log => new Date(log.log_time) >= startDate)
  }
  
  if (filterForm.dateRange.end) {
    const endDate = new Date(filterForm.dateRange.end)
    endDate.setHours(23, 59, 59, 999) // 设置为当天结束时间
    result = result.filter(log => new Date(log.log_time) <= endDate)
  }
  
  // 排序
  switch (filterForm.sortBy) {
    case 'time-desc':
      result = [...result].sort((a, b) => new Date(b.log_time).getTime() - new Date(a.log_time).getTime())
      break
    case 'time-asc':
      result = [...result].sort((a, b) => new Date(a.log_time).getTime() - new Date(b.log_time).getTime())
      break
    case 'traffic-desc':
      result = [...result].sort((a, b) => b.traffic - a.traffic)
      break
    case 'traffic-asc':
      result = [...result].sort((a, b) => a.traffic - b.traffic)
      break
  }
  
  return result
})

// 总流量统计
const trafficStats = computed(() => {
  const stats = {
    totalUpload: 0,
    totalDownload: 0,
    totalTraffic: 0
  }
  
  filteredLogs.value.forEach(log => {
    stats.totalUpload += log.u
    stats.totalDownload += log.d
    stats.totalTraffic += log.traffic
  })
  
  return stats
})

// 获取流量记录
onMounted(() => {
  // 这里将来会调用实际的API获取流量记录
  // const response = await trafficService.getLogs()
  // trafficLogs.value = response.data
})

// 格式化流量
const formatTraffic = (bytes: number) => {
  if (bytes < 1024) {
    return bytes + ' B'
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + ' KB'
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB'
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleString()
}

// 重置筛选
const resetFilter = () => {
  filterForm.node = 'all'
  filterForm.dateRange.start = ''
  filterForm.dateRange.end = ''
  filterForm.sortBy = 'time-desc'
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">流量明细</h1>
    
    <!-- 流量统计 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="card">
        <h2 class="text-lg font-semibold mb-2">上传流量</h2>
        <p class="text-2xl font-bold text-primary">{{ formatTraffic(trafficStats.totalUpload) }}</p>
      </div>
      
      <div class="card">
        <h2 class="text-lg font-semibold mb-2">下载流量</h2>
        <p class="text-2xl font-bold text-primary">{{ formatTraffic(trafficStats.totalDownload) }}</p>
      </div>
      
      <div class="card">
        <h2 class="text-lg font-semibold mb-2">总计流量</h2>
        <p class="text-2xl font-bold text-primary">{{ formatTraffic(trafficStats.totalTraffic) }}</p>
      </div>
    </div>
    
    <!-- 筛选 -->
    <div class="card mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="form-group">
          <label for="node-filter" class="form-label">节点</label>
          <select id="node-filter" v-model="filterForm.node" class="form-input">
            <option value="all">全部节点</option>
            <option v-for="node in nodes" :key="node.id" :value="node.id">
              {{ node.name }}
            </option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="date-start" class="form-label">开始日期</label>
          <input 
            id="date-start" 
            v-model="filterForm.dateRange.start" 
            type="date" 
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <label for="date-end" class="form-label">结束日期</label>
          <input 
            id="date-end" 
            v-model="filterForm.dateRange.end" 
            type="date" 
            class="form-input"
          >
        </div>
        
        <div class="form-group">
          <label for="sort-by" class="form-label">排序方式</label>
          <select id="sort-by" v-model="filterForm.sortBy" class="form-input">
            <option v-for="option in sortOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
      
      <div class="flex justify-end mt-4">
        <button @click="resetFilter" class="btn btn-secondary">重置筛选</button>
      </div>
    </div>
    
    <!-- 流量记录表格 -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">节点</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">上传</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">下载</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">倍率</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">总计</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="log in filteredLogs" :key="log.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ log.node_name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatTraffic(log.u) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatTraffic(log.d) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ log.rate }}x</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatTraffic(log.traffic) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(log.log_time) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="filteredLogs.length === 0" class="text-center py-8 text-gray-500">
        没有找到匹配的流量记录
      </div>
    </div>
    
    <!-- 分页 -->
    <div class="flex justify-center mt-6">
      <nav class="flex items-center">
        <button class="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
          上一页
        </button>
        <button class="px-3 py-1 border-t border-b border-gray-300 bg-primary text-white">
          1
        </button>
        <button class="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
          2
        </button>
        <button class="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
          3
        </button>
        <button class="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
          下一页
        </button>
      </nav>
    </div>
  </div>
</template> 