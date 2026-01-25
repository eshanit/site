<script setup lang="ts">
import { ref, computed } from 'vue';

interface MenuItem {
  name: string;
  href: string;
  current: boolean;
  icon?: string;
  description?: string;
}

const route = useRoute();
const isMenuOpen = ref(false);
const isScrolled = ref(false);

// Handle scroll effect
onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20;
    scrollProgress.value = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1);
  });
});

// Navigation menu with enhanced structure
const menuItems = computed(() => {
  const items: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      current: route.path === '/',
      icon: 'i-heroicons-home',
      description: 'Welcome to PEGISUS'
    },
    {
      name: 'What We Do',
      href: '/what-we-do',
      current: route.path.startsWith('/what-we-do'),
      icon: 'i-heroicons-wrench-screwdriver',
      description: 'What we do'
    },
    {
      name: 'Who We Are',
      href: '/who-we-are',
      current: route.path.startsWith('/who-we-are'),
      icon: 'i-heroicons-user-group',
      description: 'Meet our partners'
    },
    {
      name: 'Where We Work',
      href: '/where-we-work',
      current: route.path.startsWith('/where-we-work'),
      icon: 'i-heroicons-map',
      description: 'Our impact across Southern Africa'
    },
    {
      name: 'Contact',
      href: '/contact',
      current: route.path.startsWith('/contact'),
      icon: 'i-heroicons-envelope',
      description: 'Get in touch'
    }
  ];
  return items;
});

// Social media links with updated icons
const socialLinks = ref([
  {
    name: 'Twitter',
    href: '#',
    icon: 'i-heroicons-x-mark',
    color: 'hover:bg-black/5 hover:text-black'
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: 'i-heroicons-user-group',
    color: 'hover:bg-blue-50 hover:text-blue-600'
  },
  {
    name: 'YouTube',
    href: '#',
    icon: 'i-heroicons-play',
    color: 'hover:bg-red-50 hover:text-red-600'
  },
  {
    name: 'Instagram',
    href: '#',
    icon: 'i-heroicons-photo',
    color: 'hover:bg-pink-50 hover:text-pink-600'
  }
]);

