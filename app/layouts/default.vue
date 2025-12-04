<script setup lang="ts">
// All components are auto-imported from ~/components
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <SharedNavBar />
    
    <!-- Main content -->
    <main class="grow">
      <slot />
    </main>
    
    <!-- Footer -->
    <SharedFooter />
  </div>
</template>