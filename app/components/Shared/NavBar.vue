<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Import shared components
import SharedButton from '~/components/Shared/Button.vue';

interface MenuItem {
  name: string;
  href: string;
  current: boolean;
  description?: string;
  submenu?: MenuItem[];
}

const route = useRoute();
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const openSubmenu = ref<string | null>(null);
const scrollProgress = ref(0);
const searchQuery = ref('');
const isSearchOpen = ref(false);
const scrollDirection = ref<'up' | 'down'>('up');
const lastScrollY = ref(0);

// Handle scroll effect
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  
  // Calculate scroll direction
  if (currentScrollY > lastScrollY.value) {
    scrollDirection.value = 'down';
  } else if (currentScrollY < lastScrollY.value) {
    scrollDirection.value = 'up';
  }
  
  lastScrollY.value = currentScrollY;
  
  // Show/hide based on scroll position and direction
  isScrolled.value = currentScrollY > 50;
  
  // Calculate scroll progress for the scroll indicator
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  scrollProgress.value = maxScroll > 0 ? currentScrollY / maxScroll : 0;
};

// Handle search functionality
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
    searchQuery.value = '';
    isSearchOpen.value = false;
  }
};

// Handle keyboard navigation for search
const handleSearchKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch();
  } else if (event.key === 'Escape') {
    searchQuery.value = '';
    isSearchOpen.value = false;
  }
};

// Dark/Light mode toggle
const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
};

// Initialize dark mode from localStorage or system preference
const initDarkMode = () => {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  } else if (savedDarkMode === 'false') {
    isDarkMode.value = false;
    document.documentElement.classList.remove('dark');
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
};

onMounted(() => {
  initDarkMode();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Navigation menu
const menuItems = computed(() => {
  const items: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      current: route.path === '/',
    },
    {
      name: 'What We Do',
      href: '/what-we-do',
      current: route.path.startsWith('/what-we-do'),
    },
    {
      name: 'Who We Are',
      href: '/who-we-are',
      current: route.path.startsWith('/who-we-are'),
    },
    {
      name: 'Where We Work',
      href: '/where-we-work',
      current: route.path.startsWith('/where-we-work'),
    },
    {
      name: 'Contact',
      href: '/contact',
      current: route.path.startsWith('/contact'),
    }
  ];
  return items;
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  openSubmenu.value = null;
};

const closeMobileMenu = () => {
  isMenuOpen.value = false;
  openSubmenu.value = null;
  isSearchOpen.value = false;
};

const toggleSubmenu = (menuName: string) => {
  openSubmenu.value = openSubmenu.value === menuName ? null : menuName;
};

// Handle keyboard navigation for menu items
const handleMenuKeydown = (event: KeyboardEvent, index: number) => {
  const items = document.querySelectorAll('[role="menuitem"]');
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      if (index < items.length - 1) {
        (items[index + 1] as HTMLElement).focus();
      }
      break;
    case 'ArrowUp':
      event.preventDefault();
      if (index > 0) {
        (items[index - 1] as HTMLElement).focus();
      }
      break;
    case 'Home':
      event.preventDefault();
      (items[0] as HTMLElement).focus();
      break;
    case 'End':
      event.preventDefault();
      (items[items.length - 1] as HTMLElement).focus();
      break;
  }
};
</script>

