<script setup lang="ts">
// Define props for the component
const props = withDefaults(defineProps<{
  stats?: Array<{
    value: string;
    label: string;
    color: string;
    icon?: string;
    percentageValue?: number;
  }>;
}>(), {
  stats: () => [
    { value: '60%', label: 'Africa\'s Youth Population', color: 'from-cyan-500 to-blue-900', icon: 'i-heroicons-users', percentageValue: 60 },
    { value: '1B+', label: 'Young Africans', color: 'from-cyan-500 to-blue-700', icon: 'i-heroicons-globe-alt', percentageValue: 100 },
    { value: '75%', label: 'Under Age 35', color: 'from-cyan-500 to-emerald-600', icon: 'i-heroicons-sparkles', percentageValue: 75 }
  ]
});

// Add some interactive state
const isVisible = ref(false);
const hoveredStat = ref<number | null>(null);
const animatedValues = ref<number[]>([0, 0, 0]);

const animateCounter = (targetValue: string, index: number) => {
  const numValue = parseInt(targetValue);
  if (isNaN(numValue)) return;
  
  let current = 0;
  const increment = numValue / 30;
  const interval = setInterval(() => {
    current += increment;
    if (current >= numValue) {
      animatedValues.value[index] = numValue;
      clearInterval(interval);
    } else {
      animatedValues.value[index] = Math.floor(current);
    }
  }, 30);
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
    // Start counter animations
    props.stats?.forEach((stat, index) => {
      setTimeout(() => {
        animateCounter(stat.value, index);
      }, 200 + index * 100);
    });
  }, 100);
});
</script>

