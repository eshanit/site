<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Using design system color tokens
const mapStats = ref([
    { 
        value: '3', 
        label: 'Countries', 
        icon: 'i-heroicons-globe-alt',
        color: 'blue'
    },
    { 
        value: '10+', 
        label: 'Communities', 
        icon: 'i-heroicons-home',
        color: 'cyan'
    },
    { 
        value: '3', 
        label: 'Vocational Partners', 
        icon: 'i-heroicons-building-office',
        color: 'orange'
    }
])

const countries = ref([
    { 
        id: 'zambia', 
        name: 'Zambia', 
        color: 'blue',
        gradient: 'from-blue-600 to-blue-800'
    },
    { 
        id: 'zimbabwe', 
        name: 'Zimbabwe', 
        color: 'orange',
        gradient: 'from-orange-500 to-orange-700'
    },
    { 
        id: 'south-africa', 
        name: 'South Africa', 
        color: 'green',
        gradient: 'from-green-500 to-green-700'
    }
])

// Animation states following other components
const heroVisible = ref(false)
const countriesVisible = ref(false)
const mapStatsHovered = ref<number | null>(null)

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

onMounted(() => {
    setTimeout(() => {
        heroVisible.value = true
    }, 100)
    
    setTimeout(() => {
        countriesVisible.value = true
    }, 300)
})

// Get color class based on stat color
const getStatColor = (color: string) => {
    const colors = {
        blue: 'from-blue-600 to-blue-800',
        cyan: 'from-cyan-500 to-blue-700',
        orange: 'from-orange-500 to-orange-700',
        green: 'from-green-500 to-green-700'
    }
    return colors[color as keyof typeof colors] || colors.blue
}
</script>

