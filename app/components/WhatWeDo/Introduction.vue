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
  const unwatch = useIntersectionObserver(() => document.querySelector('#intro-highlights'),
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          highlightsVisible.value = true
          // stagger appearance
          setTimeout(() => (animatedHighlights.value = true), 120)
          unwatch?.()
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
  )

  useIntersectionObserver(
    () => document.querySelector('#intro-hero'),
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
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <!-- Text -->
      <div class="max-w-2xl mx-auto lg:mx-0">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 leading-tight">
          <span class="relative inline-block">
            Peer Education for Gender Inclusion
            <span class="underline-accent" aria-hidden="true"></span>
          </span>
          <span class="block mt-4">and Substance Use in Southern Africa</span>
        </h2>

        <p class="text-lg md:text-xl leading-relaxed text-gray-700">
          PEGISUS represents a groundbreaking approach to youth development, combining substance use prevention
          with gender equity education through peer-led, community-embedded programming.
        </p>
      </div>

      <!-- Images: simplified overlap with CSS polka dots via pseudo-elements -->
      <div
        class="relative rounded-3xl min-h-[340px] md:min-h-[420px] overflow-visible"
        :class="heroVisible ? 'intro-revealed' : 'intro-hidden'"
        aria-hidden="false"
      >
        <div class="image-stack" role="img" aria-label="Photos from PEGISUS program">
          <!-- Primary image (front) - moved even further down -->
          <div class="image-card image-front">
            <NuxtImg
              src="/img/pegisus_program_1.jpg"
              alt="PEGISUS session"
              class="card-img"
              width="420"
              height="315"
              sizes="(max-width: 1024px) 60vw, 420px"
              loading="lazy"
              priority="false"
              placeholder="blur"
            />
          </div>

          <!-- Secondary image (back) - moved even further left, same size -->
          <div class="image-card image-back">
            <NuxtImg
              src="/img/pegisus_program_2.jpg"
              alt="Peer group activity"
              class="card-img"
              width="420" 
              height="315" 
              sizes="(max-width: 1024px) 60vw, 420px"
              loading="lazy"
              priority="false"
              placeholder="blur"
            />
          </div>

          <!-- soft glow center -->
          <div class="center-glow" aria-hidden="true"></div>
        </div>
      </div>
    </div>

    <!-- Highlights -->
    <div id="intro-highlights" class="mt-16 md:mt-20">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="(h, i) in highlights"
          :key="i"
          class="highlight-item rounded-2xl p-6 text-center relative overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50"
          :class="{
            'revealed': highlightsVisible,
            'animate-visible': animatedHighlights
          }"
          :style="`transition-delay: ${i * 80}ms`"
        >
          <div class="z-10 relative">
            <div class="number-badge mb-3">
              <span class="number-text">{{ h.number }}</span>
            </div>
            <div class="text-lg font-semibold text-gray-900 mb-1">{{ h.label }}</div>
            <div class="text-sm text-gray-600">{{ h.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Core transitions */
* {
  transition: background-color .28s cubic-bezier(.4,0,.2,1),
              color .28s cubic-bezier(.4,0,.2,1),
              transform .32s cubic-bezier(.4,0,.2,1),
              opacity .28s cubic-bezier(.4,0,.2,1);
}

/* Underline accent */
.underline-accent {
  display: block;
  position: absolute;
  left: 0;
  bottom: -6px;
  height: 6px;
  width: 5.5rem;
  border-radius: 9999px;
  background: linear-gradient(90deg, #06b6d4, #8b5cf6);
  opacity: 0.95;
}

/* Image stack container */
.image-stack {
  --card-radius: 18px;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

/* Cards share base styles - BOTH SAME SIZE NOW */
.image-card {
  position: absolute;
  border-radius: var(--card-radius);
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(20, 23, 27, 0.12);
  transform-origin: center;
  background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4));
  width: clamp(240px, 48%, 420px); /* Same width for both */
  height: auto;
}

/* front image - moved EVEN further down */
.image-front {
  z-index: 30;
  /* Changed: Keep right but move EVEN further down */
  transform: translate(30%, 35%) rotate(2deg) scale(1.02);
  transition: transform .6s cubic-bezier(.2,.9,.3,1), box-shadow .4s, opacity .4s;
}

/* back image - moved EVEN further left, same size */
.image-back {
  z-index: 20;
  /* Changed: Even more left (more negative X) */
  transform: translate(-55%, -15%) rotate(-2deg) scale(0.98); /* Changed scale to 0.98 (was 0.96) */
}

/* image element fills card */
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* center soft glow */
.center-glow {
  position: absolute;
  z-index: 10;
  width: 14rem;
  height: 14rem;
  border-radius: 9999px;
  background: radial-gradient(circle at 30% 30%, rgba(6,182,212,0.10), transparent 35%),
              radial-gradient(circle at 70% 70%, rgba(139,92,246,0.08), transparent 30%);
  filter: blur(18px);
  pointer-events: none;
  transform: translateY(6%);
}

/* Reveal states (controlled by heroVisible) */
/* Hidden: start positions (closer to center) */
.intro-hidden .image-front { 
  transform: translate(15%, 15%) rotate(2deg) scale(0.98); 
  opacity: 0; 
}
.intro-hidden .image-back { 
  transform: translate(-30%, -8%) rotate(-2deg) scale(0.96); 
  opacity: 0; 
}

/* Revealed: final positions (EVEN MORE separated) */
.intro-revealed .image-front { 
  transform: translate(30%, 35%) rotate(0.6deg) scale(1); 
  opacity: 1; 
}
.intro-revealed .image-back { 
  transform: translate(-55%, -15%) rotate(-1.5deg) scale(0.98); 
  opacity: 1; 
}

/* Polka dots via pseudo elements on the image container to reduce DOM */
#intro-hero > .max-w-7xl > .relative::before,
#intro-hero > .max-w-7xl > .relative::after {
  content: "";
  position: absolute;
  z-index: 5;
  width: 48%;
  height: 48%;
  border-radius: 1rem;
  pointer-events: none;
  opacity: 0.28;
  background-size: 24px 24px;
}

/* cyan polka on top-right */
#intro-hero > .max-w-7xl > .relative::before {
  top: 0;
  right: 0;
  background-image: radial-gradient(#06b6d4 2.5px, transparent 2.5px);
  background-position: 0 0;
  transform: translate(6%, -6%);
}

/* purple polka on bottom-left */
#intro-hero > .max-w-7xl > .relative::after {
  bottom: 0;
  left: 0;
  background-image: radial-gradient(#8b5cf6 2.5px, transparent 2.5px);
  background-position: 0 0;
  transform: translate(-6%, 6%);
}

/* Highlights grid */
.highlight-item {
  transition: transform .48s cubic-bezier(.2,.9,.3,1), opacity .38s, box-shadow .28s;
  transform-origin: center;
  opacity: 0;
  transform: translateY(18px) scale(.995);
}
.highlight-item.revealed { opacity: 1; transform: translateY(12px) scale(1); }
.highlight-item.animate-visible { transform: translateY(0) scale(1); }

/* number badge with subtle gradient */
.number-badge {
  width: 72px;
  height: 72px;
  margin: 0 auto 8px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba(6,182,212,0.12), rgba(139,92,246,0.12));
  box-shadow: inset 0 -6px 14px rgba(0,0,0,0.03);
}
.number-text {
  font-weight: 800;
  font-size: 1.35rem;
  background: linear-gradient(90deg, #06b6d4, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Responsive tweaks */
@media (max-width: 1024px) {
  .center-glow { 
    width: 11rem; 
    height: 11rem; 
    filter: blur(14px); 
  }
  
  /* Adjust for smaller screens - less extreme movement but same size */
  .image-card {
    width: clamp(240px, 50%, 420px); /* Same size on mobile */
  }
  
  .image-front { 
    transform: translate(15%, 20%) rotate(2deg) scale(1); 
  }
  .image-back { 
    transform: translate(-30%, -10%) rotate(-1.5deg) scale(0.98); 
  }
  
  .intro-hidden .image-front { 
    transform: translate(8%, 10%) rotate(2deg) scale(0.98); 
  }
  .intro-hidden .image-back { 
    transform: translate(-15%, -5%) rotate(-1.5deg) scale(0.96); 
  }
  
  .intro-revealed .image-front { 
    transform: translate(15%, 20%) rotate(0.6deg) scale(1); 
  }
  .intro-revealed .image-back { 
    transform: translate(-30%, -10%) rotate(-1.2deg) scale(0.98); 
  }

  #intro-hero > .max-w-7xl > .relative::before,
  #intro-hero > .max-w-7xl > .relative::after { 
    display: none; 
  }
}

@media (prefers-reduced-motion: reduce) {
  * { 
    transition: none !important; 
    animation: none !important; 
  }
}
</style>