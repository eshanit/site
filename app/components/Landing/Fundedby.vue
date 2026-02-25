<script setup lang="ts">
// Funding organization data
const funders = [
  {
    name: 'SOR4D',
    fullName: 'Solution-oriented Research for Development Programme',
    logo: '/img/funding/SOR4D_logo.png',
    description: 'The overarching goal of SOR4D programme is to produce better knowledge, solutions and innovation by needs-driven, transdisciplinary research that opens up new ways for advancing sustainable development and reducing poverty in the least developed, low and lower middle-income countries.',
    website: 'www.sor4d.ch'
  },
  {
    name: 'SDC',
    fullName: 'Swiss Agency for Development and Cooperation',
    logo: '/img/funding/SDC_logo.png',
    description: 'Switzerland\'s international cooperation agency within the Federal Department of Foreign Affairs, working for sustainable development and poverty reduction worldwide.',
    website: 'www.eda.admin.ch/sdc'
  },
  {
    name: 'SNF',
    fullName: 'Swiss National Science Foundation',
    logo: '/img/funding/SNF_logo.png',
    description: 'The leading Swiss institution for promoting scientific research, funding high-quality projects and supporting the next generation of researchers.',
    website: 'www.snf.ch'
  }
];

// State for hover effects
const hoveredFunder = ref<number | null>(null);

// Color scheme following design system - using blue/green palette
const funderColors = [
  { 
    bg: 'bg-indigo-50', 
    border: 'border-indigo-600', 
    text: 'text-indigo-800', 
    hover: 'hover:bg-indigo-100' 
  },
  { 
    bg: 'bg-blue-50', 
    border: 'border-blue-600', 
    text: 'text-blue-800', 
    hover: 'hover:bg-blue-100' 
  },
  { 
    bg: 'bg-teal-50', 
    border: 'border-teal-600', 
    text: 'text-teal-800', 
    hover: 'hover:bg-teal-100' 
  }
];

const getFunderStyle = (index: number): { bg: string; border: string; text: string; hover: string } => 
  funderColors[index % funderColors.length]!;
</script>

<template>
  <div class="w-full relative bg-gray-50">
    <!-- Content Container -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <div class="inline-flex items-center gap-3 mb-3">
          <div class="w-3 h-3 bg-brand-medium"></div>
          <span class="text-sm font-semibold text-brand-dark font-poppins uppercase tracking-wider">Partners & Funding</span>
        </div>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins text-gray-900 mb-4">
          Our Funding Partners
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
          Supporting our mission for sustainable development and poverty reduction.
        </p>
      </div>

      <!-- Logos Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div 
          v-for="(funder, index) in funders" 
          :key="index" 
          @mouseenter="hoveredFunder = index"
          @mouseleave="hoveredFunder = null" 
          class="group relative transform transition-all duration-500"
        >
          <!-- Card Container -->
          <div
            class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 h-full flex flex-col"
            :class="[
              getFunderStyle(index).hover,
              hoveredFunder === index ? 'shadow-xl -translate-y-1' : ''
            ]"
          >
            <!-- Top accent bar -->
            <div 
              class="h-1 w-full transition-all duration-300" 
              :class="[
                getFunderStyle(index).border,
                hoveredFunder === index ? 'opacity-100' : 'opacity-80'
              ]"
            ></div>

            <!-- Logo Container -->
            <div class="h-32 px-6 mb-6 flex items-center justify-center relative flex-shrink-0 mt-8">
              <!-- Background tint (visible on hover) -->
              <div 
                class="absolute inset-6 transition-opacity duration-300" 
                :class="[
                  getFunderStyle(index).bg,
                  hoveredFunder === index ? 'opacity-40' : 'opacity-0'
                ]"
              ></div>

              <!-- Logo -->
              <div class="relative h-16 w-full flex items-center justify-center">
                <img 
                  :src="funder.logo" 
                  :alt="`${funder.name} - ${funder.fullName}`"
                  class="h-full w-auto max-w-full object-contain transition-all duration-500 mx-auto"
                  :class="[
                    'opacity-90 group-hover:opacity-100',
                    hoveredFunder === index ? 'scale-110' : 'scale-100'
                  ]" 
                  loading="lazy"
                />
              </div>
            </div>

            <!-- Organization Info -->
            <div class="px-6 pb-6 pt-2 flex-grow flex flex-col">
              <h3 
                class="text-xl font-bold text-center mb-2 font-poppins transition-colors duration-300"
                :class="hoveredFunder === index ? getFunderStyle(index).text : 'text-gray-900'"
              >
                {{ funder.name }}
              </h3>

              <p class="text-sm text-gray-600 text-center mb-4 font-inter">
                {{ funder.fullName }}
              </p>

              <!-- Description - Hidden on mobile, visible on tablet and up -->
              <p class="text-sm text-gray-700 text-center mt-2 mb-6 font-inter leading-relaxed hidden sm:block">
                {{ funder.description }}
              </p>

              <!-- Website Link -->
              <div class="text-center mt-auto pt-4">
                <a 
                  :href="`https://${funder.website}`" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm font-medium font-inter transition-colors duration-300 group/link"
                  :class="getFunderStyle(index).text"
                  :aria-label="`Visit ${funder.name} website (opens in new tab)`"
                >
                  <UIcon name="i-heroicons-globe-alt" class="w-4 h-4" />
                  <span>{{ funder.website }}</span>
                  <UIcon 
                    name="i-heroicons-arrow-up-right"
                    class="w-3 h-3 transform transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" 
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom accent bar -->
    <div class="h-1 w-full bg-gradient-to-r from-brand-medium via-brand-dark to-brand-teal"></div>
  </div>
</template>

<style scoped>
/* Remove all border-radius */
* {
  border-radius: 0 !important;
}

/* Font family utilities */
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* WCAG-compliant focus styles */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #004887;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Print styles */
@media print {
  .bg-indigo-50, .bg-blue-50, .bg-teal-50 {
    background-color: #f8fafc !important;
    -webkit-print-color-adjust: exact;
  }
  a {
    text-decoration: underline;
  }
  .hidden {
    display: block !important;
  }
}
</style>