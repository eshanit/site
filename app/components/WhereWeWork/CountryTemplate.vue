<template>
  <div 
    class="country-section border border-gray-200 bg-white"
  >
    <div class="grid lg:grid-cols-2 gap-0">
      <!-- Left Column: Content -->
      <div 
        class="p-8 md:p-10"
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
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900">{{ country }}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-gray-500" />
                  <span class="text-sm text-gray-600">{{ region }}</span>
                </div>
              </div>
            </div>
            
            <div class="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-900"></div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div 
              v-for="stat in stats" 
              :key="stat.label"
              class="border border-gray-200 p-4 bg-white"
            >
              <div class="text-sm text-gray-600 mb-1">{{ stat.label }}</div>
              <div class="text-xl font-bold" :class="stat.color">{{ stat.value }}</div>
            </div>
          </div>

          <!-- Main Text Content -->
          <div class="space-y-6">
            <p class="text-gray-700 leading-relaxed text-lg">
              {{ mainText }}
            </p>
            
            <!-- Partner Info -->
            <div class="border border-cyan-200 p-6 bg-gradient-to-r from-cyan-50/50 to-blue-50/50">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-900 flex items-center justify-center">
                  <UIcon name="i-heroicons-handshake" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 text-lg mb-2">Our Partnership</h4>
                  <p class="text-gray-700 text-sm leading-relaxed">{{ partnerText }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Communities List -->
          <div v-if="communities && communities.length > 0" class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 flex items-center justify-center">
                <UIcon name="i-heroicons-building-office" class="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Active Communities</h4>
                <p class="text-sm text-gray-600 mt-1">Local implementation sites</p>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="community in communities" 
                :key="community"
                class="px-4 py-2 bg-white border border-gray-300 text-sm text-gray-700 hover:border-cyan-300 hover:bg-cyan-50/50 transition-colors duration-200"
              >
                {{ community }}
              </span>
            </div>
          </div>

          <!-- Implementation Details -->
          <div class="border-t border-gray-200 pt-8">
            <h4 class="font-bold text-gray-900 mb-4">Program Implementation</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                <span class="text-sm text-gray-700">Peer-led sessions delivered</span>
              </div>
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                <span class="text-sm text-gray-700">Vocational training integration</span>
              </div>
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                <span class="text-sm text-gray-700">Community engagement activities</span>
              </div>
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                <span class="text-sm text-gray-700">Local staff capacity building</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Images -->
      <div 
        class="relative min-h-[450px] bg-gray-100"
        :class="isReversed ? 'lg:order-1' : ''"
      >
        <!-- Main Image -->
        <div class="absolute inset-0 border-4 border-white">
          <NuxtImg
            :src="images[0]"
            :alt="`${country} - Community engagement`"
            class="w-full h-full object-cover"
            loading="lazy"
            format="webp"
            quality="85"
          />
          
          <!-- Overlay gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          <!-- Image caption -->
          <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <div class="text-white">
              <div class="font-bold text-lg mb-1">Community Engagement</div>
              <div class="text-sm opacity-90">PEGISUS program in action</div>
            </div>
          </div>
        </div>
        
        <!-- Secondary Image Overlay -->
        <div class="absolute bottom-8 right-8 w-2/5 border-4 border-white shadow-lg">
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
            <span class="text-xs font-bold text-gray-900">Youth Session</span>
          </div>
        </div>
        
        <!-- Location Badge -->
        <div class="absolute top-8 left-8 bg-gradient-to-r from-cyan-500 to-blue-900 text-white px-4 py-2 shadow">
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-map" class="w-4 h-4" />
            <span class="font-bold">{{ country }}</span>
          </div>
        </div>
        
        <!-- Stats Badge -->
        <div class="absolute top-8 right-8 bg-white border border-gray-200 p-4 shadow">
          <div class="text-center">
            <div class="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">Active</div>
            <div class="text-xs text-gray-600 mt-1">Since 2023</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Border -->
    <div class="border-t border-gray-200">
      <div class="flex items-center justify-between p-6">
        <div class="text-sm text-gray-600">
          Part of the PEGISUS regional implementation network
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <div class="text-sm font-medium text-gray-900">Program Status</div>
            <div class="text-xs text-cyan-600 font-bold">ACTIVE</div>
          </div>
          <div class="h-6 w-px bg-gray-300"></div>
          <div class="text-right">
            <div class="text-sm font-medium text-gray-900">Local Partner</div>
            <div class="text-xs text-gray-600">Engaged</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
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

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .lg\:order-1, .lg\:order-2 {
    order: 0;
  }
  
  .relative.min-h-\[450px\] {
    min-height: 350px;
  }
}

@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .absolute.bottom-8.right-8.w-2\/5 {
    width: 50%;
    right: 4px;
    bottom: 4px;
  }
}

@media (max-width: 475px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .flex-wrap.gap-3 > * {
    width: 100%;
    text-align: center;
  }
}
</style>