// CTA button for partnership
const ctaButton = {
  text: 'Partner With Us',
  href: '/contact',
  icon: 'i-heroicons-handshake'
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMobileMenu = () => {
  isMenuOpen.value = false;
};

// Animation for logo gradient
const logoAnimation = ref(false);
const scrollProgress = ref(0);

onMounted(() => {
  setTimeout(() => {
    logoAnimation.value = true;
  }, 300);
});
</script>

<template>
  <nav 
    :class="[
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-white border-b border-gray-300 shadow-sm' 
        : 'bg-white border-b border-gray-200'
    ]"
  >
    <!-- Full width container -->
    <div class="w-full px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      <!-- Main Navigation Bar -->
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section -->
        <div class="shrink-0 flex items-center">
          <NuxtLink 
            to="/" 
            class="flex items-center space-x-3 group"
          >
            <!-- Logo with border -->
            <div class=" ">
              <AppLogo size="navbar" />
            </div>

          </NuxtLink>
        </div>

        <!-- Desktop Navigation Menu -->
        <div class="hidden lg:flex items-center space-x-0">
          <div 
            v-for="item in menuItems" 
            :key="item.name" 
            class="relative group"
          >
            <NuxtLink
              :to="item.href"
              :class="[
                'px-5 py-3 font-medium transition-all duration-200 flex items-center space-x-2 relative',
                item.current
                  ? 'text-cyan-600 bg-gray-50'
                  : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50'
              ]"
            >
              <!-- Icon -->
              <UIcon 
                :name="item.icon" 
                class="w-4 h-4" 
              />
              
              <!-- Text -->
              <span class="text-sm font-semibold tracking-tight">
                {{ item.name }}
              </span>

              <!-- Active indicator -->
              <div 
                v-if="item.current"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-900"
              ></div>

              <!-- Hover indicator -->
              <div 
                class="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-900 opacity-0 group-hover:opacity-100 group-hover:left-0 group-hover:right-0 transition-all duration-200"
                aria-hidden="true"
              ></div>
            </NuxtLink>
          </div>

          <!-- Divider -->
          <div class="w-px h-6 bg-gray-300 mx-1"></div>

          <!-- CTA Button -->
          <NuxtLink
            :to="ctaButton.href"
            class="ml-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-900 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold text-sm tracking-tight shadow hover:shadow-md transition-all duration-200 flex items-center space-x-2 group"
          >
            <UIcon :name="ctaButton.icon" class="w-4 h-4" />
            <span>{{ ctaButton.text }}</span>
            <UIcon 
              name="i-heroicons-arrow-right" 
              class="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-200" 
            />
          </NuxtLink>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-2">
          <!-- Language Selector -->
          <div class="hidden md:block">
            <div class="flex items-center space-x-1 px-3 py-2 bg-gray-50 text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors duration-200 border border-gray-200">
              <UIcon name="i-heroicons-language" class="w-4 h-4" />
              <span>EN</span>
              <UIcon name="i-heroicons-chevron-down" class="w-3 h-3" />
            </div>
          </div>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMenu"
            :class="[
              'lg:hidden p-3 transition-all duration-200',
              isMenuOpen 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-900 text-white' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
            ]"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          >
            <UIcon 
              v-if="!isMenuOpen" 
              name="i-heroicons-bars-3" 
              class="w-5 h-5" 
            />
            <UIcon 
              v-else 
              name="i-heroicons-x-mark" 
              class="w-5 h-5" 
            />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div 
          v-show="isMenuOpen"
          class="lg:hidden bg-white border border-gray-300 shadow-lg mt-1 mb-2"
        >
          <div class="space-y-0">
            <NuxtLink 
              v-for="item in menuItems" 
              :key="item.name" 
              :to="item.href" 
              :class="[
                'flex items-center space-x-3 px-5 py-4 text-base font-medium transition-all duration-150 group border-b border-gray-100',
                item.current
                  ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 border-l-4 border-cyan-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-cyan-600'
              ]" 
              @click="closeMobileMenu"
            >
              <!-- Mobile icon -->
              <UIcon 
                :name="item.icon" 
                :class="[
                  'w-5 h-5',
                  item.current ? 'text-cyan-500' : 'text-gray-400 group-hover:text-cyan-500'
                ]" 
              />
              
              <div class="flex-1">
                <div class="font-semibold">{{ item.name }}</div>
                <div 
                  v-if="item.description"
                  class="text-xs text-gray-500 group-hover:text-cyan-400 mt-0.5"
                >
                  {{ item.description }}
                </div>
              </div>

              <!-- Chevron indicator -->
              <UIcon 
                name="i-heroicons-chevron-right" 
                class="w-4 h-4 text-gray-300 group-hover:text-cyan-400 transition-colors duration-150" 
              />
            </NuxtLink>

            <!-- Mobile CTA -->
            <div class="p-5 border-t border-gray-200">
              <NuxtLink
                :to="ctaButton.href"
                class="w-full px-5 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-semibold text-sm tracking-tight shadow flex items-center justify-center space-x-2 group"
                @click="closeMobileMenu"
              >
                <UIcon :name="ctaButton.icon" class="w-4 h-4" />
                <span>{{ ctaButton.text }}</span>
                <UIcon 
                  name="i-heroicons-arrow-right" 
                  class="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-150" 
                />
              </NuxtLink>
            </div>

            <!-- Mobile Social Links -->
            <div class="flex justify-center space-x-4 px-5 py-4 border-t border-gray-200">
              <NuxtLink 
                v-for="social in socialLinks" 
                :key="social.name" 
                :href="social.href" 
                :title="social.name"
                :class="[
                  'p-3 text-gray-400 transition-all duration-150 hover:bg-gray-50',
                  social.color
                ]"
              >
                <UIcon :name="social.icon" class="w-5 h-5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Progress bar for scroll -->
    <div
      v-if="isScrolled"
      class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-900 origin-left transition-transform duration-200"
      :style="{ transform: `scaleX(${scrollProgress})` }"
    ></div>
  </nav>
</template>

<style scoped>
/* Remove all border-radius globally */
* {
  border-radius: 0 !important;
}

/* Custom scrollbar for the nav */
nav {
  scrollbar-width: none; /* Firefox */
}

nav::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Ensure z-index stacking */
nav {
  z-index: 9999;
}

/* Custom focus styles */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid #06b6d4;
  outline-offset: 1px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .max-w-8xl {
    max-width: 100%;
  }
}
</style>