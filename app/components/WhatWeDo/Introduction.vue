<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const highlights = [
  { number: '8', label: 'Sessions', description: 'Comprehensive program structure', icon: 'i-heroicons-calendar' },
  { number: '16-24', label: 'Age Range', description: 'Targeted youth demographic', icon: 'i-heroicons-users' },
  { number: '2', label: 'Science-backed Programs', description: 'RAD-PAL & Manhood 2.0 foundation', icon: 'i-heroicons-beaker' },
  { number: 'Peer', label: 'Education Model', description: 'Community-driven approach', icon: 'i-heroicons-chat-bubble-left-right' }
]

// reveal flags
const heroVisible = ref(false)
const highlightsVisible = ref(false)
const animatedHighlights = ref(false)
const highlightHovered = ref<number | null>(null)

// Gradient colors for each highlight
const highlightGradients = [
  'from-cyan-500 to-blue-900',
  'from-cyan-500 to-blue-700',
  'from-cyan-500 to-emerald-600',
  'from-blue-700 to-cyan-500'
]

const getHighlightGradient = (index: number) => {
  return `bg-gradient-to-br ${highlightGradients[index % highlightGradients.length]}`
}

// Quick stats data
const quickStats = [
  { value: '3', label: 'Countries', description: 'Zambia, Zimbabwe, South Africa', icon: 'i-heroicons-globe-europe-africa' },
  { value: '500+', label: 'Youth Impacted', description: 'Active participants', icon: 'i-heroicons-users' }
]

const quickStatHovered = ref<number | null>(null)

// small delay to stagger highlights after reveal
onMounted(() => {
  // add slight stagger for highlight entrance after they become visible
  const { stop } = useIntersectionObserver(() => document.querySelector('#intro-highlights') as HTMLElement | null,
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          highlightsVisible.value = true
          // stagger appearance
          setTimeout(() => (animatedHighlights.value = true), 120)
          stop?.()
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
  )

  useIntersectionObserver(
    () => document.querySelector('#intro-hero') as HTMLElement | null,
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          heroVisible.value = true
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -120px 0px' }
  )
})
</script>