<template>
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans bg-white/95 backdrop-blur-sm"
    role="navigation"
    aria-label="Main navigation"
    :class="[isScrolled ? 'shadow-lg border-b border-gray-100' : '']"
  >
    <!-- Skip to main content link for accessibility -->
    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-blue-700 text-white px-4 py-3 z-[99999] font-medium text-sm rounded-none"
      @keydown.tab="closeMobileMenu"
    >
      Skip to main content
    </a>

    <!-- Full width container -->
    <div class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink 
            to="/" 
            class="flex items-center group"
            aria-label="PEGISUS Home"
            @click="closeMobileMenu"
          >
            <AppLogo size="navbar" />
          </NuxtLink>
        </div>

        <!-- Desktop Navigation Menu -->
        <div class="hidden lg:flex items-center space-x-1">
          <div 
            v-for="(item, index) in menuItems" 
            :key="item.name" 
            class="relative"
          >
            <NuxtLink
              :to="item.href"
              :class="[
                'px-5 py-2 font-medium text-gray-700 transition-colors duration-200 relative group/navitem',
                'hover:text-blue-700',
                item.current ? 'text-blue-700' : ''
              ]"
              :aria-current="item.current ? 'page' : undefined"
              @keydown="(e) => handleMenuKeydown(e, index)"
              role="menuitem"
              tabindex="0"
            >
              <span class="text-base font-bold tracking-wide text-blue-800 hover:text-cyan-600 transition-colors duration-200">
                {{ item.name }}
              </span>
              
              <!-- Active/Hover indicator -->
              <div 
                class="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-200 origin-left"
                :class="[
                  item.current 
                    ? 'bg-blue-700 scale-x-100' 
                    : 'bg-blue-700 scale-x-0 group-hover/navitem:scale-x-100'
                ]"
                aria-hidden="true"
              ></div>
            </NuxtLink>
          </div>
        </div>

        <!-- Right side actions -->
        <div class="flex items-center space-x-4">
          <!-- Search button (mobile first) -->
          <button
            @click="isSearchOpen = !isSearchOpen"
            class="lg:hidden p-2 text-gray-600 hover:text-blue-700 transition-colors"
            :aria-label="isSearchOpen ? 'Close search' : 'Open search'"
          >
            <UIcon 
              :name="isSearchOpen ? 'i-heroicons-x-mark' : 'i-heroicons-magnifying-glass'" 
              class="w-5 h-5" 
            />
          </button>

          <!-- Search input (desktop) -->
          <div class="hidden lg:block relative">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="w-48 px-4 py-2 pl-10 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-800 transition-all duration-200"
                @keydown="handleSearchKeydown"
              />
              <UIcon 
                name="i-heroicons-magnifying-glass" 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
              />
            </div>
          </div>

          <!-- Dark/Light Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 text-gray-600 hover:text-blue-700 transition-colors"
            :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <UIcon 
              :name="isDarkMode ? 'i-heroicons-sun' : 'i-heroicons-moon'" 
              class="w-5 h-5" 
            />
          </button>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMenu"
            :class="[
              'lg:hidden p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
              isMenuOpen 
                ? 'text-blue-700' 
                : 'text-gray-600 hover:text-blue-700'
            ]"
            :aria-label="isMenuOpen ? 'Close main menu' : 'Open main menu'"
            :aria-expanded="isMenuOpen"
            :aria-controls="'mobile-menu'"
          >
            <UIcon 
              v-if="!isMenuOpen" 
              name="i-heroicons-bars-3" 
              class="w-6 h-6" 
              aria-hidden="true"
            />
            <UIcon 
              v-else 
              name="i-heroicons-x-mark" 
              class="w-6 h-6" 
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Search (appears when toggled) -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div 
          v-if="isSearchOpen"
          class="lg:hidden pb-4"
        >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full px-4 py-3 pl-12 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-800"
              @keydown="handleSearchKeydown"
            />
            <UIcon 
              name="i-heroicons-magnifying-glass" 
              class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
            />
            <button
              @click="handleSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-700 font-medium"
            >
              Go
            </button>
          </div>
        </div>
      </Transition>

      <!-- Scroll indicator -->
      <div
        v-if="isScrolled"
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700/20 origin-left transition-transform duration-200"
        :style="{ 
          transform: `scaleX(${scrollProgress})`,
          transition: 'transform 0.1s ease-out'
        }"
        aria-hidden="true"
      ></div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-show="isMenuOpen"
        id="mobile-menu"
        class="lg:hidden bg-white border-t border-gray-100 shadow-lg"
        role="menu"
        aria-label="Mobile navigation"
      >
        <div class="py-2">
          <div 
            v-for="(item, index) in menuItems" 
            :key="item.name"
            role="none"
          >
            <NuxtLink
              :to="item.href"
              :class="[
                'block px-6 py-4 text-base font-medium transition-colors duration-150 border-l-4',
                item.current 
                  ? 'text-blue-700 bg-blue-50 border-blue-700' 
                  : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50 border-transparent'
              ]"
              @click="closeMobileMenu"
              @keydown="(e) => handleMenuKeydown(e, index)"
              role="menuitem"
              tabindex="0"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Use design system tokens and follow UNICEF guidelines */

/* Remove all border-radius as per original requirement */
* {
  border-radius: 0 !important;
}

/* Font family from design system */
.font-sans {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* WCAG-compliant focus styles with design system colors */
a:focus,
button:focus,
input:focus {
  outline: 2px solid #1e3a8a; /* black */
  outline-offset: 2px;
}

/* Ensure keyboard navigation support */
[role="menuitem"]:focus {
  outline: 0.5px solid #fff;
  outline-offset: -2px;
}

/* Smooth transitions following design system */
* {
  transition-property: color, background-color, border-color, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Reduced motion preference following accessibility guidelines */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .border-gray-100 {
    border-color: var(--color-gray-900);
  }
  
  .text-gray-600 {
    color: var(--color-gray-900);
  }
  
  .text-gray-700 {
    color: var(--color-gray-900);
  }
}

/* Dark mode support */
.dark nav {
  background-color: #111827; /* gray-900 */
  border-color: #374151; /* gray-700 */
}

.dark .bg-white {
  background-color: #1f2937; /* gray-800 */
}

.dark .text-gray-700 {
  color: #d1d5db; /* gray-300 */
}

.dark .text-gray-600 {
  color: #9ca3af; /* gray-400 */
}

.dark .border-gray-100 {
  border-color: #374151; /* gray-700 */
}

.dark .bg-gray-50 {
  background-color: #374151; /* gray-700 */
}

.dark .hover\:bg-gray-50:hover {
  background-color: #4b5563; /* gray-600 */
}

.dark .bg-blue-50 {
  background-color: rgba(59, 130, 246, 0.1); /* blue-500 with opacity */
}

/* Ensure z-index stacking for accessibility */
nav {
  z-index: 50;
}

/* Print styles for accessibility */
@media print {
  nav {
    display: none;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .max-w-7xl {
    max-width: 100%;
  }
}

/* Touch target sizes for mobile accessibility */
@media (max-width: 1024px) {
  button,
  a[role="menuitem"] {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Right-to-left language support */
[dir="rtl"] .space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}

[dir="rtl"] .space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}

/* Backdrop blur fallback for older browsers */
@supports not (backdrop-filter: blur(8px)) {
  nav {
    background-color: white;
  }
  .dark nav {
    background-color: #111827;
  }
}
</style>