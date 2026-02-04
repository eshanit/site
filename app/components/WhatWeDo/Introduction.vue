<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const highlights = [
  { 
    number: '8', 
    label: 'Sessions', 
    description: 'Comprehensive program structure', 
    icon: 'i-heroicons-calendar',
    color: 'blue'
  },
  { 
    number: '16-24', 
    label: 'Age Range', 
    description: 'Targeted youth demographic', 
    icon: 'i-heroicons-users',
    color: 'orange'
  },
  { 
    number: '2', 
    label: 'Science-backed Programs', 
    description: 'RAD-PAL & Manhood 2.0 foundation', 
    icon: 'i-heroicons-beaker',
    color: 'green'
  },
  { 
    number: 'Peer', 
    label: 'Education Model', 
    description: 'Community-driven approach', 
    icon: 'i-heroicons-chat-bubble-left-right',
    color: 'purple'
  }
]

// State
const isVisible = ref(false)
const isLoaded = ref(false)
const hoveredHighlight = ref<number | null>(null)

// Color mapping
const colorClasses = {
  blue: {
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-600',
    bgLight: 'bg-blue-50',
    hover: 'hover:bg-blue-50',
    gradient: 'from-blue-600 to-blue-900'
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    border: 'border-orange-500',
    bgLight: 'bg-orange-50',
    hover: 'hover:bg-orange-50',
    gradient: 'from-orange-500 to-orange-700'
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-500',
    bgLight: 'bg-green-50',
    hover: 'hover:bg-green-50',
    gradient: 'from-green-500 to-green-700'
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-500',
    bgLight: 'bg-purple-50',
    hover: 'hover:bg-purple-50',
    gradient: 'from-purple-500 to-purple-700'
  }
}

const getColorClass = (color: string, type: keyof typeof colorClasses.blue) => {
  return colorClasses[color as keyof typeof colorClasses][type]
}

// Quick stats
const quickStats = [
  { 
    value: '3', 
    label: 'Countries', 
    description: 'Zambia, Zimbabwe, South Africa', 
    icon: 'i-heroicons-globe-europe-africa',
    color: 'blue'
  },
  { 
    value: '500+', 
    label: 'Youth Impacted', 
    description: 'Active participants', 
    icon: 'i-heroicons-users',
    color: 'orange'
  }
]

