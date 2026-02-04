<script setup lang="ts">
interface Props {
  variant?: 'default' | 'bordered' | 'elevated' | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  padding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  hover: true,
  padding: true,
});

const cardClasses = computed(() => {
  const classes = ['card'];

  // Variant classes
  switch (props.variant) {
    case 'bordered':
      classes.push('card-bordered');
      break;
    case 'elevated':
      classes.push('card-elevated');
      break;
    case 'transparent':
      classes.push('card-transparent');
      break;
    default:
      classes.push('card-default');
  }

  // Size classes
  switch (props.size) {
    case 'sm':
      classes.push('card-sm');
      break;
    case 'lg':
      classes.push('card-lg');
      break;
    default:
      classes.push('card-md');
  }

  // Hover effect
  if (props.hover) {
    classes.push('card-hover');
  }

  return classes;
});
</script>

<template>
  <div :class="cardClasses">
    <slot />
  </div>
</template>

<style scoped>
.card {
  @apply relative overflow-hidden transition-all duration-300;
}

/* Variants */
.card-default {
  @apply bg-white shadow-sm border border-gray-100;
}

.card-bordered {
  @apply bg-white border-2 border-gray-200;
}

.card-elevated {
  @apply bg-white shadow-lg border border-gray-100;
}

.card-transparent {
  @apply bg-transparent border border-transparent;
}

/* Sizes */
.card-sm {
  @apply p-4;
}

.card-md {
  @apply p-6;
}

.card-lg {
  @apply p-8;
}

/* Hover Effects */
.card-hover {
  @apply hover:shadow-lg hover:-translate-y-1;
}

/* Focus styles for accessibility */
.card:focus-within {
  @apply ring-2 ring-cyan-500 ring-offset-2;
}

/* Animation */
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .card-hover {
    @apply translate-y-0;
    transition: none;
  }
}
</style>
