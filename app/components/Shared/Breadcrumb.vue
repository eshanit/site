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
  padding: 0.75rem 1rem;
}

@media (min-width: 640px) {
  .breadcrumb-nav {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .breadcrumb-nav {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-icon {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
  transition: color 0.2s;
}

.breadcrumb-icon:hover {
  color: #0078c1;
}

.breadcrumb-separator {
  width: 0.75rem;
  height: 0.75rem;
  color: #9ca3af;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}

.breadcrumb-link {
  color: #6b7280;
  font-weight: 500;
  transition: color 0.2s;
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: #0078c1;
  text-decoration: underline;
}

.breadcrumb-current {
  color: #111827;
  font-weight: 600;
  cursor: default;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Focus styles for accessibility */
.breadcrumb-link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #0078c1;
  outline-offset: 2px;
}
</style>
