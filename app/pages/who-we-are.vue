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
    <div class="bg-gradient-to-b from-white to-gray-50 min-h-screen">
        <!-- Hero Section -->
        <section ref="heroRef" class="pt-24 pb-16 md:pt-32 md:pb-20 px-4 md:px-10"
            :class="heroVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-12 items-start">
                    <!-- Text Content -->
                    <div class="space-y-6">
                        <div>
                            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                <span class="block">Who We Are</span>
                                <span
                                    class="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-900">
                                    Partnership for Impact
                                </span>
                            </h1>

                            <p class="mt-8 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                                PEGISUS represents a groundbreaking collaboration between leading institutions across
                                three nations,
                                united by a common vision for youth empowerment and health equity in Southern Africa.
                            </p>
                        </div>

                        <!-- Stats -->
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div class="text-2xl font-bold text-cyan-600">4</div>
                                <div class="text-sm text-gray-600 mt-1">Countries</div>
                            </div>
                            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div class="text-2xl font-bold text-cyan-600">20+</div>
                                <div class="text-sm text-gray-600 mt-1">Team Members</div>
                            </div>
                            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div class="text-2xl font-bold text-cyan-600">5</div>
                                <div class="text-sm text-gray-600 mt-1">Partner Institutions</div>
                            </div>
                            <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                                <div class="text-2xl font-bold text-cyan-600">3</div>
                                <div class="text-sm text-gray-600 mt-1">Nations</div>
                            </div>
                        </div>
                    </div>

                    <!-- Quote Card -->
                    <div class="bg-gradient-to-br from-cyan-500 to-blue-900 rounded-3xl p-8 text-white shadow-2xl">
                        <div class="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                            <UIcon name="i-heroicons-handshake" class="w-6 h-6 text-white" />
                        </div>

                        <blockquote class="text-xl font-medium italic leading-relaxed">
                            "This project is a partnership between the University Hospital Basel, the South African
                            Medical Research Council,
                            the University of Zambia, and SolidarMed Zambia and Zimbabwe. Together, we developed the
                            idea for PEGISUS,
                            created the intervention, and will test whether it works in Zambia, Zimbabwe, and South
                            Africa."
                        </blockquote>

                        <div class="mt-8 pt-6 border-t border-white/20">
                            <p class="text-sm opacity-90">A collaborative initiative spanning three nations</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stakeholder Groups Section -->
        <section class="py-16 md:py-20 px-4 md:px-10">
            <div class="max-w-7xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-12 md:mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Stakeholder Partners
                    </h2>
                    <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                        Meet the dedicated teams from each partner institution working together to make PEGISUS a
                        reality
                    </p>
                </div>

                <!-- Stakeholder Components -->
                <div class="space-y-20">
                    <WhoWeAreSolidarMedZambia />
                    <WhoWeAreSolidarMedZimbabwe />
                    <WhoWeAreUniversityOfZambia />
                    <WhoWeAreUniversityHospitalBasel />
                    <WhoWeAreSAMRC />

                </div>
            </div>
        </section>

        <!-- Partners Logos Section -->
        <section ref="partnersRef" class="py-16 md:py-20 px-4 md:px-10 bg-gradient-to-b from-white to-gray-50"
            :class="partnersVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Partners
                    </h2>
                    <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                        Working together with leading institutions to create sustainable impact
                    </p>
                </div>

                <!-- Logos Grid -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <div v-for="(partner, index) in partners" :key="partner.name"
                        class="logo-card bg-white rounded-2xl p-6 md:p-8 flex items-center justify-center shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
                        :style="`transition-delay: ${index * 100}ms`">
                        <div class="relative h-20 md:h-24 w-full">
                            <NuxtImg :src="partner.logo" :alt="partner.name + ' logo'"
                                class="object-contain w-full h-full opacity-80 hover:opacity-100 transition-opacity"
                                loading="lazy" placeholder />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 md:py-20 px-4 md:px-10">
            <div class="max-w-4xl mx-auto">
                <div class="bg-gradient-to-r from-cyan-500 to-blue-900 rounded-3xl p-8 md:p-12 text-white text-center">
                    <h3 class="text-2xl md:text-3xl font-bold mb-4">
                        Join Our Collaborative Effort
                    </h3>
                    <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                        Interested in partnering with us or learning more about the PEGISUS program?
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <NuxtLink to="/contact"
                            class="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-white text-cyan-600 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            Get in Touch
                            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                        </NuxtLink>
                        <NuxtLink to="/research"
                            class="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all">
                            View Research
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
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
    transform: translateY(-4px);
}

@media (prefers-reduced-motion: reduce) {

    .fade-in-up,
    .logo-card {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
    }
}
</style>