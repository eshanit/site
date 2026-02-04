<script setup lang="ts">
// Partnership values data
const partnershipValues = [
    { 
      title: 'Collaborative Expertise', 
      description: 'Combining diverse institutional strengths and knowledge', 
      icon: 'i-heroicons-user-group',
      color: 'blue'
    },
    { 
      title: 'Innovation Focus', 
      description: 'Developing evidence-based, impactful solutions', 
      icon: 'i-heroicons-light-bulb',
      color: 'orange'
    },
    { 
      title: 'Sustainable Impact', 
      description: 'Creating lasting change in communities', 
      icon: 'i-heroicons-chart-bar',
      color: 'green'
    }
]

// Color mapping from design system
const colorClasses = {
  blue: {
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-600',
    bgLight: 'bg-blue-50',
    fromTo: 'from-blue-500 to-blue-700'
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    border: 'border-orange-500',
    bgLight: 'bg-orange-50',
    fromTo: 'from-orange-400 to-orange-600'
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-500',
    bgLight: 'bg-green-50',
    fromTo: 'from-green-400 to-green-600'
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-500',
    bgLight: 'bg-purple-50',
    fromTo: 'from-purple-400 to-purple-600'
  }
}

const getColorClass = (color: string, type: keyof typeof colorClasses.blue) => {
  return colorClasses[color as keyof typeof colorClasses][type]
}

const valueHovered = ref<number | null>(null)

// Partners data
const partners = [
    { name: 'South African Medical Research Council', logo: '/img/partners/samrc-logo_0.png', color: 'blue' },
    { name: 'SolidarMed', logo: '/img/partners/SM.png', color: 'orange' },
    { name: 'University of Zambia', logo: '/img/partners/unza.png', color: 'green' },
    { name: 'University Hospital Basel', logo: '/img/partners/USB.png', color: 'purple' }
]

const partnerHovered = ref<number | null>(null)

// Stats data
const stats = [
    { value: '4', label: 'Countries', icon: 'i-heroicons-globe-alt', color: 'blue' },
    { value: '20+', label: 'Team Members', icon: 'i-heroicons-users', color: 'orange' },
    { value: '5', label: 'Partner Institutions', icon: 'i-heroicons-building-office', color: 'green' },
    { value: '3', label: 'Nations', icon: 'i-heroicons-map', color: 'purple' }
]

// Animation
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const heroVisible = ref(false)
const partnersVisible = ref(false)
const statsHovered = ref<number | null>(null)

const heroRef = ref<HTMLElement | null>(null)
const partnersRef = ref<HTMLElement | null>(null)

onMounted(() => {
    useIntersectionObserver(
        heroRef,
        (entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    heroVisible.value = true
                }
            })
        },
        { threshold: 0.12, rootMargin: '0px 0px -120px 0px' }
    )

    useIntersectionObserver(
        partnersRef,
        (entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    partnersVisible.value = true
                }
            })
        },
        { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    )
})
</script>

