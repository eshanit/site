<script setup lang="ts">
import { ref } from 'vue'

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

defineProps<Props>()

// Color mapping from design system
const institutionColors = {
  blue: {
    bg: 'bg-blue-600',
    text: 'text-white',
    border: 'border-blue-600',
    bgLight: 'bg-blue-50',
    fromTo: 'from-blue-500 to-blue-700'
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-white',
    border: 'border-orange-500',
    bgLight: 'bg-orange-50',
    fromTo: 'from-orange-400 to-orange-600'
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-white',
    border: 'border-green-500',
    bgLight: 'bg-green-50',
    fromTo: 'from-green-400 to-green-600'
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-white',
    border: 'border-purple-500',
    bgLight: 'bg-purple-50',
    fromTo: 'from-purple-400 to-purple-600'
  }
}

// Assign colors based on institution index or specific logic
const getInstitutionColor = (index: number) => {
  const colors: Array<keyof typeof institutionColors> = ['blue', 'orange', 'green', 'purple']
  return colors[index % colors.length]
}

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
    <div class="p-6 md:p-8 lg:p-10">
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <!-- Left Column: Institution Info -->
        <div class="lg:col-span-5 space-y-6">
          <!-- Institution Header -->
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div 
                class="w-14 h-14 flex items-center justify-center border border-gray-300 shadow-sm"
                :class="institutionColors[getInstitutionColor(0)].bg"
              >
                <UIcon :name="icon" class="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">{{ institution }}</h3>
                <div class="flex items-center gap-2 mt-1">
                  <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-gray-500" />
                  <span class="text-sm text-gray-600 font-inter">{{ country }}</span>
                </div>
              </div>
            </div>
            
            <div class="h-1 w-12" :class="institutionColors[getInstitutionColor(0)].bg"></div>
          </div>
          
          <!-- Team Stats Card -->
          <div class="group relative transition-all duration-300">
            <!-- Main card -->
            <div class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-6 overflow-hidden"
                 :class="teamMemberHovered === 'stats' ? 'shadow-lg -translate-y-1' : ''">
              
              <!-- Top accent -->
              <div class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                   :class="[
                     institutionColors[getInstitutionColor(0)].bg,
                     teamMemberHovered === 'stats' ? 'w-full' : 'w-12'
                   ]"></div>
              
              <!-- Icon and content -->
              <div class="relative">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-12 h-12 flex items-center justify-center transition-all duration-300 text-white"
                       :class="institutionColors[getInstitutionColor(0)].bg">
                    <UIcon name="i-heroicons-user-group" class="w-6 h-6" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-700 font-inter">Team Members</div>
                    <div class="text-2xl md:text-3xl font-bold text-gray-900 font-poppins transition-colors duration-300"
                         :class="teamMemberHovered === 'stats' ? institutionColors[getInstitutionColor(0)].text.replace('text-white', 'text-blue-600') : ''">
                      {{ teamMembers }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Institutional Role Card -->
          <div class="group relative transition-all duration-300"
               @mouseenter="teamMemberHovered = 'role'"
               @mouseleave="teamMemberHovered = null">
            <!-- Main card -->
            <div class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-6 overflow-hidden"
                 :class="teamMemberHovered === 'role' ? 'shadow-lg -translate-y-1' : ''">
              
              <!-- Top accent -->
              <div class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                   :class="[
                     institutionColors[getInstitutionColor(1)].bg,
                     teamMemberHovered === 'role' ? 'w-full' : 'w-12'
                   ]"></div>
              
              <!-- Icon and content -->
              <div class="relative">
                <div class="flex items-start gap-3 mb-3">
                  <div class="w-10 h-10 flex items-center justify-center transition-all duration-300 text-white flex-shrink-0 mt-1"
                       :class="institutionColors[getInstitutionColor(1)].bg">
                    <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 text-sm mb-2 font-poppins transition-colors duration-300"
                        :class="teamMemberHovered === 'role' ? institutionColors[getInstitutionColor(1)].text.replace('text-white', 'text-orange-600') : ''">
                      Institutional Role
                    </h4>
                    <p class="text-sm text-gray-700 leading-relaxed font-inter">
                      {{ description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Contribution -->
          <div class="border-t border-gray-200 pt-4">
            <h4 class="font-bold text-gray-900 mb-3 text-sm font-poppins">Key Contributions</h4>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2" :class="institutionColors[getInstitutionColor(0)].bg"></div>
                <span class="text-sm text-gray-700 font-inter">Expertise in youth development</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2" :class="institutionColors[getInstitutionColor(1)].bg"></div>
                <span class="text-sm text-gray-700 font-inter">Local implementation support</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2" :class="institutionColors[getInstitutionColor(2)].bg"></div>
                <span class="text-sm text-gray-700 font-inter">Research and evaluation</span>
              </div>
            </div>
          </div>

          <!-- Partnership Details -->
          <div class="mt-6 p-4 border-l-4"
               :class="institutionColors[getInstitutionColor(0)].border + ' ' + institutionColors[getInstitutionColor(0)].bgLight">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-handshake" class="w-5 h-5 mt-0.5 flex-shrink-0"
                     :class="institutionColors[getInstitutionColor(0)].text.replace('text-white', 'text-blue-600')" />
              <div>
                <h5 class="font-bold text-sm font-poppins mb-1"
                    :class="institutionColors[getInstitutionColor(0)].text.replace('text-white', 'text-blue-600')">
                  Partnership Status
                </h5>
                <p class="text-xs text-gray-700 font-inter">
                  Active partner since 2023 • Contributing to program implementation and evaluation
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Team Photos -->
        <div class="lg:col-span-7">
          <!-- Team Header -->
          <div class="mb-6 pb-4 border-b border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 class="text-lg font-bold text-gray-900 font-poppins">Team Members</h4>
                <p class="text-sm text-gray-600 font-inter mt-1">Key contributors from {{ institution }}</p>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-700 font-inter">Active Since</div>
                <div class="text-lg font-bold text-blue-600 font-poppins">
                  2023
                </div>
              </div>
            </div>
          </div>

          <!-- Team Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div 
              v-for="(person, index) in team" 
              :key="person.name"
              class="group relative transition-all duration-300"
              @mouseenter="teamMemberHovered = index"
              @mouseleave="teamMemberHovered = null"
              :aria-label="`Team member: ${person.name}, ${person.title}`"
            >
              <!-- Main card -->
              <div class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-3 overflow-hidden h-full flex flex-col"
                   :class="teamMemberHovered === index ? 'shadow-lg -translate-y-1' : ''">
                
                <!-- Top accent -->
                <div class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                     :class="[
                       institutionColors[getInstitutionColor(index % 4)].bg,
                       teamMemberHovered === index ? 'w-full' : 'w-0'
                     ]"></div>
                
                <!-- Photo Container -->
                <div class="relative mb-3 overflow-hidden aspect-square bg-gray-100">
                  <!-- Fallback for missing images -->
                  <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <UIcon name="i-heroicons-user" class="w-12 h-12 text-gray-400" />
                  </div>
                  
                  <!-- Optional: Actual image if available -->
                  <NuxtImg
                    v-if="true"
                    :src="person.photo"
                    :alt="person.name"
                    class="w-full h-full object-cover transform transition-transform duration-500"
                    :class="teamMemberHovered === index ? 'scale-110' : 'scale-100'"
                    loading="lazy"
                    format="webp"
                    quality="85"
                  />
                </div>
                
                <!-- Info -->
                <div class="relative flex-1 flex flex-col">
                  <div class="font-bold text-gray-900 text-sm leading-tight font-poppins transition-colors duration-300"
                       :class="teamMemberHovered === index ? institutionColors[getInstitutionColor(index % 4)].text.replace('text-white', 'text-' + getInstitutionColor(index % 4) + '-600') : ''">
                    {{ person.name }}
                  </div>
                  
                  <div v-if="person.title" class="text-xs text-gray-600 font-inter mt-1 flex-1">
                    {{ person.title }}
                  </div>
                  
                  <!-- Role badge -->
                  <!-- <div v-if="person.role" class="mt-2">
                    <span class="inline-block px-2 py-1 text-xs font-medium border"
                          :class="institutionColors[getInstitutionColor(index % 4)].bgLight + ' ' + institutionColors[getInstitutionColor(index % 4)].text.replace('text-white', 'text-' + getInstitutionColor(index % 4) + '-600') + ' ' + institutionColors[getInstitutionColor(index % 4)].border">
                      {{ person.role }}
                    </span>
                  </div> -->
                </div>
              </div>
            </div>
          </div>

          <!-- Team Footer -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="text-sm text-gray-600 font-inter">
                Contributing to PEGISUS program implementation and research
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-check-badge" class="w-4 h-4 text-green-600" />
                <span class="text-sm font-medium text-gray-900 font-poppins">Verified Partner</span>
              </div>
            </div>
          </div>

          <!-- Partner Categories -->
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium font-inter border border-gray-200">
              Research Partner
            </span>
            <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium font-inter border border-gray-200">
              Implementation
            </span>
            <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium font-inter border border-gray-200">
              Evaluation
            </span>
            <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium font-inter border border-gray-200">
              Capacity Building
            </span>
          </div>
        </div>
      </div>

      <!-- Bottom Border -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="text-sm text-gray-600 font-inter">
            Partnership established through SOR4D funding program
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs px-3 py-1 bg-blue-50 text-blue-700 font-medium font-inter border border-blue-200">
              Research Partner
            </span>
            <span class="text-xs px-3 py-1 bg-orange-50 text-orange-700 font-medium font-inter border border-orange-200">
              Implementation
            </span>
            <span class="text-xs px-3 py-1 bg-green-50 text-green-700 font-medium font-inter border border-green-200">
              Evaluation
            </span>
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
button:focus {
  outline: 2px solid #1E3A8A;
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
}

/* Print styles */
@media print {
  .stakeholder-section {
    break-inside: avoid;
    border: 1px solid #e5e7eb !important;
  }
  
  .bg-blue-600,
  .bg-orange-500,
  .bg-green-500,
  .bg-purple-500 {
    background-color: #f8fafc !important;
    -webkit-print-color-adjust: exact;
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg\:col-span-5,
  .lg\:col-span-7 {
    grid-column: span 12;
  }
}

@media (max-width: 768px) {
  .grid-cols-4,
  .grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .text-3xl {
    font-size: 1.75rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
}

/* Image loading fallback */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}
</style>