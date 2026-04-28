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
  // Bigger desktop logo, controlled mobile size
  //navbar: 'h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36'
  navbar: 'h-12 md:h-16'
};
</script>

<template>
  <component
    :is="href ? 'NuxtLink' : 'div'"
    :to="href || undefined"
    class="inline-block leading-none"
    v-bind="$attrs"
  >
    <NuxtImg
      src="/img/pegi_logo_navbar.png"
      alt="PEGISUS"
      :class="[sizeClasses[size], 'w-auto object-contain align-middle', className]"
      format="webp"
      quality="95"
      preload
    />
  </component>
</template>
