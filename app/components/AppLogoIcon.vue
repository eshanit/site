<script setup lang="ts">
const props = withDefaults(defineProps<{
  className?: string;
  href?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'navbar';
}>(), {
  className: '',
  href: '/',
  size: 'md'
});

const sizeClasses = {
  sm: 'h-8',
  md: 'h-12',
  lg: 'h-16',
  xl: 'h-20',
  navbar: 'h-16' // Consistent with navbar height
};
</script>

<template>
  <component :is="href ? 'NuxtLink' : 'div'" :to="href || undefined" class="inline-block">
    <!-- In Nuxt, public files are served from /public directory -->
    <NuxtImg
      src="/img/pegi_logo_large.png"
      alt="Peer Education Center"
      :class="[sizeClasses[size], 'w-auto', className]"
      v-bind="$attrs"
    />
  </component>
</template>