<template>
  <section id="intro-hero" class="py-16 md:py-20 px-4 md:px-10">
    <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- Text -->
      <div class="max-w-2xl mx-auto lg:mx-0">
        <div class="mb-6">
          <div class="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 mb-4"></div>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Peer Education for Gender Inclusion
            <span class="block mt-4 bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
              and Substance Use in Southern Africa
            </span>
          </h2>
        </div>

        <p class="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
          PEGISUS represents a groundbreaking approach to youth development, combining substance use prevention
          with gender equity education through peer-led, community-embedded programming.
        </p>

        <!-- Quick stats -->
        <div class="grid grid-cols-2 gap-4 md:gap-6 mt-8">
          <div
            v-for="(stat, i) in quickStats"
            :key="i"
            class="group relative transform transition-all duration-500 hover:scale-105"
            @mouseenter="quickStatHovered = i"
            @mouseleave="quickStatHovered = null"
          >
            <!-- Animated background gradient -->
            <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                 :class="`${highlightGradients[i % highlightGradients.length]}`"></div>
            
            <!-- Main card -->
            <div class="relative bg-white backdrop-blur-sm border border-gray-100 shadow-md group-hover:shadow-xl transition-all duration-500 p-6 overflow-hidden"
                 :class="quickStatHovered === i ? 'border-cyan-300' : ''">
              
              <!-- Background icon glow -->
              <div class="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 rounded-full opacity-5 transition-all duration-500"
                   :class="`bg-gradient-to-br ${highlightGradients[i % highlightGradients.length]}`"></div>
              
              <!-- Icon -->
              <div class="mb-4 inline-flex items-center justify-center w-10 h-10 transition-all duration-500 text-white"
                   :class="`bg-gradient-to-br ${highlightGradients[i % highlightGradients.length]}`">
                <UIcon :name="stat.icon" class="w-5 h-5" />
              </div>
              
              <!-- Value -->
              <div class="relative z-10">
                <div class="text-3xl md:text-4xl font-bold transition-all duration-300 mb-1"
                     :class="quickStatHovered === i ? `bg-gradient-to-r bg-clip-text text-transparent ` + `${highlightGradients[i % highlightGradients.length]}` : 'text-gray-900'">
                  {{ stat.value }}
                </div>
                
                <!-- Accent line -->
                <div class="h-0.5 w-6 transition-all duration-500 mb-3"
                     :class="`bg-gradient-to-r ${highlightGradients[i % highlightGradients.length]}`"></div>
                
                <div class="text-sm font-semibold text-gray-900 mb-1 transition-colors duration-300"
                     :class="quickStatHovered === i ? 'text-cyan-600' : ''">
                  {{ stat.label }}
                </div>
                <div class="text-xs text-gray-600">
                  {{ stat.description }}
                </div>
              </div>
              
              <!-- Hover indicator -->
              <div class="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   :class="`bg-gradient-to-r ${highlightGradients[i % highlightGradients.length]}`"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Image -->
      <div
        class="relative h-[360px] md:h-[400px] overflow-hidden"
        :class="heroVisible ? 'intro-revealed' : 'intro-hidden'"
        aria-hidden="false"
      >
        <!-- Main Image -->
        <div class="relative w-full h-full">
          <div class="absolute inset-0">
            <NuxtImg
              src="/img/pegisus_program_1.jpg"
              alt="PEGISUS program session with youth participants engaged in discussion"
              class="w-full h-full object-cover transform transition-transform duration-700"
              :class="heroVisible ? 'scale-105' : 'scale-100'"
              width="600"
              height="400"
              sizes="(max-width: 768px) 100vw, 600px"
              loading="lazy"
              format="webp"
              quality="85"
            />
          </div>
          
          <!-- Overlay gradient -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
          
          <!-- Text overlay -->
          <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
            <div class="text-white max-w-2xl">
              <div class="text-lg font-bold mb-2">Peer-led Sessions</div>
              <div class="text-sm opacity-90">Interactive group discussions empowering youth through evidence-based interventions</div>
            </div>
          </div>
          
          <!-- Badge -->
          <div class="absolute top-6 left-6 bg-gradient-to-r from-cyan-500 to-blue-900 text-white px-4 py-2 shadow-lg">
            <span class="text-sm font-bold">Program in Action</span>
          </div>

          <!-- Bottom accent line -->
          <div class="absolute -bottom-4 -right-4 w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 transform -rotate-45"></div>
        </div>
      </div>
    </div>

    <!-- Highlights -->
    <div id="intro-highlights" class="mt-16 md:mt-24">
      <div class="mb-8 text-center">
        <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Program <span class="bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">Highlights</span>
        </h3>
        <div class="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto"></div>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(h, i) in highlights"
          :key="i"
          class="group relative h-full transform transition-all duration-500 hover:scale-105"
          @mouseenter="highlightHovered = i"
          @mouseleave="highlightHovered = null"
        >
          <!-- Animated background gradient -->
          <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-none blur-xl"
               :class="getHighlightGradient(i)"></div>
          
          <!-- Main card -->
          <div class="relative bg-white backdrop-blur-sm rounded-none border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 p-8 overflow-hidden h-full flex flex-col"
               :class="highlightHovered === i ? 'border-cyan-300' : ''">
            
            <!-- Background icon glow -->
            <div class="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 rounded-full opacity-5 transition-all duration-500"
                 :class="getHighlightGradient(i)"></div>
            
            <!-- Icon -->
            <div v-if="h.icon" class="mb-6 inline-flex items-center justify-center w-14 h-14 transition-all duration-500"
                 :class="getHighlightGradient(i) + ' text-white'">
              <UIcon :name="h.icon" class="w-7 h-7" />
            </div>
            
            <!-- Number/Label with animation -->
            <div class="relative z-10 flex-1">
              <div class="text-4xl md:text-5xl font-bold transition-all duration-300 mb-2"
                   :class="highlightHovered === i ? `bg-gradient-to-r bg-clip-text text-transparent scale-105 ` + getHighlightGradient(i) : 'text-gray-900'">
                {{ h.number }}
              </div>
              
              <!-- Accent line -->
              <div class="h-1 w-8 transition-all duration-500 mb-4"
                   :class="getHighlightGradient(i)"></div>
              
              <div class="text-lg font-bold text-gray-900 mb-3 transition-colors duration-300"
                   :class="highlightHovered === i ? 'text-cyan-600' : ''">
                {{ h.label }}
              </div>
              <div class="text-sm text-gray-600 leading-relaxed">
                {{ h.description }}
              </div>
            </div>
            
            <!-- Hover indicator -->
            <div class="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 :class="getHighlightGradient(i)"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Call to Action -->
    <div class="mt-16 md:mt-24 text-center">
      <div class="border-t border-b border-gray-200 py-8 md:py-12">
        <div class="max-w-3xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to <span class="bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">Empower Youth</span> in Your Community?
          </h3>
          <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our mission to create sustainable change through evidence-based, peer-led interventions.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/contact"
              class="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-bold shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 transform group-hover:scale-110 transition-transform" />
              <span>Contact Our Team</span>
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </NuxtLink>
            <NuxtLink
              to="/what-we-do"
              class="px-8 py-3 bg-white text-cyan-600 border-2 border-cyan-500 font-bold shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5 transform group-hover:scale-110 transition-transform" />
              <span>Learn More</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Remove all border-radius globally */
