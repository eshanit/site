<script setup lang="ts">
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
        
        <!-- Team Stats -->
        <div class="border border-gray-200 p-4 bg-white">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 flex items-center justify-center">
              <UIcon name="i-heroicons-user-group" class="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <div class="text-sm font-medium text-gray-700">Team Members</div>
              <div class="text-2xl font-bold text-gray-900">{{ teamMembers }}</div>
            </div>
          </div>
        </div>
        
        <!-- Description -->
        <div class="border border-cyan-100 p-4 bg-gradient-to-r from-cyan-50/50 to-blue-50/50">
          <div class="flex items-start gap-3 mb-3">
            <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 class="font-bold text-gray-900 text-sm mb-1">Institutional Role</h4>
              <p class="text-sm text-gray-700 leading-relaxed">
                {{ description }}
              </p>
            </div>
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
            class="team-member-card border border-gray-200 p-4 bg-white shadow-sm hover:shadow transition-all duration-300 hover:border-cyan-200 group"
            :style="`transition-delay: ${index * 30}ms`"
          >
            <!-- Photo Container -->
            <div class="relative mb-3 overflow-hidden bg-gray-50">
              <div class="aspect-square w-full">
                <NuxtImg
                  :src="person.photo"
                  :alt="person.name"
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  format="webp"
                  quality="85"
                />
              </div>
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Corner Badge -->
              <div class="absolute top-2 right-2 bg-white px-2 py-1 shadow">
                <UIcon name="i-heroicons-user" class="w-3 h-3 text-cyan-600" />
              </div>
            </div>
            
            <!-- Info -->
            <div class="text-center space-y-1">
              <div class="font-bold text-gray-900 text-sm group-hover:text-cyan-700 transition-colors duration-200">
                {{ person.name }}
              </div>
              
              <div v-if="person.title" class="text-xs text-gray-600">
                {{ person.title }}
              </div>
              
              <div v-if="person.role" class="text-xs font-medium mt-1">
                <span class="px-2 py-1 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700">
                  {{ person.role }}
                </span>
              </div>
              
              <!-- Bottom accent -->
              <div class="h-0.5 w-6 bg-gradient-to-r from-cyan-500/20 to-blue-900/20 mx-auto mt-2 group-hover:w-12 transition-all duration-300"></div>
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