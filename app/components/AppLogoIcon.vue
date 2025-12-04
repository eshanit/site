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
  xl: 'h-24',
  navbar: 'h-14' // Adjusted for navbar height
};
</script>

<template>
  <NuxtLink :to="href" class="inline-block">
    <!-- In Nuxt, public files are served from /public directory -->
    <NuxtImg
      src="/img/pegi_logo2.png"
      alt="Peer Education Center"
      :class="[sizeClasses[size], 'w-auto', className]"
      v-bind="$attrs"
    />
  </NuxtLink>
</template>