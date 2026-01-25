<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const highlights = [
  { number: '8', label: 'Sessions', description: 'Comprehensive program structure' },
  { number: '16-24', label: 'Age Range', description: 'Targeted youth demographic' },
  { number: '2', label: 'Science-backed Programs', description: 'RAD-PAL & Manhood 2.0 foundation' },
  { number: 'Peer', label: 'Education Model', description: 'Community-driven approach' }
]

// reveal flags
const heroVisible = ref(false)
const highlightsVisible = ref(false)
const animatedHighlights = ref(false)

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
        <div class="grid grid-cols-2 gap-4 mt-8">
          <div class="border border-gray-200 p-4">
            <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
              3
            </div>
            <div class="text-sm font-medium text-gray-900">Countries</div>
            <div class="text-xs text-gray-600">Zambia, Zimbabwe, South Africa</div>
          </div>
          <div class="border border-gray-200 p-4">
            <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
              500+
            </div>
            <div class="text-sm font-medium text-gray-900">Youth Impacted</div>
            <div class="text-xs text-gray-600">Active participants</div>
          </div>
        </div>
      </div>

      <!-- Images with side-by-side layout -->
      <div
        class="relative h-[360px] md:h-[400px]"
        :class="heroVisible ? 'intro-revealed' : 'intro-hidden'"
        aria-hidden="false"
      >
        <!-- Container for both images -->
        <div class="relative w-full h-full flex gap-4">
          <!-- Main image (larger, on left) -->
          <div class="relative flex-1 border-4 border-white shadow-lg overflow-hidden h-full">
            <div class="absolute inset-0">
              <NuxtImg
                src="/img/pegisus_program_1.jpg"
                alt="PEGISUS program session with youth participants engaged in discussion"
                class="w-full h-full object-cover transform transition-transform duration-700"
                :class="heroVisible ? 'scale-105' : 'scale-100'"
                width="450"
                height="350"
                sizes="(max-width: 768px) 50vw, 450px"
                loading="lazy"
                format="webp"
                quality="85"
              />
            </div>
            
            <!-- Overlay gradient for main image -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            
            <!-- Text overlay for main image -->
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <div class="text-white">
                <div class="text-sm font-bold mb-1">Peer-led Sessions</div>
                <div class="text-xs opacity-90">Interactive group discussions</div>
              </div>
            </div>
            
            <!-- Badge for main image -->
            <div class="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-900 text-white px-3 py-1 shadow">
              <span class="text-xs font-bold">Program Session</span>
            </div>
          </div>

          <!-- Secondary image (smaller, on right) -->
          <div class="relative w-1/3 flex-none border-4 border-white shadow-lg overflow-hidden self-end mb-8 h-full">
            <div class="absolute inset-0">
              <NuxtImg
                src="/img/pegisus_program_2.jpg"
                alt="Youth participating in hands-on group activity"
                class="w-full h-full object-cover transform transition-transform duration-700"
                :class="heroVisible ? 'scale-105' : 'scale-100'"
                width="200"
                height="280"
                sizes="(max-width: 768px) 30vw, 200px"
                loading="lazy"
                format="webp"
                quality="85"
              />
            </div>
            
            <!-- Overlay for secondary image -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            
            <!-- Label for secondary image -->
            <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <div class="text-white text-xs font-bold">Group Activity</div>
            </div>
            
            <!-- Corner accent for secondary image -->
            <div class="absolute top-0 right-0 bg-white px-2 py-1">
              <UIcon name="i-heroicons-users" class="w-3 h-3 text-cyan-600" />
            </div>
          </div>
        </div>

        <!-- Background accent line -->
        <div class="absolute -bottom-4 -right-4 w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 transform -rotate-45"></div>
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
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="(h, i) in highlights"
          :key="i"
          class="highlight-item border border-gray-200 p-6 text-center relative overflow-hidden bg-white shadow-sm hover:shadow transition-all duration-300 group"
          :class="{
            'revealed': highlightsVisible,
            'animate-visible': animatedHighlights
          }"
          :style="`transition-delay: ${i * 80}ms`"
        >
          <!-- Top accent bar -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/20 to-blue-900/20 group-hover:from-cyan-500 group-hover:to-blue-900 transition-all duration-300"></div>
          
          <div class="z-10 relative">
            <!-- Number/Text display -->
            <div class="mb-4">
              <div class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent mb-2">
                {{ h.number }}
              </div>
              <div class="h-0.5 w-8 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto mb-3"></div>
            </div>
            
            <div class="text-lg font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors duration-300">
              {{ h.label }}
            </div>
            <div class="text-sm text-gray-600 leading-relaxed">
              {{ h.description }}
            </div>
          </div>
          
          <!-- Bottom accent -->
          <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-900/10"></div>
          
          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-900/0 group-hover:from-cyan-500/5 group-hover:to-blue-900/5 transition-all duration-300 pointer-events-none"></div>
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
.intro-hidden .relative > div:first-child {
  opacity: 0;
  transform: translateX(20px);
}

.intro-hidden .relative > div:first-child > div:first-child {
  opacity: 0;
  transform: translateX(30px);
}

.intro-hidden .relative > div:first-child > div:last-child {
  opacity: 0;
  transform: translateX(40px);
}

.intro-revealed .relative > div:first-child {
  opacity: 1;
  transform: translateX(0);
}

.intro-revealed .relative > div:first-child > div:first-child {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 100ms;
}

.intro-revealed .relative > div:first-child > div:last-child {
  opacity: 1;
  transform: translateX(0);
  transition-delay: 200ms;
}

/* Highlights animation */
.highlight-item {
  transition: transform .48s cubic-bezier(.2,.9,.3,1), opacity .38s, box-shadow .28s, border-color .28s;
  transform-origin: center;
  opacity: 0;
  transform: translateY(18px);
}

.highlight-item.revealed { 
  opacity: 1; 
  transform: translateY(12px); 
}

.highlight-item.animate-visible { 
  transform: translateY(0); 
}

/* Hover effect for highlights */
.highlight-item:hover {
  border-color: #06b6d4;
  box-shadow: 0 6px 16px rgba(6, 182, 212, 0.12);
}

/* Image hover effects */
.relative > div:first-child > div:first-child:hover img,
.relative > div:first-child > div:last-child:hover img {
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