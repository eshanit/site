<!-- pages/what-we-do/programs.vue -->
<script setup lang="ts">
useHead({
  title: 'Our Programs - What We Do - PEGISUS',
  meta: [
    {
      name: 'description',
      content: 'Discover the PEGISUS program pillars - substance use prevention, gender inclusion, vocational integration, and peer support in Southern Africa.'
    }
  ]
});

interface BreadcrumbItem {
  name: string;
  href?: string;
  current?: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'What We Do', href: '/what-we-do/overview' },
  { name: 'Our Programs', href: '/what-we-do/programs', current: true }
];
</script>
<template>
  <div>
    <!-- Breadcrumb Navigation -->
    <SharedBreadcrumb :items="breadcrumbs" />
    
    <!-- Hero Section -->
    <div class="bg-gradient-to-br from-white to-brand-lightest">
      <div
        class="text-center pt-32 pb-16 px-4 bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style="background-image: url('/img/hands.png');"
      >
        <!-- Gradient overlay for text readability -->
        <div class="absolute inset-0 bg-gradient-to-b from-brand-darkest/80 to-brand-light/80"></div>
        <!-- Content -->
        <div class="relative z-10">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            <span class="text-white">Our Programs</span>
          </h1>
          <p class="text-xl text-brand-lightest max-w-4xl mx-auto">
            The four pillars that guide our mission to transform youth futures
          </p>
        </div>
      </div>

      <!-- Main Content - Programs Pillars Component -->
      <WhatWeDoPillars />
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
