<script setup lang="ts">
interface StatItem {
  value: string | number;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
}

interface Props {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  animated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  animated: true,
});

const gridClass = computed(() => {
  switch (props.columns) {
    case 2:
      return 'grid-cols-1 sm:grid-cols-2';
    case 4:
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    default:
      return 'grid-cols-1 sm:grid-cols-3';
  }
});
</script>

<template>
  <div :class="['data-stats', gridClass]">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      :class="[
        'stat-item',
        { 'stat-animated': animated }
      ]"
      :style="{ animationDelay: `${index * 100}ms` }"
    >
      <!-- Icon (if provided) -->
      <div
        v-if="stat.icon"
        class="stat-icon"
        :class="stat.color || 'bg-brand-medium'"
      >
        <UIcon :name="stat.icon" class="w-6 h-6 text-white" />
      </div>

      <!-- Value -->
      <div class="stat-value">
        {{ stat.value }}
      </div>

      <!-- Label -->
      <div class="stat-label">
        {{ stat.label }}
      </div>

      <!-- Description (optional) -->
      <div
        v-if="stat.description"
        class="stat-description"
      >
        {{ stat.description }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-stats {
  @apply grid gap-6;
}

.stat-item {
  @apply relative p-6 bg-white border border-gray-100 shadow-sm;
  @apply transition-all duration-300;
}

.stat-item:hover {
  @apply shadow-lg -translate-y-1;
}

.stat-animated {
  @apply opacity-0;
  animation: fadeInUp 0.5s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-icon {
  @apply w-12 h-12 flex items-center justify-center rounded-lg mb-4;
}

.stat-value {
  @apply text-4xl md:text-5xl font-bold text-gray-900 mb-2;
  @apply bg-gradient-to-r from-brand-light to-brand-darkest bg-clip-text text-transparent;
}

.stat-label {
  @apply text-lg font-semibold text-gray-800;
}

.stat-description {
  @apply text-sm text-gray-500 mt-2;
}

/* Focus styles for accessibility */
.stat-item:focus-within {
  @apply ring-2 ring-brand-medium ring-offset-2;
}

/* Responsive */
@media (max-width: 640px) {
  .stat-value {
    @apply text-3xl;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .stat-animated {
    @apply opacity-100;
    animation: none;
  }

  .stat-item:hover {
    @apply translate-y-0;
  }
}
</style>
