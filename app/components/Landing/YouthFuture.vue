<script setup lang="ts">
// Add some interactive state
const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});
</script>

<template>
  <div class="w-full relative overflow-hidden">
    <!-- Background Image Layer - Top Left Quadrant with 10px left offset -->
    <NuxtImg
      src="/img/pattern5.png"
      alt=""
      class="absolute top-0 right-0 w-1/2 h-1/2 object-cover pointer-events-none"
      style="transform: translateX(-10px);"
      loading="lazy"
    />
    <!-- Overlay for background color effect -->
    <div class="absolute inset-0 bg-white/40 pointer-events-none"></div>
    
    <!-- Content Container -->
    <div class="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
      
      <!-- Section Header -->
      <div class="mb-16 md:mb-24">
        <div class="inline-flex items-center gap-3 mb-6">
          <div class="w-3 h-3 bg-blue-600"></div>
          <span class="text-sm font-semibold text-blue-700 font-poppins uppercase tracking-wider">Research & Impact</span>
        </div>
        
        <div class="space-y-4">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 font-poppins leading-tight">
            Shaping <span class="text-blue-600">Africa's Future</span>
            <span class="block text-lg md:text-xl text-brand-medium font-inter mt-2">Through Evidence-Based Youth Empowerment</span>
          </h2>
          <div class="h-1 w-24 bg-blue-600"></div>
        </div>
        
        <p class="mt-8 text-lg md:text-xl text-gray-600 font-inter max-w-3xl">
          Addressing critical challenges through the PEGISUS framework: integrating substance use prevention, gender belief transformation, and vocational training across Southern Africa.
        </p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
        <!-- Left Column - Text Content -->
        <div class="space-y-8">
          <!-- Text Block 1 - Sozo Storytelling Style -->
          <div class="transform transition-all duration-700"
               :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'">
            <div class="border-l-4 border-blue-600 pl-6 py-1 mb-4">
              <h3 class="text-2xl font-bold text-gray-900 font-poppins">The Youth Challenge</h3>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed font-inter">
              <span class="font-bold text-brand-dark">Africa's youth population represents both a challenge and an opportunity.</span> 
              With over <span class="font-bold text-brand-medium">60% of the population under 25</span>, young people face emerging health threats, economic instability, and growing inequities that require innovative, community-led solutions.
            </p>
          </div>

          <!-- Text Block 2 - PEGISUS Professional Approach -->
          <div class="transform transition-all duration-700 delay-200"
               :class="isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'">
            <div class="border-l-4 border-brand-medium pl-6 py-1 mb-4">
              <h3 class="text-2xl font-bold text-gray-900 font-poppins">Our Evidence-Based Approach</h3>
            </div>
            <p class="text-gray-700 text-lg leading-relaxed font-inter">
              The <span class="font-bold text-blue-800 font-poppins">PEGISUS framework</span> implements peer-led interventions that address:
            </p>
            
            <ul class="space-y-3 mt-4 font-inter">
              <li class="flex items-start gap-3">
                <UIcon name="i-heroicons-shield-check" class="w-5 h-5 text-brand-teal mt-1 flex-shrink-0" />
                <span><strong class="text-brand-dark">Substance Use Prevention:</strong> Evidence-based harm reduction strategies</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon name="i-heroicons-scale" class="w-5 h-5 text-brand-medium mt-1 flex-shrink-0" />
                <span><strong class="text-brand-dark">Gender Belief Transformation:</strong> Promoting equitable norms and challenging stereotypes</span>
              </li>
              <li class="flex items-start gap-3">
                <UIcon name="i-heroicons-briefcase" class="w-5 h-5 text-brand-medium mt-1 flex-shrink-0" />
                <span><strong class="text-brand-dark">Vocational Empowerment:</strong> Market-relevant skills for sustainable livelihoods</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column - Impact Framework -->
        <div class="space-y-8">
          <!-- Impact Framework - UNICEF Structured Design -->
          <div class="transform transition-all duration-700 delay-200"
               :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'">
            <div class="bg-blue-50 border-l-4 border-blue-600">
              <div class="p-8">
                <h3 class="text-2xl font-bold font-poppins text-blue-700 mb-6">Our Impact Framework</h3>
                
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-blue-100 flex items-center justify-center">
                      <UIcon name="i-heroicons-user-group" class="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg font-poppins text-blue-700 mb-1">Peer-Led Approach</h4>
                      <p class="text-gray-700 text-sm font-inter">Youth-to-youth mentorship creating sustainable, community-owned change</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-brand-accent-green flex items-center justify-center">
                      <UIcon name="i-heroicons-clipboard-document-check" class="w-6 h-6 text-brand-teal" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg font-poppins text-brand-dark mb-1">Evidence-Based</h4>
                      <p class="text-gray-700 text-sm font-inter">Rigorous research methodology ensuring measurable outcomes</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-brand-light flex items-center justify-center">
                      <UIcon name="i-heroicons-arrow-trending-up" class="w-6 h-6 text-brand-medium" />
                    </div>
                    <div>
                      <h4 class="font-bold text-lg font-poppins text-brand-dark mb-1">Scalable Solutions</h4>
                      <p class="text-gray-700 text-sm font-inter">Adaptable framework across diverse Southern African contexts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  
    </div>

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
  outline: 2px solid #004887;
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
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-5xl {
    font-size: 2rem;
  }
  
  .text-4xl {
    font-size: 1.75rem;
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>
