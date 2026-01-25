<script setup lang="ts">
// Define props for customization
const props = withDefaults(defineProps<{
  backgroundImage?: string;
  ctaText?: string;
  videoText?: string;
}>(), {
  backgroundImage: '/img/youth.jpg',
  ctaText: 'Sign Up Now',
  videoText: 'Watch Video'
});

// Mock data for animation effects
const animatedNumbers = ref([
  { value: 75, label: 'Youth Empowerment', suffix: '%' },
  { value: 90, label: 'Success Rate', suffix: '%' },
  { value: 1000, label: 'Lives Impacted', suffix: '+' }
]);

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <div class="w-full relative bg-gradient-to-br from-white via-cyan-50 to-blue-50">
    <!-- Simplified background elements -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-0 left-0 w-1/2 h-1/2 bg-cyan-300/5"></div>
      <div class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-blue-600/5"></div>
    </div>

    <!-- Main content - full width -->
    <div class="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 lg:py-32">
      <div class="w-full">
        <!-- Grid layout -->
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          <!-- Text content -->
          <div 
            class="space-y-8 transform transition-all duration-1000"
            :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'"
          >
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-900/20 px-4 py-2 border border-cyan-200">
              <div class="w-2 h-2 bg-cyan-500"></div>
              <span class="text-sm font-semibold text-cyan-700">PEGISUS Initiative</span>
            </div>

            <!-- Main heading with gradient text -->
            <div class="space-y-4">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Creating pathways for youth to
                <span class="relative">
                  <span class="bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent font-extrabold">
                    thrive
                  </span>
                  <span class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-900 transform scale-x-0 transition-transform duration-1000 group-hover:scale-x-100"></span>
                </span>
                in a rapidly changing world.
              </h1>
              
              <!-- Underline -->
              <div class="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-900 transform transition-all duration-500 hover:w-32"></div>
            </div>

            <!-- Description with highlighted countries -->
            <div class="space-y-4">
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
                Integrating a peer group intervention for substance use and gender beliefs into vocational training programs across 
                <span class="relative inline-block">
                  <span class="font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                    Zambia, Zimbabwe, and South Africa
                  </span>
                  <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600"></span>
                </span>
                to empower youth with skills and confidence.
              </p>

              <!-- Quick stats - straight edges -->
              <!-- <div class="grid grid-cols-3 gap-4 pt-4">
                <div v-for="(stat, index) in animatedNumbers" :key="index"
                  class="text-center p-4 bg-white/80 border border-gray-200 shadow-sm">
                  <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
                    {{ stat.value }}{{ stat.suffix }}
                  </div>
                  <div class="text-sm text-gray-600 font-medium">{{ stat.label }}</div>
                </div>
              </div> -->
            </div>

            <!-- Action buttons - no rounding -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <NuxtLink
                :to="'/programs'"
                class="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-bold shadow-lg hover:shadow-xl transform transition-all duration-300 text-lg text-center overflow-hidden"
              >
                <!-- Button content -->
                <span class="relative flex items-center justify-center gap-2">
                  {{ ctaText }}
                  <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <!-- Shine effect -->
                <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                  <div class="w-1/2 h-full bg-white/20 skew-x-12"></div>
                </div>
              </NuxtLink>

              <button
                class="group px-6 py-4 bg-white border-2 border-cyan-400 text-cyan-600 hover:text-white transition-all duration-300 font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                <!-- Background on hover -->
                <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-900 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <!-- Content -->
                <span class="relative flex items-center gap-2">
                  <UIcon name="i-heroicons-play-circle" class="w-6 h-6" />
                  {{ videoText }}
                </span>
              </button>
            </div>

            <!-- Trust indicator -->
            <div class="flex items-center gap-3 pt-8">
              <div class="flex -space-x-2">
                <div class="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 border-2 border-white"></div>
                <div class="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 border-2 border-white"></div>
                <div class="w-8 h-8 bg-gradient-to-r from-cyan-600 to-blue-700 border-2 border-white"></div>
              </div>
              <span class="text-sm text-gray-600">
                <span class="font-bold text-cyan-700">Join 500+</span> youth already empowered
              </span>
            </div>
          </div>

          <!-- Image container -->
          <div 
            class="relative transform transition-all duration-1000 delay-300"
            :class="isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'"
          >
            <!-- Main image with straight edges -->
            <div class="relative group">
              <!-- Main image container -->
              <div class="relative overflow-hidden border-4 border-white shadow-2xl">
                <NuxtImg
                  :src="backgroundImage"
                  class="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  alt="Youth empowerment in Southern Africa"
                  sizes="sm:100vw md:50vw lg:600px"
                  format="webp"
                  quality="80"
                />
                
                <!-- Overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-cyan-900/30 via-transparent to-transparent"></div>
                
                <!-- Location badges - straight edges -->
                <div class="absolute top-6 left-6 bg-white/95 px-4 py-2 shadow-lg">
                  <span class="text-sm font-bold text-cyan-700">Southern Africa</span>
                </div>
                
                <div class="absolute bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-900 text-white px-4 py-2 shadow-lg">
                  <span class="text-sm font-bold">Empowering Youth</span>
                </div>
              </div>
              
              <!-- Stats badge - straight edges -->
              <div class="absolute -right-4 top-1/4 bg-white p-4 shadow-xl border border-gray-200">
                <div class="text-center">
                  <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">3</div>
                  <div class="text-xs text-gray-600 font-medium">Countries</div>
                </div>
              </div>
            </div>

            <!-- Bottom quote card - straight edges -->
            <div class="mt-8 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 border border-cyan-200 p-6 transform transition-all duration-500 hover:-translate-y-1">
              <p class="text-gray-700 italic">
                "Empowering youth today builds a stronger Africa tomorrow."
              </p>
              <div class="mt-3 flex items-center gap-2">
                <div class="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                <span class="text-sm font-semibold text-cyan-700">PEGISUS Team</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll indicator - straight edges -->
        <div class="mt-16 flex justify-center">
          <div class="animate-bounce text-cyan-500">
            <UIcon name="i-heroicons-chevron-double-down" class="w-8 h-8" />
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

/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Gradient border effect */
.gradient-border {
  position: relative;
  border: double 2px transparent;
  background-image: linear-gradient(white, white), 
                    linear-gradient(to right, #06b6d4, #1e3a8a);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
  
  /* Ensure full width on mobile */
  .w-full {
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    margin-right: calc(-50vw + 50%);
  }
}

/* Ensure the main container is full width */
.w-full {
  width: 100%;
  max-width: 100%;
}
</style>