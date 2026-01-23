<template>
  <div 
    class="country-section rounded-3xl overflow-hidden shadow-2xl"
    :class="[isReversed ? 'bg-gradient-to-l' : 'bg-gradient-to-r', 'from-white to-gray-50']"
  >
    <div class="grid lg:grid-cols-2 gap-0">
      <!-- Left Column: Content -->
      <div 
        class="p-8 md:p-12"
        :class="isReversed ? 'lg:order-2' : ''"
      >
        <div class="space-y-6">
          <!-- Country Header -->
          <div class="flex items-center gap-4 mb-6">
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <!-- SVG Icon -->
              <img
                :src="svgIcon"
                :alt="`${country} flag`"
                class="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900">{{ country }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-cyan-500" />
                <span class="text-sm text-gray-600">{{ region }}</span>
              </div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div 
              v-for="stat in stats" 
              :key="stat.label"
              class="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div class="text-sm text-gray-500 mb-1">{{ stat.label }}</div>
              <div class="text-xl font-bold" :class="stat.color">{{ stat.value }}</div>
            </div>
          </div>

          <!-- Main Text Content -->
          <div class="space-y-4">
            <p class="text-gray-700 leading-relaxed">
              {{ mainText }}
            </p>
            
            <!-- Partner Info -->
            <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-100">
              <div class="flex items-center gap-3 mb-3">
                <UIcon name="i-heroicons-handshake" class="w-5 h-5 text-cyan-600" />
                <h4 class="font-semibold text-gray-900">Our Partner</h4>
              </div>
              <p class="text-gray-700 text-sm">{{ partnerText }}</p>
            </div>
          </div>

          <!-- Communities List -->
          <div v-if="communities && communities.length > 0" class="mt-6">
            <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <UIcon name="i-heroicons-building-office" class="w-4 h-4 text-cyan-500" />
              Working in these communities:
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="community in communities" 
                :key="community"
                class="px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-300 shadow-sm"
              >
                {{ community }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Images -->
      <div 
        class="relative min-h-[400px]"
        :class="isReversed ? 'lg:order-1' : ''"
      >
        <div class="absolute inset-0 grid grid-cols-2 gap-4 p-4">
          <!-- First Image -->
          <div class="relative rounded-2xl overflow-hidden shadow-xl">
            <NuxtImg
              :src="images[0]"
              :alt="`${country} - Community photo 1`"
              class="w-full h-full object-cover"
              loading="lazy"
              placeholder
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <!-- Second Image -->
          <div class="relative rounded-2xl overflow-hidden shadow-xl mt-8">
            <NuxtImg
              :src="images[1]"
              :alt="`${country} - Community photo 2`"
              class="w-full h-full object-cover"
              loading="lazy"
              placeholder
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
        
        <!-- Decorative Element -->
        <div 
          class="absolute top-0 right-0 w-32 h-32"
          :class="isReversed ? 'left-0 right-auto' : 'right-0'"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-900/20 rounded-full blur-3xl"></div>
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

/* Target only the flag image so community photos remain unaffected */
/* Removed filter to show colored flag */

@media (prefers-reduced-motion: reduce) {
  .country-section {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>