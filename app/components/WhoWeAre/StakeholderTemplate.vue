
<script setup lang="ts">
import { ref, computed } from 'vue'

interface TeamMember {
  name: string
  photo: string
  title?: string
  role?: string
}

interface Props {
  institution: string
  country: string
  teamMembers: number
  description: string
  team: TeamMember[]
  icon: string
  isEven?: boolean
}

const props = defineProps<Props>()

// Color mapping from PEGISUS design system (blues & greens)
const institutionColors: Record<string, { bg: string; text: string; border: string; bgLight: string; fromTo: string; accent: string }> = {
  indigo: {
    bg: 'bg-indigo-600',
    text: 'text-white',
    border: 'border-indigo-600',
    bgLight: 'bg-indigo-50',
    fromTo: 'from-indigo-500 to-indigo-700',
    accent: 'bg-indigo-600'
  },
  teal: {
    bg: 'bg-teal-600',
    text: 'text-white',
    border: 'border-teal-600',
    bgLight: 'bg-teal-50',
    fromTo: 'from-teal-500 to-teal-700',
    accent: 'bg-teal-600'
  },
  emerald: {
    bg: 'bg-emerald-600',
    text: 'text-white',
    border: 'border-emerald-600',
    bgLight: 'bg-emerald-50',
    fromTo: 'from-emerald-500 to-emerald-700',
    accent: 'bg-emerald-600'
  },
  navy: {
    bg: 'bg-navy-600',
    text: 'text-white',
    border: 'border-navy-600',
    bgLight: 'bg-brand-lightest', // navy-50 not available, use brand-lightest
    fromTo: 'from-navy-500 to-navy-700',
    accent: 'bg-navy-600'
  },
  brand: {
    bg: 'bg-brand-medium',
    text: 'text-white',
    border: 'border-brand-medium',
    bgLight: 'bg-brand-lightest',
    fromTo: 'from-brand-medium to-brand-dark',
    accent: 'bg-brand-medium'
  }
}

// Map institution names to color keys
const institutionColorKey = computed((): string => {
  const name = props.institution.toLowerCase()
  if (name.includes('zambia')) return 'indigo'
  if (name.includes('zimbabwe')) return 'teal'
  if (name.includes('basel') || name.includes('switzerland')) return 'navy'
  if (name.includes('south africa') || name.includes('samrc')) return 'emerald'
  return 'brand' // default fallback
})

// Helper to get color with fallback
const getColor = (key: string): { bg: string; text: string; border: string; bgLight: string; fromTo: string; accent: string } => {
  return institutionColors[key] ?? institutionColors.brand!
}

// Current color value for template
const currentColor = computed(() => getColor(institutionColorKey.value))

// Team member card states
const teamMemberHovered = ref<number | string | null>(null)
</script>

<template>
  <div
    :class="[
      'stakeholder-section border border-gray-200',
      isEven ? 'bg-gray-50' : 'bg-white'
    ]"
  >
    <div class="p-6 md:p-10 lg:p-12">
      <!-- Header Section -->
      <div class="mb-10">
        <div class="flex items-center gap-5">
          <div 
            class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-md"
            :class="currentColor.bg"
          >
            <UIcon :name="icon" class="w-8 h-8 md:w-10 md:h-10 text-white" />
          </div>
          <div>
            <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-poppins">{{ institution }}</h3>
            <div class="flex items-center gap-2 mt-2">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-gray-500" />
              <span class="text-base text-gray-600 font-inter">{{ country }}</span>
            </div>
          </div>
        </div>
        <div class="h-1.5 w-24 mt-5" :class="currentColor.bg"></div>
      </div>

      <!-- Team Members Section Header -->
      <div class="mb-8 pb-6 border-b border-gray-200">
        <h4 class="text-xl md:text-2xl font-bold text-gray-900 font-poppins">Team Members</h4>
        <p class="text-base text-gray-600 font-inter mt-2">Key contributors from {{ institution }}</p>
      </div>

      <!-- Enhanced Team Grid - Larger Images -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <div 
          v-for="(person, index) in team" 
          :key="person.name"
          class="group relative transition-all duration-300"
          @mouseenter="teamMemberHovered = index"
          @mouseleave="teamMemberHovered = null"
          :aria-label="`Team member: ${person.name}, ${person.title}`"
        >
          <!-- Main card with larger image -->
          <div 
            class="relative bg-white border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col"
            :class="teamMemberHovered === index ? '-translate-y-2' : ''"
          >
            <!-- Top colored accent bar -->
            <div 
              class="h-2 w-full transition-all duration-500"
              :class="[
                currentColor.bg,
                teamMemberHovered === index ? 'w-full' : 'w-1/2'
              ]"
            ></div>
            
            <!-- Large Photo Container - 4:5 aspect ratio -->
            <div class="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
              <!-- Fallback for missing images -->
              <div 
                v-if="!person.photo"
                class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
              >
                <UIcon name="i-heroicons-user" class="w-16 h-16 text-gray-400" />
              </div>
              
              <!-- Actual image with zoom effect -->
              <NuxtImg
                v-if="person.photo"
                :src="person.photo"
                :alt="person.name"
                class="w-full h-full object-cover transition-transform duration-700"
                :class="teamMemberHovered === index ? 'scale-125' : 'scale-110'"
                loading="lazy"
                format="webp"
                quality="90"
              />
              
              <!-- Gradient overlay on hover -->
              <div 
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              
              <!-- Name overlay on hover -->
              <div 
                class="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              >
                <div class="text-white font-poppins font-bold text-lg">{{ person.name }}</div>
                <div v-if="person.title" class="text-white/80 text-sm font-inter">{{ person.title }}</div>
              </div>
            </div>
            
            <!-- Info Section - Below image -->
            <div class="p-4 md:p-5 flex flex-col flex-1 bg-white">
              <div class="font-bold text-gray-900 text-base md:text-lg font-poppins leading-tight">
                {{ person.name }}
              </div>
              
              <div v-if="person.title" class="text-sm text-gray-600 font-inter mt-2 flex-1">
                {{ person.title }}
              </div>
              
              <!-- Decorative element -->
              <div 
                class="h-0.5 w-8 mt-3 transition-all duration-300"
                :class="[
                  currentColor.bg,
                  teamMemberHovered === index ? 'w-full' : 'w-8'
                ]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
button:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid #004887;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
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
  
  .group:hover {
    transform: none !important;
  }
  
  .group-hover\:translate-y-0 {
    transform: translateY(0) !important;
  }
  
  .group-hover\:scale-125 {
    transform: scale(1) !important;
  }
  
  .group-hover\:opacity-100 {
    opacity: 0 !important;
  }
}

/* Print styles */
@media print {
  .stakeholder-section {
    break-inside: avoid;
    border: 1px solid #e5e7eb !important;
  }
  
  .bg-indigo-600,
  .bg-teal-600,
  .bg-emerald-600,
  .bg-navy-600,
  .bg-brand-medium {
    background-color: #f8fafc !important;
    -webkit-print-color-adjust: exact;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .aspect-\[4\/5\] {
    aspect-ratio: 1 / 1;
  }
}

@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .text-4xl {
    font-size: 1.75rem;
  }
  
  .text-3xl {
    font-size: 1.5rem;
  }
  
  .text-2xl {
    font-size: 1.25rem;
  }
}

/* Image loading fallback */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.bg-gradient-to-t {
  background-image: linear-gradient(to top, var(--tw-gradient-stops));
}
</style>