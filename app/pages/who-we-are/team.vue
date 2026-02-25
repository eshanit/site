
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

useHead({
  title: 'Our Team - Who We Are - PEGISUS',
  meta: [
    {
      name: 'description',
      content: 'Meet the dedicated teams from each partner institution working together to make PEGISUS a reality.'
    }
  ]
})

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/who-we-are' },
  { name: 'Our Team', href: '/who-we-are/team', current: true }
]

// Animation
const sectionVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  useIntersectionObserver(
    sectionRef,
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          sectionVisible.value = true
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )
})
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Breadcrumb Navigation -->
    <SharedBreadcrumb :items="breadcrumbs" />
    
    <!-- Stakeholder Groups Section -->
    <section 
      ref="sectionRef"
      class="relative py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-gray-50 overflow-hidden"
      :class="sectionVisible ? 'fade-in-up' : 'opacity-0'"
    >
      <!-- Subtle background pattern (brand) -->
      <div class="absolute inset-0 opacity-5 pointer-events-none">
        <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-brand-medium to-brand-dark rounded-full filter blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-brand-teal to-brand-light rounded-full filter blur-3xl"></div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <!-- Section Header -->
        <div class="mb-16">
          <div class="grid lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8">
              <!-- Badge with brand colors -->
              <div class="inline-flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-brand-medium"></div>
                <span class="text-sm font-semibold text-brand-dark font-poppins uppercase tracking-wider">
                  Our Teams
                </span>
              </div>
              
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-6">
                Our Stakeholder Partners
              </h2>
              
              <!-- Brand-colored underline -->
              <div class="h-1 w-24 bg-brand-medium mb-6"></div>
              
              <p class="text-lg text-gray-600 font-inter max-w-3xl">
                Meet the dedicated teams from each partner institution working together to make PEGISUS a reality.
              </p>
            </div>
            
            <!-- Optional right column (can be used for a small illustration or stat) -->
            <div class="lg:col-span-4 hidden lg:block">
              <div class="flex justify-end">
                <div class="w-20 h-20 bg-brand-lightest flex items-center justify-center">
                  <UIcon name="i-heroicons-user-group" class="w-10 h-10 text-brand-medium" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stakeholder Components -->
        <div class="space-y-8">
          <!-- These components should already use brand colors; if not, they'll need updates -->
          <WhoWeAreSolidarMedZambia />
          <WhoWeAreSolidarMedZimbabwe />
          <WhoWeAreUniversityOfZambia />
          <WhoWeAreUniversityHospitalBasel />
          <WhoWeAreSAMRC />
        </div>
      </div>
    </section>
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
a:focus-visible,
button:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid #004887;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Fade-in animation */
.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg\:col-span-8,
  .lg\:col-span-4 {
    grid-column: span 12;
  }
}

/* Print styles */
@media print {
  .bg-gray-50 {
    background-color: #f8fafc !important;
    -webkit-print-color-adjust: exact;
  }
  a {
    text-decoration: underline;
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .fade-in-up {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
