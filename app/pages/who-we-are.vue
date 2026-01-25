<script setup lang="ts">

// Partners logos data (replace with actual paths)
const partners = [
    { name: 'University Hospital Basel', logo: '/img/partners/USB.png' },
    { name: 'South African Medical Research Council', logo: '/img/partners/samrc-logo_0.png' },
    { name: 'University of Zambia', logo: '/img/partners/unza.png' },
    { name: 'SolidarMed', logo: '/img/partners/SM.png' }
]

// Animation
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const heroVisible = ref(false)
const partnersVisible = ref(false)

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
        <section ref="heroRef" class="pt-20 pb-16 md:pt-28 md:pb-20 px-4 sm:px-6 lg:px-8"
            :class="heroVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <!-- Text Content -->
                    <div class="space-y-8">
                        <div>
                            <div class="flex items-center gap-3 mb-4">
                                <div class="w-3 h-3 bg-cyan-500"></div>
                                <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Our Network</span>
                            </div>
                            
                            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                <span class="block">Who We Are</span>
                                <span
                                    class="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-900">
                                    Partnership for Impact
                                </span>
                            </h1>

                            <div class="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 my-6"></div>

                            <p class="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                                PEGISUS represents a groundbreaking collaboration between leading institutions across
                                three nations,
                                united by a common vision for youth empowerment and health equity in Southern Africa.
                            </p>
                        </div>

                        <!-- Stats -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div class="bg-white border border-gray-200 p-4 shadow-sm">
                                <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">4</div>
                                <div class="text-sm font-medium text-gray-900 mt-1">Countries</div>
                            </div>
                            <div class="bg-white border border-gray-200 p-4 shadow-sm">
                                <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">20+</div>
                                <div class="text-sm font-medium text-gray-900 mt-1">Team Members</div>
                            </div>
                            <div class="bg-white border border-gray-200 p-4 shadow-sm">
                                <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">5</div>
                                <div class="text-sm font-medium text-gray-900 mt-1">Partner Institutions</div>
                            </div>
                            <div class="bg-white border border-gray-200 p-4 shadow-sm">
                                <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">3</div>
                                <div class="text-sm font-medium text-gray-900 mt-1">Nations</div>
                            </div>
                        </div>
                    </div>

                    <!-- Quote Card -->
                    <div class="bg-gradient-to-r from-cyan-500 to-blue-900 p-8 text-white shadow-lg">
                        <div class="flex items-center gap-4 mb-6">
                            <div class="w-12 h-12 bg-white/20 flex items-center justify-center">
                                <UIcon name="i-heroicons-handshake" class="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 class="text-xl font-bold">Collaborative Vision</h3>
                                <div class="h-1 w-8 bg-white/40 mt-1"></div>
                            </div>
                        </div>

                        <blockquote class="text-lg font-medium leading-relaxed mb-6">
                            "This project is a partnership between the University Hospital Basel, the South African
                            Medical Research Council,
                            the University of Zambia, and SolidarMed Zambia and Zimbabwe. Together, we developed the
                            idea for PEGISUS,
                            created the intervention, and will test whether it works in Zambia, Zimbabwe, and South
                            Africa."
                        </blockquote>

                        <div class="pt-6 border-t border-white/20">
                            <p class="text-sm opacity-90">A collaborative initiative spanning three nations</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stakeholder Groups Section -->
        <section class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div class="max-w-7xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <div class="flex items-center justify-center gap-3 mb-4">
                        <div class="w-3 h-3 bg-cyan-500"></div>
                        <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Our Teams</span>
                    </div>
                    
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Our Stakeholder Partners
                    </h2>
                    
                    <div class="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto mb-6"></div>
                    
                    <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                        Meet the dedicated teams from each partner institution working together to make PEGISUS a
                        reality
                    </p>
                </div>

                <!-- Stakeholder Components -->
                <div class="space-y-16">
                    <WhoWeAreSolidarMedZambia />
                    <WhoWeAreSolidarMedZimbabwe />
                    <WhoWeAreUniversityOfZambia />
                    <WhoWeAreUniversityHospitalBasel />
                    <WhoWeAreSAMRC />
                </div>
            </div>
        </section>

        <!-- Partners Logos Section -->
        <section ref="partnersRef" class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white"
            :class="partnersVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-16">
                    <div class="flex items-center justify-center gap-3 mb-4">
                        <div class="w-3 h-3 bg-cyan-500"></div>
                        <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Partnerships</span>
                    </div>
                    
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Our Partners
                    </h2>
                    
                    <div class="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto mb-6"></div>
                    
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Working together with leading institutions to create sustainable impact
                    </p>
                </div>

                <!-- Logos Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div v-for="(partner, index) in partners" :key="partner.name"
                        class="logo-card bg-white border border-gray-200 p-6 md:p-8 flex items-center justify-center shadow-sm hover:shadow transition-all duration-300 hover:border-cyan-200"
                        :style="`transition-delay: ${index * 100}ms`">
                        <div class="relative h-20 md:h-24 w-full">
                            <NuxtImg :src="partner.logo" :alt="partner.name + ' logo'"
                                class="object-contain w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                                loading="lazy" 
                                format="webp"
                                quality="80" />
                        </div>
                    </div>
                </div>
                
                <!-- Partnership Values -->
                <div class="mt-16 pt-12 border-t border-gray-200">
                    <h3 class="text-2xl font-bold text-gray-900 text-center mb-8">Our Partnership Values</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="border border-gray-200 p-6 text-center">
                            <div class="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 flex items-center justify-center">
                                <UIcon name="i-heroicons-user-group" class="w-6 h-6 text-cyan-600" />
                            </div>
                            <h4 class="font-bold text-gray-900 mb-2">Collaborative Expertise</h4>
                            <p class="text-sm text-gray-600">Combining diverse institutional strengths and knowledge</p>
                        </div>
                        
                        <div class="border border-gray-200 p-6 text-center">
                            <div class="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 flex items-center justify-center">
                                <UIcon name="i-heroicons-light-bulb" class="w-6 h-6 text-cyan-600" />
                            </div>
                            <h4 class="font-bold text-gray-900 mb-2">Innovation Focus</h4>
                            <p class="text-sm text-gray-600">Developing evidence-based, impactful solutions</p>
                        </div>
                        
                        <div class="border border-gray-200 p-6 text-center">
                            <div class="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 flex items-center justify-center">
                                <UIcon name="i-heroicons-chart-bar" class="w-6 h-6 text-cyan-600" />
                            </div>
                            <h4 class="font-bold text-gray-900 mb-2">Sustainable Impact</h4>
                            <p class="text-sm text-gray-600">Creating lasting change in communities</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div class="max-w-4xl mx-auto">
                <div class="bg-gradient-to-r from-cyan-500 to-blue-900 p-8 md:p-10 text-white">
                    <div class="text-center">
                        <h3 class="text-2xl md:text-3xl font-bold mb-6">
                            Join Our Collaborative Effort
                        </h3>
                        
                        <div class="w-8 h-1 bg-white mx-auto mb-6"></div>
                        
                        <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                            Interested in partnering with us or learning more about the PEGISUS program?
                        </p>
                        
                        <div class="flex flex-col sm:flex-row gap-4 justify-center">
                            <NuxtLink to="/contact"
                                class="px-8 py-3 bg-white text-cyan-600 font-bold shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                                <span>Get in Touch</span>
                                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                            </NuxtLink>
                            <NuxtLink to="/research"
                                class="px-8 py-3 bg-transparent text-white border-2 border-white font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
                                <UIcon name="i-heroicons-document-text" class="w-5 h-5" />
                                <span>View Research</span>
                            </NuxtLink>
                        </div>
                    </div>
                </div>
                
                <!-- Bottom Stats -->
                <div class="mt-12 pt-8 border-t border-gray-300">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div class="text-center">
                            <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">2023</div>
                            <div class="text-xs text-gray-600">Partnership Established</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">4</div>
                            <div class="text-xs text-gray-600">Years Duration</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">500+</div>
                            <div class="text-xs text-gray-600">Youth Participants</div>
                        </div>
                        <div class="text-center">
                            <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">CHF</div>
                            <div class="text-xs text-gray-600">Swiss Funded</div>
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

.logo-card {
    transform: translateY(10px);
    opacity: 0;
    animation: logoAppear 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes logoAppear {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Stagger animations for logos */
.logo-card:nth-child(1) {
    animation-delay: 0.1s;
}

.logo-card:nth-child(2) {
    animation-delay: 0.2s;
}

.logo-card:nth-child(3) {
    animation-delay: 0.3s;
}

.logo-card:nth-child(4) {
    animation-delay: 0.4s;
}

/* Smooth hover effects */
.logo-card:hover {
    transform: translateY(-2px);
}

/* Smooth transitions */
* {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                        opacity, box-shadow, transform, filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
}

@media (prefers-reduced-motion: reduce) {
    .fade-in-up,
    .logo-card {
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
}

@media (max-width: 475px) {
    .text-6xl {
        font-size: 2.5rem;
    }
    
    .text-5xl {
        font-size: 2rem;
    }
    
    .grid-cols-4 {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>