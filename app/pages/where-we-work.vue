<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Zambia from '@/components/WhereWeWork/Zambia.vue'
import Zimbabwe from '@/components/WhereWeWork/Zimbabwe.vue'
import SouthAfrica from '@/components/WhereWeWork/SouthAfrica.vue'

// Map of country IDs to components
const countryComponents = {
  zambia: Zambia,
  zimbabwe: Zimbabwe,
  'south-africa': SouthAfrica
}

const selectedCountry = ref<string | null>(null) // null = show default map
const contentRef = ref<HTMLElement | null>(null)

watch(selectedCountry, (val) => {
  if (val && contentRef.value && window.innerWidth < 1024) {
    nextTick(() => contentRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
})

const countries = [
  { 
    id: 'zambia', 
    name: 'Zambia', 
    color: 'blue', 
    gradient: 'from-brand-medium to-brand-dark',
    flag: '🇿🇲',
    stats: '8 communities'
  },
  { 
    id: 'zimbabwe', 
    name: 'Zimbabwe', 
    color: 'blue', 
    gradient: 'from-brand-medium to-brand-dark',
    flag: '🇿🇼',
    stats: '5 communities'
  },
  { 
    id: 'south-africa', 
    name: 'South Africa', 
    color: 'teal', 
    gradient: 'from-brand-teal to-brand-dark',
    flag: '🇿🇦',
    stats: '12 communities'
  }
]

// Animation states
const heroVisible = ref(false)

onMounted(() => {
  setTimeout(() => { heroVisible.value = true }, 100)
})

// Handle country click – update selected country
const selectCountry = (id: string) => {
  selectedCountry.value = id
}
</script>

<template>
  <div class="w-full bg-white">
    <!-- Hero Section with animated gradient -->
    <div 
      class="relative overflow-hidden bg-gradient-to-br from-brand-lightest via-white to-brand-lighter py-20 md:py-28"
      :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <!-- Decorative map outline -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <svg class="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
          <path d="M100,100 Q200,50 300,100 T500,80 T700,120" stroke="currentColor" fill="none" stroke-width="2" class="text-brand-medium"/>
          <circle cx="250" cy="120" r="4" class="fill-brand-medium"/>
          <circle cx="450" cy="100" r="4" class="fill-brand-medium"/>
          <circle cx="600" cy="140" r="4" class="fill-brand-teal"/>
        </svg>
      </div>

      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins leading-tight">
          Where We Work
          <span class="text-brand-medium block">Across Southern Africa</span>
        </h1>

        <p class="text-lg text-gray-600 leading-relaxed font-inter mt-4 max-w-2xl">
          We are active in <span class="font-semibold text-brand-dark">Zambia, Zimbabwe, and South Africa</span>, partnering with local communities to create lasting change.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 py-16 lg:py-20">
      <!-- Grid: left 4 cols (country list), right 8 cols (dynamic content) -->
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        <!-- Left: country selectors (4 cols) -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Reset to all-countries view -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <button
              v-if="selectedCountry !== null"
              @click="selectedCountry = null"
              class="flex items-center gap-2 w-full px-4 py-3 border border-brand-medium text-brand-medium hover:bg-brand-lightest transition-all duration-200 text-sm font-semibold font-poppins"
              aria-label="View all countries"
            >
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
              View All Countries
            </button>
          </Transition>

          <div
            v-for="country in countries"
            :key="country.id"
            class="group transform transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            @click="selectCountry(country.id)"
          >
            <div
              class="relative border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 p-6"
              :class="{
                'bg-gradient-to-r from-brand-medium to-brand-dark text-white': selectedCountry === country.id,
                'bg-white text-gray-900': selectedCountry !== country.id
              }"
            >
              <!-- Top accent bar - visible only when not selected -->
              <div 
                v-if="selectedCountry !== country.id"
                class="absolute top-0 left-0 h-1 w-full bg-gradient-to-r transition-all duration-300"
                :class="country.gradient"
              ></div>
              
              <div class="flex items-center gap-4">
                <span class="text-3xl">{{ country.flag }}</span>
                <div class="flex-1">
                  <h2 class="text-xl md:text-3xl font-bold font-poppins mb-1">{{ country.name }}</h2>
                  <p class="text-sm font-inter opacity-80">{{ country.stats }}</p>
                </div>
                <!-- Arrow indicator on hover (only when not selected) -->
                <UIcon 
                  v-if="selectedCountry !== country.id"
                  name="i-heroicons-arrow-right" 
                  class="w-5 h-5 text-brand-medium transform transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>

        </div>

        <!-- Right: dynamic content (8 cols) with transition -->
        <div ref="contentRef" class="lg:col-span-8">
          <transition name="fade" mode="out-in">
            <!-- Default: stylized map with pins -->
            <div v-if="!selectedCountry" key="map" class="bg-gray-50 p-8 flex flex-col items-center min-h-70 sm:min-h-125 relative">
              <NuxtImg
                src="/img/countries/map.png"
                alt="Map of PEGISUS locations in Southern Africa"
                class="w-full h-auto max-h-[400px] object-contain mb-6"
                loading="lazy"
                width="800"
              />
              <!-- Country pins (positioned roughly, could be enhanced with absolute positioning) -->
              <div class="flex justify-center gap-8 text-sm font-inter">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 bg-brand-dark"></span>
                  <span>Pegisus Presence</span>
                </div>
              </div>
              <!-- Optional quick stats overlay -->
              <div class="mt-8 grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-md border-t border-gray-200 pt-6">
                <div class="text-center">
                  <div class="text-2xl font-bold font-poppins text-brand-medium">8</div>
                  <div class="text-xs text-gray-500">Sessions per program</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold font-poppins text-brand-dark">16-24</div>
                  <div class="text-xs text-gray-500">Youth age range</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold font-poppins text-brand-teal">Peer</div>
                  <div class="text-xs text-gray-500">Group-based</div>
                </div>
              </div>
            </div>

            <!-- Selected country component -->
            <div v-else :key="selectedCountry" class="bg-white">
              <component :is="countryComponents[selectedCountry as keyof typeof countryComponents]" />
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Font families */
.font-poppins {
  font-family: 'Poppins', sans-serif;
}
.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* WCAG focus */
a:focus-visible,
button:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid #004887;
  outline-offset: 2px;
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
}

/* No rounded corners - enforced by global CSS, but just in case */
* {
  border-radius: 0 !important;
}
</style>