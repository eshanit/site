<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// Map statistics data
const mapStats = [
    { value: '3', label: 'Countries', icon: 'i-heroicons-globe-alt' },
    { value: '10+', label: 'Communities', icon: 'i-heroicons-home' },
    { value: '3', label: 'Vocational Partners', icon: 'i-heroicons-building-office' }
]

// Stats gradients
const statsGradients = [
    'from-cyan-500 to-blue-900',
    'from-cyan-500 to-blue-700',
    'from-cyan-500 to-emerald-600'
]

const getStatsGradient = (index: number) => {
    return `bg-gradient-to-br ${statsGradients[index % statsGradients.length]}`
}

const heroVisible = ref(false)
const countriesVisible = ref(false)
const mapStatsHovered = ref<number | null>(null)

const heroRef = ref<HTMLElement | null>(null)
const countriesRef = ref<HTMLElement | null>(null)

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
        countriesRef,
        (entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    countriesVisible.value = true
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
        <section ref="heroRef" class="pt-20 pb-16 md:pt-28 md:pb-20 px-4 sm:px-6 lg:px-8"
            :class="heroVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <!-- Left Column: Text -->
                    <div class="space-y-8">
                        <div>
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-3 h-3 bg-cyan-500"></div>
                                <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Our Reach</span>
                            </div>
                            
                            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                <span class="block">Where We Work</span>
                                <span
                                    class="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-900">
                                    Communities Across Southern Africa
                                </span>
                            </h1>

                            <div class="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 my-6"></div>

                            <p class="text-lg text-gray-700 leading-relaxed max-w-2xl">
                                PEGISUS operates in communities across Zambia, Zimbabwe, and South Africa,
                                partnering with local vocational training programs to create sustainable impact
                                where it's needed most.
                            </p>
                        </div>

                        <!-- Map Statistics -->
                        <div class="space-y-4">
                            <h3 class="text-xl font-bold text-gray-900">Regional Impact</h3>
                            
                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div
                                    v-for="(stat, i) in mapStats"
                                    :key="i"
                                    class="group relative h-full transform transition-all duration-500 hover:scale-105"
                                    @mouseenter="mapStatsHovered = i"
                                    @mouseleave="mapStatsHovered = null"
                                >
                                    <!-- Animated background gradient -->
                                    <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                                         :class="`${statsGradients[i % statsGradients.length]}`"></div>
                                    
                                    <!-- Main card -->
                                    <div class="relative bg-white backdrop-blur-sm border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 p-6 overflow-hidden h-full flex flex-col text-center"
                                         :class="mapStatsHovered === i ? 'border-cyan-300' : ''">
                                        
                                        <!-- Background icon glow -->
                                        <div class="absolute top-0 right-0 -mr-10 -mt-10 w-24 h-24 rounded-full opacity-5 transition-all duration-500"
                                             :class="`bg-gradient-to-br ${statsGradients[i % statsGradients.length]}`"></div>
                                        
                                        <!-- Icon -->
                                        <div class="mb-4 inline-flex items-center justify-center w-12 h-12 transition-all duration-500 text-white mx-auto"
                                             :class="`bg-gradient-to-br ${statsGradients[i % statsGradients.length]}`">
                                            <UIcon :name="stat.icon" class="w-6 h-6" />
                                        </div>
                                        
                                        <!-- Value -->
                                        <div class="relative z-10 flex-1">
                                            <div class="text-2xl md:text-3xl font-bold transition-all duration-300 mb-2"
                                                 :class="mapStatsHovered === i ? `bg-gradient-to-r bg-clip-text text-transparent ` + `${statsGradients[i % statsGradients.length]}` : 'text-gray-900'">
                                                {{ stat.value }}
                                            </div>
                                            
                                            <!-- Accent line -->
                                            <div class="h-1 w-6 transition-all duration-500 mb-2 mx-auto"
                                                 :class="`bg-gradient-to-r ${statsGradients[i % statsGradients.length]}`"></div>
                                            
                                            <div class="text-sm font-semibold text-gray-900 transition-colors duration-300"
                                                 :class="mapStatsHovered === i ? 'text-cyan-600' : ''">
                                                {{ stat.label }}
                                            </div>
                                        </div>
                                        
                                        <!-- Hover indicator -->
                                        <div class="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                             :class="`bg-gradient-to-r ${statsGradients[i % statsGradients.length]}`"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-gray-200 mt-6">
                                <p class="text-sm text-gray-600">
                                    "Working directly with communities to address substance use, gender equity, and
                                    youth employment."
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Map/Visual -->
                    <div class="relative">
                        <div class="border border-gray-200 p-6 md:p-8 bg-white">
                            <div class="relative h-[400px] md:h-[450px] bg-gradient-to-br from-gray-50 to-gray-100">
                                <!-- Simple country boxes -->
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="relative w-full h-full max-w-md mx-auto">
                                        <!-- South Africa -->
                                        <div class="absolute bottom-20 right-20">
                                            <div class="border-2 border-white shadow-lg p-4 bg-gradient-to-r from-cyan-500 to-blue-900">
                                                <div class="text-white font-bold text-center">
                                                    <div class="text-lg">South Africa</div>
                                                    <div class="text-sm opacity-90 mt-1">Cape Town Region</div>
                                                </div>
                                            </div>
                                            <div class="h-6 w-1 bg-gradient-to-b from-cyan-500 to-blue-900 mx-auto"></div>
                                        </div>

                                        <!-- Zimbabwe -->
                                        <div class="absolute top-24 left-24">
                                            <div class="border-2 border-white shadow-lg p-4 bg-gradient-to-r from-cyan-600 to-blue-800">
                                                <div class="text-white font-bold text-center">
                                                    <div class="text-lg">Zimbabwe</div>
                                                    <div class="text-sm opacity-90 mt-1">Harare Region</div>
                                                </div>
                                            </div>
                                            <div class="h-6 w-1 bg-gradient-to-b from-cyan-600 to-blue-800 mx-auto"></div>
                                        </div>

                                        <!-- Zambia -->
                                        <div class="absolute top-12 right-32">
                                            <div class="border-2 border-white shadow-lg p-4 bg-gradient-to-r from-cyan-700 to-blue-900">
                                                <div class="text-white font-bold text-center">
                                                    <div class="text-lg">Zambia</div>
                                                    <div class="text-sm opacity-90 mt-1">Lusaka Region</div>
                                                </div>
                                            </div>
                                            <div class="h-6 w-1 bg-gradient-to-b from-cyan-700 to-blue-900 mx-auto"></div>
                                        </div>

                                        <!-- Connecting lines -->
                                        <div class="absolute top-0 left-0 w-full h-full">
                                            <svg class="w-full h-full" fill="none">
                                                <!-- Zambia to Zimbabwe -->
                                                <path d="M30% 20%, 20% 40%" stroke="#06b6d4" stroke-width="2" stroke-dasharray="4,4" class="opacity-30" />
                                                <!-- Zimbabwe to South Africa -->
                                                <path d="M20% 40%, 40% 60%" stroke="#1e40af" stroke-width="2" stroke-dasharray="4,4" class="opacity-30" />
                                                <!-- Zambia to South Africa -->
                                                <path d="M30% 20%, 40% 60%" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,4" class="opacity-30" />
                                            </svg>
                                        </div>

                                        <!-- Central PEGISUS logo -->
                                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div class="w-16 h-16 bg-white border-2 border-cyan-500 shadow-lg flex items-center justify-center">
                                                <span class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
                                                    P
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Map Legend -->
                            <div class="mt-6 pt-6 border-t border-gray-200">
                                <div class="flex items-center justify-between text-sm">
                                    <div class="flex items-center gap-2">
                                        <div class="w-3 h-3 bg-cyan-500"></div>
                                        <span class="text-gray-600">Implementation Site</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <div class="w-4 h-0.5 bg-cyan-500 opacity-30"></div>
                                        <span class="text-gray-600">Collaboration Links</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <div class="w-3 h-3 bg-blue-900"></div>
                                        <span class="text-gray-600">Partner Location</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Countries Section -->
        <section ref="countriesRef" class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
            :class="countriesVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="flex items-center justify-center gap-3 mb-4">
                        <div class="w-3 h-3 bg-cyan-500"></div>
                        <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Implementation</span>
                    </div>
                    
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Our Implementation Sites
                    </h2>
                    
                    <div class="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto mb-6"></div>
                    
                    <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                        Working in partnership with local communities and vocational training programs to create lasting
                        change across Southern Africa
                    </p>
                </div>

                <!-- Country Components -->
                <div class="space-y-16">
                    <WhereWeWorkZambia />
                    <WhereWeWorkZimbabwe />
                    <WhereWeWorkSouthAfrica />
                </div>
            </div>
        </section>

        <!-- Partnership CTA -->
        <section class="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
            <div class="max-w-7xl mx-auto">
                <div class="bg-gradient-to-r from-cyan-500 to-blue-900 p-8 md:p-10 text-white">
                    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div>
                            <h3 class="text-2xl font-bold mb-6">
                                Interested in Partnering?
                            </h3>
                            
                            <div class="w-8 h-1 bg-white mb-6"></div>
                            
                            <p class="text-lg opacity-90 mb-8">
                                We're always looking to expand our reach and partner with more vocational training
                                programs across Southern Africa.
                            </p>
                            
                            <div class="space-y-4">
                                <div class="flex items-center gap-3">
                                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-white/90" />
                                    <span class="text-sm opacity-90">Local community partnerships</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-white/90" />
                                    <span class="text-sm opacity-90">Evidence-based program delivery</span>
                                </div>
                                <div class="flex items-center gap-3">
                                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-white/90" />
                                    <span class="text-sm opacity-90">Sustainable youth empowerment</span>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-6">
                            <div class="text-center">
                                <div class="text-3xl font-bold mb-2">Ready to Collaborate?</div>
                                <p class="text-sm opacity-90 mb-6">Join our network of vocational training partners</p>
                            </div>
                            
                            <div class="flex flex-col sm:flex-row gap-4">
                                <NuxtLink to="/contact"
                                    class="px-8 py-3 bg-white text-cyan-600 font-bold shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-3">
                                    <UIcon name="i-heroicons-handshake" class="w-5 h-5" />
                                    <span>Partner With Us</span>
                                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                                </NuxtLink>
                                
                                <NuxtLink to="/program"
                                    class="px-8 py-3 bg-transparent text-white border-2 border-white font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3">
                                    <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
                                    <span>Learn About PEGISUS</span>
                                </NuxtLink>
                            </div>
                            
                            <div class="text-center text-sm opacity-90 pt-4 border-t border-white/20">
                                Currently active in 3 countries with plans for regional expansion
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Regional Stats -->
                <div class="mt-12 pt-8 border-t border-gray-300">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div class="text-center">
                            <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">2023</div>
                            <div class="text-xs text-gray-600">Program Launch</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">500+</div>
                            <div class="text-xs text-gray-600">Youth Reached</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">3</div>
                            <div class="text-xs text-gray-600">Active Regions</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">10+</div>
                            <div class="text-xs text-gray-600">Community Sites</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* Remove all border-radius globally */
* {
    border-radius: 0 !important;
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

/* Smooth transitions */
* {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                        opacity, box-shadow, transform, filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
}

@media (prefers-reduced-motion: reduce) {
    .fade-in-up {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
    }
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .text-6xl {
        font-size: 3rem;
    }
    
    .text-5xl {
        font-size: 2.5rem;
    }
    
    .text-4xl {
        font-size: 2rem;
    }
    
    .grid-cols-3 {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 475px) {
    .text-6xl {
        font-size: 2.5rem;
    }
    
    .text-5xl {
        font-size: 2rem;
    }
    
    .grid-cols-3 {
        grid-template-columns: 1fr;
    }
}
</style>