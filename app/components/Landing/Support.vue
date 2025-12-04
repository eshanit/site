<script setup lang="ts">

// Define props for the component
const props = withDefaults(defineProps<{
  backgroundImage?: string;
  cards?: Array<{
    title: string;
    description: string;
    image: string;
    icon: string;
    stat: string;
    reason: string;
    source: string;
    gradient: string[];
  }>;
}>(), {
  backgroundImage: '/img/pattern4.png',
  cards: () => [
    {
      title: 'Community Well Being',
      description: 'We nurture young people in body, mind and spirit.',
      image: '/img/youth1.jpg',
      icon: 'heart',
      stat: '1 in 7',
      reason: 'Young people aged 5 - 19 experiences some form of mental health disorder',
      source: 'UN/WHO',
      gradient: ['#6d016d', '#2b0a2b'],
    },
    {
      title: 'Meaningful Work',
      description: 'We support worthwhile jobs and sustainable livelihoods',
      image: '/img/electricity.jpeg',
      icon: 'briefcase',
      stat: '264 million',
      reason: 'Young people aged 15 - 24 are not in education, employment or training',
      source: 'UN/ILO',
      gradient: ['#0090c0', '#000b15'],
    },
    {
      title: 'Zero Substance Abuse',
      description: 'Thriving toward a clean, drug free youth',
      image: '/img/drugfree.png',
      icon: 'shield-check',
      stat: '78 million',
      reason: 'Young people aged 12 - 24 are affected by substance abuse worldwide',
      source: 'UN/ILO',
      gradient: ['#ff0000', '#000000'],
    },
    {
      title: 'Equality and Justice',
      description: 'We amplify youth voices in the community',
      image: '/img/justice.jpg',
      icon: 'scale',
      stat: '400 million',
      reason: 'Young people face discrimination because of ethnicity and religion',
      source: 'UN/ILO',
      gradient: ['#6aa84f', '#000000'],
    },
  ]
});

// Icon mapping component
const iconComponents: Record<string, string> = {
  heart: 'i-heroicons-outline-heart',
  briefcase: 'i-heroicons-outline-briefcase',
  'shield-check': 'i-heroicons-outline-shield-check',
  scale: 'i-heroicons-outline-scale',
  'arrow-right': 'i-heroicons-outline-arrow-right'
};

// Helper function to safely get icon
const getIconComponent = (iconName: string) => {
  return iconComponents[iconName] || 'i-heroicons-outline-heart'; // fallback
};
</script>

<template>
  <div 
    class="py-20 px-10 bg-gradient-to-b from-white to-blue-50 relative"
  >
    <!-- Background image -->
    <div 
      v-if="backgroundImage" 
      class="absolute inset-0 opacity-10"
      :style="`background-image: url('${backgroundImage}'); background-size: cover; background-position: center;`"
    ></div>
    
    <!-- Content -->
    <div class="relative z-10">
      <!-- Section header -->
      <div class="mb-16">
        <h2 class="text-5xl font-bold mb-6">
          <span class="text-cyan-700">20 million young people</span>
          <span class="block mt-2">aged 15-24 in Southern Africa</span>
        </h2>
        <p class="text-2xl font-medium text-gray-600">
          This is how we support them, and their communities
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="(card, index) in cards" 
          :key="index"
          class="relative overflow-hidden rounded-2xl shadow-xl group cursor-pointer h-[350px]"
          :style="`background: linear-gradient(135deg, ${card.gradient[0]} 0%, ${card.gradient[1]} 100%);`"
        >
          <!-- Front content -->
          <div
            class="absolute inset-0 p-6 flex flex-col justify-between text-white transition-transform duration-500 group-hover:-translate-y-full"
          >
            <div>
              <div
                class="w-14 h-14 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center mb-6"
              >
                <UIcon
                  :name="getIconComponent(card.icon)"
                  class="w-8 h-8 text-white"
                />
              </div>
              <h3 class="text-2xl font-bold mb-3">{{ card.title }}</h3>
              <p class="text-lg font-medium">{{ card.description }}</p>
            </div>
            <img 
              :src="card.image" 
              :alt="card.title"
              class="w-full h-32 object-cover rounded-xl border-2 border-white/30" 
            />
          </div>

          <!-- Back content (revealed on hover) -->
          <div
            class="absolute inset-0 p-6 flex flex-col justify-between text-white translate-y-full transition-transform duration-500 group-hover:translate-y-0"
          >
            <div>
              <h3 class="text-xl font-bold mb-3">This matters because...</h3>
              <p class="text-center text-2xl font-bold mb-3">{{ card.stat }}</p>
              <p class="text-base">{{ card.reason }}</p>
              <p class="text-xs font-bold mt-4">{{ card.source }}</p>
            </div>
            <div class="bg-white/20 py-3 px-4 rounded-xl backdrop-blur-sm">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Learn more</span>
                <UIcon name="i-heroicons-outline-arrow-right" class="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles if needed */
</style>