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

const institutionColors = {
  bg: 'bg-gradient-to-r from-cyan-500 to-blue-900',
  text: 'text-white'
}

// Team member card states
const teamMemberHovered = ref<number | string | null>(null)

// Gradient colors for team cards
const teamGradients = [
  'from-cyan-500 to-blue-900',
  'from-cyan-500 to-blue-700',
  'from-blue-700 to-cyan-500',
  'from-cyan-500 to-emerald-600'
]

const getTeamGradient = (index: number) => {
  return `bg-gradient-to-br ${teamGradients[index % teamGradients.length]}`
}
</script>

<template>
  <div
    :class="[
      'stakeholder-section border border-gray-200 p-6 md:p-8',
      isEven ? 'bg-gray-50' : 'bg-white'
    ]"
  >
    <div class="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      <!-- Left Column: Institution Info -->
      <div class="lg:w-2/5 space-y-6">
        <!-- Institution Header -->
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <div 
              class="w-14 h-14 flex items-center justify-center border border-gray-300 shadow-sm"
              :class="institutionColors.bg"
            >
              <UIcon :name="icon" class="w-7 h-7" :class="institutionColors.text" />
            </div>
            <div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900">{{ institution }}</h3>
              <div class="flex items-center gap-2 mt-1">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-gray-500" />
                <span class="text-sm text-gray-600">{{ country }}</span>
              </div>
            </div>
          </div>
          
          <div class="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-900"></div>
        </div>
        
        <!-- Team Stats Card -->
        <div class="group relative transform transition-all duration-500 hover:scale-105">
          <!-- Animated background gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          
          <!-- Main card -->
          <div class="relative bg-white backdrop-blur-sm border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 p-6 overflow-hidden"
               :class="teamMemberHovered === 'stats' ? 'border-cyan-300' : ''">
            
            <!-- Background glow -->
            <div class="absolute top-0 right-0 -mr-10 -mt-10 w-24 h-24 rounded-full opacity-5 transition-all duration-500 bg-gradient-to-br from-cyan-500 to-blue-900"></div>
            
            <!-- Icon and content -->
            <div class="relative z-10">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 flex items-center justify-center transition-all duration-500 text-white bg-gradient-to-br from-cyan-500 to-blue-900">
                  <UIcon name="i-heroicons-user-group" class="w-6 h-6" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-700">Team Members</div>
                  <div class="text-2xl md:text-3xl font-bold text-gray-900 transition-all duration-300"
                       :class="teamMemberHovered === 'stats' ? 'text-cyan-700' : ''">
                    {{ teamMembers }}
                  </div>
                </div>
              </div>
              
              <!-- Accent line -->
              <div class="h-1 w-8 bg-gradient-to-r from-cyan-500 to-blue-900"></div>
            </div>
            
            <!-- Hover indicator -->
            <div class="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-cyan-500 to-blue-900"></div>
          </div>
        </div>
        
        <!-- Institutional Role Card -->
        <div class="group relative transform transition-all duration-500 hover:scale-105"
             @mouseenter="teamMemberHovered = 'role'"
             @mouseleave="teamMemberHovered = null">
          <!-- Animated background gradient -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
          
          <!-- Main card -->
          <div class="relative bg-white backdrop-blur-sm border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 p-6 overflow-hidden"
               :class="teamMemberHovered === 'role' ? 'border-cyan-300' : ''">
            
            <!-- Background glow -->
            <div class="absolute top-0 right-0 -mr-10 -mt-10 w-24 h-24 rounded-full opacity-5 transition-all duration-500 bg-gradient-to-br from-blue-500 to-cyan-600"></div>
            
            <!-- Icon and content -->
            <div class="relative z-10">
              <div class="flex items-start gap-3 mb-3">
                <div class="w-10 h-10 flex items-center justify-center transition-all duration-500 text-white bg-gradient-to-br from-blue-500 to-cyan-600 flex-shrink-0 mt-1">
                  <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-900 text-sm mb-2 transition-colors duration-300"
                      :class="teamMemberHovered === 'role' ? 'text-cyan-700' : ''">
                    Institutional Role
                  </h4>
                  <p class="text-sm text-gray-700 leading-relaxed">
                    {{ description }}
                  </p>
                </div>
              </div>
              
              <!-- Accent line -->
              <div class="h-0.5 w-6 bg-gradient-to-r from-blue-500 to-cyan-600 mt-3"></div>
            </div>
            
            <!-- Hover indicator -->
            <div class="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500 to-cyan-600"></div>
          </div>
        </div>

        <!-- Key Contribution -->
        <div class="border-t border-gray-200 pt-4">
          <h4 class="font-bold text-gray-900 mb-3 text-sm">Key Contribution</h4>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-cyan-500"></div>
              <span class="text-sm text-gray-700">Expertise in youth development</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-600"></div>
              <span class="text-sm text-gray-700">Local implementation support</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-cyan-600"></div>
              <span class="text-sm text-gray-700">Research and evaluation</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Team Photos -->
      <div class="lg:w-3/5">
        <!-- Team Header -->
        <div class="mb-6 pb-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-lg font-bold text-gray-900">Team Members</h4>
              <p class="text-sm text-gray-600 mt-1">Key contributors from {{ institution }}</p>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-700">Active Since</div>
              <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">
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
            class="group relative h-full transform transition-all duration-500 hover:scale-105"
            @mouseenter="teamMemberHovered = index"
            @mouseleave="teamMemberHovered = null"
          >
            <!-- Animated background gradient -->
            <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                 :class="`${teamGradients[index % teamGradients.length]}`"></div>
            
            <!-- Main card -->
            <div class="relative bg-white backdrop-blur-sm border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 p-4 overflow-hidden h-full flex flex-col"
                 :class="teamMemberHovered === index ? 'border-cyan-300' : ''">
              
              <!-- Background icon glow -->
              <div class="absolute top-0 right-0 -mr-8 -mt-8 w-20 h-20 rounded-full opacity-5 transition-all duration-500"
                   :class="`bg-gradient-to-br ${teamGradients[index % teamGradients.length]}`"></div>
              
              <!-- Photo Container -->
              <div class="relative mb-4 overflow-hidden aspect-square bg-gray-100">
                <NuxtImg
                  :src="person.photo"
                  :alt="person.name"
                  class="w-full h-full object-cover transform transition-transform duration-500"
                  :class="teamMemberHovered === index ? 'scale-110' : 'scale-100'"
                  loading="lazy"
                  format="webp"
                  quality="85"
                />
                
                <!-- Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t opacity-0 transition-opacity duration-500"
                     :class="teamMemberHovered === index ? `from-black/60 via-black/20 to-transparent opacity-100` : 'from-transparent'"></div>
                
                <!-- Role Badge on hover -->
                <div v-if="person.role" class="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span class="inline-block px-2 py-1 bg-white text-xs font-bold text-gray-900">
                    {{ person.role }}
                  </span>
                </div>
              </div>
              
              <!-- Info -->
              <div class="relative z-10 flex-1 flex flex-col">
                <div class="font-bold text-gray-900 text-sm leading-tight transition-colors duration-300"
                     :class="teamMemberHovered === index ? 'text-cyan-700' : ''">
                  {{ person.name }}
                </div>
                
                <div v-if="person.title" class="text-xs text-gray-600 mt-2 flex-1">
                  {{ person.title }}
                </div>
              </div>
              
              <!-- Bottom accent line -->
              <div class="mt-3 h-1 w-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                   :class="`bg-gradient-to-r ${teamGradients[index % teamGradients.length]}`"></div>
            </div>
          </div>
        </div>

        <!-- Team Footer -->
        <div class="mt-6 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">
              Contributing to PEGISUS program implementation
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-badge" class="w-4 h-4 text-cyan-600" />
              <span class="text-sm font-medium text-gray-900">Active Partner</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Border -->
    <div class="mt-8 pt-6 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-600">
          Partnership established through SOR4D funding program
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs px-3 py-1 bg-gray-100 text-gray-700 font-medium">Research</span>
          <span class="text-xs px-3 py-1 bg-gray-100 text-gray-700 font-medium">Implementation</span>
          <span class="text-xs px-3 py-1 bg-gray-100 text-gray-700 font-medium">Evaluation</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Remove all border-radius globally */
* {
  border-radius: 0 !important;
}

.team-member-card {
  opacity: 0;
  transform: translateY(10px);
  animation: cardAppear 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes cardAppear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

@media (prefers-reduced-motion: reduce) {
  .team-member-card {
    animation: none;
    opacity: 1;
    transform: none;
  }
  
  * {
    transition: none !important;
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg\:flex-row {
    flex-direction: column;
  }
  
  .lg\:w-2\/5, .lg\:w-3\/5 {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 475px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>