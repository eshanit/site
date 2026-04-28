<script setup lang="ts">
const partners = [
  { name: 'South African Medical Research Council', logo: '/img/partners/samrc-logo_0.png', color: 'indigo' },
  { name: 'SolidarMed', logo: '/img/partners/SM.png', color: 'teal' },
  { name: 'University of Zambia', logo: '/img/partners/unza.png', color: 'emerald' },
  { name: 'University Hospital Basel', logo: '/img/partners/USB.png', color: 'blue-dark' },
]

const colorClasses = {
  indigo:     { bg: 'bg-indigo-600' },
  teal:       { bg: 'bg-teal-600' },
  emerald:    { bg: 'bg-emerald-600' },
  'blue-dark':{ bg: 'bg-brand-dark' },
}

const accentBg = (color: string) => colorClasses[color as keyof typeof colorClasses]?.bg ?? 'bg-brand-medium'

const hovered = ref<number | null>(null)
const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  useIntersectionObserver(
    sectionRef,
    (entries) => { entries.forEach(e => { if (e.isIntersecting) isVisible.value = true }) },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )
})
</script>

<template>
  <div
    ref="sectionRef"
    class="py-16 md:py-20 px-4 sm:px-6 lg:px-8"
    :class="isVisible ? 'fade-in-up' : 'opacity-0'"
  >
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(partner, index) in partners"
          :key="partner.name"
          class="group relative h-full transition-all duration-300"
          @mouseenter="hovered = index"
          @mouseleave="hovered = null"
        >
          <div
            class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-6 overflow-hidden h-full flex items-center justify-center"
            :class="hovered === index ? 'shadow-lg -translate-y-1' : ''"
          >
            <!-- Top accent bar -->
            <div
              class="absolute top-0 left-0 h-1 transition-all duration-300"
              :class="[accentBg(partner.color), hovered === index ? 'w-full' : 'w-12']"
            ></div>

            <!-- Logo -->
            <div class="relative z-10 w-full h-24 flex items-center justify-center p-2">
              <NuxtImg
                :src="partner.logo"
                :alt="partner.name + ' logo'"
                class="max-w-full max-h-full object-contain transition-transform duration-300"
                :class="hovered === index ? 'scale-105' : ''"
                loading="lazy"
                width="300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.font-poppins { font-family: 'Poppins', sans-serif; }
.font-inter   { font-family: 'Inter', sans-serif; }

.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-up { animation: none !important; opacity: 1 !important; transform: none !important; }
}
</style>
