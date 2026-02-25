<script setup lang="ts">
// Define props
const props = withDefaults(defineProps<{
  backgroundImage?: string;
  ctaText?: string;
  videoText?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
}>(), {
  backgroundImage: '/img/youth.webp',
  ctaText: 'Explore Our Programs',
  videoText: 'Watch Our Impact',
  titleLine1: 'Empowering Youth Through',
  titleLine2: 'Skills & Community',
  subtitle: 'A peer-led intervention integrating substance use prevention and gender equity into vocational training across Zambia, Zimbabwe, and South Africa.'
});



// State
const isVisible = ref(false);
const isLoaded = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

// Methods
const handleImageLoad = () => {
  isLoaded.value = true;
};
</script>

<template>
  <div class="w-full relative bg-white overflow-hidden">
    <!-- Hero Section with Full-Width Image -->
    <div class="relative w-full">
      <!-- Image Container with Creative Layout -->
      <div class="relative w-full h-[85vh] min-h-[600px] max-h-[800px] overflow-hidden">
        <!-- Background Image -->
        <img
          v-if="backgroundImage"
          :src="backgroundImage"
          :alt="titleLine1 + ' ' + titleLine2"
          class="w-full h-full object-cover object-center"
          loading="eager"
          :class="isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'"
          @load="handleImageLoad"
        />
        
        <!-- Loading Skeleton -->
        <div v-if="!isLoaded" class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
        
        <!-- Overlay with Creative Gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <!-- Decorative Elements -->
        <div class="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-black/30 to-transparent pointer-events-none"></div>
        <div class="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-600/20 via-transparent to-transparent pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-brand-light/20 via-transparent to-transparent pointer-events-none"></div>
      </div>
      
      <!-- Content Overlay - Split Layout -->
      <div class="absolute inset-0">
        <div class="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div class="h-full flex flex-col justify-center">
            <!-- Main Content - Left Aligned with Better Positioning -->
            <div 
              class="max-w-3xl transform transition-all duration-1000 delay-300"
              :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
            >
              <!-- Badge -->
              <div class="inline-flex items-center gap-2 bg-blue-600/90 backdrop-blur-sm px-4 py-2 mb-6">
                <UIcon name="i-heroicons-academic-cap" class="w-4 h-4 text-white" />
                <span class="text-sm font-semibold text-white font-poppins uppercase tracking-wider">Evidence-Based Research Initiative</span>
              </div>
              
              <!-- Main Title with Tagline as Primary Focus -->
              <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-poppins leading-tight mb-4">
                <span class="block">{{ titleLine1 }}</span>
                <span class="block text-blue-300">{{ titleLine2 }}</span>
              </h1>
              
              <!-- Animated Underline -->
              <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mb-8"></div>
              
              <!-- Enhanced Tagline - Primary Focus -->
              <div class="mb-10">
                <p class="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-poppins leading-relaxed max-w-4xl drop-shadow-lg">
                  {{ subtitle }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.shimmer-effect {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* WCAG-compliant focus styles */
a:focus,
button:focus {
  outline: 2px solid #004887;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .bg-gradient-to-br,
  .bg-gradient-to-r,
  .bg-gradient-to-t {
    background: none !important;
  }
  
  a {
    text-decoration: underline;
  }
  
  .shadow-lg, .shadow-xl, .shadow-2xl {
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
  
  .lg\:col-span-7,
  .lg\:col-span-5 {
    grid-column: span 12;
  }
  
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .h-\[85vh\] {
    height: 70vh;
  }
  
  .text-7xl,
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-5xl {
    font-size: 2rem;
  }
  
  .grid-cols-4,
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .h-\[85vh\] {
    height: 65vh;
    min-height: 500px;
  }
  
  .text-4xl {
    font-size: 1.75rem;
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
  
  .text-gray-600,
  .text-gray-700 {
    color: #d1d5db !important;
  }
  
  .border-gray-200 {
    border-color: #374151 !important;
  }
  
  .bg-gray-100 {
    background-color: #1f2937 !important;
  }
  
  .bg-white\/95,
  .bg-white\/10 {
    background-color: rgba(17, 24, 39, 0.95) !important;
  }
}
</style>