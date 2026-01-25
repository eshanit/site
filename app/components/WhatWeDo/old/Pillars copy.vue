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
    icon: 'i-heroicons-heart',
    color: 'from-cyan-500 to-blue-500',
    dotColor: 'bg-cyan-500'
  },
  {
    title: 'Gender Inclusion',
    paragraphs: [
      'Developing flexible and equitable beliefs about gender through psychoeducation and experiential learning activities.',
      'We challenge traditional gender norms and stereotypes while promoting understanding and acceptance of diverse gender expressions.',
      'Our approach fosters inclusive environments where all individuals feel valued and respected regardless of gender identity.'
    ],
    icon: 'i-heroicons-scale',
    color: 'from-purple-500 to-pink-500',
    dotColor: 'bg-purple-500'
  },
  {
    title: 'Vocational Integration',
    paragraphs: [
      'Embedded within practical job skills training that prepares participants for meaningful employment and economic independence.',
      'We partner with local businesses to provide hands-on training and apprenticeship opportunities in growing industries.',
      'Our vocational support includes resume building, interview preparation, and workplace etiquette training for long-term success.'
    ],
    icon: 'i-heroicons-briefcase',
    color: 'from-green-500 to-emerald-500',
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
    color: 'from-orange-500 to-amber-500',
    dotColor: 'bg-orange-500'
  }
]

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
// elementPageTop = boundingClientRect.top + scrollY
const containerPageTop = computed(() => {
  // boundingClientRect.top might be undefined initially; guard it
  const top = Number(containerRect.top?.value ?? 0)
  return top + scrollY.value
})

// Compute a scroll position relative to the container (same semantics as your old code)
const relativeScroll = computed(() => {
  // scrollTop within container: scrollY - containerPageTop
  return scrollY.value - containerPageTop.value
})

