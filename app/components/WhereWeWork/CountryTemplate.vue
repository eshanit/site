<template>
  <div class="country-section bg-white">
    <!-- Main content (text) – full width -->
    <div class="p-10 md:p-12">
      <div class="space-y-8">
        <!-- Country Header -->
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 border border-gray-300 p-1 flex items-center justify-center">
              <img :src="svgIcon" :alt="`${country} flag`" class="w-full h-full object-cover" />
            </div>
            <div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
                {{ country }}
              </h3>
              <div class="flex items-center gap-2 mt-1">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-gray-500" />
                <span class="text-sm text-gray-600 font-inter">{{ region }}</span>
              </div>
            </div>
          </div>
          <div class="h-1 w-12 bg-blue-600"></div>
        </div>

        <!-- Main Text with Country Map Grid -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <!-- Main Text Content -->
          <div class="md:col-span-6 space-y-6">
            <p class="text-gray-700 leading-relaxed text-lg font-inter">
              {{ mainText }}
            </p>


          </div>

          <!-- Country Map Image -->
          <div class="md:col-span-6">
            <div class="w-full flex-shrink-0 bg-gray-100 flex items-center justify-center p-8">
              <img :src="countryMap" :alt="`Map of ${country}`" class="max-h-[400px] object-contain" />
            </div>
          </div>
        </div>

        <!-- Additional Images Carousel -->
        <div v-if="images && images.length > 0" class="mt-8">
          <UCarousel v-slot="{ item }" :items="items" loop arrows :autoplay="{ delay: 5000 }" wheel-gestures
            :prev="{ variant: 'solid' }" :next="{ variant: 'solid' }" :ui="{ item: 'basis-1/3' }">
            <img :src="item" width="520" height="520" class="rounded-lg">
          </UCarousel>
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
            <span v-for="community in communities" :key="community"
              class="px-4 py-2 bg-gray-100 text-sm text-gray-700 hover:bg-blue-100 transition-colors duration-200 font-inter">
              {{ community }}
            </span>
          </div>
        </div>

        <!-- Implementation Details -->
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  country: string
  region: string
  mainText: string
  partnerText: string
  images: string[]
  countryMap: string
  communities?: string[]
  svgIcon: string
  isReversed?: boolean // kept for compatibility, not used in this layout
}

const props = defineProps<Props>()

// Computed property for carousel items (remaining images beyond mainText and countryMap)
const items = computed(() => props.images || [])
</script>

<style scoped>
/* Import fonts (same as before) */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

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

/* Smooth transitions (keep as before) */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* WCAG focus styles */
a:focus,
button:focus {
  outline: 2px solid #1E3A8A;
  outline-offset: 2px;
}

/* Print styles */
@media print {

  .bg-brand-lightest,
  .bg-brand-accent-green {
    background-color: #f8fafc !important;
    -webkit-print-color-adjust: exact;
  }

  a {
    text-decoration: underline;
  }
}

/* Reduced motion */
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
@media (max-width: 640px) {
  .flex-wrap.gap-3>* {
    width: 100%;
    text-align: center;
  }
}
</style>