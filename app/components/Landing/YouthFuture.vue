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
    { 
      value: '500+', 
      label: 'Youth Reached', 
      color: 'from-blue-600 to-blue-800', 
      icon: 'i-heroicons-users', 
      percentageValue: 100 
    },
    { 
      value: '3', 
      label: 'Countries', 
      color: 'from-orange-500 to-orange-700', 
      icon: 'i-heroicons-globe-alt' 
    },
    { 
      value: '75%', 
      label: 'Program Completion', 
      color: 'from-green-500 to-green-700', 
      icon: 'i-heroicons-check-circle', 
      percentageValue: 75 
    }
  ]
});

// Add some interactive state
const isVisible = ref(false);
const hoveredStat = ref<number | null>(null);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <div class="w-full relative bg-gray-50">
    <!-- Content Container -->
    <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
      
      <!-- Section Header -->
      <div class="mb-16 md:mb-24">
        <div class="inline-flex items-center gap-3 mb-6">
          <div class="w-3 h-3 bg-blue-600"></div>
          <span class="text-sm font-semibold text-blue-700 font-poppins uppercase tracking-wider">Research & Impact</span>
        </div>
        
        <div class="space-y-4">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-poppins leading-tight">
            Shaping <span class="text-blue-600">Africa's Future</span>
            <span class="block text-lg md:text-xl text-orange-600 font-inter mt-2">Through Evidence-Based Youth Empowerment</span>
          </h2>
          <div class="h-1 w-24 bg-blue-600"></div>
        </div>
        
        <p class="mt-8 text-lg md:text-xl text-gray-600 font-inter max-w-3xl">
          Addressing critical challenges through the PEGISUS framework: integrating substance use prevention, gender belief transformation, and vocational training across Southern Africa.
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
        <!-- Left Column - Text Content -->
        <div class="space-y-8">
          <!-- Text Block 1 - Sozo Storytelling Style -->
          <div class="transform transition-all duration-700"
               :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'">
            <div class="border-l-4 border-blue-600 pl-6 py-1 mb-4">
              <h3 class="text-2xl font-bold text-gray-900 font-poppins">The Youth Challenge</h3>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed font-inter">
              <span class="font-bold text-blue-700">Africa's youth population represents both a challenge and an opportunity.</span> 
              With over <span class="font-bold text-orange-600">60% of the population under 25</span>, young people face emerging health threats, economic instability, and growing inequities that require innovative, community-led solutions.
            </p>
          </div>

          <!-- Text Block 2 - PEGISUS Professional Approach -->
          <div class="transform transition-all duration-700 delay-200"
               :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'">
            <div class="border-l-4 border-orange-500 pl-6 py-1 mb-4">
              <h3 class="text-2xl font-bold text-gray-900 font-poppins">Our Evidence-Based Approach</h3>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed font-inter">
              The <span class="font-bold text-blue-800 font-poppins">PEGISUS framework</span> implements peer-led interventions that address:
            </p>
            
            <ul class="space-y-3 mt-4 font-inter">
              <li class="flex items-start gap-3">
                <UIcon name="i-heroicons-shield-check" class="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span><strong class="text-blue-700">Substance Use Prevention:</strong> Evidence-based harm reduction strategies</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon name="i-heroicons-scale" class="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <span><strong class="text-blue-700">Gender Belief Transformation:</strong> Promoting equitable norms and challenging stereotypes</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon name="i-heroicons-briefcase" class="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                <span><strong class="text-blue-700">Vocational Empowerment:</strong> Market-relevant skills for sustainable livelihoods</span>
              </li>
            </ul>
          </div>

          <!-- CTA Buttons - UNICEF Accessible Design -->
     
        </div>

        <!-- Right Column - Stats & Impact -->
        <div class="space-y-8">
          <!-- Statistics Grid - Sozo Vibrancy -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 transform transition-all duration-700 delay-100"
               :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'">
            <div 
              v-for="(stat, index) in stats" 
              :key="index"
              class="group relative h-full transform transition-all duration-500 hover:scale-105"
              @mouseenter="hoveredStat = index"
              @mouseleave="hoveredStat = null"
            >
              <!-- Main card -->
              <div class="relative bg-white border border-gray-200 shadow-md group-hover:shadow-xl transition-all duration-500 p-8 overflow-hidden"
                   :class="hoveredStat === index ? 'border-blue-300' : ''">
                
                <!-- Background accent -->
                <div class="absolute top-0 left-0 h-1 w-full transition-all duration-500"
                     :class="hoveredStat === index ? `bg-gradient-to-r ${stat.color}` : 'bg-gray-100'"></div>
                
                <!-- Icon -->
                <div v-if="stat.icon" class="mb-6 inline-flex items-center justify-center w-14 h-14 transition-all duration-500 group-hover:scale-110"
                     :class="`bg-gradient-to-br ${stat.color} text-white`">
                  <UIcon :name="stat.icon" class="w-7 h-7" />
                </div>
                
                <!-- Value -->
                <div class="relative z-10">
                  <div class="text-3xl md:text-4xl font-bold font-poppins transition-all duration-300"
                       :class="hoveredStat === index ? `bg-gradient-to-r ${stat.color} bg-clip-text text-transparent` : 'text-gray-900'">
                    {{ stat.value }}
                  </div>
                  
                  <!-- Optional progress bar for percentage stats -->
                  <div v-if="stat.percentageValue" class="mt-4 h-2 bg-gray-100 overflow-hidden">
                    <div class="h-full transition-all duration-1000 ease-out"
                         :class="`bg-gradient-to-r ${stat.color}`"
                         :style="{ width: isVisible ? `${stat.percentageValue}%` : '0%' }"></div>
                  </div>
                </div>
                
                <!-- Label -->
                <p class="mt-6 text-gray-700 font-semibold text-base font-inter transition-colors duration-300"
                   :class="hoveredStat === index ? 'text-gray-900' : ''">
                  {{ stat.label }}
                </p>
              </div>
            </div>
          </div>

          <!-- Impact Framework - UNICEF Structured Design -->
          <div class="transform transition-all duration-700 delay-200"
               :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
            <div class="bg-blue-50 border-l-4 border-blue-600">
              <div class="p-8">
                <h3 class="text-2xl font-bold font-poppins text-blue-700 mb-6">Our Impact Framework</h3>
                
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-blue-100 flex items-center justify-center">
                      <UIcon name="i-heroicons-user-group" class="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg font-poppins text-blue-700 mb-1">Peer-Led Approach</h4>
                      <p class="text-gray-700 text-sm font-inter">Youth-to-youth mentorship creating sustainable, community-owned change</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-green-100 flex items-center justify-center">
                      <UIcon name="i-heroicons-clipboard-document-check" class="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg font-poppins text-green-700 mb-1">Evidence-Based</h4>
                      <p class="text-gray-700 text-sm font-inter">Rigorous research methodology ensuring measurable outcomes</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-orange-100 flex items-center justify-center">
                      <UIcon name="i-heroicons-arrow-trending-up" class="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg font-poppins text-orange-700 mb-1">Scalable Solutions</h4>
                      <p class="text-gray-700 text-sm font-inter">Adaptable framework across diverse Southern African contexts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mission Statement - PEGISUS Professional -->
      <div class="border-t border-gray-200 py-12 transform transition-all duration-700 delay-400"
           :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
        <div class="max-w-4xl mx-auto text-center">
          <div class="mb-6">
            <UIcon name="i-heroicons-academic-cap" class="w-12 h-12 text-blue-600 mx-auto" />
          </div>
          <blockquote class="text-2xl md:text-3xl font-bold text-gray-900 font-poppins leading-tight mb-6">
            "Peer Education for Gender Inclusion and Substance Use Prevention in Southern Africa"
          </blockquote>
          <div class="flex items-center justify-center gap-3">
            <div class="h-px w-12 bg-blue-600"></div>
            <span class="text-lg font-semibold text-blue-700 font-poppins">PEGISUS Research Initiative</span>
            <div class="h-px w-12 bg-blue-600"></div>
          </div>
        </div>
      </div>

      <!-- Region & Impact - UNICEF Data Display -->
      <div class="mt-12 pt-8 border-t border-gray-200 transform transition-all duration-700 delay-500"
           :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h4 class="font-bold font-poppins text-blue-700 mb-2">Regional Implementation</h4>
            <p class="text-gray-600 font-inter text-sm">Active programs across three Southern African countries with local adaptation</p>
            
            <div class="flex items-center gap-4 mt-4">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-blue-600"></div>
                <span class="text-sm font-inter">Zambia</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-orange-500"></div>
                <span class="text-sm font-inter">Zimbabwe</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-green-500"></div>
                <span class="text-sm font-inter">South Africa</span>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-6">
            <div class="text-center p-4 bg-blue-50">
              <div class="text-2xl font-bold font-poppins text-blue-600">3</div>
              <div class="text-sm text-gray-600 font-inter mt-1">Countries</div>
            </div>
            <div class="text-center p-4 bg-orange-50">
              <div class="text-2xl font-bold font-poppins text-orange-600">10+</div>
              <div class="text-sm text-gray-600 font-inter mt-1">Partners</div>
            </div>
            <div class="text-center p-4 bg-green-50">
              <div class="text-2xl font-bold font-poppins text-green-600">2024</div>
              <div class="text-sm text-gray-600 font-inter mt-1">Active</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Research Publications Link -->
 
    </div>

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
a:focus,
button:focus {
  outline: 2px solid #1E3A8A;
  outline-offset: 2px;
}

/* Print styles for accessibility */
@media print {
  .bg-blue-50,
  .bg-orange-50,
  .bg-green-50 {
    background-color: #f8fafc !important;
    -webkit-print-color-adjust: exact;
  }
  
  a {
    text-decoration: underline;
  }
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

/* Responsive adjustments */
@media (max-width: 640px) {
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-5xl {
    font-size: 2rem;
  }
  
  .text-4xl {
    font-size: 1.75rem;
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>