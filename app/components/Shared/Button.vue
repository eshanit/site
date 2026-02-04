<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  href: '',
  type: 'button',
  fullWidth: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const buttonClasses = computed(() => {
  const classes = ['btn', 'inline-flex', 'items-center', 'justify-center', 'font-semibold', 'transition-all', 'duration-200'];

  // Variant classes
  switch (props.variant) {
    case 'primary':
      classes.push('btn-primary');
      break;
    case 'secondary':
      classes.push('btn-secondary');
      break;
    case 'outline':
      classes.push('btn-outline');
      break;
    case 'ghost':
      classes.push('btn-ghost');
      break;
    case 'danger':
      classes.push('btn-danger');
      break;
  }

  // Size classes
  switch (props.size) {
    case 'sm':
      classes.push('btn-sm');
      break;
    case 'lg':
      classes.push('btn-lg');
      break;
    default:
      classes.push('btn-md');
  }

  // Full width
  if (props.fullWidth) {
    classes.push('w-full');
  }

  return classes;
});

const isExternalLink = computed(() => {
  return props.href && (props.href.startsWith('http://') || props.href.startsWith('https://'));
});
</script>

<template>
  <NuxtLink
    v-if="href && !disabled"
    :to="href"
    :class="buttonClasses"
    :target="isExternalLink ? '_blank' : undefined"
    :rel="isExternalLink ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </NuxtLink>

  <button
    v-else
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="emit('click', $event)"
  >
    <!-- Loading spinner -->
    <UIcon
      v-if="loading"
      name="i-heroicons-arrow-path"
      class="btn-spinner"
      :class="{ 'animate-spin': loading }"
    />

    <!-- Icon slot -->
    <slot name="icon-left" />

    <span :class="{ 'sr-only': loading }">
      <slot />
    </span>

    <!-- Icon slot right -->
    <slot name="icon-right" />
  </button>
</template>

<style scoped>
/* Base styles */
.btn {
  position: relative;
  overflow: hidden;
  border-radius: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition: all 0.2s ease;
}

/* Variants */
.btn-primary {
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.btn-primary:hover {
  background: linear-gradient(to right, var(--color-primary-dark), var(--color-secondary));
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.btn-secondary {
  background-color: var(--color-gray-100);
  color: var(--color-gray-900);
}

.btn-secondary:hover {
  background-color: var(--color-gray-200);
}

.btn-outline {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  background-color: transparent;
}

.btn-outline:hover {
  background-color: var(--color-gray-50);
}

.btn-ghost {
  color: var(--color-gray-600);
  background-color: transparent;
}

.btn-ghost:hover {
  background-color: var(--color-gray-100);
  color: var(--color-gray-900);
}

.btn-danger {
  background-color: var(--color-accent-red);
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
}

/* Sizes */
.btn-sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.btn-md {
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
}

.btn-lg {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

/* Hover effects */
.btn-primary:hover,
.btn-secondary:hover,
.btn-danger:hover {
  transform: translateY(-0.125rem);
}

/* Disabled state */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Focus styles for accessibility */
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px white, 0 0 0 4px var(--color-primary);
}

/* Loading spinner */
.btn-spinner {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Full width */
.w-full {
  width: 100%;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
  
  .btn:hover {
    transform: none;
  }
  
  .animate-spin {
    animation: none;
  }
}
</style>