<template>
  <div class="w-full relative bg-gradient-to-b from-white via-cyan-50/30 to-blue-50/30">
    <!-- Content Container -->
    <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
      
      <!-- Section Header -->
      <div class="mb-16 md:mb-24">
        <div class="inline-flex items-center gap-3 mb-6">
          <div class="w-3 h-3 bg-cyan-500"></div>
          <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">PEGISUS Initiative</span>
        </div>
        
        <div class="space-y-4">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Shaping <span class="bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">Africa's Future</span>
          </h2>
          <div class="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-900"></div>
        </div>
        
        <p class="mt-8 text-lg md:text-xl text-gray-600 max-w-3xl">
          Empowering the next generation through innovative approaches and sustainable solutions across Southern Africa
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
        <!-- Left Column - Text Content -->
        <div class="space-y-8">
          <!-- Text Block 1 -->
          <div class="transform transition-all duration-700"
               :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'">
            <div class="border-l-4 border-cyan-500 pl-6 py-1 mb-4">
              <h3 class="text-2xl font-bold text-gray-900">The Youth Challenge</h3>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed">
              <span class="font-bold text-cyan-600">Young people are the future.</span> In Africa, youth account for 
              <span class="font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">over 60% of the population</span>,
              yet face unprecedented challenges including emerging health threats, economic instability, and growing inequities between the Global South and North.
            </p>
          </div>

          <!-- Text Block 2 -->
          <div class="transform transition-all duration-700 delay-200"
               :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'">
            <div class="border-l-4 border-blue-900 pl-6 py-1 mb-4">
              <h3 class="text-2xl font-bold text-gray-900">Our Approach</h3>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed">
              Through the <span class="font-bold text-blue-800">PEGISUS framework</span>, we implement a multi-pronged strategy that addresses substance use prevention, 
              transforms gender beliefs, and enhances employment potential—creating holistic pathways to empowerment.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4 transform transition-all duration-700 delay-300"
               :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
            <NuxtLink
              to="/about-pegisus"
              class="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex items-center justify-center gap-3"
            >
              <span class="relative">Learn About PEGISUS</span>
              <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                <div class="w-1/2 h-full bg-white/20 skew-x-12"></div>
              </div>
            </NuxtLink>
            
            <button
              class="px-8 py-4 bg-white text-cyan-600 border-2 border-cyan-500 font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-cyan-50 flex items-center justify-center gap-3"
            >
              <UIcon name="i-heroicons-user-group" class="w-5 h-5" />
              <span>Join Our Mission</span>
            </button>
          </div>
        </div>

        <!-- Right Column - Stats & Impact -->
        <div class="space-y-8">
          <!-- Statistics Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 transform transition-all duration-700 delay-100"
               :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'">
            <div 
              v-for="(stat, index) in stats" 
              :key="index"
              class="group relative h-full transform transition-all duration-500 hover:scale-105"
              @mouseenter="hoveredStat = index"
              @mouseleave="hoveredStat = null"
            >
              <!-- Animated background gradient -->
              <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl"
                   :class="`${stat.color}`"></div>
              
              <!-- Main card -->
              <div class="relative bg-white backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 p-8 overflow-hidden"
                   :class="hoveredStat === index ? 'border-cyan-300' : ''">
                
                <!-- Background icon glow -->
                <div class="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 rounded-full opacity-5 transition-all duration-500"
                     :class="`bg-gradient-to-br ${stat.color}`"></div>
                
                <!-- Icon -->
                <div v-if="stat.icon" class="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-lg transition-all duration-500"
                     :class="`bg-gradient-to-br ${stat.color} text-white`">
                  <UIcon :name="stat.icon" class="w-7 h-7" />
                </div>
                
                <!-- Value with animation -->
                <div class="relative z-10">
                  <div class="text-3xl md:text-4xl font-bold transition-all duration-300"
                       :class="hoveredStat === index ? `bg-gradient-to-r ${stat.color} bg-clip-text text-transparent scale-110` : 'text-gray-900'">
                    {{ stat.value }}
                  </div>
                  
                  <!-- Optional progress bar for percentage stats -->
                  <div v-if="stat.percentageValue" class="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-1000 ease-out"
                         :class="`bg-gradient-to-r ${stat.color}`"
                         :style="{ width: isVisible ? `${stat.percentageValue}%` : '0%' }"></div>
                  </div>
                </div>
                
                <!-- Label -->
                <p class="mt-6 text-gray-700 font-semibold text-base transition-colors duration-300"
                   :class="hoveredStat === index ? 'text-gray-900' : ''">
                  {{ stat.label }}
                </p>
                
                <!-- Hover indicator -->
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     :class="`${stat.color}`"></div>
              </div>
            </div>
          </div>

          <!-- Impact Approach -->
          <div class="transform transition-all duration-700 delay-200"
               :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
            <div class="bg-gradient-to-r from-cyan-500 to-blue-900 text-white shadow-lg">
              <div class="p-8">
                <h3 class="text-2xl font-bold mb-6">Our Impact Framework</h3>
                
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-white/20 flex items-center justify-center">
                      <UIcon name="i-heroicons-shield-check" class="w-6 h-6" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg mb-1">Substance Use Prevention</h4>
                      <p class="text-white/90 text-sm">Implementing evidence-based interventions to reduce harmful substance use among youth</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-white/20 flex items-center justify-center">
                      <UIcon name="i-heroicons-scale" class="w-6 h-6" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg mb-1">Gender Belief Transformation</h4>
                      <p class="text-white/90 text-sm">Promoting equitable gender norms and challenging harmful stereotypes</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-white/20 flex items-center justify-center">
                      <UIcon name="i-heroicons-briefcase" class="w-6 h-6" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg mb-1">Employment Potential</h4>
                      <p class="text-white/90 text-sm">Developing vocational skills and economic opportunities for sustainable livelihoods</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Bottom accent bar -->
              <div class="h-2 bg-gradient-to-r from-cyan-400 to-blue-800"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mission Statement -->
      <div class="border-t  border-gray-200 py-12 transform transition-all duration-700 delay-400"
           :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-6">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-12 h-12 text-cyan-500 mx-auto" />
          </div>
          <blockquote class="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
            "Peer Education for Gender Inclusion and Substance Use in Southern Africa."
          </blockquote>
          <div class="flex items-center justify-center gap-3">
            <div class="h-px w-12 bg-gradient-to-r from-cyan-500 to-blue-900"></div>
            <span class="text-lg font-semibold text-cyan-700">PEGISUS Mission</span>
            <div class="h-px w-12 bg-gradient-to-r from-blue-900 to-cyan-500"></div>
          </div>
        </div>
      </div>

      <!-- Partner/Region Indicator -->
      <div class="mt-12 pt-8 border-t border-gray-200 transform transition-all duration-700 delay-500"
           :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-center md:text-left">
            <h4 class="font-bold text-gray-900 mb-2">Active in Southern Africa</h4>
            <p class="text-gray-600 text-sm">Implementing programs across Zambia, Zimbabwe, and South Africa</p>
          </div>
          
          <div class="flex items-center gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">3</div>
              <div class="text-sm text-gray-600">Countries</div>
            </div>
            <div class="h-8 w-px bg-gray-300"></div>
            <div class="text-center">
              <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">500+</div>
              <div class="text-sm text-gray-600">Youth Impacted</div>
            </div>
            <div class="h-8 w-px bg-gray-300"></div>
            <div class="text-center">
              <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">2024</div>
              <div class="text-sm text-gray-600">Active Since</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Remove all border-radius globally */
* {
  border-radius: 0 !important;
}

/* Custom gradient animations */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
}

@media (max-width: 475px) {
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-5xl {
    font-size: 2rem;
  }
  
  .text-4xl {
    font-size: 1.75rem;
  }
}
</style>