// Compute scroll percentage inside the container (0..1)
const scrollPercentage = computed(() => {
  const height = Number(containerRect.height?.value ?? 0)
  if (height <= 0) return 0
  // keep the same visual offset you had before: add 40% of viewport
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

// For fade-in visibility per pillar (used for adding classes / extra animations)
const pillarVisible = ref<boolean[]>(Array(pillars.length).fill(false))
let intersectionObservers: IntersectionObserver[] = []

const createObservers = async () => {
  // Wait for DOM refs to be set
  await nextTick()

  // Clean up existing observers (if any)
  intersectionObservers.forEach(o => o.disconnect())
  intersectionObservers = []

  pillarRefs.value.forEach((el, index) => {
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            pillarVisible.value[index] = true
          } else {
            // keep true once visible (optional). If you want toggle, set false.
            // pillarVisible.value[index] = false
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
  // create observers when component mounts and when DOM updates
  createObservers()
  // If pillars or refs change dynamically you can re-run createObservers()
})

onUnmounted(() => {
  intersectionObservers.forEach(o => o.disconnect())
  intersectionObservers = []
})
</script>

<template>
  <div ref="containerRef" class="py-20 px-4 md:px-10 overflow-hidden">
    <!-- Heading -->
    <div class="text-center mb-20 max-w-4xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Our Pillars of Change
      </h2>
      <p class="text-xl text-gray-600">
        Four interconnected approaches that create sustainable transformation
      </p>
    </div>

    <!-- Timeline Container -->
    <div class="relative max-w-7xl mx-auto">
      <!-- Vertical Line (at 30% mark) -->
      <div class="timeline-line absolute top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
      
      <!-- Moving Dot (follows the vertical line) -->
      <div 
        class="timeline-dot absolute w-5 h-5 rounded-full border-4 border-white shadow-xl transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300"
        :class="pillars[activePillar].dotColor"
        :style="{
          /* generic formula that supports any number of pillars */
          top: `${(activePillar + pillarProgress) * (100 / pillars.length)}%`
        }"
      ></div>

      <!-- Pillar Items -->
      <div class="relative">
        <div
          v-for="(pillar, index) in pillars"
          :key="index"
          :ref="el => (pillarRefs[index] = el)"
          class="pillar-item mb-32 opacity-30 transition-all duration-700"
          :class="{
            'opacity-100': index <= activePillar,
            'pillar-active': index === activePillar,
            // add 'visible' class when intersection observer reports visible
            'opacity-100 translate-y-0': pillarVisible[index]
          }"
        >
          <!-- Static dot on timeline -->
          <div 
            class="timeline-static-dot absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-2 z-10 transition-all duration-500"
            :class="index <= activePillar ? 'scale-125 ' + pillar.dotColor : 'scale-100 bg-gray-300'"
          ></div>

          <!-- Title Column (Left - 30%) -->
          <div class="title-column absolute left-0 pr-8 pl-4">
            <div class="flex flex-col items-end">
              <!-- Icon -->
              <div 
                :class="`w-16 h-16 bg-gradient-to-r ${pillar.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 transition-all duration-500`"
                :style="{
                  opacity: index <= activePillar ? 1 : 0.4,
                  transform: index === activePillar ? 'translateX(0) scale(1.1)' : 'translateX(-20px) scale(1)'
                }"
              >
                <UIcon :name="pillar.icon" class="w-8 h-8 text-white" />
              </div>
              
              <!-- Title -->
              <h3 
                class="text-2xl md:text-3xl font-bold text-right transition-all duration-500"
                :class="index <= activePillar ? 'text-gray-900' : 'text-gray-400'"
                :style="{
                  transform: index === activePillar ? 'translateX(0)' : 'translateX(-10px)'
                }"
              >
                {{ pillar.title }}
              </h3>
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
                  class="text-lg leading-relaxed transition-all duration-700"
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
              class="mt-8 h-2 w-full bg-gray-200 rounded-full overflow-hidden transition-all duration-300"
            >
              <div 
                class="h-full rounded-full transition-all duration-300"
                :class="pillar.color.replace('from-', 'bg-gradient-to-r from-')"
                :style="{ width: `${pillarProgress * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="text-center mt-20 pt-8 border-t border-gray-200">
        <div class="inline-flex items-center space-x-2 mb-3">
          <UIcon name="i-heroicons-arrow-down" class="w-5 h-5 text-gray-400 animate-bounce" />
          <p class="text-gray-500 text-sm font-medium">
            Scroll to explore
          </p>
        </div>
        <div class="flex justify-center space-x-3">
          <div 
            v-for="(pillar, index) in pillars"
            :key="index"
            class="flex flex-col items-center"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
              :class="index <= activePillar ? pillar.dotColor + ' text-white' : 'bg-gray-200 text-gray-400'"
            >
              <UIcon :name="pillar.icon" class="w-5 h-5" />
            </div>
            <span 
              class="text-xs font-medium mt-2 transition-all duration-300"
              :class="index <= activePillar ? 'text-gray-900' : 'text-gray-400'"
            >
              {{ index + 1 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Same styles as before */
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

* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

.pillar-active {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0.1);
  }
}

.pillar-active .title-column h3 {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (max-width: 768px) {
  .pillar-item {
    flex-direction: column;
    min-height: 400px;
  }
  
  .timeline-line {
    left: 2rem !important;
  }
  
  .timeline-dot {
    left: 2rem !important;
  }
  
  .timeline-static-dot {
    left: 2rem !important;
  }
  
  .title-column {
    width: 100% !important;
    position: relative !important;
    padding-left: 3rem !important;
    margin-bottom: 2rem;
    text-align: left !important;
  }
  
  .title-column .flex {
    align-items: flex-start !important;
    text-align: left !important;
  }
  
  .title-column h3 {
    text-align: left !important;
  }
  
  .description-column {
    margin-left: 3rem !important;
    width: calc(100% - 3rem) !important;
    padding-left: 0 !important;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .pillar-item p {
    transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), 
                transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>