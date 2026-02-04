<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'navbar';
}>(), {
  size: 'md'
});

const sizeClasses = {
  sm: {
    container: 'size-8',
    text: 'text-xs'
  },
  md: {
    container: 'size-12',
    text: 'text-sm'
  },
  lg: {
    container: 'size-16',
    text: 'text-base'
  },
  navbar: {
    container: 'w-64',
    text: 'text-base'
  }
};
</script>

<template>
  <div class="flex items-center">
    <!-- For navbar, use fixed width to maintain consistency -->
    <AppLogoIcon 
      v-if="size === 'navbar'" 
      size="navbar" 
      :class="sizeClasses[size].container" 
    />
    <!-- For other sizes, use the constrained version -->
    <AppLogoIcon 
      v-else 
      :size="size" 
      :class="sizeClasses[size]?.container"
    />
  </div>
</template>