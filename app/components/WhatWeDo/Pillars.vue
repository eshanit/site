<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useElementBounding, useScroll, useWindowSize } from '@vueuse/core'

// Program pillars with detailed descriptions
const pillars = [
  {
    title: 'Substance Use Prevention',
    paragraphs: [
      'Reducing alcohol and drug use through evidence-based behavioral skills training that focuses on building resilience and healthy coping mechanisms.',
      'Our program incorporates cognitive-behavioral techniques to help participants recognize triggers and develop alternative responses to substance use.',
      'We provide ongoing support and monitoring to ensure sustainable change and prevent relapse through community reinforcement approaches.'
    ],
    icon: 'i-heroicons-shield-check',
    color: 'blue',
    dotColor: 'bg-blue-600'
  },
  {
    title: 'Gender Inclusion',
    paragraphs: [
      'Developing flexible and equitable beliefs about gender through psychoeducation and experiential learning activities.',
      'We challenge traditional gender norms and stereotypes while promoting understanding and acceptance of diverse gender expressions.',
      'Our approach fosters inclusive environments where all individuals feel valued and respected regardless of gender identity.'
    ],
    icon: 'i-heroicons-scale',
    color: 'orange',
    dotColor: 'bg-orange-500'
  },
  {
    title: 'Vocational Integration',
    paragraphs: [
      'Embedded within practical job skills training that prepares participants for meaningful employment and economic independence.',
      'We partner with local businesses to provide hands-on training and apprenticeship opportunities in growing industries.',
      'Our vocational support includes resume building, interview preparation, and workplace etiquette training for long-term success.'
    ],
    icon: 'i-heroicons-briefcase',
    color: 'green',
    dotColor: 'bg-green-500'
  },
  {
    title: 'Peer Support',
    paragraphs: [
      'Community-based support groups that create sustainable change through shared experiences and mutual accountability.',
      'We facilitate peer-led discussions and activities that build social connections and reduce isolation among participants.',
      'Our peer support model emphasizes empowerment, with experienced participants mentoring newcomers to create a cycle of positive change.'
    ],
    icon: 'i-heroicons-user-group',
    color: 'purple',
    dotColor: 'bg-purple-500'
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

// Refs for elements
const containerRef = ref<HTMLElement | null>(null)
const pillarRefs = ref<Array<HTMLElement | null>>(Array(pillars.length).fill(null))

// VueUse composables
const containerRect = useElementBounding(containerRef)
const { y: scrollY } = useScroll(window, { throttle: 50 })
const { height: windowHeight } = useWindowSize()

// Helper clamp
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))

// Compute element page top from useElementBounding + scrollY
const containerPageTop = computed(() => {
  const top = Number(containerRect.top?.value ?? 0)
  return top + scrollY.value
})

// Compute scroll position relative to the container
const relativeScroll = computed(() => {
  return scrollY.value - containerPageTop.value
})

// Compute scroll percentage inside the container (0..1)
const scrollPercentage = computed(() => {
  const height = Number(containerRect.height?.value ?? 0)
  if (height <= 0) return 0
  const adjusted = relativeScroll.value + windowHeight.value * 0.4
  return clamp(adjusted / height, 0, 1)
})

// Active pillar computed (0..pillars.length-1)
const activePillar = computed(() => {
  if (!containerRef.value || pillars.length === 0) return 0
  const idx = Math.floor(scrollPercentage.value * pillars.length)
  return clamp(idx, 0, pillars.length - 1)
})

// Progress within the current pillar section (0..1)
const pillarProgress = computed(() => {
  if (!containerRef.value || pillars.length === 0) return 0
  const sectionSize = 1 / pillars.length
  const start = Number(activePillar.value) * sectionSize
  const progress = (scrollPercentage.value - start) / sectionSize
  return clamp(progress, 0, 1)
})

// Safe color accessor for active pillar
const activePillarColor = computed(() => {
  const pillar = pillars[activePillar.value]
  return pillar?.color || pillars[0]?.color || 'blue'
})

