<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Define props for the component
const props = withDefaults(defineProps<{
  details?: {
    title: string;
    date: string; // Should be a valid date string like 'Sat, 20th July 2024'
    mc_image: string;
    mc_name: string;
    mc_title: string;
    mc_company: string;
  };
}>(), {
  details: () => ({
    title: 'Youth Against Substance Abuse Workshop',
    date: 'Sat, 20th July 2024',
    mc_image: '/img/linkedIn.webp',
    mc_name: 'John Doe',
    mc_title: 'Certified Counselor',
    mc_company: 'Helping Hands Org',
  })
});

const targetDate = new Date(props.details.date);
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

const updateCountdown = () => {
  const now = new Date();
  const timeRemaining = targetDate.getTime() - now.getTime();
  
  if (timeRemaining <= 0) {
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    return;
  }
  
  days.value = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((timeRemaining % (1000 * 60)) / 1000);
};

onMounted(() => {
  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
  onUnmounted(() => clearInterval(timer));
});
</script>

<template>
  <div class="py-20 px-10 bg-gradient-to-br from-cyan-50 to-blue-50">
    <div class="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-12 items-center">
      <!-- Workshop info -->
      <div class="space-y-6 relative z-10">
        <!-- Floating stickers -->
        <div class="absolute -top-10 -left-8 z-0">
          <div class="relative w-32 h-32">
            <div class="absolute w-full h-full bg-cyan-500 rounded-full opacity-20 animate-ping"></div>
            <div class="absolute w-full h-full bg-blue-500 opacity-10 rounded-full"></div>
            <span class="absolute inset-0 flex items-center justify-center text-white font-bold rotate-[-15deg]">HOT!</span>
          </div>
        </div>
        
        <span class="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold mb-4 z-10 relative">
          {{ props.details.date }}
        </span>

        <h1 class="text-5xl font-bold mb-6">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-blue-600">
            {{ props.details.title }}
          </span>
        </h1>
        
        <div class="flex items-center text-lg text-gray-600">
          <UIcon name="i-heroicons-outline-map-pin" class="w-6 h-6 mr-2 text-cyan-600" />
          <span class="font-bold text-cyan-600">Masvingo, Zimbabwe</span>
        </div>
        
        <p class="text-xl text-gray-700 leading-relaxed">
          Join <span class="font-bold text-cyan-500">300+ youth advocates</span> for our most interactive workshop yet! 
          Featuring live music, VR experiences, and hands-on activities.
        </p>
        
        <!-- Countdown with animated numbers -->
        <div class="py-6">
          <h3 class="text-lg font-semibold text-gray-500 uppercase tracking-wider mb-4">Starts in:</h3>
          <div class="grid grid-cols-4 gap-4">
            <div 
              v-for="(value, unit) in { days, hours, minutes, seconds }" 
              :key="unit"
              class="text-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white"
            >
              <div class="text-4xl font-extrabold bg-gradient-to-br from-orange-500 to-blue-600 bg-clip-text text-transparent">
                {{ value }}
              </div>
              <div class="text-sm font-bold text-gray-600 uppercase mt-1 tracking-wider">{{ unit }}</div>
            </div>
          </div>
        </div>
        
        <button
          class="mt-4 group animate-pulse hover:animate-none px-8 py-4 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-900"
        >
          <span class="font-bold relative z-10">Book Your Seat Now</span>
          <UIcon name="i-heroicons-outline-ticket" class="ml-2 w-6 h-6 group-hover:rotate-[30deg] transition-transform relative z-10" />
          <div class="absolute inset-0 bg-gradient-to-r from-blue-900 to-cyan-500 group-hover:from-cyan-500 group-hover:to-blue-900 transition-all duration-500"></div>
        </button>
      </div>
      
      <!-- Speaker section -->
      <div class="relative">
        <!-- Animated border effect -->
        <div class="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500 to-green-500 animate-rotate"></div>
        
        <div class="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
          <img
            :src="props.details.mc_image"
            class="w-full h-[500px] object-cover"
            :alt="props.details.mc_name"
          />

          <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
            <h3 class="text-2xl font-bold text-white">{{ props.details.mc_name }}</h3>
            <p class="text-cyan-300 font-medium">{{ props.details.mc_title }}, {{ props.details.mc_company }}</p>
            
            <!-- Social icons -->
            <div class="flex space-x-3 mt-3">
              <div class="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                <UIcon name="i-heroicons-outline-globe-alt" class="w-5 h-5 text-white" />
              </div>
              <div class="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                <UIcon name="i-heroicons-outline-academic-cap" class="w-5 h-5 text-white" />
              </div>
              <div class="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                <UIcon name="i-heroicons-outline-book-open" class="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Rotating gradient animation */
@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-rotate {
  animation: rotate 8s linear infinite;
  z-index: 0;
}

/* Hover effect for buttons */
button.group:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4);
  transition: all 0.3s ease;
}
</style>