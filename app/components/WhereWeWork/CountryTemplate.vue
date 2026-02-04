<template>
  <div 
    class="country-section bg-white"
  >
    <div class="grid lg:grid-cols-12 gap-0">
      <!-- Left Column: Content (6 columns) -->
      <div
        class="lg:col-span-6 p-10 md:p-12"
        :class="isReversed ? 'lg:order-2' : ''"
      >
        <div class="space-y-8">
          <!-- Country Header -->
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 border border-gray-300 p-1 flex items-center justify-center"
              >
                <!-- SVG Icon -->
                <img
                  :src="svgIcon"
                  :alt="`${country} flag`"
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">{{ country }}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-gray-500" />
                  <span class="text-sm text-gray-600 font-inter">{{ region }}</span>
                </div>
              </div>
            </div>
            
            <!-- Blue accent line -->
            <div class="h-1 w-12 bg-blue-600"></div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 gap-8 mb-12">
            <div 
              v-for="(stat, idx) in stats" 
              :key="stat.label"
              @mouseenter="statsHovered = idx"
              @mouseleave="statsHovered = null"
              class="group relative transform transition-all duration-300 hover:scale-105"
            >
              <!-- Animated gradient glow -->
              <div 
                :class="[
                  'absolute inset-0 blur-xl transition-opacity duration-300',
                  getCountryGradient(idx),
                  statsHovered === idx ? 'opacity-75' : 'opacity-0'
                ]"
              ></div>
              
              <!-- Card -->
              <div class="relative bg-white border border-gray-200 p-8 shadow-md transition-all duration-300 group-hover:shadow-xl">
                <div class="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 font-inter">{{ stat.label }}</div>
                <div class="text-2xl font-bold font-poppins bg-gradient-to-r" :class="getCountryGradient(idx) + ' bg-clip-text text-transparent'">{{ stat.value }}</div>
                
                <!-- Bottom accent bar -->
                <div :class="[
                  'absolute bottom-0 left-0 h-1 transition-all duration-300',
                  getCountryGradient(idx),
                  statsHovered === idx ? 'w-full' : 'w-0'
                ]"></div>
              </div>
            </div>
          </div>

          <!-- Main Text Content -->
          <div class="space-y-6">
            <p class="text-gray-700 leading-relaxed text-lg font-inter">
              {{ mainText }}
            </p>
            
            <!-- Partner Info -->
            <div class="border-l-4 border-blue-600 pl-6 py-4 bg-blue-50/50">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-900 flex items-center justify-center">
                  <UIcon name="i-heroicons-handshake" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 text-lg mb-2 font-poppins">Our Partnership</h4>
                  <p class="text-gray-700 text-sm leading-relaxed font-inter">{{ partnerText }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Communities List -->
          <div v-if="communities && communities.length > 0" class="mt-12 pt-12 border-t border-gray-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-blue-100 flex items-center justify-center">
                <UIcon name="i-heroicons-building-office" class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 font-poppins">Active Communities</h4>
                <p class="text-sm text-gray-600 mt-1 font-inter">Local implementation sites</p>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="community in communities" 
                :key="community"
                class="px-4 py-2 bg-gray-100 text-sm text-gray-700 hover:bg-blue-100 transition-colors duration-200 font-inter"
              >
                {{ community }}
              </span>
            </div>
          </div>

          <!-- Implementation Details -->
          <div class="border-t border-gray-200 pt-12">
            <h4 class="font-bold text-gray-900 mb-6 font-poppins">Program Implementation</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span class="text-sm text-gray-700 font-inter">Peer-led sessions delivered</span>
              </div>
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span class="text-sm text-gray-700 font-inter">Vocational training integration</span>
              </div>
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span class="text-sm text-gray-700 font-inter">Community engagement activities</span>
              </div>
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span class="text-sm text-gray-700 font-inter">Local staff capacity building</span>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="pt-8">
            <NuxtLink
              :to="`/programs/${country.toLowerCase().replace(' ', '-')}`"
              class="inline-flex items-center gap-2 text-blue-600 font-semibold font-poppins hover:text-blue-800 transition-colors duration-300 group"
              aria-label="Learn more about programs in this country"
            >
              <span>View country programs</span>
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Right Column: Images (6 columns) -->
      <div 
        class="lg:col-span-6 relative min-h-[500px] bg-gray-100"
        :class="isReversed ? 'lg:order-1' : ''"
      >
        <!-- Main Image -->
        <div class="absolute inset-0">
          <NuxtImg
            :src="images[0]"
            :alt="`${country} - Community engagement`"
            class="w-full h-full object-cover"
            loading="lazy"
            format="webp"
            quality="85"
          />
          
          <!-- Overlay gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <!-- Image caption -->
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <div class="text-white">
              <div class="font-bold text-lg mb-1 font-poppins">Community Engagement</div>
              <div class="text-sm opacity-90 font-inter">PEGISUS program in action</div>
            </div>
          </div>
        </div>
        
        <!-- Secondary Image Overlay -->
        <div class="absolute bottom-8 right-8 w-2/5 border-2 border-white shadow-xl">
          <NuxtImg
            :src="images[1]"
            :alt="`${country} - Youth participation`"
            class="w-full h-full object-cover"
            loading="lazy"
            format="webp"
            quality="85"
          />
          
          <!-- Image label -->
          <div class="absolute top-0 left-0 bg-white px-3 py-1">
            <span class="text-xs font-bold text-gray-900 font-poppins">Youth Session</span>
          </div>
        </div>
        
        <!-- Location Badge -->
        <div class="absolute top-8 left-8 bg-white px-4 py-2 shadow-lg">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-map" class="w-4 h-4 text-blue-600" />
            <span class="font-bold text-blue-700 font-poppins">{{ country }}</span>
          </div>
        </div>
        
        <!-- Stats Badge -->
        <div class="absolute top-8 right-8 bg-white border border-gray-200 p-4 shadow-lg">
          <div class="text-center">
            <div class="text-xl font-bold font-poppins text-blue-600">Active</div>
            <div class="text-xs text-gray-600 mt-1 font-inter">Since 2023</div>
          </div>
        </div>

        <!-- Storytelling element - Sozo style -->
        <div class="absolute left-8 right-8 bottom-32 bg-white/95 p-6 shadow-lg">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <UIcon name="i-heroicons-quote" class="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p class="text-gray-700 italic font-inter leading-relaxed">
                "This program gave me skills and confidence to build a better future."
              </p>
              <div class="mt-3 flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                  <UIcon name="i-heroicons-user" class="w-4 h-4 text-white" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-blue-700 font-poppins">Youth Participant</div>
                  <div class="text-xs text-gray-500 font-inter">{{ country }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Border -->
    <div class="border-t border-gray-200">
      <div class="flex items-center justify-between p-10">
        <div class="text-sm text-gray-600 font-inter">
          Part of the PEGISUS regional implementation network
        </div>
        <div class="flex items-center gap-6">
          <div class="text-right">
            <div class="text-sm font-medium text-gray-900 font-poppins">Program Status</div>
            <div class="text-xs text-blue-600 font-bold font-poppins">ACTIVE</div>
          </div>
          <div class="h-6 w-px bg-gray-300"></div>
          <div class="text-right">
            <div class="text-sm font-medium text-gray-900 font-poppins">Local Partner</div>
            <div class="text-xs text-gray-600 font-inter">Engaged</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Stat {
  label: string
  value: string
  color: string
}

interface Props {
  country: string
  region: string
  mainText: string
  partnerText: string
  images: [string, string]
  stats: Stat[]
  communities?: string[]
  svgIcon: string
  isReversed?: boolean
}

defineProps<Props>()

const statsHovered = ref<number | null>(null)

const countryGradients = [
  'from-blue-600 to-blue-900',
  'from-orange-500 to-orange-700',
  'from-green-500 to-green-700'
]

const getCountryGradient = (index: number) => `bg-gradient-to-r ${countryGradients[index % countryGradients.length]}`
</script>

<style scoped>
/* Import fonts following design system */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Remove all border-radius globally */
* {
  border-radius: 0 !important;
}

.country-section {
  opacity: 0;
  transform: translateY(20px);
  animation: slideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
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
  .country-section {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  * {
    transition: none !important;
  }
}

/* Responsive adjustments following 12-column grid */
@media (max-width: 1024px) {
  .lg\:col-span-6 {
    grid-column: span 12;
  }
  
  .lg\:order-1, .lg\:order-2 {
    order: 0;
  }
  
  .relative.min-h-\[500px\] {
    min-height: 400px;
  }
}

@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .absolute.bottom-8.right-8.w-2\/5 {
    width: 40%;
    right: 16px;
    bottom: 16px;
  }
}

@media (max-width: 640px) {
  .grid-cols-2,
  .sm\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .flex-wrap.gap-3 > * {
    width: 100%;
    text-align: center;
  }
  
  .absolute.bottom-8.right-8.w-2\/5 {
    width: 50%;
    right: 8px;
    bottom: 8px;
  }
}
</style>