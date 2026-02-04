<script setup lang="ts">
// Layout configuration
// All components are auto-imported from ~/components
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <SharedNavBar />

    <!-- Main Content Area with ID for skip link -->
    <main id="main-content" class="grow" tabindex="-1">
      <slot />
    </main>

    <!-- Footer -->
    <SharedFooter />
  </div>
</template>

<style scoped>
main {
  outline: none;
}

main:focus-visible {
  outline: 2px solid #06b6d4;
  outline-offset: -2px;
}
</style>
