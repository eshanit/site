<script setup lang="ts">
interface Props {
  title?: string
  titleHighlight?: string
  description?: string
  iconName?: string
  showTrustIndicators?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Ready to',
  titleHighlight: 'Empower Youth',
  subtitle: 'in Your Community?',
  description: 'Join our mission to create sustainable change through evidence-based, peer-led interventions across Southern Africa. Together, we can build stronger, healthier communities.',
  iconName: 'i-heroicons-hand-raised',
  showTrustIndicators: true
})

const trustIndicators = [
  { icon: 'i-heroicons-heart', label: 'Health Institutions' },
  { icon: 'i-heroicons-user-group', label: 'Local NGOs' },
  { icon: 'i-heroicons-briefcase', label: 'Partners' }
]
</script>

<template>
  <section class="w-full px-4 md:px-8 lg:px-12 py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-900">
    <div class="w-full max-w-7xl mx-auto">
      <div class="text-center">
        <div class="mb-8">
          <UIcon :name="iconName" class="w-16 h-16 text-white/90 mx-auto" />
        </div>
        
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-poppins mb-6">
          {{ title }} <span class="text-brand-light">{{ titleHighlight }}</span>{{ subtitle }}
        </h2>
        
        <div class="w-16 h-1 bg-gradient-to-r from-brand-light to-brand-medium mx-auto mb-8"></div>
        
        <p class="text-xl text-white/90 mb-10 font-inter max-w-3xl mx-auto">
          {{ description }}
        </p>
        
        <!-- Trust Indicators -->
        <div v-if="showTrustIndicators" class="mt-12 pt-8 border-t border-white/20">
          <p class="text-sm text-white/80 font-inter mb-6">Trusted by leading organizations</p>
          <div class="flex flex-wrap justify-center gap-8 items-center">
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-2">
                <span class="text-white font-bold font-poppins text-sm">CN</span>
              </div>
              <span class="text-sm font-semibold text-white/90 font-poppins">Communities</span>
            </div>
            <div 
              v-for="indicator in trustIndicators" 
              :key="indicator.label"
              class="flex flex-col items-center"
            >
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-2">
                <UIcon :name="indicator.icon" class="w-6 h-6 text-white" />
              </div>
              <span class="text-sm font-semibold text-white/90 font-poppins">{{ indicator.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-5xl {
    font-size: 2rem;
  }
  
  .text-4xl {
    font-size: 1.75rem;
  }
}

@media (max-width: 640px) {
  .text-4xl {
    font-size: 1.5rem;
  }
}
</style>
