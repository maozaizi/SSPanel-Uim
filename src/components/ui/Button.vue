<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  block?: boolean
  loading?: boolean
}>();

const emit = defineEmits(['click']);

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>

<template>
  <button
    :class="[
      'btn',
      `btn-${type || 'primary'}`,
      {
        'btn-sm': size === 'sm',
        'btn-lg': size === 'lg',
        'w-full': block,
        'opacity-50 cursor-not-allowed': disabled || loading,
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="inline-block mr-2">
      <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-sm {
  @apply px-2 py-1 text-sm;
}

.btn-lg {
  @apply px-6 py-3 text-lg;
}
</style> 