<template>
    <div class="bg-white min-h-screen">
        <!-- Hero Section -->
        <section ref="heroRef" class="pt-16 md:pt-24 pb-16 px-4 md:px-8 lg:px-12"
            :class="heroVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <!-- Text Content - 7 columns -->
                    <div class="lg:col-span-7 space-y-6">
                        <div>
                            <div class="inline-flex items-center gap-3 mb-4">
                                <div class="w-3 h-3 bg-blue-600"></div>
                                <span class="text-sm font-semibold text-blue-700 font-poppins uppercase tracking-wider">Our Network</span>
                            </div>
                            
                            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins leading-tight mb-6">
                                <span class="text-blue-600 block">Who We Are</span>
                                <span class="text-lg md:text-xl text-orange-600 font-inter mt-2 block">
                                    A Partnership for Sustainable Impact
                                </span>
                            </h1>

                            <div class="h-1 w-24 bg-blue-600 my-6"></div>

                            <div class="prose max-w-none">
                              <p class="text-lg text-gray-700 leading-relaxed font-inter mb-6">
                                  PEGISUS represents a groundbreaking collaboration between leading institutions across
                                  three nations, united by a common vision for youth empowerment and health equity in Southern Africa.
                              </p>
                            </div>
                        </div>

                        <!-- Stats Grid -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                          <div
                              v-for="(stat, index) in stats"
                              :key="index"
                              class="group relative transition-all duration-300"
                              @mouseenter="statsHovered = index"
                              @mouseleave="statsHovered = null"
                          >
                              <!-- Main card -->
                              <div class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-4 h-full"
                                   :class="statsHovered === index ? 'shadow-lg -translate-y-1' : ''">
                                  
                                  <!-- Top accent -->
                                  <div class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                                       :class="[
                                         getColorClass(stat.color, 'bg'),
                                         statsHovered === index ? 'w-full' : 'w-12'
                                       ]"></div>
                                  
                                  <!-- Content -->
                                  <div class="text-center">
                                      <div class="text-2xl md:text-3xl font-bold font-poppins mb-1 transition-colors duration-300"
                                           :class="statsHovered === index ? getColorClass(stat.color, 'text') : 'text-gray-900'">
                                          {{ stat.value }}
                                      </div>
                                      
                                      <div class="text-xs text-gray-600 font-inter">
                                          {{ stat.label }}
                                      </div>
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>

                    <!-- Quote Card - 5 columns -->
                    <div class="lg:col-span-5">
                      <div class="bg-blue-600 text-white p-6 md:p-8 shadow-md">
                          <div class="flex items-center gap-4 mb-6">
                              <div class="w-12 h-12 bg-white/20 flex items-center justify-center">
                                  <UIcon name="i-heroicons-handshake" class="w-6 h-6 text-white" />
                              </div>
                              <div>
                                  <h3 class="text-xl font-bold font-poppins">Collaborative Vision</h3>
                                  <div class="h-1 w-8 bg-white/40 mt-1"></div>
                              </div>
                          </div>

                          <blockquote class="text-lg leading-relaxed font-inter mb-6">
                              "This project is a partnership between the University Hospital Basel, the South African
                              Medical Research Council, the University of Zambia, and SolidarMed Zambia and Zimbabwe. 
                              Together, we developed the idea for PEGISUS, created the intervention, and will test 
                              whether it works in Zambia, Zimbabwe, and South Africa."
                          </blockquote>

                          <div class="pt-6 border-t border-white/20">
                              <p class="text-sm opacity-90 font-inter">A collaborative initiative spanning three nations</p>
                          </div>
                      </div>
                      
                      <!-- Mission Statement -->
                      <div class="mt-6 p-6 bg-blue-50 border-l-4 border-blue-600">
                        <div class="flex items-start gap-4">
                          <UIcon name="i-heroicons-academic-cap" class="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <h4 class="font-bold text-blue-700 font-poppins mb-2">Our Mission</h4>
                            <p class="text-gray-700 font-inter text-sm">
                              To empower youth through evidence-based, peer-led interventions that address substance use, 
                              gender equity, and vocational readiness across Southern Africa.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stakeholder Groups Section -->
        <section class="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
            <div class="max-w-7xl mx-auto">
                <!-- Section Header -->
                <div class="mb-16">
                  <div class="grid lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-8">
                      <div class="inline-flex items-center gap-3 mb-4">
                          <div class="w-3 h-3 bg-orange-500"></div>
                          <span class="text-sm font-semibold text-orange-600 font-poppins uppercase tracking-wider">Our Teams</span>
                      </div>
                      
                      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-6">
                          Our Stakeholder Partners
                      </h2>
                      
                      <div class="h-1 w-24 bg-orange-500 mb-6"></div>
                      
                      <p class="text-lg text-gray-600 font-inter max-w-3xl">
                          Meet the dedicated teams from each partner institution working together to make PEGISUS a reality
                      </p>
                    </div>
                    
                    <div class="lg:col-span-4">
                      <div class="p-6 bg-white border border-gray-200">
                        <div class="flex items-center gap-3 mb-3">
                          <UIcon name="i-heroicons-clock" class="w-6 h-6 text-blue-600" />
                          <h4 class="font-bold text-blue-700 font-poppins">Project Timeline</h4>
                        </div>
                        <p class="text-sm text-gray-600 font-inter">
                          4-year program (2023-2027) • Active across 3 countries • Funded by SOR4D
                        </p>
                      </div>
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

        <!-- Partners Logos Section -->
        <section ref="partnersRef" class="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-white"
            :class="partnersVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <div class="mb-16">
                  <div class="grid lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-8">
                      <div class="inline-flex items-center gap-3 mb-4">
                          <div class="w-3 h-3 bg-green-500"></div>
                          <span class="text-sm font-semibold text-green-600 font-poppins uppercase tracking-wider">Partnerships</span>
                      </div>
                      
                      <h2 class="text-3xl md:text-4xl font-bold text-gray-900 font-poppins mb-6">
                          Our Partners
                      </h2>
                      
                      <div class="h-1 w-24 bg-green-500 mb-6"></div>
                      
                      <p class="text-lg text-gray-600 font-inter max-w-3xl">
                          Working together with leading institutions to create sustainable impact
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Logos Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    <div v-for="(partner, index) in partners" :key="partner.name"
                        class="group relative h-full transition-all duration-300"
                        @mouseenter="partnerHovered = index"
                        @mouseleave="partnerHovered = null">
                        
                        <!-- Main card -->
                        <div class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-6 overflow-hidden h-full flex items-center justify-center"
                             :class="partnerHovered === index ? 'shadow-lg -translate-y-1' : ''">
                            
                            <!-- Top accent -->
                            <div class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                                 :class="[
                                   getColorClass(partner.color, 'bg'),
                                   partnerHovered === index ? 'w-full' : 'w-0'
                                 ]"></div>
                            
                            <!-- Logo Image -->
                            <div class="relative z-10 w-full h-20 flex items-center justify-center p-4">
                                <img 
                                    :src="partner.logo" 
                                    :alt="partner.name + ' logo'"
                                    class="max-w-full max-h-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Partnership Values -->
                <div class="pt-8 border-t border-gray-200">
                    <div class="mb-8">
                      <h3 class="text-2xl font-bold text-gray-900 font-poppins text-center mb-2">Our Partnership Values</h3>
                      <div class="h-1 w-16 bg-blue-600 mx-auto"></div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                            v-for="(value, i) in partnershipValues"
                            :key="i"
                            class="group relative h-full transition-all duration-300"
                            @mouseenter="valueHovered = i"
                            @mouseleave="valueHovered = null"
                        >
                            <!-- Main card -->
                            <div class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-6 overflow-hidden h-full flex flex-col text-center"
                                 :class="valueHovered === i ? 'shadow-lg -translate-y-1' : ''">
                                
                                <!-- Top accent -->
                                <div class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                                     :class="[
                                       getColorClass(value.color, 'bg'),
                                       valueHovered === i ? 'w-full' : 'w-8'
                                     ]"></div>
                                
                                <!-- Icon -->
                                <div class="mb-4 inline-flex items-center justify-center w-12 h-12 transition-all duration-300 text-white mx-auto"
                                     :class="[
                                       getColorClass(value.color, 'bg'),
                                       valueHovered === i ? 'scale-110' : ''
                                     ]">
                                    <UIcon :name="value.icon" class="w-6 h-6" />
                                </div>
                                
                                <!-- Content -->
                                <div class="relative z-10 flex-1">
                                    <h4 class="font-bold text-gray-900 mb-3 font-poppins transition-colors duration-300"
                                        :class="valueHovered === i ? getColorClass(value.color, 'text') : ''">
                                        {{ value.title }}
                                    </h4>
                                    <p class="text-sm text-gray-600 leading-relaxed font-inter">
                                        {{ value.description }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-white">
            <div class="max-w-4xl mx-auto">
                <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-8 md:p-10 text-white">
                    <div class="text-center">
                        <h3 class="text-2xl font-bold font-poppins mb-6">
                            Join Our Collaborative Effort
                        </h3>
                        
                        <div class="w-8 h-1 bg-white mx-auto mb-6"></div>
                        
                        <p class="text-lg opacity-90 font-inter mb-8 max-w-2xl mx-auto">
                            Interested in partnering with us or learning more about the PEGISUS program?
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <NuxtLink to="/contact"
                                class="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold font-poppins shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2 group"
                                aria-label="Contact our team">
                                <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                                <span class="text-blue-700">Get in Touch</span>
                            </NuxtLink>
                            <!-- <NuxtLink to="/research"
                                class="px-8 py-3 bg-white text-blue-600 border-2 border-white font-bold font-poppins hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 group"
                                aria-label="View our research">
                                <UIcon name="i-heroicons-document-text" class="w-5 h-5" />
                                <span>View Research</span>
                            </NuxtLink> -->
                        </div>
                    </div>
                </div>
                
                <!-- Bottom Stats -->
                <div class="mt-12 pt-8 border-t border-gray-300">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div class="text-center p-4 bg-blue-50">
                            <div class="text-xl font-bold text-blue-600 font-poppins">2023</div>
                            <div class="text-xs text-gray-600 font-inter mt-1">Partnership Established</div>
                        </div>
                        <div class="text-center p-4 bg-orange-50">
                            <div class="text-xl font-bold text-orange-600 font-poppins">4</div>
                            <div class="text-xs text-gray-600 font-inter mt-1">Years Duration</div>
                        </div>
                        <div class="text-center p-4 bg-green-50">
                            <div class="text-xl font-bold text-green-600 font-poppins">500+</div>
                            <div class="text-xs text-gray-600 font-inter mt-1">Youth Participants</div>
                        </div>
                        <div class="text-center p-4 bg-purple-50">
                            <div class="text-xl font-bold text-purple-600 font-poppins">Swiss</div>
                            <div class="text-xs text-gray-600 font-inter mt-1">Funded Research</div>
                        </div>
                    </div>
                </div>
                
                <!-- Funding Acknowledgement -->
                <div class="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p class="text-sm text-gray-600 font-inter">
                    Funded by the SOR4D programme, co-funded by the Swiss Agency for Development and Cooperation and the Swiss National Science Foundation
                  </p>
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

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    .fade-in-up {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
    }
}

/* Smooth transitions */
* {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                        opacity, box-shadow, transform, filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
}

/* Print styles */
@media print {
    .bg-blue-600,
    .bg-orange-500,
    .bg-green-500,
    .bg-purple-500,
    .bg-gradient-to-r {
        background-color: #f8fafc !important;
        -webkit-print-color-adjust: exact;
    }
    
    a {
        text-decoration: underline;
    }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .lg\:col-span-7,
    .lg\:col-span-5,
    .lg\:col-span-8,
    .lg\:col-span-4 {
        grid-column: span 12;
    }
}

@media (max-width: 768px) {
    .text-5xl {
        font-size: 2.5rem;
    }
    
    .text-4xl {
        font-size: 2rem;
    }
    
    .text-3xl {
        font-size: 1.75rem;
    }
    
    .grid-cols-4 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .grid-cols-2,
    .grid-cols-4 {
        grid-template-columns: 1fr;
    }
    
    .flex-col {
        flex-direction: column;
    }
    
    .gap-4 > * {
        width: 100%;
    }
}
</style>