<!-- pages/what-we-do.vue -->
<script setup lang="ts">
useHead({
  title: 'What We Do - PEGISUS',
  meta: [
    {
      name: 'description',
      content: 'Learn about the PEGISUS program - our evidence-based approach to youth empowerment, substance use prevention, and gender inclusion in Southern Africa.'
    }
  ]
});
</script>
<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-white to-cyan-50">
      <div
        class="text-center pt-32 pb-16 px-4 bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style="background-image: url('/img/hands.png');"
      >
        <!-- Gradient overlay for text readability -->
        <div class="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-cyan-500/80"></div>
        <!-- Content -->
        <div class="relative z-10">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            <span class="text-white">What We Do</span>
          </h1>
          <p class="text-xl text-cyan-50 max-w-4xl mx-auto">
            Transforming youth futures through evidence-based peer education and empowerment programs
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <WhatWeDoIntroduction />
      <WhatWeDoPillars />
      <WhatWeDoDetails />
    </div>

  </div>
</template>
<style scoped>
.gradient-text {
  background: linear-gradient(90deg, #00F5FF, #8A2BE2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>