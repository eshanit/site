<script setup lang="ts">
// Define props for the component
const props = withDefaults(defineProps<{
  backgroundImage?: string;
  impactApproachImage?: string;
  stats?: Array<{
    value: string;
    label: string;
    color: string;
  }>;
}>(), {
  backgroundImage: '/img/honeycomb.png',
  impactApproachImage: '/img/impact-approach.jpg',
  stats: () => [
    { value: '60%', label: 'of Africa\'s Population', color: 'from-cyan-500 to-blue-900' },
    { value: '1B+', label: 'Young People in Africa', color: 'from-cyan-500 to-blue-700' },
    { value: '75%', label: 'Under 35 Years Old', color: 'from-green-500 to-emerald-600' }
  ]
});
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <!-- Background with honeycomb pattern -->
    <div 
      v-if="backgroundImage" 
      class="absolute inset-0 z-0"
      :style="`background-image: url('${backgroundImage}'); background-size: cover; background-position: center;`"
    >
    </div>

    <!-- linear overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-white/95 to-cyan-50/80 z-10"></div>

    <!-- Content -->
    <div class="relative z-20 w-full px-8 xl:px-12 2xl:px-16 py-16 md:py-24">
      <!-- Section Header -->
      <div class="section-header text-center mb-16">
        <h2 class="section-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Shaping <span class="linear-text">Africa's Future</span>
        </h2>
        <p class="section-subtitle text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
          Empowering the next generation through innovative approaches and sustainable solutions
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="space-y-8">
          <!-- First Paragraph -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-white/50">
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
              <span class="font-bold text-cyan-600">Young people are the future.</span> In Africa, young people account
              for
              <span class="font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">over
                60% of the region's population</span>.
              But they face ongoing threats to their health and well-being due to a high burden of emerging infectious
              and
              non-communicable diseases, political and economic instabilities, and increasing inequities between the
              Global South and Global North.
            </p>
          </div>

          <!-- Second Paragraph -->
          <div
            class="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-cyan-200/50">
            <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
              To ensure a healthy and prosperous future, we are testing
              <span class="font-bold text-blue-800">a multi-pronged approach with PEGISUS</span>, which aims to help
              young people
              reduce unhealthy substance use, develop more flexible beliefs about gender, and increase their potential
              for employment.
            </p>
          </div>

          <!-- Call to Action -->
          <div class="flex flex-col sm:flex-row gap-4 mt-8">
            <NuxtLink
              to="/about-pegisus"
              class="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg text-center"
            >
              Learn About PEGISUS
            </NuxtLink>
            <button
              class="px-8 py-4 bg-white text-cyan-600 border-2 border-cyan-500 font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
              Join Our Mission
            </button>
          </div>
        </div>

        <!-- Statistics and Visual Elements -->
        <div class="space-y-8">
          <!-- Statistics Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div v-for="(stat, index) in stats" :key="index"
              class="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300">
              <div
                :class="`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`">
                {{ stat.value }}
              </div>
              <div class="text-gray-700 font-semibold text-sm md:text-base">
                {{ stat.label }}
              </div>
            </div>
          </div>

          <!-- Impact Visualization -->
          <!-- Updated Impact Approach Card Section -->
          <div class="relative bg-gradient-to-r from-cyan-500 to-blue-900 rounded-3xl p-8 text-white shadow-2xl overflow-hidden">
            <!-- Content -->
            <div class="relative z-10">
              <h3 class="text-2xl font-bold mb-4">Our Impact Approach</h3>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span class="font-semibold">Substance Use Prevention</span>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <span class="font-semibold">Gender Belief Transformation</span>
                </div>
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span class="font-semibold">Employment Potential Enhancement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Quote -->
      <div class="mt-16 text-center">
        <div
          class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50 max-w-4xl mx-auto">
          <blockquote class="text-2xl md:text-3xl font-bold text-gray-800 italic leading-tight">
            "Peer Education for Gender Inclusion and Substance Use in Southern Africa."
          </blockquote>
          <div class="mt-6 text-lg text-gray-600 font-semibold">
            — PEGISUS
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-title {
  font-weight: 800;
  color: #111827;
}

.linear-text {
  background: linear-gradient(90deg, #06b6d4, #1e3a8a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section-title {
    font-size: 2.5rem;
  }
}
</style>