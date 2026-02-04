<script setup lang="ts">
interface BreadcrumbItem {
  name: string;
  href?: string;
  current?: boolean;
}

interface Props {
  items: BreadcrumbItem[];
  homeHref?: string;
}

withDefaults(defineProps<Props>(), {
  homeHref: '/',
});
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="breadcrumb-nav"
  >
    <ol class="breadcrumb-list">
      <!-- Home Link -->
      <li class="breadcrumb-item">
        <NuxtLink
          :to="homeHref"
          class="breadcrumb-link"
          aria-label="Home"
        >
          <UIcon
            name="i-heroicons-home"
            class="breadcrumb-icon"
          />
          <span class="sr-only">Home</span>
        </NuxtLink>
      </li>

      <!-- Separator -->
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
      >
        <UIcon
          name="i-heroicons-chevron-right"
          class="breadcrumb-separator"
          aria-hidden="true"
        />

        <!-- Current page (no link) -->
        <span
          v-if="item.current"
          class="breadcrumb-current"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </span>

        <!-- Regular item with link -->
        <NuxtLink
          v-else
          :to="item.href || '#'"
          class="breadcrumb-link"
        >
          {{ item.name }}
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb-nav {
  @apply py-3 px-4 sm:px-6 lg:px-8;
}

.breadcrumb-list {
  @apply flex flex-wrap items-center space-x-1 text-sm;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item {
  @apply flex items-center;
}

.breadcrumb-icon {
  @apply w-4 h-4 text-gray-500 hover:text-cyan-600 transition-colors duration-200;
}

.breadcrumb-separator {
  @apply w-3 h-3 text-gray-400 mx-1;
}

.breadcrumb-link {
  @apply text-gray-600 hover:text-cyan-600 transition-colors duration-200 font-medium;
}

.breadcrumb-link:hover {
  @apply underline;
}

.breadcrumb-current {
  @apply text-gray-900 font-semibold cursor-default;
}

.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}

/* Focus styles for accessibility */
.breadcrumb-link:focus-visible {
  @apply outline-none ring-2 ring-cyan-500 ring-offset-2;
}
</style>
