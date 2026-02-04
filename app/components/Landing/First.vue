<script setup lang="ts">
// Define props
const props = withDefaults(defineProps<{
  backgroundImage?: string;
  ctaText?: string;
  videoText?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  showMetrics?: boolean;
}>(), {
  backgroundImage: '/img/youth.webp',
  ctaText: 'Explore Our Programs',
  videoText: 'Watch Our Impact',
  titleLine1: 'Empowering Youth Through',
  titleLine2: 'Skills & Community',
  subtitle: 'A peer-led intervention integrating substance use prevention and gender equity into vocational training across Zambia, Zimbabwe, and South Africa.',
  showMetrics: true
});

// Impact metrics
const impactMetrics = ref([
  { value: 500, label: 'Youth Reached', suffix: '+', color: 'blue' },
  { value: 3, label: 'Countries', suffix: '', color: 'orange' },
  { value: 10, label: 'Vocational Partners', suffix: '+', color: 'green' }
]);


// Pillars
const pillars = ref([
  {
    title: 'Peer-Led Approach',
    description: 'Youth-to-youth mentorship creating sustainable change through shared experiences and community ownership.',
    icon: 'i-heroicons-user-group',
    iconBg: 'bg-gradient-to-br from-blue-600 to-blue-900',
    titleColor: 'text-blue-700',
    accentColor: 'bg-gradient-to-r from-blue-600 to-blue-900',
    statLabel: 'Mentorship',
    statValue: 'Yes',
    statColor: 'text-blue-600',
    patternColor: 'bg-blue-50',
    cornerColor: 'from-blue-600 to-blue-900'
  },
  {
    title: 'Vocational Skills',
    description: 'Market-relevant training programs that equip youth with practical skills for sustainable economic empowerment.',
    icon: 'i-heroicons-briefcase',
    iconBg: 'bg-gradient-to-br from-orange-500 to-orange-700',
    titleColor: 'text-orange-600',
    accentColor: 'bg-gradient-to-r from-orange-500 to-orange-700',
    statLabel: 'Skills training',
    statValue: 'Yes',
    statColor: 'text-orange-600',
    patternColor: 'bg-orange-50',
    cornerColor: 'from-orange-500 to-orange-700'
  },
  {
    title: 'Holistic Support',
    description: 'Comprehensive approach addressing substance use prevention and transforming gender beliefs for balanced development.',
    icon: 'i-heroicons-shield-check',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-700',
    titleColor: 'text-green-600',
    accentColor: 'bg-gradient-to-r from-green-500 to-green-700',
    statLabel: 'Wellness Programs',
    statValue: 'Yes',
    statColor: 'text-green-600',
    patternColor: 'bg-green-50',
    cornerColor: 'from-green-500 to-green-700'
  },
  {
    title: 'Regional Impact',
    description: 'Adaptable framework implemented across Zambia, Zimbabwe, and South Africa with localized community solutions.',
    icon: 'i-heroicons-globe-americas',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-700',
    titleColor: 'text-purple-600',
    accentColor: 'bg-gradient-to-r from-purple-500 to-purple-700',
    statLabel: 'Country Reach',
    statValue: '3+',
    statColor: 'text-purple-600',
    patternColor: 'bg-purple-50',
    cornerColor: 'from-purple-500 to-purple-700'
  }
]);

// State
const isVisible = ref(false);
const isLoaded = ref(false);
const hoveredMetric = ref<number | null>(null);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

// Methods
const handleImageLoad = () => {
  isLoaded.value = true;
};