* {
  border-radius: 0 !important;
}

/* Core transitions */
* {
  transition: background-color .28s cubic-bezier(.4,0,.2,1),
              color .28s cubic-bezier(.4,0,.2,1),
              transform .32s cubic-bezier(.4,0,.2,1),
              opacity .28s cubic-bezier(.4,0,.2,1);
}

/* Intro reveal animation */
.intro-hidden {
  opacity: 0;
  transform: translateX(20px);
}

.intro-revealed {
  opacity: 1;
  transform: translateX(0);
  transition: all 700ms cubic-bezier(.4,0,.2,1);
}

/* Highlights animation - stagger entrance */
.grid > div {
  animation: slideUp 0.6s cubic-bezier(.2,.9,.3,1) forwards;
  opacity: 0;
}

.grid > div:nth-child(1) { animation-delay: 0ms; }
.grid > div:nth-child(2) { animation-delay: 80ms; }
.grid > div:nth-child(3) { animation-delay: 160ms; }
.grid > div:nth-child(4) { animation-delay: 240ms; }

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effect for highlights */
.group:hover {
  border-color: #06b6d4;
}

/* Image hover effects */
.relative > div:first-child:hover img {
  transform: scale(1.08);
}

/* Responsive tweaks */
@media (max-width: 1024px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .relative.h-\[360px\] {
    height: 300px;
  }

  .relative > div:first-child {
    flex-direction: column;
    gap: 8px;
  }

  .relative > div:first-child > div:first-child {
    width: 100%;
    height: 250px;
  }

  .relative > div:first-child > div:last-child {
    width: 60%;
    height: 180px;
    margin-left: auto;
    margin-right: 8px;
  }
}

@media (max-width: 768px) {
  .grid-lg\:grid-cols-2 {
    grid-template-columns: 1fr;
  }

  .max-w-2xl {
    margin-left: 0;
    margin-right: 0;
  }

  .grid-cols-4 {
    grid-template-columns: 1fr;
  }

  .flex-col {
    flex-direction: column;
  }

  .gap-4 > * {
    width: 100%;
  }

  .relative.h-\[360px\] {
    height: 280px;
    margin-top: 20px;
  }
}

@media (max-width: 640px) {
  .relative > div:first-child > div:last-child {
    width: 50%;
    height: 160px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * { 
    transition: none !important; 
    animation: none !important; 
  }
  
  .intro-hidden .relative > div:first-child,
  .intro-revealed .relative > div:first-child,
  .highlight-item {
    opacity: 1;
    transform: none;
  }
}
</style>