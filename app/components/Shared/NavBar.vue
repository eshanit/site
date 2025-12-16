<script setup lang="ts">
import { ref, computed } from 'vue';

interface MenuItem {
  name: string;
  href: string;
  current: boolean;
  dropdown?: Array<{ name: string; href: string; }>;
}

const route = useRoute();
const activeDropdown = ref<string | null>(null);
const isMenuOpen = ref(false);

// Navigation menu with dropdown support
const menuItems = computed(() => {
  const items: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      current: route.path === '/'
    },
    {
      name: 'What We Do',
      href: '/what-we-do',
      current: route.path.startsWith('/what-we-do')
    },
    {
      name: 'Who We Are',
      href: '/who-we-are',
      current: route.path.startsWith('/who-we-are'),
    },
    {
      name: 'Where We Work',
      href: '/locations',
      current: route.path.startsWith('/locations')
    },
    {
      name: 'Contact',
      href: '/contact',
      current: route.path.startsWith('/contact')
    }
  ];
  return items;
});

// Social media links
const socialLinks = ref([
  {
    name: 'Facebook',
    href: '#',
    icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  },
  {
    name: 'Instagram',
    href: '#',
    icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  },
  {
    name: 'YouTube',
    href: '#',
    icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
  }
]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    activeDropdown.value = null;
  }
};

const showDropdown = (menu: string) => {
  activeDropdown.value = menu;
};

const hideDropdown = () => {
  setTimeout(() => {
    if (!document.querySelector('.dropdown-container:hover')) {
      activeDropdown.value = null;
    }
  }, 100);
};

const hideDropdownImmediately = () => {
  activeDropdown.value = null;
};

// Close mobile menu when route changes
const closeMobileMenu = () => {
  isMenuOpen.value = false;
  activeDropdown.value = null;
};
</script>

<template>
  <nav
    class="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm transition-all duration-300 w-full">
    <!-- Full width container with generous padding -->
    <div class="w-full px-8 xl:px-12 2xl:px-16">
      <!-- Main Navigation Bar -->
      <div class="flex justify-between items-center h-20">
        <!-- Logo Section - More prominent -->
        <div class="shrink-0 flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-4 group">
            <!-- Animated Border Container -->
            <div class="relative p-1 rounded-2xl bg-transparent">
              <!-- Animated gradient border -->
              <div
                class="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-700 to-cyan-500 bg-[length:200%_100%] animate-border-rotate">
              </div>

              <!-- Logo container with white background -->
              <div class="relative bg-white rounded-xl p-2">
                <AppLogo size="navbar" />
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation Menu - More spacing -->
        <div class="hidden lg:flex items-center space-x-2">
          <div v-for="item in menuItems" :key="item.name" class="relative dropdown-container"
            @mouseenter="item.dropdown ? showDropdown(item.name) : null" @mouseleave="hideDropdown">
            <NuxtLink :to="item.href" :class="[
              'px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2',
              item.current
                ? 'text-cyan-600 bg-cyan-50 shadow-md'
                : 'text-gray-700 hover:text-cyan-600 hover:bg-gray-50 hover:shadow-sm'
            ]">
              <span class="text-lg">{{ item.name }}</span>
              <UIcon v-if="item.dropdown" name="i-heroicons-chevron-down" :class="[
                'w-4 h-4 transition-transform duration-200',
                activeDropdown === item.name ? 'rotate-180' : ''
              ]" />
            </NuxtLink>

            <!-- Dropdown Menu -->
            <div v-if="item.dropdown && activeDropdown === item.name"
              class="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-md py-3 z-50 animate-in fade-in-0 zoom-in-95">
              <NuxtLink v-for="dropdownItem in item.dropdown" :key="dropdownItem.name" :to="dropdownItem.href"
                class="block px-6 py-3 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl font-medium"
                @click="hideDropdownImmediately">
                {{ dropdownItem.name }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right Section - Social Links & Actions -->
        <div class="flex items-center space-x-6">
          <!-- Social Links - Larger and more spaced -->
          <div class="hidden md:flex items-center space-x-3">
            <NuxtLink v-for="social in socialLinks" :key="social.name" :href="social.href" :title="social.name"
              class="p-3 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all duration-200 group transform hover:scale-110">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path :d="social.icon" />
              </svg>
            </NuxtLink>
          </div>

          <!-- Mobile menu button - Larger -->
          <button @click="toggleMenu"
            class="lg:hidden p-3 rounded-xl text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 transition-all duration-200 transform hover:scale-110">
            <UIcon v-if="!isMenuOpen" name="i-heroicons-bars-3" class="w-7 h-7" />
            <UIcon v-else name="i-heroicons-x-mark" class="w-7 h-7" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu - Full width -->
      <div v-show="isMenuOpen"
        class="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-xl animate-in slide-in-from-top-2 duration-300 mx-0">
        <div class="py-6 space-y-3">
          <NuxtLink v-for="item in menuItems" :key="item.name" :to="item.href" :class="[
            'block px-8 py-4 text-xl font-semibold transition-all duration-200 rounded-xl mx-2',
            item.current
              ? 'text-cyan-600 bg-cyan-50 shadow-md'
              : 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'
          ]" @click="closeMobileMenu">
            {{ item.name }}
          </NuxtLink>

          <!-- Mobile Social Links -->
          <div class="flex justify-center space-x-6 px-8 pt-6 pb-4">
            <NuxtLink v-for="social in socialLinks" :key="social.name" :href="social.href" :title="social.name"
              class="p-4 text-gray-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all duration-200 transform hover:scale-110">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path :d="social.icon" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Animated border rotation */
@keyframes borderRotate {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 200% 0%;
  }
}

.animate-border-rotate {
  animation: borderRotate 4s linear infinite;
}

/* Ensure smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom animations for dropdown */
.animate-in {
  animation-duration: 200ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-in-0 {
  animation-name: fadeIn;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.zoom-in-95 {
  animation-name: zoomIn;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.slide-in-from-top-2 {
  animation-name: slideInFromTop;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>