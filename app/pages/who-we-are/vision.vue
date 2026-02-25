<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

useHead({
  title: 'Our Vision - Who We Are - PEGISUS',
  meta: [
    {
      name: 'description',
      content: 'Learn about PEGISUS vision - a groundbreaking collaboration between leading institutions across three nations, united by a common vision for youth empowerment and health equity in Southern Africa.'
    }
  ]
})

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/who-we-are' },
  { name: 'Our Vision', href: '/who-we-are/vision', current: true }
]

// Stats data
const stats = [
    { value: '4', label: 'Countries', icon: 'i-heroicons-globe-alt', color: 'blue' },
    { value: '20+', label: 'Team Members', icon: 'i-heroicons-users', color: 'orange' },
    { value: '5', label: 'Partner Institutions', icon: 'i-heroicons-building-office', color: 'green' },
    { value: '3', label: 'Nations', icon: 'i-heroicons-map', color: 'purple' }
]

// Color mapping from design system
const colorClasses = {
  blue: {
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-600',
    bgLight: 'bg-blue-50',
    fromTo: 'from-blue-500 to-blue-700'
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    border: 'border-orange-500',
    bgLight: 'bg-orange-50',
    fromTo: 'from-orange-400 to-orange-600'
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-500',
    bgLight: 'bg-green-50',
    fromTo: 'from-green-400 to-green-600'
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-500',
    bgLight: 'bg-purple-50',
    fromTo: 'from-purple-400 to-purple-600'
  }
}

const getColorClass = (color: string, type: keyof typeof colorClasses.blue) => {
  return colorClasses[color as keyof typeof colorClasses][type]
}

const statsHovered = ref<number | null>(null)
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Breadcrumb Navigation -->
    <SharedBreadcrumb :items="breadcrumbs" />
    
    <!-- Hero Section -->
    <section class="pt-8 md:pt-12 pb-16 px-4 md:px-8 lg:px-12">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <!-- Text Content - 7 columns -->
          <div class="lg:col-span-7 space-y-6">
            <div>
              <div class="inline-flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-blue-600"></div>
                <span class="text-sm font-semibold text-blue-700 font-poppins uppercase tracking-wider">Our Network</span>
              </div>
              
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins leading-tight mb-6">
                <span class="text-blue-600 block">Who We Are</span>
                <span class="text-lg md:text-xl text-orange-600 font-inter mt-2 block">
                  A Partnership for Sustainable Impact
                </span>
              </h1>

              <div class="h-1 w-24 bg-blue-600 my-6"></div>

              <div class="prose max-w-none">
                <p class="text-lg text-gray-700 leading-relaxed font-inter mb-6">
                  PEGISUS represents a groundbreaking collaboration between leading institutions across
                  three nations, united by a common vision for youth empowerment and health equity in Southern Africa.
                </p>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div
                  v-for="(stat, index) in stats"
                  :key="index"
                  class="group relative transition-all duration-300"
                  @mouseenter="statsHovered = index"
                  @mouseleave="statsHovered = null"
              >
                  <!-- Main card -->
                  <div class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-4 h-full"
                       :class="statsHovered === index ? 'shadow-lg -translate-y-1' : ''">
                       
                      <!-- Top accent -->
                      <div class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                           :class="[
                             getColorClass(stat.color, 'bg'),
                             statsHovered === index ? 'w-full' : 'w-12'
                           ]"></div>
                       
                      <!-- Content -->
                      <div class="text-center">
                          <div class="text-2xl md:text-3xl font-bold font-poppins mb-1 transition-colors duration-300"
                               :class="statsHovered === index ? getColorClass(stat.color, 'text') : 'text-gray-900'">
                              {{ stat.value }}
                          </div>
                          
                          <div class="text-xs text-gray-600 font-inter">
                              {{ stat.label }}
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>

          <!-- Quote Card - 5 columns -->
          <div class="lg:col-span-5">
            <div class="bg-blue-600 text-white p-6 md:p-8 shadow-md">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 bg-white/20 flex items-center justify-center">
                        <UIcon name="i-heroicons-handshake" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 class="text-xl font-bold font-poppins">Collaborative Vision</h3>
                        <div class="h-1 w-8 bg-white/40 mt-1"></div>
                    </div>
                </div>

                <blockquote class="text-lg leading-relaxed font-inter mb-6">
                    "This project is a partnership between the University Hospital Basel, the South African
                    Medical Research Council, the University of Zambia, and SolidarMed Zambia and Zimbabwe. 
                    Together, we developed the idea for PEGISUS, created the intervention, and will test 
                    whether it works in Zambia, Zimbabwe, and South Africa."
                </blockquote>

                <div class="pt-6 border-t border-white/20">
                    <p class="text-sm opacity-90 font-inter">A collaborative initiative spanning three nations</p>
                </div>
            </div>
            
            <!-- Mission Statement -->
            <div class="mt-6 p-6 bg-blue-50 border-l-4 border-blue-600">
              <div class="flex items-start gap-4">
                <UIcon name="i-heroicons-academic-cap" class="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 class="font-bold text-blue-700 font-poppins mb-2">Our Mission</h4>
                  <p class="text-gray-700 font-inter text-sm">
                    To empower youth through evidence-based, peer-led interventions that address substance use, 
                    gender equity, and vocational readiness across Southern Africa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
a:focus {
    outline: 2px solid #1E3A8A;
    outline-offset: 2px;
}

/* Smooth transitions */
* {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                        opacity, box-shadow, transform, filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .lg\:col-span-7,
    .lg\:col-span-5 {
        grid-column: span 12;
    }
}

@media (max-width: 768px) {
    .text-5xl {
        font-size: 2.5rem;
    }
    
    .text-4xl {
        font-size: 2rem;
    }
    
    .text-3xl {
        font-size: 1.75rem;
    }
    
    .grid-cols-4 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .grid-cols-2,
    .grid-cols-4 {
        grid-template-columns: 1fr;
    }
}

/* Print styles */
@media print {
    .bg-blue-600,
    .bg-gradient-to-r {
        background-color: #f8fafc !important;
        -webkit-print-color-adjust: exact;
    }
    
    a {
        text-decoration: underline;
    }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
</style>
