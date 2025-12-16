<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'navbar';
}>(), {
  size: 'md'
});

const sizeClasses = {
  sm: {
    container: 'size-6',
    text: 'text-xs'
  },
  md: {
    container: 'size-8',
    text: 'text-sm'
  },
  lg: {
    container: 'size-10',
    text: 'text-base'
  },
  navbar: {
    container: '', // No container size for navbar
    text: 'text-base'
  }
};
</script>

<template>
  <div class="flex items-center">
    <!-- For navbar, use the full size without container constraints -->
    <AppFooterLogoIcon 
      v-if="size === 'navbar'" 
      size="navbar" 
      class="w-full"
    />
    <!-- For other sizes, use the constrained version -->
    <AppFooterLogoIcon 
      v-else 
      :size="size" 
      :class="sizeClasses[size].container"
    />
  </div>
</template>