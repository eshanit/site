<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

useHead({
  title: 'Our Partners - Who We Are - PEGISUS',
  meta: [
    {
      name: 'description',
      content: 'Learn about our partner institutions working together with leading organizations to create sustainable impact.'
    }
  ]
})

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/who-we-are' },
  { name: 'Our Partners', href: '/who-we-are/partners', current: true }
]

// Partnership values data – using brand colors
const partnershipValues = [
  { 
    title: 'Collaborative Expertise', 
    description: 'Combining diverse institutional strengths and knowledge', 
    icon: 'i-heroicons-user-group',
    color: 'indigo'     // brand blue variant
  },
  { 
    title: 'Innovation Focus', 
    description: 'Developing evidence-based, impactful solutions', 
    icon: 'i-heroicons-light-bulb',
    color: 'teal'       // brand teal
  },
  { 
    title: 'Sustainable Impact', 
    description: 'Creating lasting change in communities', 
    icon: 'i-heroicons-chart-bar',
    color: 'emerald'    // brand green
  }
]

// Partners data – using brand colors
const partners = [
  { name: 'South African Medical Research Council', logo: '/img/partners/samrc-logo_0.png', color: 'indigo' },
  { name: 'SolidarMed', logo: '/img/partners/SM.png', color: 'teal' },
  { name: 'University of Zambia', logo: '/img/partners/unza.png', color: 'emerald' },
  { name: 'University Hospital Basel', logo: '/img/partners/USB.png', color: 'blue-dark' } // custom dark blue
]

// Color mapping from design system
const colorClasses = {
  indigo: {
    bg: 'bg-indigo-600',
    text: 'text-indigo-700',
    border: 'border-indigo-600',
    bgLight: 'bg-indigo-50',
    fromTo: 'from-indigo-500 to-indigo-700'
  },
  teal: {
    bg: 'bg-teal-600',
    text: 'text-teal-700',
    border: 'border-teal-600',
    bgLight: 'bg-teal-50',
    fromTo: 'from-teal-500 to-teal-700'
  },
  emerald: {
    bg: 'bg-emerald-600',
    text: 'text-emerald-700',
    border: 'border-emerald-600',
    bgLight: 'bg-emerald-50',
    fromTo: 'from-emerald-500 to-emerald-700'
  },
  'blue-dark': {
    bg: 'bg-brand-dark',
    text: 'text-brand-dark',
    border: 'border-brand-dark',
    bgLight: 'bg-brand-lightest',
    fromTo: 'from-brand-medium to-brand-dark'
  }
}

const getColorClass = (color: string, type: keyof typeof colorClasses.indigo) => {
  return colorClasses[color as keyof typeof colorClasses][type]
}

const partnerHovered = ref<number | null>(null)
const valueHovered = ref<number | null>(null)
const sectionVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  useIntersectionObserver(
    sectionRef,
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          sectionVisible.value = true
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Breadcrumb Navigation -->
    <SharedBreadcrumb :items="breadcrumbs" />
    
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-white to-brand-lightest py-20 md:py-28 overflow-hidden">
      <!-- Background pattern -->
      <div class="absolute inset-0 pointer-events-none">
        <NuxtImg 
          src="/img/pattern.png" 
          alt=""
          class="w-full h-full object-cover opacity-30"
        />
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-3 h-3 bg-brand-medium"></div>
            <span class="text-sm font-semibold text-brand-dark font-poppins uppercase tracking-wider">
              Partnerships
            </span>
          </div>
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-gray-900 mb-6">
            Our Partners
          </h1>
          <p class="text-lg text-gray-600 font-inter max-w-2xl">
            Working together with leading institutions to create sustainable impact across Southern Africa.
          </p>
        </div>
      </div>
    </section>

    <!-- Partners Logos & Values Section -->
    <section 
      ref="sectionRef" 
      class="py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      :class="sectionVisible ? 'fade-in-up' : 'opacity-0'"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Logos Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div 
            v-for="(partner, index) in partners" 
            :key="partner.name"
            class="group relative h-full transition-all duration-300"
            @mouseenter="partnerHovered = index"
            @mouseleave="partnerHovered = null"
          >
            <!-- Main card -->
            <div 
              class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-6 overflow-hidden h-full flex items-center justify-center"
              :class="partnerHovered === index ? 'shadow-lg -translate-y-1' : ''"
            >
              <!-- Top accent bar (full width on hover, otherwise short) -->
              <div 
                class="absolute top-0 left-0 h-1 transition-all duration-300"
                :class="[
                  getColorClass(partner.color, 'bg'),
                  partnerHovered === index ? 'w-full' : 'w-12'
                ]"
              ></div>
              
              <!-- Logo Image -->
              <div class="relative z-10 w-full h-24 flex items-center justify-center p-2">
                <img 
                  :src="partner.logo" 
                  :alt="partner.name + ' logo'"
                  class="max-w-full max-h-full object-contain transition-transform duration-300"
                  :class="partnerHovered === index ? 'scale-105' : ''"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Partnership Values -->
        <div class="border-t border-gray-200 pt-16">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">
              Our Partnership Values
            </h2>
            <div class="h-1 w-20 bg-brand-medium mx-auto"></div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="(value, i) in partnershipValues"
              :key="i"
              class="group relative h-full transition-all duration-300"
              @mouseenter="valueHovered = i"
              @mouseleave="valueHovered = null"
            >
              <!-- Main card -->
              <div 
                class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-8 overflow-hidden h-full flex flex-col text-center"
                :class="valueHovered === i ? 'shadow-xl -translate-y-1' : ''"
              >
                <!-- Colored top bar -->
                <div 
                  class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                  :class="[
                    getColorClass(value.color, 'bg'),
                    valueHovered === i ? 'w-full' : 'w-16 mx-auto'
                  ]"
                ></div>
                
                <!-- Icon with background -->
                <div class="relative z-10 mb-6">
                  <div 
                    class="w-16 h-16 mx-auto flex items-center justify-center transition-all duration-300"
                    :class="[
                      getColorClass(value.color, 'bgLight'),
                      valueHovered === i ? 'scale-110' : ''
                    ]"
                  >
                    <UIcon 
                      :name="value.icon" 
                      class="w-8 h-8"
                      :class="getColorClass(value.color, 'text')"
                    />
                  </div>
                </div>
                
                <!-- Content -->
                <div class="relative z-10 flex-1">
                  <h3 
                    class="text-xl font-bold font-poppins mb-3 transition-colors duration-300"
                    :class="valueHovered === i ? getColorClass(value.color, 'text') : 'text-gray-900'"
                  >
                    {{ value.title }}
                  </h3>
                  <p class="text-gray-600 font-inter leading-relaxed">
                    {{ value.description }}
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
a:focus-visible,
button:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid #004887;
  outline-offset: 2px;
}

/* Fade-in animation */
.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
