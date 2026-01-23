<script setup lang="ts">
// Static component - no animations or carousel
</script>

<template>
  <div class="py-20 px-10 bg-linear-to-br from-indigo-50 to-blue-50">
    <div class="grid lg:grid-cols-2 gap-10">
      <!-- Static image -->
      <div class="relative h-[500px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(6,182,212,0.3)]">
        <NuxtImg
          src="/img/youth.jpg"
          class="rounded-3xl absolute inset-0 w-full h-full object-cover"
          alt="Youth programs"
        />
      </div>

      <!-- Text content -->
      <div class="relative">
        <h1 class="text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Creating pathways for youth to
          <span class="inline-block text-sky-500 font-extrabold">
            thrive
          </span>
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
      </div>
    </div>
  </div>
</template>

<style scoped>
/* No animations needed for static component */

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