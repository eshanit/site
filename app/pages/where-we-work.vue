<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const heroVisible = ref(false)
const countriesVisible = ref(false)

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
    <div class="bg-gradient-to-b from-white to-gray-50 min-h-screen">
        <!-- Hero Section -->
        <section ref="heroRef" class="pt-24 pb-16 md:pt-32 md:pb-20 px-4 md:px-10"
            :class="heroVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <div class="grid lg:grid-cols-2 gap-12 items-start">
                    <!-- Left Column: Text -->
                    <div class="space-y-8">
                        <div>
                            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                <span class="block">Where We Work</span>
                                <span
                                    class="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-900">
                                    Communities Across Southern Africa
                                </span>
                            </h1>

                            <p class="mt-8 text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                                PEGISUS operates in communities across Zambia, Zimbabwe, and South Africa,
                                partnering with local vocational training programs to create sustainable impact
                                where it's needed most.
                            </p>
                        </div>

                        <!-- Map Statistics -->
                        <div class="bg-gradient-to-r from-cyan-500 to-blue-900 rounded-3xl p-6 md:p-8 text-white">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="text-center">
                                    <div class="text-3xl md:text-4xl font-bold mb-2">3</div>
                                    <div class="text-sm opacity-90">Countries</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl md:text-4xl font-bold mb-2">10+</div>
                                    <div class="text-sm opacity-90">Communities</div>
                                </div>
                                <div class="text-center">
                                    <div class="text-3xl md:text-4xl font-bold mb-2">3</div>
                                    <div class="text-sm opacity-90">Vocational Partners</div>
                                </div>
                            </div>

                            <div class="mt-6 pt-6 border-t border-white/20">
                                <p class="text-sm opacity-90 italic">
                                    "Working directly with communities to address substance use, gender equity, and
                                    youth employment."
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Map/Visual -->
                    <div class="relative">
                        <div
                            class="rounded-3xl p-8 h-full min-h-[400px]"
                            style="background-image: url('/img/countries/map.png'); background-size: cover; background-position: center;">
                            <div class="relative h-full">
                                <!-- Simple map visualization -->
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="relative w-full h-full max-w-lg mx-auto">
                                        <!-- South Africa -->
                                        <div class="absolute top-56 left-1/2">
                                            <div
                                                class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-900 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
                                                SA
                                            </div>
                                            <div
                                                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 rounded-full">
                                            </div>
                                        </div>

                                        <!-- Zimbabwe -->
                                        <div class="absolute top-20 left-3/5">
                                            <div
                                                class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-900 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
                                                ZW
                                            </div>
                                            <div
                                                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 rounded-full">
                                            </div>
                                        </div>

                                        <!-- Zambia -->
                                        <div class="absolute top-5 left-1/3">
                                            <div
                                                class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-900 rounded-full flex items-center justify-center text-white font-bold shadow-xl">
                                                ZM
                                            </div>
                                            <div
                                                class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 rounded-full">
                                            </div>
                                        </div>

                                        <!-- Connecting lines -->
                                        <div class="absolute top-0 left-0 w-full h-full">
                                            <svg class="w-full h-full" fill="none">
                                                <path d="M75% 25%, 66% 33%" stroke="url(#gradient)" stroke-width="2"
                                                    stroke-dasharray="5,5" class="opacity-30" />
                                                <path d="M33% 66%, 66% 33%" stroke="url(#gradient)" stroke-width="2"
                                                    stroke-dasharray="5,5" class="opacity-30" />
                                                <defs>
                                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stop-color="#06b6d4" />
                                                        <stop offset="100%" stop-color="#1e3a8a" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Countries Section -->
        <section ref="countriesRef" class="py-16 md:py-20 px-4 md:px-10"
            :class="countriesVisible ? 'fade-in-up' : 'opacity-0'">
            <div class="max-w-7xl mx-auto">
                <!-- Section Header -->
                <div class="text-center mb-12 md:mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Our Implementation Sites
                    </h2>
                    <p class="text-lg text-gray-600 max-w-3xl mx-auto">
                        Working in partnership with local communities and vocational training programs to create lasting
                        change
                    </p>
                </div>

                <!-- Country Components -->
                <div class="space-y-24">
                    <WhereWeWorkZambia />
                    <WhereWeWorkZimbabwe />
                    <WhereWeWorkSouthAfrica />
                </div>
            </div>
        </section>

        <!-- Partnership CTA -->
        <section class="py-16 md:py-20 px-4 md:px-10">
            <div class="max-w-7xl mx-auto">
                <div class="bg-gradient-to-r from-cyan-500 to-blue-900 rounded-3xl p-8 md:p-12 text-white">
                    <div class="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 class="text-2xl md:text-3xl font-bold mb-4">
                                Interested in Partnering?
                            </h3>
                            <p class="text-lg opacity-90 mb-6">
                                We're always looking to expand our reach and partner with more vocational training
                                programs across Southern Africa.
                            </p>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-4">
                            <NuxtLink to="/contact"
                                class="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full bg-white text-cyan-600 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                Partner With Us
                                <UIcon name="i-heroicons-handshake" class="w-4 h-4" />
                            </NuxtLink>
                            <NuxtLink to="/program"
                                class="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all">
                                Learn About PEGISUS
                            </NuxtLink>
                        </div>
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

@media (prefers-reduced-motion: reduce) {
    .fade-in-up {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
    }
}
</style>