// Methods
const handleImageLoad = () => {
  isLoaded.value = true
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <!-- Hero Section with Large Vivid Image -->
    <section id="intro-hero" class="relative w-full">
      <!-- Full-width Image Background -->
      <div class="relative w-full h-[85vh] min-h-[600px] max-h-[800px] overflow-hidden">
        <!-- Main Image -->
        <img
          src="/img/workshops.webp"
          alt="Youth participants engaging in peer education sessions in Southern Africa"
          class="w-full h-full object-cover object-center transition-all duration-1000"
          :class="isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
          @load="handleImageLoad"
        />
        
        <!-- Loading Skeleton -->
        <div v-if="!isLoaded" class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
        
        <!-- Gradient Overlay for Text Readability -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        
        <!-- Content Overlay -->
        <div class="absolute inset-0">
          <div class="w-full h-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
            <div class="h-full flex items-center">
              <div 
                class="max-w-2xl transform transition-all duration-1000 delay-300"
                :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'"
              >
                <!-- Program Badge -->
                <div class="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 border-l-4 border-blue-600 mb-8">
                  <UIcon name="i-heroicons-academic-cap" class="w-4 h-4 text-blue-600" />
                  <span class="text-sm font-semibold text-blue-700 font-poppins uppercase tracking-wider">Program Overview</span>
                </div>

                <!-- Main Title -->
                <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-poppins leading-tight mb-6">
                  Peer Education for
                  <span class="text-blue-300 block">Gender Inclusion</span>
                  <span class="text-orange-300 block text-xl md:text-2xl font-inter mt-4">
                    and Substance Use in Southern Africa
                  </span>
                </h1>

                <!-- Animated Underline -->
                <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mb-8 transform transition-all duration-1000 delay-500"
                     :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'"></div>

                <!-- Description -->
                <p class="text-xl text-white/90 leading-relaxed font-inter mb-10 max-w-xl">
                  PEGISUS represents a groundbreaking, evidence-based approach to youth development, combining substance use prevention with gender equity education through peer-led, community-embedded programming.
                </p>

                <!-- Quick Stats -->
                <div class="grid grid-cols-2 gap-6 mb-8">
                  <div 
                    v-for="(stat, index) in quickStats" 
                    :key="stat.label"
                    class="group relative bg-white/10 backdrop-blur-sm border border-white/20 p-6 hover:bg-white/15 transition-all duration-300"
                  >
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 flex items-center justify-center text-white"
                           :class="getColorClass(stat.color, 'bg')">
                        <UIcon :name="stat.icon" class="w-6 h-6" />
                      </div>
                      <div>
                        <div class="text-3xl font-bold text-white font-poppins">
                          {{ stat.value }}
                        </div>
                        <div class="text-sm font-semibold text-white/90 font-poppins">
                          {{ stat.label }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- CTA Buttons -->
               
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div class="animate-bounce">
            <UIcon name="i-heroicons-chevron-down" class="w-8 h-8 text-white/70" />
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights Section -->
    <section id="intro-highlights" class="relative -mt-20 z-10">
      <div class="w-full px-4 md:px-8 lg:px-12 pb-16 md:pb-24">
        <div class="w-full max-w-7xl mx-auto">
          <!-- Content Card -->
          <div 
            class="relative bg-white shadow-2xl border border-gray-100 p-8 md:p-12 transform transition-all duration-1000"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            <!-- Section Header -->
            <div class="text-center mb-16">
              <div class="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 border-l-4 border-blue-600 mb-4 mx-auto">
                <UIcon name="i-heroicons-star" class="w-4 h-4 text-blue-600" />
                <span class="text-sm font-semibold text-blue-700 font-poppins">Program Highlights</span>
              </div>
              
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins mb-6">
                Key <span class="text-blue-600">Program Features</span>
              </h2>
              
              <div class="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-900 mx-auto mb-6"></div>
              
              <p class="text-lg text-gray-600 font-inter max-w-3xl mx-auto">
                Discover the essential elements that make PEGISUS an effective, evidence-based intervention for youth empowerment.
              </p>
            </div>

            <!-- Highlights Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <div
                v-for="(highlight, index) in highlights"
                :key="index"
                class="group relative bg-white border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                @mouseenter="hoveredHighlight = index"
                @mouseleave="hoveredHighlight = null"
              >
                <!-- Card Background Pattern -->
                <div class="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                     :class="`bg-gradient-to-br ${getColorClass(highlight.color, 'gradient')}`"></div>
                
                <!-- Card Content -->
                <div class="relative z-10">
                  <div class="flex items-center gap-4 mb-6">
                    <div class="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                         :class="getColorClass(highlight.color, 'bg')">
                      <UIcon :name="highlight.icon" class="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 class="text-xl font-bold font-poppins mb-2" 
                          :class="hoveredHighlight === index ? getColorClass(highlight.color, 'text') : 'text-gray-900'">
                        {{ highlight.label }}
                      </h3>
                      <div class="h-1 w-8 transition-all duration-500 group-hover:w-12"
                           :class="`bg-gradient-to-r ${getColorClass(highlight.color, 'gradient')}`"></div>
                    </div>
                  </div>
                  
                  <!-- Number -->
                  <div class="text-4xl md:text-5xl font-bold font-poppins mb-4 transition-colors duration-300"
                       :class="hoveredHighlight === index ? `bg-gradient-to-r ${getColorClass(highlight.color, 'gradient')} bg-clip-text text-transparent` : 'text-gray-900'">
                    {{ highlight.number }}
                  </div>
                  
                  <!-- Description -->
                  <p class="text-gray-600 font-inter">
                    {{ highlight.description }}
                  </p>
                </div>
                
                <!-- Card Corner Decoration -->
                <div class="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                  <div class="absolute top-0 right-0 w-12 h-12 transform rotate-45 translate-x-6 -translate-y-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                       :class="`bg-gradient-to-br ${getColorClass(highlight.color, 'gradient')}`"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-900">
      <div class="w-full max-w-7xl mx-auto">
        <div class="text-center">
          <div class="mb-8">
            <UIcon name="i-heroicons-hand-raised" class="w-16 h-16 text-white/90 mx-auto" />
          </div>
          
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-poppins mb-6">
            Ready to <span class="text-orange-300">Empower Youth</span> in Your Community?
          </h2>
          
          <div class="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-300 mx-auto mb-8"></div>
          
          <p class="text-xl text-white/90 mb-10 font-inter max-w-3xl mx-auto">
            Join our mission to create sustainable change through evidence-based, peer-led interventions across Southern Africa. Together, we can build stronger, healthier communities.
          </p>
          
          <!-- <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/contact"
              class="group px-10 py-4 bg-white text-blue-600 font-bold font-poppins shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg flex items-center justify-center gap-3"
            >
              <UIcon name="i-heroicons-hand-raised" class="w-5 h-5" />
              <span>Get Involved</span>
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </NuxtLink>
            
            <NuxtLink
              to="/research"
              class="group px-10 py-4 bg-transparent text-white border-2 border-white font-bold font-poppins hover:bg-white/10 transition-all duration-300 text-lg flex items-center justify-center gap-3"
            >
              <UIcon name="i-heroicons-document-text" class="w-5 h-5" />
              <span>View Programs</span>
            </NuxtLink>
          </div> -->

          <!-- Trust Indicators -->
          <div class="mt-12 pt-8 border-t border-white/20">
            <p class="text-sm text-white/80 font-inter mb-6">Trusted by leading organizations</p>
            <div class="flex flex-wrap justify-center gap-8 items-center">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-2">
                  <span class="text-white font-bold font-poppins text-sm">CN</span>
                </div>
                <span class="text-sm font-semibold text-white/90 font-poppins">Communities</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-2">
                  <UIcon name="i-heroicons-heart" class="w-6 h-6 text-white" />
                </div>
                <span class="text-sm font-semibold text-white/90 font-poppins">Health Institutions</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-2">
                  <UIcon name="i-heroicons-user-group" class="w-6 h-6 text-white" />
                </div>
                <span class="text-sm font-semibold text-white/90 font-poppins">Local NGOs</span>
              </div>
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-2">
                  <UIcon name="i-heroicons-briefcase" class="w-6 h-6 text-white" />
                </div>
                <span class="text-sm font-semibold text-white/90 font-poppins">Partners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Remove all border-radius */
* {
  border-radius: 0 !important;
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* WCAG-compliant focus styles */
a:focus,
button:focus {
  outline: 2px solid #FFFFFF;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .bg-gradient-to-r,
  .bg-gradient-to-br {
    background: none !important;
  }
  
  a {
    text-decoration: underline;
  }
  
  .shadow-lg, .shadow-2xl {
    box-shadow: none !important;
  }
  
  .border {
    border: 1px solid #000 !important;
  }
  
  .text-white {
    color: #000 !important;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .transform,
  .hover\:transform,
  .group-hover\:transform {
    transform: none !important;
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .h-\[85vh\] {
    height: 75vh;
  }
  
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .h-\[85vh\] {
    height: 60vh;
    min-height: 500px;
  }
  
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-5xl {
    font-size: 2rem;
  }
  
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .h-\[85vh\] {
    height: 50vh;
    min-height: 450px;
  }
  
  .text-4xl {
    font-size: 1.75rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .bg-white\/90,
  .bg-white\/10,
  .bg-white\/20,
  .backdrop-blur-sm,
  .backdrop-blur-md {
    background: white !important;
    backdrop-filter: none !important;
  }
  
  .text-white\/90,
  .text-white\/80 {
    color: black !important;
  }
  
  .border-white\/20,
  .border-white\/30 {
    border-color: black !important;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .bg-white {
    background-color: #111827 !important;
  }
  
  .text-gray-900 {
    color: #f9fafb !important;
  }
  
  .text-gray-600 {
    color: #d1d5db !important;
  }
  
  .border-gray-100 {
    border-color: #374151 !important;
  }
}
</style>