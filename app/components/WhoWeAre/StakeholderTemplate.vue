
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
  bg: 'bg-gradient-to-br from-cyan-500 to-blue-900',
  text: 'text-white'
}
</script>

<template>
  <div 
    :class="[
      'stakeholder-section rounded-3xl p-6 md:p-8 shadow-xl',
      isEven ? 'bg-gradient-to-r from-white to-gray-50' : 'bg-white'
    ]"
  >
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <!-- Left Column: Institution Info -->
      <div class="md:w-1/3 space-y-4">
        <div class="flex items-center gap-4">
          <div 
            class="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            :class="institutionColors.bg"
          >
            <UIcon :name="icon" class="w-8 h-8" :class="institutionColors.text" />
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-900">{{ institution }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ country }}</p>
          </div>
        </div>
        
        <div class="bg-gray-50 rounded-xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <UIcon name="i-heroicons-user-group" class="w-4 h-4 text-cyan-500" />
            <span class="text-sm font-medium text-gray-700">Team Members</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{{ teamMembers }}</div>
        </div>
        
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100">
          <p class="text-sm text-gray-700">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Right Column: Team Photos -->
      <div class="md:w-2/3">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div 
            v-for="(person, index) in team" 
            :key="person.name"
            class="team-member-card bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1"
            :style="`transition-delay: ${index * 50}ms`"
          >
            <div class="aspect-square w-full rounded-lg overflow-hidden mb-3 bg-gray-100">
              <NuxtImg
                :src="person.photo"
                :alt="person.name"
                class="w-full h-full object-cover"
                loading="lazy"
                placeholder
              />
            </div>
            <div class="text-center">
              <div class="font-semibold text-gray-900 text-sm">{{ person.name }}</div>
              <div v-if="person.title" class="text-xs text-gray-500 mt-1">{{ person.title }}</div>
              <div v-if="person.role" class="text-xs text-cyan-600 font-medium mt-1">{{ person.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
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

@media (prefers-reduced-motion: reduce) {
  .team-member-card {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>