// For fade-in visibility per pillar
const pillarVisible = ref<boolean[]>(Array(pillars.length).fill(false))
let intersectionObservers: IntersectionObserver[] = []

const createObservers = async () => {
  // Wait for DOM refs to be set
  await nextTick()

  // Clean up existing observers
  intersectionObservers.forEach(o => o.disconnect())
  intersectionObservers = []

  pillarRefs.value.forEach((el, index) => {
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            pillarVisible.value[index] = true
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -100px 0px'
      }
    )
    obs.observe(el)
    intersectionObservers.push(obs)
  })
}

onMounted(() => {
  createObservers()
})

onUnmounted(() => {
  intersectionObservers.forEach(o => o.disconnect())
  intersectionObservers = []
})
</script>

<template>
  <section ref="containerRef" class="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-white">
    <!-- Section Header -->
    <div class="max-w-7xl mx-auto mb-16 md:mb-24">
      <div class="inline-flex items-center gap-3 mb-6">
        <div class="w-3 h-3 bg-blue-600"></div>
        <span class="text-sm font-semibold text-blue-700 font-poppins uppercase tracking-wider">Framework & Approach</span>
      </div>
      
      <div class="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins leading-tight mb-6">
            Our Pillars of
            <span class="text-blue-600 block">Sustainable Change</span>
          </h2>
          
          <div class="h-1 w-24 bg-blue-600 mb-8"></div>
          
          <p class="text-lg text-gray-700 font-inter leading-relaxed mb-6">
            Four interconnected approaches creating holistic transformation through evidence-based, peer-led interventions.
          </p>
        </div>
        
        <div class="bg-blue-50 p-6 border-l-4 border-blue-600">
          <div class="flex items-start gap-4">
            <UIcon name="i-heroicons-light-bulb" class="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 class="text-xl font-bold text-blue-700 font-poppins mb-2">Evidence-Based Design</h3>
              <p class="text-gray-700 font-inter">
                Each pillar integrates rigorous research with community-led implementation for maximum impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline Container -->
    <div class="relative max-w-6xl mx-auto">
      <!-- Vertical Line -->
      <div class="timeline-line absolute top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
      
      <!-- Moving Dot -->
      <div
        class="timeline-dot absolute w-5 h-5 border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300"
        :class="getColorClass(activePillarColor, 'bg')"
        :style="{
          top: `${(activePillar + pillarProgress) * (100 / pillars.length)}%`
        }"
        aria-hidden="true"
      ></div>

      <!-- Pillar Items -->
      <div class="relative">
        <div
          v-for="(pillar, index) in pillars"
          :key="index"
          :ref="el => (pillarRefs[index] = el as HTMLElement)"
          class="pillar-item mb-24 md:mb-32 opacity-30 transition-all duration-700"
          :class="{
            'opacity-100': index <= activePillar,
            'pillar-active': index === activePillar,
            'opacity-100 translate-y-0': pillarVisible[index]
          }"
        >
          <!-- Static dot on timeline -->
          <div 
            class="timeline-static-dot absolute w-4 h-4 transform -translate-x-1/2 -translate-y-2 z-10 transition-all duration-500"
            :class="index <= activePillar ? 'scale-125 ' + getColorClass(pillar.color, 'bg') : 'scale-100 bg-gray-300'"
            aria-hidden="true"
          ></div>

          <!-- Title Column (Left - 30%) -->
          <div class="title-column absolute left-0 pr-8 pl-4">
            <div class="flex flex-col items-end">
              <!-- Icon -->
              <div
                class="w-16 h-16 flex items-center justify-center shadow-md mb-6 transition-all duration-500"
                :class="[
                  getColorClass(pillar.color, 'bg'),
                  'text-white',
                  index === activePillar ? 'scale-110' : 'scale-100'
                ]"
                :style="{
                  opacity: index <= activePillar ? 1 : 0.4,
                  transform: index === activePillar ? 'translateX(0) scale(1.1)' : 'translateX(-20px) scale(1)'
                }"
              >
                <UIcon :name="pillar.icon" class="w-8 h-8" />
              </div>
              
              <!-- Title -->
              <h3
                class="text-2xl font-bold text-right font-poppins transition-all duration-500 mb-3"
                :class="index <= activePillar ? getColorClass(pillar.color, 'text') : 'text-gray-400'"
                :style="{
                  transform: index === activePillar ? 'translateX(0)' : 'translateX(-10px)'
                }"
              >
                {{ pillar.title }}
              </h3>
              
              <!-- Pillar Number -->
              <div class="text-sm font-medium text-gray-500 font-inter">
                Pillar {{ index + 1 }}
              </div>
            </div>
          </div>

          <!-- Description Column (Right - 70%) -->
          <div class="description-column pl-12 pr-4 md:pr-8">
            <!-- Description Paragraphs -->
            <div 
              class="space-y-6 transition-all duration-700"
              :class="index <= activePillar ? 'text-gray-700' : 'text-gray-400'"
            >
              <div 
                v-for="(paragraph, pIndex) in pillar.paragraphs"
                :key="pIndex"
                class="overflow-hidden"
              >
                <p 
                  class="text-lg leading-relaxed font-inter transition-all duration-700"
                  :style="{
                    opacity: index === activePillar ? 1 : index < activePillar ? 0.8 : 0.3,
                    transform: index === activePillar ? 'translateX(0)' : 'translateX(30px)',
                    transitionDelay: `${pIndex * 100}ms`
                  }"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <!-- Progress indicator for current pillar -->
            <div 
              v-if="index === activePillar"
              class="mt-8 h-2 w-full bg-gray-200 overflow-hidden transition-all duration-300"
              aria-label="Progress through this pillar"
            >
              <div 
                class="h-full transition-all duration-300"
                :class="getColorClass(pillar.color, 'bg')"
                :style="{ width: `${pillarProgress * 100}%` }"
                role="progressbar"
                :aria-valuenow="pillarProgress * 100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            
            <!-- Key Outcome -->
            <div 
              v-if="index === activePillar"
              class="mt-8 p-6 border-l-4 transition-all duration-500"
              :class="getColorClass(pillar.color, 'bgLight') + ' ' + getColorClass(pillar.color, 'border')"
              :style="{
                opacity: pillarProgress > 0.5 ? 1 : 0,
                transform: pillarProgress > 0.5 ? 'translateX(0)' : 'translateX(20px)'
              }"
            >
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-6 h-6 mt-1 flex-shrink-0" :class="getColorClass(pillar.color, 'text')" />
                <div>
                  <h4 class="font-bold font-poppins mb-1" :class="getColorClass(pillar.color, 'text')">Key Outcome</h4>
                  <p class="text-gray-700 font-inter text-sm">
                    {{ index === 0 ? 'Reduced substance use and increased coping skills' :
                       index === 1 ? 'More equitable gender beliefs and reduced stereotypes' :
                       index === 2 ? 'Increased employment readiness and economic independence' :
                       'Stronger community networks and peer support systems' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="text-center mt-20 pt-8 border-t border-gray-200">
        <div class="inline-flex items-center space-x-2 mb-4">
          <UIcon name="i-heroicons-arrow-down" class="w-5 h-5 text-gray-400 animate-bounce" />
          <p class="text-gray-500 text-sm font-medium font-inter">
            Scroll to explore each pillar
          </p>
        </div>
        
        <div class="flex justify-center space-x-4 mb-8">
          <div 
            v-for="(pillar, index) in pillars"
            :key="index"
            class="flex flex-col items-center"
          >
            <button
              @click="activePillar = index; window.scrollTo({ top: containerPageTop + (index * (containerRect.height / pillars.length)), behavior: 'smooth' })"
              :class="[
                'w-10 h-10 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
                index <= activePillar ? getColorClass(pillar.color, 'bg') + ' text-white' : 'bg-gray-100 text-gray-400',
                index === activePillar ? 'ring-2 ' + getColorClass(pillar.color, 'bg') : ''
              ]"
              :aria-label="`Jump to ${pillar.title} pillar`"
              :aria-current="index === activePillar ? 'step' : null"
            >
              <UIcon :name="pillar.icon" class="w-5 h-5" />
            </button>
            <span 
              class="text-xs font-medium mt-2 transition-all duration-300 font-poppins"
              :class="index <= activePillar ? 'text-gray-900' : 'text-gray-400'"
            >
              {{ index + 1 }}
            </span>
          </div>
        </div>
        
        <p class="text-sm text-gray-600 font-inter max-w-2xl mx-auto">
          Each pillar represents a core component of the PEGISUS framework, working together to create holistic youth empowerment.
        </p>
      </div>
    </div>

    <!-- Bottom CTA -->
    <div class="mt-24 pt-8 border-t border-gray-200">
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-2xl md:text-3xl font-bold text-gray-900 font-poppins mb-6">
          Ready to Implement This Framework?
        </h3>
        
        <p class="text-lg text-gray-600 mb-8 font-inter max-w-2xl mx-auto">
          Contact us to Access our complete implementation guide, training materials, and evaluation tools.
        </p>
        
        <!-- <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/resources"
            class="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-blue-900 font-bold font-poppins shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-3 group"
            aria-label="Download implementation resources"
          >
            <UIcon name="i-heroicons-document-arrow-down" class="w-5 h-5" />
            <span>Download Resources</span>
          </NuxtLink>
          
          <NuxtLink
            to="/training"
            class="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 font-bold font-poppins shadow-sm hover:shadow transition-all duration-300 hover:bg-blue-50 flex items-center justify-center gap-3 group"
            aria-label="Learn about training opportunities"
          >
            <UIcon name="i-heroicons-academic-cap" class="w-5 h-5" />
            <span>Training Programs</span>
          </NuxtLink>
        </div> -->
      </div>
    </div>
  </section>
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
a:focus,
button:focus {
  outline: 2px solid #1E3A8A;
  outline-offset: 2px;
}

/* Timeline layout */
.pillar-item {
  position: relative;
  min-height: 300px;
}

.timeline-line {
  left: 25%;
}

.timeline-dot {
  left: 25%;
}

.timeline-static-dot {
  left: 25%;
}

.title-column {
  width: 25%;
}

.description-column {
  margin-left: 25%;
  width: 75%;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
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
  
  .pillar-item,
  .timeline-dot {
    transition: none !important;
  }
  
  .animate-bounce {
    animation: none;
  }
}

/* Print styles */
@media print {
  .timeline-line,
  .timeline-dot,
  .timeline-static-dot {
    display: none;
  }
  
  .pillar-item {
    break-inside: avoid;
    opacity: 1 !important;
    transform: none !important;
  }
  
  .bg-orange-500,
  .bg-blue-600,
  .bg-green-500,
  .bg-purple-500 {
    background-color: #f8fafc !important;
    -webkit-print-color-adjust: exact;
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .title-column {
    width: 30%;
  }
  
  .description-column {
    margin-left: 30%;
    width: 70%;
  }
  
  .timeline-line,
  .timeline-dot,
  .timeline-static-dot {
    left: 30%;
  }
}

@media (max-width: 768px) {
  .pillar-item {
    min-height: 400px;
    margin-bottom: 4rem !important;
  }
  
  .timeline-line,
  .timeline-dot,
  .timeline-static-dot {
    display: none;
  }
  
  .title-column {
    position: relative !important;
    width: 100% !important;
    padding: 0 !important;
    margin-bottom: 2rem;
  }
  
  .title-column .flex {
    align-items: flex-start !important;
    text-align: left !important;
  }
  
  .title-column h3 {
    text-align: left !important;
  }
  
  .description-column {
    margin-left: 0 !important;
    width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

@media (max-width: 640px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .text-3xl {
    font-size: 1.75rem;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .gap-4 > * {
    width: 100%;
  }
}
</style>
