<script setup lang="ts">
import { ref } from 'vue';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

// Define props for stories data
const props = withDefaults(defineProps<{
  stories?: Array<{
    id: number;
    name: string;
    age: number;
    location: string;
    role: string;
    quote: string;
    image: string;
    tags: string[];
    color: string;
    icon: string;
  }>;
  backgroundImage?: string;
}>(), {
  backgroundImage: '/img/pattern.webp',
  stories: () => [
    {
      id: 1,
      name: "Tendai M.",
      age: 19,
      location: "Harare",
      role: "Tech Apprentice",
      quote: "The coding skills changed my life. I now develop apps for local businesses.",
      image: "/img/tech_story.jpg",
      tags: ["Technology", "Entrepreneurship"],
      color: "linear-gradient(135deg, #06b6d4, #1e3a8a)", // cyan-500 to blue-900
      icon: "i-heroicons-code-bracket" // Using Heroicons
    },
    {
      id: 2,
      name: "Rumbidzai C.",
      age: 21,
      location: "Bulawayo",
      role: "Community Health Worker",
      quote: "I'm helping fight substance abuse through peer education.",
      image: "/img/utsanana_story.jpg",
      tags: ["Health", "Leadership"],
      color: "linear-gradient(135deg, #06b6d4, #1e3a8a)", // cyan-500 to blue-900
      icon: "i-heroicons-heart" // Using Heroicons
    },
    {
      id: 3,
      name: "Tinashe K.",
      age: 24,
      location: "Masvingo",
      role: "Sustainable Farmer",
      quote: "Agricultural training helped me turn barren land into a thriving farm.",
      image: "/img/farmer_story.jpg",
      tags: ["Agriculture", "Sustainability"],
      color: "linear-gradient(135deg, #06b6d4, #1e3a8a)", // cyan-500 to blue-900
      icon: "i-heroicons-leaf" // Using Heroicons
    },
    {
      id: 4,
      name: "Anesu M.",
      age: 22,
      location: "Mutare",
      role: "Motor Mechanic",
      quote: "I learned how to fix cars, any type of car, and now I run my own garage.",
      image: "/img/tech_story.jpg",
      tags: ["Marketing", "Business"],
      color: "linear-gradient(135deg, #06b6d4, #1e3a8a)", // cyan-500 to blue-900
      icon: "i-heroicons-chart-bar" // Using Heroicons
    },
    {
      id: 5,
      name: "Chiedza T.",
      age: 20,
      location: "Gweru",
      role: "Fashion Designer",
      quote: "The design program helped me launch my own clothing line.",
      image: "/img/utsanana_story.jpg",
      tags: ["Design", "Creativity"],
      color: "linear-gradient(135deg, #06b6d4, #1e3a8a)", // cyan-500 to blue-900
      icon: "i-heroicons-scissors" // Using Heroicons
    }
  ]
});

const stories = ref(props.stories);

const breakpoints = {
  "300": {
    itemsToShow: 1,
    snapAlign: "center" as const
  },
  "700": {
    itemsToShow: 2,
    snapAlign: "center" as const
  },
  "1024": {
    itemsToShow: 3,
    snapAlign: "start" as const
  }
};
</script>

<template>
  <section 
    class="success-stories" 
    :style="`background-image: url('${backgroundImage}'); background-size: cover;`"
  >
    <div class="px-10">
      <div class="section-header">
        <h2 class="section-title">
          Youth <span class="linear-text">Success Stories</span>
        </h2>
        <p class="section-subtitle">
          Real transformations from young people across Zimbabwe
        </p>
      </div>

      <Carousel 
        :items-to-show="3" 
        :wrap-around="true" 
        :autoplay="4000" 
        :transition="500" 
        :breakpoints="breakpoints"
      >
        <Slide v-for="story in stories" :key="story.id">
          <div class="story-card">
            <div class="card-image">
              <img :src="story.image" :alt="`${story.name}'s story`">
              <div class="location-badge">{{ story.location }}</div>
            </div>

            <div class="card-content">
              <div class="profile-header">
                <div class="profile-icon">
                  <!-- Using Heroicons through UIcon if available, or span with icon class -->
                  <UIcon v-if="story.icon.startsWith('i-heroicons')" :name="story.icon" class="w-6 h-6 text-gray-700" />
                  <span v-else :class="story.icon"></span>
                </div>
                <div class="profile-info">
                  <h3>{{ story.name }}, {{ story.age }}</h3>
                  <p>{{ story.role }}</p>
                </div>
              </div>

              <p class="quote">"{{ story.quote }}"</p>

              <div class="tags">
                <span 
                  v-for="(tag, index) in story.tags" 
                  :key="index" 
                  class="tag" 
                  :style="`background: ${story.color}`"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </section>
</template>

<style scoped>
:root {
  --youth-cyan: #06b6d4; /* cyan-500 */
  --youth-blue: #1e3a8a; /* blue-900 */
}

.success-stories {
  padding: 80px 0;
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: #111827;
}

.linear-text {
  background: linear-gradient(90deg, #06b6d4, #1e3a8a);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
}

/* Card styles */
.story-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  margin: 0 12px;
}

.story-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.card-image {
  height: 280px;
  overflow: hidden;
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.story-card:hover .card-image img {
  transform: scale(1.05);
}

.location-badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: white;
  color: #111827;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.875rem;
}

.card-content {
  padding: 24px;
}

.profile-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.profile-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  border: 2px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.profile-info h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.profile-info p {
  color: #6b7280;
  font-weight: 500;
}

.quote {
  font-style: italic;
  color: #4b5563;
  margin-bottom: 24px;
  padding-left: 16px;
  border-left: 4px solid var(--youth-cyan);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
}

/* Carousel customization */
.carousel__slide {
  padding: 20px 0;
}

.carousel__prev,
.carousel__next {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: var(--youth-blue); /* Changed from purple to blue */
}

/* CTA Button */
.cta-button {
  background: linear-gradient(90deg, var(--youth-cyan), var(--youth-blue));
  color: white;
  border: none;
  padding: 16px 40px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.125rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: 40px;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(6, 182, 212, 0.3); /* cyan-500 color */
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: 0.5s;
}

.cta-button:hover::before {
  left: 100%;
}

.cta-container {
  text-align: center;
  margin-top: 60px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .card-image {
    height: 220px;
  }
}
</style>