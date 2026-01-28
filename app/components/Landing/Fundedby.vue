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

const funderGradients = [
  'from-cyan-500 to-blue-900',
  'from-cyan-500 to-blue-700',
  'from-blue-500 to-cyan-600'
]

const getFunderGradient = (index: number) => `bg-gradient-to-br ${funderGradients[index % funderGradients.length]}`
</script>

<template>
  <div class="w-full relative bg-white">
    <!-- Content Container -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-3 h-3 bg-cyan-500"></div>
          <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Funding & Partnerships</span>
        </div>
        
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          <span class="bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">Funded By</span>
        </h2>
        
        <div class="h-1 w-16 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto mb-6"></div>
        
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          PEGISUS is supported through collaborative partnerships with leading research and development organizations
        </p>
      </div>

      <!-- Logos Grid - Enhanced for transparent logos -->
      <div class="mb-16 md:mb-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div 
            v-for="(funder, index) in funders" 
            :key="index"
            @mouseenter="hoveredFunder = index"
            @mouseleave="hoveredFunder = null"
            class="group relative transform transition-all duration-500 hover:scale-105"
          >
            <!-- Animated gradient glow -->
            <div 
              :class="[
                'absolute inset-0 rounded-lg blur-xl transition-opacity duration-500',
                getFunderGradient(index),
                hoveredFunder === index ? 'opacity-60' : 'opacity-0'
              ]"
            ></div>
            
            <!-- Card -->
            <div class="relative backdrop-blur-sm bg-white/95 border border-white/20 p-8 rounded-lg shadow-lg transition-all duration-300 group-hover:bg-white h-full min-h-80 flex flex-col">
            <!-- Logo Container with enhanced background for transparency -->
            <div class="h-24 mb-6 flex items-center justify-center relative flex-shrink-0">
              <!-- Background for better logo visibility -->
              <div class="absolute inset-0 bg-gradient-to-br from-white to-gray-50/70 group-hover:from-cyan-50/30 group-hover:to-blue-50/30 transition-all duration-300"></div>
              
              <!-- Logo with enhanced visibility -->
              <div class="relative h-full w-full px-4 flex items-center justify-center">
                <div class="relative h-full w-full max-w-full">
                  <NuxtImg
                    :src="funder.logo"
                    :alt="`${funder.name} logo`"
                    class="h-full w-auto max-w-full object-contain transition-all duration-500"
                    :class="[
                      'opacity-90 group-hover:opacity-100',
                      'transform group-hover:scale-105'
                    ]"
                    loading="lazy"
                    format="webp"
                    quality="80"
                    :style="{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))'
                    }"
                  />
                </div>
              </div>
              
              <!-- Subtle overlay effect on hover -->
              <div class="absolute inset-0 bg-gradient-to-t from-cyan-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            <!-- Organization Name -->
            <h3 class="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-transparent bg-gradient-to-r transition-all duration-300" :class="hoveredFunder === index ? getFunderGradient(index) + ' bg-clip-text' : ''">
              {{ funder.name }}
            </h3>
            
            <p class="text-sm text-gray-600 text-center mb-4">
              {{ funder.fullName }}
            </p>
            
            <!-- Website Link -->
            <div class="text-center mt-auto pt-6">
              <a 
                :href="`https://${funder.website}`" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700 transition-colors duration-300 group/link"
              >
                <UIcon name="i-heroicons-link" class="w-4 h-4 transform group-hover/link:rotate-12 transition-transform" />
                <span>{{ funder.website }}</span>
                <UIcon name="i-heroicons-arrow-up-right" class="w-3 h-3 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            
            <!-- Bottom accent bar -->
            <div :class="[
              'absolute bottom-0 left-0 h-1 rounded-b-lg transition-all duration-300',
              getFunderGradient(index),
              hoveredFunder === index ? 'w-full' : 'w-0'
            ]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Description Section -->
 
      <!-- Funding Acknowledgement Footer -->
      <div class="mt-16 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-center md:text-left">
            <h5 class="font-bold text-gray-900 mb-2">Research Funding Acknowledgement</h5>
            <p class="text-sm text-gray-600">
              PEGISUS is proudly supported by the SOR4D programme, co-funded by SDC and SNF
            </p>
          </div>
          
          <!-- Funding Stats -->
          <div class="flex items-center gap-8">
            <div class="text-center">
              <div class="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
                SOR4D
              </div>
              <div class="text-xs text-gray-600">Lead Funder</div>
            </div>
            
            <div class="h-8 w-px bg-gradient-to-b from-gray-300 to-transparent"></div>
            
            <div class="text-center">
              <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
                4 Years
              </div>
              <div class="text-xs text-gray-600">Programme Duration</div>
            </div>
            
            <div class="h-8 w-px bg-gradient-to-b from-gray-300 to-transparent"></div>
            
            <div class="text-center">
              <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
                Swiss
              </div>
              <div class="text-xs text-gray-600">Research Excellence</div>
            </div>
          </div>
        </div>
        
        <!-- Official Statement -->
        <div class="mt-8 pt-6 border-t border-gray-100 text-center">
          <p class="text-sm text-gray-500 italic">
            This research is part of the Swiss Programme for Research on Global Issues for Development, 
            funded by the Swiss National Science Foundation and the Swiss Agency for Development and Cooperation.
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom gradient accent -->
    <div class="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-700 to-blue-900"></div>
  </div>
</template>

<style scoped>
/* Remove all border-radius globally */
* {
  border-radius: 0 !important;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Line clamp for text */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-3xl {
    font-size: 2rem;
  }
}

@media (max-width: 475px) {
  .text-5xl {
    font-size: 2rem;
  }
  
  .text-3xl {
    font-size: 1.75rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
}
</style>