<template>
    <div class="w-full bg-white">
        <!-- Hero Section -->
        <div 
            class="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-32 md:py-32 lg:py-32"
            :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
            <!-- Background Image with Fade Effect -->
            <div 
                class="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style="background-image: url('/img/pegi_tree.png'); background-position: 100% center;"
            ></div>
            <!-- Fade Overlay -->
            <div class="absolute inset-0 w-full h-full bg-white/70"></div>
            
            <!-- Content Container -->
            <div class="relative z-10 w-full max-w-7xl mx-auto">
                <!-- Grid layout - 12 column system -->
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
                    <!-- Text content - 6 columns -->
                    <div class="lg:col-span-6 space-y-8">
                        <!-- Research Badge - PEGISUS professional style -->
                        <div class="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 border-l-4 border-blue-600">
                            <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-blue-600" />
                            <span class="text-sm font-semibold text-blue-700 font-poppins">Regional Implementation</span>
                        </div>

                        <!-- Main heading with PEGISUS clarity -->
                        <div class="space-y-4">
                            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins leading-tight">
                                Where We Work
                                <span class="text-blue-600 block">Across Southern Africa</span>
                            </h1>

                            <!-- Impact Subtitle -->
                            <p class="text-lg text-gray-600 leading-relaxed font-inter">
                                Implementing peer-led interventions integrating substance use prevention and gender equity into vocational training across
                                <span class="font-semibold text-blue-700">Zambia, Zimbabwe, and South Africa</span>.
                            </p>
                        </div>

                        <!-- Map Statistics - Sozo style -->
                        <div class="grid grid-cols-3 gap-4 py-6">
                            <div 
                                v-for="(stat, index) in mapStats" 
                                :key="index"
                                class="text-center group cursor-pointer transform transition-all duration-300 hover:scale-105"
                                @mouseenter="mapStatsHovered = index"
                                @mouseleave="mapStatsHovered = null"
                            >
                                <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-white transition-all duration-300"
                                     :class="`bg-gradient-to-br ${getStatColor(stat.color)} ${mapStatsHovered === index ? 'scale-110' : ''}`">
                                    <UIcon :name="stat.icon" class="w-6 h-6" />
                                </div>
                                <div 
                                    class="text-2xl md:text-3xl font-bold font-poppins transition-all duration-300"
                                    :class="mapStatsHovered === index ? `bg-gradient-to-r ${getStatColor(stat.color)} bg-clip-text text-transparent` : 'text-gray-900'"
                                >
                                    {{ stat.value }}
                                </div>
                                <div class="text-sm text-gray-600 mt-1 font-inter">{{ stat.label }}</div>
                            </div>
                        </div>

                        <!-- Action buttons - UNICEF accessibility standards -->
                        <div class="flex flex-col sm:flex-row gap-4 pt-4">
                            <NuxtLink
                                to="/contact"
                                class="group relative px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold font-poppins shadow-md hover:shadow-lg transform transition-all duration-300 text-lg text-center flex items-center justify-center gap-3"
                                aria-label="Partner with PEGISUS"
                            >
                                Partner With Us
                                <UIcon name="i-heroicons-handshake" class="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </NuxtLink>

                            <button
                                @click="scrollToSection('countries')"
                                class="group px-6 py-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 font-semibold font-poppins flex items-center justify-center gap-3"
                                aria-label="View country implementations"
                            >
                                <UIcon name="i-heroicons-chevron-down" class="w-5 h-5" />
                                View Countries
                            </button>
                        </div>
                    </div>

                    <!-- Map/Visual container - 6 columns -->
                    <div class="lg:col-span-6 relative">
                        <!-- Country boxes with clean design -->
                        <div class="space-y-8">
                            <div 
                                v-for="(country, index) in countries" 
                                :key="country.id"
                                class="group transform transition-all duration-500 hover:scale-105 cursor-pointer"
                                @click="scrollToSection(country.id)"
                            >
                                <!-- Country card -->
                                <div class="relative bg-white border border-gray-200 shadow-md group-hover:shadow-xl transition-all duration-500 p-8">
                                    <!-- Top accent line -->
                                    <div class="absolute top-0 left-0 h-1 w-full transition-all duration-500"
                                         :class="`bg-gradient-to-r ${country.gradient}`"></div>
                                    
                                    <div class="flex items-center gap-6">
                                        <!-- Country indicator -->
                                        <div class="flex-shrink-0 w-16 h-16 flex items-center justify-center text-white transition-all duration-500 group-hover:scale-110"
                                             :class="`bg-gradient-to-br ${country.gradient}`">
                                            <UIcon name="i-heroicons-flag" class="w-8 h-8" />
                                        </div>
                                        
                                        <!-- Country details -->
                                        <div class="flex-1">
                                            <h3 class="text-2xl font-bold font-poppins text-gray-900 mb-2">
                                                {{ country.name }}
                                            </h3>
                                            <p class="text-gray-600 font-inter text-sm">
                                                Active PEGISUS programs and community partnerships
                                            </p>
                                            
                                            <!-- View programs link -->
                                            <div class="flex items-center gap-2 mt-4 text-blue-600 font-semibold text-sm">
                                                <span>View programs</span>
                                                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Regional Context -->
                        <div class="mt-12 pt-8 border-t border-gray-100">
                            <div class="flex items-center gap-3 mb-4">
                                <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-600" />
                                <span class="text-sm font-semibold text-blue-700 font-poppins">Regional Context</span>
                            </div>
                            <p class="text-gray-600 font-inter text-sm">
                                Working directly with communities to address substance use, gender equity, and youth employment across Southern Africa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Countries Section -->
        <div 
            id="countries"
            class="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24 bg-gray-50"
            :class="countriesVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
        >
            <div class="w-full max-w-7xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="inline-flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 mb-6 mx-auto">
                        <UIcon name="i-heroicons-academic-cap" class="w-4 h-4 text-blue-600" />
                        <span class="text-sm font-semibold text-blue-700 font-poppins">Implementation Sites</span>
                    </div>
                    
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins mb-6">
                        Our Implementation Sites
                    </h2>
                    
                    <div class="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
                    
                    <p class="text-lg text-gray-600 max-w-3xl mx-auto font-inter">
                        Working in partnership with local communities and vocational training programs to create lasting change across Southern Africa.
                    </p>
                </div>

                <!-- Country Components -->
                <div class="space-y-24">
                    <div id="zambia">
                        <WhereWeWorkZambia />
                    </div>
                    
                    <div id="zimbabwe">
                        <WhereWeWorkZimbabwe />
                    </div>
                    
                    <div id="south-africa">
                        <WhereWeWorkSouthAfrica />
                    </div>
                </div>

                <!-- Partnership CTA -->
                <div class="mt-24">
                    <div class="bg-gradient-to-r from-blue-600 to-blue-900 p-8 md:p-12 text-white">
                        <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            <div>
                                <h3 class="text-2xl font-bold font-poppins mb-6">
                                    Interested in Partnering?
                                </h3>
                                
                                <div class="w-8 h-1 bg-white mb-6"></div>
                                
                                <p class="text-lg opacity-90 mb-8 font-inter">
                                    We're always looking to expand our reach and partner with more vocational training programs across Southern Africa.
                                </p>
                                
                                <!-- Benefits list -->
                                <div class="space-y-4">
                                    <div class="flex items-center gap-3">
                                        <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-white/90" />
                                        <span class="text-sm opacity-90 font-inter">Local community partnerships</span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-white/90" />
                                        <span class="text-sm opacity-90 font-inter">Evidence-based program delivery</span>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-white/90" />
                                        <span class="text-sm opacity-90 font-inter">Sustainable youth empowerment</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="space-y-6">
                                <div class="text-center">
                                    <div class="text-3xl font-bold font-poppins mb-2">Ready to Collaborate?</div>
                                    <p class="text-sm opacity-90 mb-6 font-inter">Join our network of vocational training partners</p>
                                </div>
                                
                                <div class="flex flex-col sm:flex-row gap-4">
                                    <NuxtLink
                                        to="/contact"
                                        class="group px-8 py-4 bg-white text-blue-600 font-bold font-poppins shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                                        aria-label="Partner with PEGISUS"
                                    >
                                        <UIcon name="i-heroicons-handshake" class="w-5 h-5" />
                                        Partner With Us
                                        <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </NuxtLink>
                                    
                                    <NuxtLink
                                        to="/program"
                                        class="px-8 py-4 bg-transparent text-white border-2 border-white font-bold font-poppins hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
                                        aria-label="Learn about PEGISUS programs"
                                    >
                                        <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
                                        Learn About PEGISUS
                                    </NuxtLink>
                                </div>
                                
                                <!-- Current stats -->
                                <div class="text-center text-sm opacity-90 pt-4 border-t border-white/20 font-inter">
                                    Currently active in 3 countries with plans for regional expansion
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Regional Stats Footer -->
                    <div class="mt-12 pt-8 border-t border-gray-300">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div 
                                v-for="stat in [
                                    { value: '2023', label: 'Program Launch' },
                                    { value: '500+', label: 'Youth Reached' },
                                    { value: '3', label: 'Active Regions' },
                                    { value: '10+', label: 'Community Sites' }
                                ]" 
                                :key="stat.label"
                                class="text-center"
                            >
                                <div class="text-lg font-bold font-poppins bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
                                    {{ stat.value }}
                                </div>
                                <div class="text-xs text-gray-600 font-inter">{{ stat.label }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Import fonts following design system */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* WCAG-compliant focus styles */
a:focus,
button:focus {
  outline: 2px solid #1E3A8A;
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

/* Responsive adjustments following 12-column grid */
@media (max-width: 1024px) {
  .lg\:col-span-6 {
    grid-column: span 12;
  }
}

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
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>