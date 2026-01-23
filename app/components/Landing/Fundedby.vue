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
</script>

<template>
  <div class="w-full relative bg-white border-t border-gray-200">
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
            class="group border border-gray-200 p-8 transition-all duration-300 hover:border-cyan-300 hover:shadow-sm bg-gradient-to-b from-white to-gray-50/50"
            :class="hoveredFunder === index ? 'border-cyan-400' : ''"
            @mouseenter="hoveredFunder = index"
            @mouseleave="hoveredFunder = null"
          >
            <!-- Logo Container with enhanced background for transparency -->
            <div class="h-24 mb-6 flex items-center justify-center relative">
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
            <h3 class="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-cyan-600 transition-colors duration-300">
              {{ funder.name }}
            </h3>
            
            <p class="text-sm text-gray-600 text-center mb-4">
              {{ funder.fullName }}
            </p>
            
            <!-- Website Link -->
            <div class="text-center">
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
          </div>
        </div>
      </div>

      <!-- Detailed Description Section -->
      <div class="border-t border-gray-200 pt-16 md:pt-20">
        <div class="max-w-4xl mx-auto">
          <!-- SOR4D Detailed Description -->
          <div class="mb-12">
            <div class="flex items-start gap-6 mb-8">
              <!-- Colored accent bar -->
              <div class="flex-shrink-0 w-1 h-auto bg-gradient-to-b from-cyan-500 to-blue-900 mt-2"></div>
              
              <div class="flex-1">
                <!-- SOR4D Logo and Title -->
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-16 h-16 bg-gradient-to-br from-cyan-50 to-blue-50 p-3 border border-cyan-100">
                    <NuxtImg
                      :src="funders[0].logo"
                      alt="SOR4D logo"
                      class="w-full h-full object-contain"
                      loading="lazy"
                      format="webp"
                      quality="80"
                    />
                  </div>
                  <div>
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      <span class="bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
                        SOR4D Programme
                      </span>
                    </h3>
                    <p class="text-gray-600">
                      Solution-oriented Research for Development
                    </p>
                  </div>
                </div>
                
                <!-- Description -->
                <div class="space-y-4">
                  <p class="text-gray-700 text-lg leading-relaxed">
                    {{ funders[0].description }}
                  </p>
                  
                  <!-- Mission highlights -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 w-8 h-8 bg-cyan-500/10 flex items-center justify-center">
                        <UIcon name="i-heroicons-beaker" class="w-4 h-4 text-cyan-600" />
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">Transdisciplinary Research</p>
                        <p class="text-sm text-gray-600">Bridging academic and practical knowledge</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start gap-3">
                      <div class="flex-shrink-0 w-8 h-8 bg-cyan-500/10 flex items-center justify-center">
                        <UIcon name="i-heroicons-flag" class="w-4 h-4 text-cyan-600" />
                      </div>
                      <div>
                        <p class="font-medium text-gray-900">Sustainable Development</p>
                        <p class="text-sm text-gray-600">Long-term solutions for poverty reduction</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Website Button -->
                <div class="flex items-center gap-6 mt-8 pt-6 border-t border-gray-100">
                  <a 
                    href="https://www.sor4d.ch" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-medium shadow-sm hover:shadow transition-all duration-300 group/btn"
                  >
                    <UIcon name="i-heroicons-globe-alt" class="w-5 h-5 transform group-hover/btn:rotate-12 transition-transform" />
                    <span>Visit Official Website</span>
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  <div class="text-sm text-gray-500">
                    Official domain: <span class="font-mono text-cyan-600">www.sor4d.ch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- All Funders Section -->
          <div class="border-t border-gray-100 pt-12">
            <h4 class="text-2xl font-bold text-gray-900 mb-8 text-center">Our Funding Partners</h4>
            
            <!-- Partner Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div 
                v-for="(funder, index) in funders" 
                :key="index"
                class="border border-gray-200 p-6 bg-gradient-to-b from-white to-gray-50/30 hover:border-cyan-200 transition-all duration-300 group/card"
              >
                <!-- Logo -->
                <div class="h-16 mb-4 flex items-center justify-center">
                  <div class="relative h-full w-full px-2">
                    <NuxtImg
                      :src="funder.logo"
                      :alt="`${funder.name} logo`"
                      class="h-full w-auto object-contain opacity-90 group-hover/card:opacity-100 transition-opacity duration-300"
                      loading="lazy"
                      format="webp"
                      quality="80"
                    />
                  </div>
                </div>
                
                <!-- Info -->
                <h5 class="font-bold text-gray-900 text-center mb-2">{{ funder.name }}</h5>
                <p class="text-sm text-gray-600 text-center mb-4 line-clamp-2">
                  {{ funder.fullName }}
                </p>
                
                <!-- Quick Link -->
                <a 
                  :href="`https://${funder.website}`" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="block text-center text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
                >
                  Learn more →
                </a>
              </div>
            </div>
            
            <!-- Partnership Impact Statement -->
            <div class="bg-gradient-to-r from-cyan-500/5 to-blue-900/5 border border-cyan-100 p-8">
              <div class="flex items-start gap-6">
                <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-900 flex items-center justify-center">
                  <UIcon name="i-heroicons-handshake" class="w-6 h-6 text-white" />
                </div>
                <div class="flex-1">
                  <h5 class="font-bold text-gray-900 text-lg mb-3">Collaborative Impact Framework</h5>
                  <p class="text-gray-700 leading-relaxed mb-4">
                    This strategic partnership combines research excellence with development expertise to create 
                    sustainable solutions for youth empowerment in Southern Africa. Through transdisciplinary 
                    approaches, we address complex challenges at the intersection of health, gender equality, 
                    and economic opportunity.
                  </p>
                  <div class="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div class="flex items-center gap-2">
                      <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                      <span>Partnership: 2023-2027</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
                      <span>Zambia, Zimbabwe, South Africa</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <UIcon name="i-heroicons-currency-dollar" class="w-4 h-4" />
                      <span>Swiss-funded Research Programme</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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