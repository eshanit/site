<script setup lang="ts">
defineOptions({ inheritAttrs: false })

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
  navbar: 'h-24'
};
</script>

<template>
  <component :is="href ? 'NuxtLink' : 'div'" :to="href || undefined" class="inline-block" v-bind="$attrs">
    <NuxtImg
      src="/img/pegi_logo_large.png"
      alt="Peer Education Center"
      :class="[sizeClasses[size], 'w-auto', className]"
    />
  </component>
</template>