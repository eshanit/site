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
  sm: 'h-12',
  md: 'h-16',
  lg: 'h-24',
  xl: 'h-32',
  navbar: 'h-20' // Larger for navbar prominence
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