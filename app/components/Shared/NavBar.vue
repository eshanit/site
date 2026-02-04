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

// Handle search functionality
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to search results page or filter content
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`);
    searchQuery.value = '';
    isSearchOpen.value = false;
  }
};

// Toggle search visibility
const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value;
  if (!isSearchOpen.value) {
    searchQuery.value = '';
  }
};

// Handle keyboard navigation for search
const handleSearchKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch();
  } else if (event.key === 'Escape') {
    isSearchOpen.value = false;
    searchQuery.value = '';
  }
};

// Handle scroll effect with reduced motion consideration
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
  // Calculate scroll progress for the scroll indicator
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  scrollProgress.value = maxScroll > 0 ? window.scrollY / maxScroll : 0;
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

// Navigation menu following design system structure
const menuItems = computed(() => {
  const items: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      current: route.path === '/',
      description: 'Welcome to PEGISUS'
    },
    {
      name: 'What We Do',
      href: '/what-we-do',
      current: route.path.startsWith('/what-we-do'),
      description: 'Skills for tomorrow',
    },
    {
      name: 'Who We Are',
      href: '/who-we-are',
      current: route.path.startsWith('/who-we-are'),
      description: 'Working with youth',
    },
    {
      name: 'Where We Work',
      href: '/where-we-work',
      current: route.path.startsWith('/where-we-work'),
      description: 'Community-led solutions',
    },
    {
      name: 'Contact',
      href: '/contact',
      current: route.path.startsWith('/contact'),
      description: 'Get in touch'
    }
  ];
  return items;
});

// Social media links following UNICEF branding guidelines
const socialLinks = ref([
  {
    name: 'Twitter',
    href: '#',
    icon: 'i-heroicons-x-mark',
    ariaLabel: 'Follow PEGISUS on Twitter',
    color: 'hover:bg-cyan-50 hover:text-cyan-500'
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: 'i-heroicons-user-group',
    ariaLabel: 'Connect with PEGISUS on LinkedIn',
    color: 'hover:bg-blue-50 hover:text-blue-500'
  },
  {
    name: 'YouTube',
    href: '#',
    icon: 'i-heroicons-play',
    ariaLabel: 'Watch PEGISUS videos on YouTube',
    color: 'hover:bg-red-50 hover:text-red-500'
  }
]);

// Language options following UNICEF standards
const languages = ref([
  { code: 'en', name: 'English', current: true },
  { code: 'fr', name: 'Français', current: false },
  { code: 'es', name: 'Español', current: false },
  { code: 'ar', name: 'العربية', current: false },
]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  openSubmenu.value = null;
};

const closeMobileMenu = () => {
  isMenuOpen.value = false;
  openSubmenu.value = null;
};

const toggleSubmenu = (menuName: string) => {
  openSubmenu.value = openSubmenu.value === menuName ? null : menuName;
};

const switchLanguage = (code: string) => {
  // Update current language state
  languages.value = languages.value.map(lang => ({
    ...lang,
    current: lang.code === code
  }));
  // In a real app, you would also update the app's locale here
  // e.g., locale.value = code;
};

// Keyboard navigation with proper ARIA support
const handleKeydown = (event: KeyboardEvent, item: MenuItem) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (item.submenu) {
      toggleSubmenu(item.name);
    } else {
      closeMobileMenu();
      navigateTo(item.href);
    }
  } else if (event.key === 'Escape') {
    closeMobileMenu();
  }
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
    :class="[
      'top-0 z-50 transition-all duration-300 font-sans',
      isScrolled 
        ? 'bg-white' 
        : 'bg-white'
    ]"
    role="navigation"
    aria-label="Main navigation"
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
    <div class="w-full max-w-8xl mx-auto">
      <!-- Top Row: Logo (Gradient Strip) - Always visible -->
      <div 
        class="bg-gradient-to-r from-white via-cyan-50 to-blue-900 px-4 sm:px-6 lg:px-8 shadow-sm"
        style="background: linear-gradient(to right, white 20%, #a5f3fc 30%, #1e3a8a 100%);"
      >
        <div class="flex justify-between items-center h-24">
          <!-- Logo Section -->
          <div class="shrink-0 flex items-center">
            <NuxtLink 
              to="/" 
              class="flex items-center space-x-4 group"
              aria-label="PEGISUS Home"
              @click="closeMobileMenu"
            >
              <!-- Use AppLogo component -->
              <AppLogo size="navbar" />
            </NuxtLink>
          </div>
          
          <!-- Search Bar (Smaller) -->
          <div class="flex-1 max-w-md mx-8">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="w-full px-3 py-2 pl-10 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-gray-800 bg-white/90"
                @keydown="handleSearchKeydown"
              />
              <svg 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-700 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="handleSearch"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <!-- Dark/Light Mode Toggle -->
          <div class="shrink-0 ml-4">
            <button
              @click="toggleDarkMode"
              class="flex items-center justify-center w-10 h-10 bg-white/90 text-gray-700 rounded border border-gray-300 cursor-pointer hover:bg-white hover:text-blue-700 transition-colors duration-200"
              :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
              :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <!-- Sun icon (light mode) -->
              <svg
                v-if="isDarkMode"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              <!-- Moon icon (dark mode) -->
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Row: Navigation Items (White Background) -->
      <div 
        class="bg-white shadow-sm transition-all duration-300 relative z-50"
      >
        <div class="px-4 sm:px-6 lg:px-8 max-w-8xl mx-auto">
          <!-- Main Navigation Bar -->
          <div class="flex justify-between items-center h-16">
            <!-- Logo Section in Bottom Row (for mobile menu toggle) -->
            <div class="shrink-0 flex items-center lg:hidden">
              <NuxtLink 
                to="/" 
                class="flex items-center space-x-2"
                aria-label="PEGISUS Home"
                @click="closeMobileMenu"
              >
                <AppLogo size="navbar" />
              </NuxtLink>
            </div>

            <!-- Desktop Navigation Menu -->
            <div class="hidden lg:flex items-center space-x-2 ml-auto">
              <div 
                v-for="(item, index) in menuItems" 
                :key="item.name" 
                class="relative"
              >
                <div class="relative">
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      'px-5 py-4 font-semibold text-lg transition-all duration-200 flex items-center space-x-2 relative group/navitem ',
                      item.current ? 'text-blue-700 bg-blue-50' : 'hover:bg-blue-50'
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                    :aria-haspopup="item.submenu ? 'true' : undefined"
                    :aria-expanded="item.submenu && openSubmenu === item.name ? 'true' : 'false'"
                    @mouseenter="item.submenu ? openSubmenu = item.name : null"
                    @mouseleave="item.submenu ? openSubmenu = null : null"
                    @focusin="item.submenu ? openSubmenu = item.name : null"
                    @focusout="item.submenu ? openSubmenu = null : null"
                    @keydown="(e) => handleMenuKeydown(e, index)"
                    role="menuitem"
                    tabindex="0"
                  >
                    <!-- Text only -->
                    <span class="text-lg text-gray-900 font-semibold tracking-tight">
                      {{ item.name }}
                    </span>

                    <!-- Submenu indicator -->
                    <UIcon 
                      v-if="item.submenu"
                      name="i-heroicons-chevron-down" 
                      class="w-3 h-3 transition-transform duration-200"
                      :class="openSubmenu === item.name ? 'rotate-180' : ''"
                      aria-hidden="true"
                    />

                    <!-- Active indicator -->
                    <div 
                      v-if="item.current"
                      class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700"
                      aria-hidden="true"
                    ></div>

                    <!-- Hover indicator -->
                    <div 
                      v-else
                      class="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-blue-700 opacity-0 group-hover/navitem:opacity-100 group-hover/navitem:left-0 group-hover/navitem:right-0 transition-all duration-200"
                      aria-hidden="true"
                    ></div>
                  </NuxtLink>

                  <!-- Desktop Submenu -->
                  <Transition
                    enter-active-class="transition-all duration-200 ease-out"
                    enter-from-class="opacity-0 -translate-y-2"
                    enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-150 ease-in"
                    leave-from-class="opacity-100 translate-y-0"
                    leave-to-class="opacity-0 -translate-y-2"
                  >
                    <div 
                      v-if="item.submenu && openSubmenu === item.name"
                      class="absolute left-0 top-full w-56 bg-white border border-gray-200 shadow-lg mt-1 z-50"
                      @mouseenter="openSubmenu = item.name"
                      @mouseleave="openSubmenu = null"
                      role="menu"
                    >
                      <div class="py-2">
                        <NuxtLink
                          v-for="subItem in item.submenu"
                          :key="subItem.name"
                          :to="subItem.href"
                          :class="[
                            'flex items-center px-5 py-4 text-lg font-medium transition-colors duration-150',
                            subItem.current
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-900 hover:bg-gray-50 hover:text-blue-700'
                          ]"
                          @click="openSubmenu = null"
                          role="menuitem"
                          tabindex="-1"
                        >
                          <span>{{ subItem.name }}</span>
                        </NuxtLink>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>

            <!-- Mobile menu button and language selector -->
            <div class="flex items-center space-x-4">
              <!-- Mobile menu button -->
              <button 
                @click="toggleMenu"
                :class="[
                  'lg:hidden p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2',
                  isMenuOpen 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                ]"
                :aria-label="isMenuOpen ? 'Close main menu' : 'Open main menu'"
                :aria-expanded="isMenuOpen"
                :aria-controls="'mobile-menu'"
              >
                <UIcon 
                  v-if="!isMenuOpen" 
                  name="i-heroicons-bars-3" 
                  class="w-5 h-5" 
                  aria-hidden="true"
                />
                <UIcon 
                  v-else 
                  name="i-heroicons-x-mark" 
                  class="w-5 h-5" 
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation Menu (Outside bottom row, full width) -->
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
            id="mobile-menu"
            class="lg:hidden bg-white border border-gray-200 shadow-lg mt-1 mb-2"
            role="menu"
            aria-label="Mobile navigation"
          >
            <div class="space-y-0">
              <div 
                v-for="(item, index) in menuItems" 
                :key="item.name"
                class="border-b border-gray-100"
                role="none"
              >
                <div class="flex flex-col">
                  <div 
                    :class="[
                      'flex items-center justify-between px-5 py-4 text-lg font-semibold transition-all duration-150 group cursor-pointer',
                      item.current
                        ? 'bg-blue-50 text-blue-700'  // Blue when active
                        : 'text-gray-900 hover:bg-gray-50 hover:text-blue-700'  // Black when inactive, blue on hover
                    ]"
                    @click="item.submenu ? toggleSubmenu(item.name) : (closeMobileMenu(), navigateTo(item.href))"
                    @keydown="(e) => handleKeydown(e, item)"
                    @keydown.navigation="(e) => handleMenuKeydown(e, index)"
                    :tabindex="0"
                    role="menuitem"
                    :aria-expanded="item.submenu && openSubmenu === item.name"
                    :aria-haspopup="item.submenu ? 'true' : 'false'"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="flex-1 text-left">
                        <div class="font-medium">{{ item.name }}</div>
                        <div 
                          v-if="item.description"
                          class="text-xs text-gray-600 group-hover:text-blue-600 mt-0.5 font-sans"
                        >
                          {{ item.description }}
                        </div>
                      </div>
                    </div>

                    <!-- Chevron indicator for submenu -->
                    <UIcon 
                      v-if="item.submenu"
                      name="i-heroicons-chevron-down" 
                      class="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-transform duration-150"
                      :class="openSubmenu === item.name ? 'rotate-180' : ''"
                      aria-hidden="true"
                    />
                    <UIcon 
                      v-else
                      name="i-heroicons-chevron-right" 
                      class="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-150"
                      aria-hidden="true"
                    />
                  </div>

                  <!-- Mobile Submenu -->
                  <Transition
                    enter-active-class="transition-all duration-200 ease-out"
                    enter-from-class="opacity-0 max-h-0"
                    enter-to-class="opacity-100 max-h-96"
                    leave-active-class="transition-all duration-150 ease-in"
                    leave-from-class="opacity-100 max-h-96"
                    leave-to-class="opacity-0 max-h-0"
                  >
                    <div 
                      v-if="item.submenu && openSubmenu === item.name"
                      class="bg-gray-50 overflow-hidden"
                      role="menu"
                    >
                      <NuxtLink
                        v-for="subItem in item.submenu"
                        :key="subItem.name"
                        :to="subItem.href"
                        class="flex items-center px-8 py-4 text-lg font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 transition-colors duration-150"
                        @click="closeMobileMenu"
                        role="menuitem"
                        tabindex="-1"
                      >
                        <UIcon name="i-heroicons-chevron-right" class="w-3 h-3 mr-3 text-gray-400" aria-hidden="true" />
                        <span>{{ subItem.name }}</span>
                      </NuxtLink>
                    </div>
                  </Transition>
                </div>
              </div>

              <!-- Mobile Social Links -->
              <div class="flex justify-center space-x-2 px-4 py-3 border-b border-gray-200">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.name" 
                  :href="social.href" 
                  :title="social.name"
                  :class="[
                    'p-2 text-gray-400 transition-all duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2',
                    social.color
                  ]"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.ariaLabel"
                >
                  <UIcon :name="social.icon" class="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Scroll indicator -->
      <div
        v-if="isScrolled"
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 origin-left transition-transform duration-200"
        :style="{ 
          transform: `scaleX(${scrollProgress})`,
          transition: 'transform 0.1s ease-out'
        }"
        aria-hidden="true"
      ></div>
    </div>
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
button:focus {
  outline: 2px solid #1d4ed8; /* blue-700 */
  outline-offset: 2px;
}

/* Ensure keyboard navigation support */
[role="menuitem"]:focus {
  outline: 2px solid #1d4ed8;
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
  .border-gray-200 {
    border-color: var(--color-gray-900);
  }
  
  .text-gray-600 {
    color: var(--color-gray-900);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  nav {
    background-color: #111827; /* gray-900 */
    border-color: #374151; /* gray-700 */
  }
  
  .bg-white {
    background-color: #1f2937; /* gray-800 */
  }
  
  .text-gray-800 {
    color: #f3f4f6; /* gray-100 */
  }
  
  .text-gray-600 {
    color: #d1d5db; /* gray-300 */
  }
  
  .border-gray-200 {
    border-color: #4b5563; /* gray-600 */
  }
  
  .bg-gray-50 {
    background-color: #374151; /* gray-700 */
  }
  
  .hover\:bg-gray-50:hover {
    background-color: #4b5563; /* gray-600 */
  }
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
  .max-w-8xl {
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
[dir="rtl"] .space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}

[dir="rtl"] .space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}

[dir="rtl"] .space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}
</style>