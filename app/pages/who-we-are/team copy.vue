<script setup lang="ts">
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
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Breadcrumb Navigation -->
    <SharedBreadcrumb :items="breadcrumbs" />
    
    <!-- Stakeholder Groups Section -->
    <section class="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="mb-16">
          <div class="grid lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8">
              <div class="inline-flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-cyan-500"></div>
                <span class="text-sm font-semibold text-cyan-600 font-poppins uppercase tracking-wider">Our Teams</span>
              </div>
              
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-6">
                Our Stakeholder Partners
              </h2>
              
              <div class="h-1 w-24 bg-cyan-500 mb-6"></div>
              
              <p class="text-lg text-gray-600 font-inter max-w-3xl">
                Meet the dedicated teams from each partner institution working together to make PEGISUS a reality
              </p>
            </div>
            
      
          </div>
        </div>

        <!-- Stakeholder Components -->
        <div class="space-y-8">
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
a:focus {
    outline: 2px solid #1E3A8A;
    outline-offset: 2px;
}

/* Smooth transitions */
* {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                        opacity, box-shadow, transform, filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
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
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
</style>
