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

// Color scheme following design system
const funderColors = [
  { bg: 'bg-blue-50', border: 'border-blue-600', text: 'text-blue-600', hover: 'hover:bg-blue-100' },
  { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-600', hover: 'hover:bg-orange-100' },
  { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-600', hover: 'hover:bg-green-100' }
]

const getFunderStyle = (index: number): { bg: string; border: string; text: string; hover: string } => funderColors[index % funderColors.length]!
</script>

<template>
  <div class="w-full relative bg-white">
    <!-- Content Container -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-3 h-3 bg-blue-600"></div>
          <span class="text-sm font-semibold text-blue-700 font-poppins uppercase tracking-wider">Funding & Partnerships</span>
        </div>
        
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 font-poppins mb-6">
          <span class="text-blue-600">Funded By</span>
          <span class="block text-lg md:text-xl text-orange-600 font-inter mt-2">Leading Research & Development Organizations</span>
        </h2>
        
        <div class="h-1 w-16 bg-blue-600 mx-auto mb-6"></div>
        
        <p class="text-lg text-gray-600 font-inter max-w-3xl mx-auto">
          PEGISUS is supported through collaborative partnerships with leading research and development organizations committed to sustainable development and evidence-based solutions.
        </p>
      </div>

      <!-- Logos Grid - Enhanced for accessibility -->
      <div class="mb-16 md:mb-20">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div 
            v-for="(funder, index) in funders" 
            :key="index"
            @mouseenter="hoveredFunder = index"
            @mouseleave="hoveredFunder = null"
            class="group relative transform transition-all duration-500"
          >
            <!-- Card Container -->
            <div 
              class="relative bg-white border border-gray-200 shadow-md transition-all duration-300 h-full min-h-80 flex flex-col"
              :class="[
                getFunderStyle(index).hover,
                hoveredFunder === index ? 'shadow-xl -translate-y-1' : ''
              ]"
            >
              <!-- Top accent bar -->
              <div 
                class="h-1 w-full transition-all duration-300"
                :class="[
                  getFunderStyle(index).border,
                  hoveredFunder === index ? 'bg-gradient-to-r ' + getFunderStyle(index).border.replace('border-', '') : ''
                ]"
              ></div>
              
              <!-- Logo Container -->
              <div class="h-32 px-6 mb-6 flex items-center justify-center relative flex-shrink-0 mt-8">
                <!-- Fallback background for transparent logos -->
                <div 
                  class="absolute inset-6 transition-all duration-300"
                  :class="[
                    getFunderStyle(index).bg,
                    hoveredFunder === index ? 'opacity-30' : 'opacity-10'
                  ]"
                ></div>
                
                <!-- Logo -->
                <div class="relative h-16 w-full flex items-center justify-center">
                  <div class="relative h-full w-full">
                    <img
                      :src="funder.logo"
                      :alt="`${funder.name} - ${funder.fullName}`"
                      class="h-full w-auto max-w-full object-contain transition-all duration-500 mx-auto"
                      :class="[
                        'opacity-90 group-hover:opacity-100',
                        hoveredFunder === index ? 'scale-110' : 'scale-100'
                      ]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
        
              <!-- Organization Info -->
              <div class="px-6 pb-6 pt-2.5 flex-grow flex flex-col ">
                <h3 
                  class="text-xl font-bold text-center mb-2 font-poppins transition-colors duration-300"
                  :class="hoveredFunder === index ? getFunderStyle(index).text : 'text-gray-900'"
                >
                  {{ funder.name }}
                </h3>
                
                <p class="text-sm text-gray-600 text-center mb-4 font-inter">
                  {{ funder.fullName }}
                </p>
                
                <!-- Description - Hidden on small, visible on larger -->
                <p class="text-sm text-gray-700 text-center mt-4 mb-6 font-inter leading-relaxed hidden md:block">
                  {{ funder.description }}
                </p>
                
                <!-- Website Link -->
                <div class="text-center mt-auto pt-4">
                  <a 
                    :href="`https://${funder.website}`" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-sm font-medium font-inter transition-colors duration-300 group/link"
                    :class="getFunderStyle(index).text"
                    :aria-label="`Visit ${funder.name} website`"
                  >
                    <UIcon name="i-heroicons-globe-alt" class="w-4 h-4" />
                    <span>{{ funder.website }}</span>
                    <UIcon name="i-heroicons-arrow-up-right" class="w-3 h-3 transform transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    <span class="sr-only">(opens in new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Description Section for Mobile -->
      <div class="md:hidden mb-12">
        <div class="space-y-6">
          <div 
            v-for="(funder, index) in funders" 
            :key="index"
            class="p-6 border border-gray-200"
            :class="getFunderStyle(index).bg"
          >
            <h4 class="font-bold font-poppins text-lg mb-2" :class="getFunderStyle(index).text">
              {{ funder.name }}
            </h4>
            <p class="text-gray-700 font-inter text-sm leading-relaxed">
              {{ funder.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Funding Structure - UNICEF Data Presentation -->
      <div class="mt-20 pt-12 border-t border-gray-200">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-2xl font-bold font-poppins text-blue-700 mb-4">Research Funding Structure</h3>
            <p class="text-gray-700 font-inter mb-6">
              The PEGISUS initiative operates under a multi-tiered funding structure ensuring transparency, accountability, and maximum impact.
            </p>
            
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-blue-600 mt-2 flex-shrink-0"></div>
                <span class="font-inter"><strong class="font-poppins">Lead Funding:</strong> SOR4D programme provides primary research funding</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-orange-500 mt-2 flex-shrink-0"></div>
                <span class="font-inter"><strong class="font-poppins">Development Partnership:</strong> SDC supports implementation and capacity building</span>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-2 h-2 bg-green-500 mt-2 flex-shrink-0"></div>
                <span class="font-inter"><strong class="font-poppins">Scientific Excellence:</strong> SNF ensures research quality and methodological rigor</span>
              </li>
            </ul>
          </div>
          
          <div>
            <!-- Timeline Visualization -->
            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-lg font-bold font-poppins text-blue-600">4 Years</div>
                  <div class="text-sm text-gray-600 font-inter">Program Duration</div>
                </div>
                <div>
                  <div class="text-lg font-bold font-poppins text-orange-600">3 Countries</div>
                  <div class="text-sm text-gray-600 font-inter">Implementation Scope</div>
                </div>
                <div>
                  <div class="text-lg font-bold font-poppins text-green-600">500+ Youth</div>
                  <div class="text-sm text-gray-600 font-inter">Direct Beneficiaries</div>
                </div>
              </div>
              
              <div class="h-2 bg-gray-100 relative">
                <div class="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-orange-500 to-green-500 w-3/4"></div>
              </div>
              
              <div class="text-center text-sm text-gray-500 font-inter">
                2023–2027 • Swiss-funded Research Excellence
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Funding Acknowledgement Footer -->
      <div class="mt-16 pt-8 border-t border-gray-200">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h5 class="font-bold font-poppins text-blue-700 mb-2">Research Funding Acknowledgement</h5>
            <p class="text-sm text-gray-600 font-inter">
              PEGISUS is proudly supported by the SOR4D programme, co-funded by SDC and SNF, demonstrating Swiss commitment to global sustainable development research.
            </p>
          </div>
          
          <!-- Funding Stats -->
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center p-4 bg-blue-50">
              <div class="text-xl font-bold font-poppins text-blue-600">
                SOR4D
              </div>
              <div class="text-xs text-gray-600 font-inter mt-1">Lead Funder</div>
            </div>
            
            <div class="text-center p-4 bg-orange-50">
              <div class="text-lg font-bold font-poppins text-orange-600">
                4 Years
              </div>
              <div class="text-xs text-gray-600 font-inter mt-1">Program Duration</div>
            </div>
            
            <div class="text-center p-4 bg-green-50">
              <div class="text-lg font-bold font-poppins text-green-600">
                Swiss
              </div>
              <div class="text-xs text-gray-600 font-inter mt-1">Research Excellence</div>
            </div>
          </div>
        </div>
        
        <!-- Official Statement -->
        <div class="mt-8 pt-6 border-t border-gray-100 text-center">
          <p class="text-sm text-gray-500 font-inter italic">
            This research is part of the Swiss Programme for Research on Global Issues for Development, 
            funded by the Swiss National Science Foundation and the Swiss Agency for Development and Cooperation.
          </p>
        </div>
      </div>
    </div>

    <!-- Bottom accent -->
    <div class="h-1 w-full bg-gradient-to-r from-blue-600 via-orange-500 to-green-500"></div>
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

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
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
  
  .hidden {
    display: block !important;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-3xl {
    font-size: 2rem;
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
    gap: 1rem;
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