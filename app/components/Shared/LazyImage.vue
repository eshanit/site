<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  class?: string;
  placeholder?: string;
  priority?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  width: 'auto',
  height: 'auto',
  class: '',
  priority: false,
});

const isLoaded = ref(false);
const hasError = ref(false);
const imgRef = ref<HTMLImageElement | null>(null);

// Handle load event
const onLoad = () => {
  isLoaded.value = true;
};

// Handle error event
const onError = () => {
  hasError.value = true;
  console.warn(`Failed to load image: ${props.src}`);
};
</script>

<template>
  <div
    :class="[
      'lazy-image-container',
      'relative overflow-hidden',
      props.class
    ]"
  >
    <!-- Placeholder / Skeleton -->
    <div
      v-if="!isLoaded && !hasError"
      class="lazy-image-placeholder absolute inset-0 bg-gray-200 animate-pulse"
      :style="{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }"
    >
      <!-- Shimmer effect -->
      <div class="shimmer absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
    </div>

    <!-- Error state -->
    <div
      v-if="hasError"
      class="lazy-image-error absolute inset-0 bg-gray-100 flex items-center justify-center"
      :style="{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }"
    >
      <div class="text-center text-gray-400">
        <UIcon name="i-heroicons-photo" class="w-8 h-8 mx-auto mb-2" />
        <span class="text-xs">Image unavailable</span>
      </div>
    </div>

    <!-- Actual image -->
    <img
      v-show="isLoaded"
      ref="imgRef"
      :src="props.src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="priority ? 'eager' : 'lazy'"
      :decoding="priority ? 'sync' : 'async'"
      class="lazy-image transition-opacity duration-300"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<style scoped>
.lazy-image {
  @apply w-full h-full object-cover;
}

.lazy-image-container {
  @apply bg-gray-100;
}

/* Shimmer animation */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

/* Fade in animation when loaded */
.lazy-image {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-shimmer {
    animation: none;
  }

  .lazy-image {
    animation: none;
  }
}

/* Responsive sizes */
@media (max-width: 640px) {
  .lazy-image-container {
    @apply text-center;
  }
}
</style>