const getMetricColor = (color: string) => {
  const colors = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

const getMetricGradient = (color: string) => {
  const gradients = {
    blue: 'from-blue-400 to-blue-600',
    orange: 'from-orange-400 to-orange-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600'
  };
  return gradients[color as keyof typeof gradients] || gradients.blue;
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
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/20 via-transparent to-transparent pointer-events-none"></div>
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
              
              <!-- Main Title -->
              <h1 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-poppins leading-tight mb-6">
                <span class="block">{{ titleLine1 }}</span>
                <span class="block text-blue-300">{{ titleLine2 }}</span>
              </h1>
              
              <!-- Animated Underline -->
              <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mb-6"></div>
              
              <!-- Subtitle -->
              <p class="text-lg md:text-xl text-white/90 leading-relaxed font-inter max-w-2xl mb-8">
                {{ subtitle }}
              </p>
              
              <!-- Impact Metrics - Enhanced -->
              <div v-if="showMetrics" class="py-6 border-t border-white/20">
                <div class="grid grid-cols-3 gap-8">
                  <div 
                    v-for="(metric, index) in impactMetrics" 
                    :key="metric.label"
                    class="group text-left transform transition-all duration-500 hover:scale-105"
                    @mouseenter="hoveredMetric = index"
                    @mouseleave="hoveredMetric = null"
                  >
                    <!-- Metric Value -->
                    <div class="relative mb-2">
                      <div class="text-3xl md:text-4xl font-bold text-white font-poppins"
                           :class="hoveredMetric === index ? 'drop-shadow-lg' : ''">
                        {{ metric.value }}{{ metric.suffix }}
                      </div>
                    </div>
                    
                    <!-- Metric Label -->
                    <div class="text-sm font-medium text-white/70 font-inter">
                      {{ metric.label }}
                    </div>
                    
                    <!-- Bottom Accent -->
                    <div class="h-1 w-12 mt-2 bg-gradient-to-r transition-all duration-500"
                         :class="[
                           getMetricGradient(metric.color),
                           hoveredMetric === index ? 'w-full opacity-100' : 'opacity-60'
                         ]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Impact Dashboard (Below Hero) -->
    <div class="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24 lg:py-32">
      <div class="w-full max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 border-l-4 border-blue-600 mb-4">
            <UIcon name="i-heroicons-chart-bar" class="w-4 h-4 text-blue-600" />
            <span class="text-sm font-semibold text-blue-700 font-poppins">Impact Framework</span>
          </div>
          
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins mb-6">
            Our <span class="text-blue-600">Four Pillars</span> of Impact
          </h2>
          
          <div class="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-900 mx-auto mb-6"></div>
          
          <p class="text-lg text-gray-600 font-inter max-w-3xl mx-auto">
            A comprehensive approach to youth empowerment through evidence-based interventions and sustainable partnerships
          </p>
        </div>

        <!-- Impact Cards with Creative Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div 
            v-for="(pillar, index) in pillars" 
            :key="pillar.title"
            class="group relative bg-white border border-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <!-- Card Background Pattern -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                 :class="pillar.patternColor"></div>
            
            <!-- Card Content -->
            <div class="relative z-10">
              <div class="flex items-start gap-4 mb-6">
                <div class="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                     :class="pillar.iconBg">
                  <UIcon :name="pillar.icon" class="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 class="text-xl font-bold font-poppins mb-2" :class="pillar.titleColor">
                    {{ pillar.title }}
                  </h3>
                  <div class="h-1 w-8 transition-all duration-500 group-hover:w-12"
                       :class="pillar.accentColor"></div>
                </div>
              </div>
              
              <p class="text-gray-600 font-inter mb-6">
                {{ pillar.description }}
              </p>
              
              <!-- Card Stats -->
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div class="text-sm font-medium text-gray-500 font-inter">{{ pillar.statLabel }}</div>
                <div class="text-lg font-bold font-poppins" :class="pillar.statColor">
                  {{ pillar.statValue }}
                </div>
              </div>
            </div>
            
            <!-- Card Corner Decoration -->
            <div class="absolute top-0 right-0 w-12 h-12 overflow-hidden">
              <div class="absolute top-0 right-0 w-12 h-12 transform rotate-45 translate-x-6 -translate-y-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                   :class="pillar.cornerColor"></div>
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
  outline: 2px solid #1E3A8A;
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