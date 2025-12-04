<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const images = [
  '/img/youth.jpg',
  '/img/5H2A4440.jpg',
  '/img/youth2.jpg'
]

const actionWords = [
  { text: 'thrive', color: 'text-sky-500' },
  { text: 'succeed', color: 'text-emerald-500' },
  { text: 'flourish', color: 'text-amber-500' }
]

const currentIndex = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 6000)

  onUnmounted(() => clearInterval(interval))
})
</script>

<template>
  <div class="py-20 px-10 bg-linear-to-br from-indigo-50 to-blue-50">
    <div class="grid lg:grid-cols-2 gap-10">
      <!-- Image carousel -->
      <div class="relative h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(6,182,212,0.3)]">
        <!-- Floating shapes background -->
        <div class="absolute inset-0 z-0">
          <div class="absolute w-40 h-40 rounded-full bg-blue-400 opacity-20 -top-10 -left-10"></div>
          <div class="absolute w-60 h-60 rounded-full bg-cyan-400 opacity-15 bottom-10 right-20"></div>
        </div>

        <Transition name="bounce" mode="out-in">
          <NuxtImg 
            :key="images[currentIndex]" 
            :src="images[currentIndex]" 
            class="z-10 rounded-3xl absolute inset-0 w-full h-full object-cover"
            alt="Youth programs"
          />
        </Transition>
      </div>

      <!-- Text content -->
      <div class="relative">
        <h1 class="text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Creating pathways for youth to
          <Transition name="jump" mode="out-in">
            <span 
              :key="actionWords[currentIndex]?.text"
              :class="['inline-block', actionWords[currentIndex]?.color, 'font-extrabold']"
            >
              {{ actionWords[currentIndex]?.text }}
            </span>
          </Transition>
          in a rapidly changing world.
        </h1>

        <p class="text-xl text-gray-700 mb-8 leading-relaxed">
          Integrating a peer group intervention for substance use and gender beliefs into vocational training programs
          in
          <span class="font-bold bg-linear-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
            Zambia, Zimbabwe, and South Africa
          </span> to empower youth with skills and confidence.
        </p>

        <div class="flex space-x-4">
            <NuxtLink
              to="/programs"
              class="px-8 py-4 bg-linear-to-r from-cyan-500 to-blue-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg text-center"
            >
             Sign Up Now
            </NuxtLink>

          <button
            class="px-6 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-colors font-bold rounded-lg flex items-center"
          >
            <UIcon name="i-heroicons-play-circle" class="w-6 h-6 mr-2" />
            Watch Video
          </button>
        </div>

        <!-- Animated floating elements -->
        <div class="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-green-400 opacity-30 animate-pulse"></div>
        <div class="absolute bottom-0 -left-10 w-16 h-16 rotate-45 bg-blue-400 opacity-40 animate-bounce"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* New animations */
.bounce-enter-active {
  animation: bounce-in 2.4s;
}

.bounce-leave-active {
  animation: bounce-in 2.4s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.jump-enter-active {
  animation: jump 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.jump-leave-active {
  animation: jump 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) reverse;
}

@keyframes jump {
  0% {
    transform: translateY(30px) scale(0.8);
    opacity: 0;
  }

  70% {
    transform: translateY(-10px) scale(1.1);
  }

  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

/* Hover effect for buttons */
.group:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(6, 182, 212, 0.4); /* Changed from purple to cyan-500 */
  transition: all 0.3s ease;
}
</style>