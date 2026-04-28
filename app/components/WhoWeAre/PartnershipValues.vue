<script setup lang="ts">
const partnershipValues = [
  {
    title: 'Collaborative Expertise',
    description: 'Combining diverse institutional strengths and knowledge',
    icon: 'i-heroicons-user-group',
    color: 'indigo',
  },
  {
    title: 'Innovation Focus',
    description: 'Developing evidence-based, impactful solutions',
    icon: 'i-heroicons-light-bulb',
    color: 'teal',
  },
  {
    title: 'Sustainable Impact',
    description: 'Creating lasting change in communities',
    icon: 'i-heroicons-chart-bar',
    color: 'emerald',
  },
]

const colorClasses = {
  indigo:  { bg: 'bg-indigo-600',  text: 'text-indigo-700',  bgLight: 'bg-indigo-50'  },
  teal:    { bg: 'bg-teal-600',    text: 'text-teal-700',    bgLight: 'bg-teal-50'    },
  emerald: { bg: 'bg-emerald-600', text: 'text-emerald-700', bgLight: 'bg-emerald-50' },
}

type ColorKey = keyof typeof colorClasses
type ClassKey = keyof typeof colorClasses.indigo

const getColorClass = (color: string, type: ClassKey) =>
  colorClasses[color as ColorKey]?.[type] ?? ''

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
    class="border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8"
    :class="isVisible ? 'fade-in-up' : 'opacity-0'"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Heading -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">
          Our Partnership Values
        </h2>
        <div class="h-1 w-20 bg-brand-medium mx-auto"></div>
      </div>

      <!-- Values grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(value, i) in partnershipValues"
          :key="i"
          class="group relative h-full transition-all duration-300"
          @mouseenter="hovered = i"
          @mouseleave="hovered = null"
        >
          <div
            class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-8 overflow-hidden h-full flex flex-col text-center"
            :class="hovered === i ? 'shadow-xl -translate-y-1' : ''"
          >
            <!-- Colored top bar -->
            <div
              class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
              :class="[getColorClass(value.color, 'bg'), hovered === i ? 'w-full' : 'w-16 mx-auto']"
            ></div>

            <!-- Icon -->
            <div class="relative z-10 mb-6">
              <div
                class="w-16 h-16 mx-auto flex items-center justify-center transition-all duration-300"
                :class="[getColorClass(value.color, 'bgLight'), hovered === i ? 'scale-110' : '']"
              >
                <UIcon :name="value.icon" class="w-8 h-8" :class="getColorClass(value.color, 'text')" />
              </div>
            </div>

            <!-- Content -->
            <div class="relative z-10 flex-1">
              <h3
                class="text-xl font-bold font-poppins mb-3 transition-colors duration-300"
                :class="hovered === i ? getColorClass(value.color, 'text') : 'text-gray-900'"
              >
                {{ value.title }}
              </h3>
              <p class="text-gray-600 font-inter leading-relaxed">{{ value.description }}</p>
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
