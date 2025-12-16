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
    // {
    //   name: 'Program',
    //   href: '/program',
    //   current: route.path.startsWith('/program'),
    //   icon: 'i-heroicons-academic-cap',
    //   description: 'Our 8-session intervention'
    // },
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
    // {
    //   name: 'Research',
    //   href: '/research',
    //   current: route.path.startsWith('/research'),
    //   icon: 'i-heroicons-beaker',
    //   description: 'Evidence & publications'
    // },
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
      'sticky top-0 z-50 transition-all duration-500 backdrop-blur-xl',
      isScrolled 
        ? 'bg-white/95 border-b border-gray-200/50 shadow-lg' 
        : 'bg-white/90 border-b border-white/20'
    ]"
  >
    <!-- Full width container with generous padding -->
    <div class="w-full px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
      <!-- Main Navigation Bar -->
      <div class="flex justify-between items-center h-20">
        <!-- Logo Section - Modernized -->
        <div class="shrink-0 flex items-center">
          <NuxtLink 
            to="/" 
            class="flex items-center space-x-4 group relative"
            @mouseenter="logoAnimation = true"
            @mouseleave="logoAnimation = false"
          >
            <!-- Enhanced Logo Container -->
            <div class="relative">
              <!-- Animated gradient ring -->
              <div 
                :class="[
                  'absolute -inset-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-900 opacity-20 blur transition-all duration-700',
                  logoAnimation ? 'scale-110' : 'scale-100'
                ]"
                aria-hidden="true"
              ></div>
              
              <!-- Logo with gradient border -->
              <div class="relative bg-white rounded-xl p-2.5 shadow-lg border border-gray-100">
                <div class="relative">
                  <AppLogo size="navbar" />
                  <!-- Subtle shine effect -->
                  <div 
                    class="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Logo Text -->
            <div class="hidden lg:block">
              <div class="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-800 bg-clip-text text-transparent">
                PEGISUS
              </div>
              <div class="text-xs text-gray-500 font-medium tracking-wider">
                Southern Africa
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation Menu - Enhanced -->
        <div class="hidden lg:flex items-center space-x-1">
          <div 
            v-for="item in menuItems" 
            :key="item.name" 
            class="relative group"
          >
            <NuxtLink 
              :to="item.href" 
              :class="[
                'px-4 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 relative overflow-hidden',
                item.current
                  ? 'text-cyan-600 bg-gradient-to-r from-cyan-50 to-blue-50 shadow-sm border border-cyan-100'
                  : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50/80'
              ]"
            >
              <!-- Icon -->
              <UIcon 
                :name="item.icon" 
                class="w-4 h-4 transition-transform group-hover:scale-110" 
              />
              
              <!-- Text -->
              <span class="text-sm font-semibold tracking-tight">
                {{ item.name }}
              </span>

              <!-- Active indicator -->
              <div 
                v-if="item.current"
                class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-900 rounded-full"
              ></div>

              <!-- Hover indicator -->
              <div 
                class="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              ></div>
            </NuxtLink>

            <!-- Tooltip description -->
            <div 
              v-if="item.description"
              class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50"
            >
              {{ item.description }}
              <div class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </div>

          <!-- Divider -->
          <div class="w-px h-6 bg-gray-200 mx-2"></div>

          <!-- CTA Button -->
          <NuxtLink
            :to="ctaButton.href"
            class="ml-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-semibold text-sm tracking-tight shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2 group"
          >
            <UIcon :name="ctaButton.icon" class="w-4 h-4" />
            <span>{{ ctaButton.text }}</span>
            <UIcon 
              name="i-heroicons-arrow-right" 
              class="w-3 h-3 transform group-hover:translate-x-1 transition-transform" 
            />
          </NuxtLink>
        </div>

        <!-- Right Section - Social Links & Actions -->
        <div class="flex items-center space-x-3">
          <!-- Social Links - Modernized -->
          <div class="hidden md:flex items-center space-x-1">
            <NuxtLink 
              v-for="social in socialLinks" 
              :key="social.name" 
              :href="social.href" 
              :title="social.name"
              :class="[
                'p-2.5 text-gray-500 rounded-xl transition-all duration-300 transform hover:scale-110',
                social.color
              ]"
            >
              <UIcon :name="social.icon" class="w-4 h-4" />
            </NuxtLink>
          </div>

          <!-- Language Selector (Optional) -->
          <div class="hidden md:block">
            <div class="flex items-center space-x-1 px-3 py-2 rounded-xl bg-gray-50/80 text-gray-600 text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors">
              <UIcon name="i-heroicons-language" class="w-4 h-4" />
              <span>EN</span>
              <UIcon name="i-heroicons-chevron-down" class="w-3 h-3" />
            </div>
          </div>

          <!-- Mobile menu button - Enhanced -->
          <button 
            @click="toggleMenu"
            :class="[
              'lg:hidden p-3 rounded-xl transition-all duration-300 transform hover:scale-110',
              isMenuOpen 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-900 text-white' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
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

      <!-- Mobile Navigation Menu - Enhanced -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div 
          v-show="isMenuOpen"
          class="lg:hidden bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl mt-2 mb-4 overflow-hidden"
        >
          <div class="py-4 space-y-1">
            <NuxtLink 
              v-for="item in menuItems" 
              :key="item.name" 
              :to="item.href" 
              :class="[
                'flex items-center space-x-3 px-6 py-4 text-base font-medium transition-all duration-200 group',
                item.current
                  ? 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 border-l-4 border-cyan-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-cyan-600 hover:border-l-4 hover:border-gray-200'
              ]" 
              @click="closeMobileMenu"
            >
              <!-- Mobile icon -->
              <UIcon 
                :name="item.icon" 
                :class="[
                  'w-5 h-5 transition-transform group-hover:scale-110',
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
                class="w-4 h-4 text-gray-300 group-hover:text-cyan-400 transition-colors" 
              />
            </NuxtLink>

            <!-- Mobile CTA -->
            <div class="px-6 py-4">
              <NuxtLink
                :to="ctaButton.href"
                class="w-full px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-semibold text-sm tracking-tight shadow-lg flex items-center justify-center space-x-2 group"
                @click="closeMobileMenu"
              >
                <UIcon :name="ctaButton.icon" class="w-4 h-4" />
                <span>{{ ctaButton.text }}</span>
                <UIcon 
                  name="i-heroicons-arrow-right" 
                  class="w-3 h-3 transform group-hover:translate-x-1 transition-transform" 
                />
              </NuxtLink>
            </div>

            <!-- Mobile Social Links -->
            <div class="flex justify-center space-x-4 px-6 py-4 border-t border-gray-200/50">
              <NuxtLink 
                v-for="social in socialLinks" 
                :key="social.name" 
                :href="social.href" 
                :title="social.name"
                :class="[
                  'p-3 text-gray-400 rounded-xl transition-all duration-300 transform hover:scale-110',
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
      class="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-500 to-blue-900 origin-left transition-transform duration-300"
      :style="{ transform: `scaleX(${scrollProgress})` }"
    ></div>
  </nav>
</template>

<style scoped>
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
                      opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Gradient text animation for hover effects */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gradient-text {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

/* Floating animation for logo */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.logo-float {
  animation: float 6s ease-in-out infinite;
}

/* Glow effect for active items */
.glow-effect {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.1);
}

/* Smooth backdrop blur transition */
.backdrop-blur-xl {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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
  outline-offset: 2px;
  border-radius: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .backdrop-blur-xl {
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}

/* Dark mode support (optional future enhancement) */
@media (prefers-color-scheme: dark) {
  nav {
    background-color: rgba(17, 24, 39, 0.95) !important;
    border-bottom-color: rgba(55, 65, 81, 0.5) !important;
  }
  
  .bg-white {
    background-color: rgba(17, 24, 39, 0.95) !important;
  }
  
  .text-gray-700 {
    color: #d1d5db !important;
  }
  
  .bg-gray-50 {
    background-color: rgba(31, 41, 55, 0.5) !important;
  }
}
</style>