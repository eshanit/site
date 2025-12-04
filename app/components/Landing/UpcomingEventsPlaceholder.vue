<script setup lang="ts">

const upcomingEvents = [
  {
    title: 'Community Outreach Program',
    description: 'Monthly community engagement and awareness campaigns',
    status: 'Ongoing',
    color: 'bg-green-100 text-green-800'
  },
  {
    title: 'Youth Mentorship Sessions',
    description: 'Weekly one-on-one mentorship and guidance',
    status: 'Every Friday',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    title: 'Next Major Workshop',
    description: 'Planning phase - dates to be announced soon',
    status: 'Coming Soon',
    color: 'bg-cyan-100 text-cyan-800' // Changed from purple to cyan
  }
];
</script>

<template>
  <div class="py-20 px-10 bg-gradient-to-br from-gray-50 to-blue-50">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Icon -->
      <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-blue-900 rounded-full flex items-center justify-center">
        <UIcon name="i-heroicons-outline-calendar" class="w-12 h-12 text-white" />
      </div>

      <!-- Heading -->
      <h2 class="text-4xl font-bold text-gray-900 mb-4">
        Stay Tuned for Upcoming Events
      </h2>
      
      <p class="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        We're currently planning our next exciting workshops and events. 
        Be the first to know when we announce new dates and programs!
      </p>

      <!-- Upcoming Activities -->
      <!-- <div class="grid md:grid-cols-3 gap-6 mb-12">
        <div 
          v-for="(event, index) in upcomingEvents" 
          :key="index"
          class="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-left"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ event.title }}</h3>
            <span 
              :class="['px-3 py-1 rounded-full text-xs font-medium', event.color]"
            >
              {{ event.status }}
            </span>
          </div>
          <p class="text-gray-600 text-sm">{{ event.description }}</p>
        </div>
      </div> -->

      <!-- Call to Action -->
      <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Never Miss an Event</h3>
        <p class="text-gray-600 mb-6">
          Subscribe to our newsletter and be the first to know about upcoming workshops, 
          training sessions, and community events.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <UIcon name="i-heroicons-outline-bell" class="w-5 h-5 mr-2" />
            Subscribe to Updates
          </button>
          
          <button
            class="px-6 py-3 border-2 border-cyan-500 text-cyan-500 font-semibold rounded-lg hover:bg-cyan-50 transition-all duration-300 flex items-center justify-center"
          >
            <UIcon name="i-heroicons-outline-envelope" class="w-5 h-5 mr-2" />
            Contact Organizers
          </button>
        </div>
      </div>
    </div>
  </div>
</template>