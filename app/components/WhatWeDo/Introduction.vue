<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
    color: 'azure'
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
    color: 'teal'
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
    gradient: 'from-blue-500 to-blue-700'
  },
  azure: {
    bg: 'bg-sky-500',
    text: 'text-sky-500',
    border: 'border-sky-500',
    bgLight: 'bg-sky-50',
    hover: 'hover:bg-sky-50',
    gradient: 'from-sky-400 to-sky-600'
  },
  green: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-500',
    border: 'border-emerald-500',
    bgLight: 'bg-emerald-50',
    hover: 'hover:bg-emerald-50',
    gradient: 'from-emerald-400 to-emerald-600'
  },
  teal: {
    bg: 'bg-teal-600',
    text: 'text-teal-600',
    border: 'border-teal-600',
    bgLight: 'bg-teal-50',
    hover: 'hover:bg-teal-50',
    gradient: 'from-teal-500 to-teal-700'
  }
}

const getColorClass = (color: string, type: keyof typeof colorClasses.blue) => {
  const colorKey = color as keyof typeof colorClasses
  if (!colorClasses[colorKey]) {
    return colorClasses.blue[type] // fallback to blue
  }
  return colorClasses[colorKey][type]
}

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
  <div class="w-full relative overflow-hidden bg-gray-50">
    <!-- Hero Section with Full-Width Image -->
    <section id="intro-hero" class="relative w-full">
      <div class="relative w-full h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
        <!-- Main Image with Parallax Effect -->
        <img
          src="/img/workshops.webp"
          alt="Youth participants engaging in peer education sessions in Southern Africa"
          class="w-full h-full object-cover object-center transition-all duration-1000 transform scale-105 hover:scale-100"
          :class="isLoaded ? 'opacity-100' : 'opacity-0'"
          @load="handleImageLoad"
        />
        
        <!-- Loading Skeleton -->
        <div v-if="!isLoaded" class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
        
        <!-- Modern Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <!-- Centered Content Overlay -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div 
            class="text-center px-4 transform transition-all duration-1000 delay-300"
            :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-poppins leading-tight mb-6 drop-shadow-2xl">
              What Is the <br/> 
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-white">PEGISUS Program?</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-200 font-inter max-w-2xl mx-auto drop-shadow-lg">
              Empowering youth through evidence-based peer education
            </p>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <UIcon name="i-heroicons-chevron-down" class="w-8 h-8 text-white/80" />
        </div>
      </div>
    </section>

    <!-- Highlights Section with Floating Cards -->
    <section id="intro-highlights" class="relative -mt-24 z-10 pb-20">
      <div class="w-full px-4 md:px-8 lg:px-12">
        <div class="w-full max-w-7xl mx-auto">
          <!-- Section Header -->
      

          <!-- Highlights Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div
              v-for="(highlight, index) in highlights"
              :key="index"
              class="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              @mouseenter="hoveredHighlight = index"
              @mouseleave="hoveredHighlight = null"
            >
              <!-- Gradient Border on Hover -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   :class="`bg-gradient-to-br ${getColorClass(highlight.color, 'gradient')}`"
                   style="padding: 2px; border-radius: 1rem;">
                <div class="w-full h-full bg-white rounded-xl"></div>
              </div>
              
              <!-- Card Content -->
              <div class="relative z-10 p-8">
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-14 h-14 flex items-center justify-center rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300"
                       :class="getColorClass(highlight.color, 'bg')">
                    <UIcon :name="highlight.icon" class="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold font-poppins mb-2 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r"
                        :class="`group-hover:${getColorClass(highlight.color, 'gradient')}`">
                      {{ highlight.label }}
                    </h3>
                    <div class="h-1 w-8 rounded-full transition-all duration-500 group-hover:w-12"
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
              
              <!-- Background Pattern -->
              <div class="absolute bottom-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                   :class="`bg-gradient-to-br ${getColorClass(highlight.color, 'gradient')}`"
                   style="border-radius: 50% 50% 0 0;"></div>
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
  outline: 2px solid #2563eb;
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
  
  .shadow-xl, .shadow-2xl {
    box-shadow: none !important;
  }
  
  .border {
    border: 1px solid #000 !important;
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
  .h-\[70vh\] {
    height: 60vh;
  }
}

@media (max-width: 768px) {
  .h-\[70vh\] {
    height: 50vh;
    min-height: 400px;
  }
  
  .text-7xl {
    font-size: 3rem;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
}

@media (max-width: 640px) {
  .h-\[70vh\] {
    height: 40vh;
    min-height: 350px;
  }
  
  .text-7xl {
    font-size: 2.5rem;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .bg-white\/90,
  .bg-white\/10,
  .backdrop-blur-sm {
    background: white !important;
    backdrop-filter: none !important;
  }
  
  .text-gray-200 {
    color: black !important;
  }
  
  .border-white\/20 {
    border-color: black !important;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .bg-gray-50 {
    background-color: #111827 !important;
  }
  
  .bg-white {
    background-color: #1f2937 !important;
  }
  
  .text-gray-900 {
    color: #f9fafb !important;
  }
  
  .text-gray-600 {
    color: #d1d5db !important;
  }
  
  .shadow-xl {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4) !important;
  }
}
</style>