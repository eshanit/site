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
      href: '/what-we-do/overview',
      current: route.path.startsWith('/what-we-do'),
      // submenu: [
      //   {
      //     name: 'Overview',
      //     href: '/what-we-do/overview',
      //     current: route.path === '/what-we-do/overview',
      //   },
      //   {
      //     name: 'Our Framework',
      //     href: '/what-we-do/framework',
      //     current: route.path === '/what-we-do/framework',
      //   },
      //   {
      //     name: 'Our Programs',
      //     href: '/what-we-do/programs',
      //     current: route.path === '/what-we-do/programs',
      //   }
      // ]
    },
    {
      name: 'Who We Are',
      href: '/who-we-are/team',
      current: route.path.startsWith('/who-we-are'),
      submenu: [
        {
          name: 'Our Team',
          href: '/who-we-are/team',
          current: route.path === '/who-we-are/team',
        },
        {
          name: 'Our Partners',
          href: '/who-we-are/partners',
          current: route.path === '/who-we-are/partners',
        }
      ]
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

// Handle submenu click - close menus on click
const handleSubmenuClick = (href: string) => {
  openSubmenu.value = null;
  closeMobileMenu();
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
  <header 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans"
    :class="[
      isScrolled 
        ? 'bg-white/98 shadow-md backdrop-blur-md' 
        : 'bg-white/95 backdrop-blur-sm'
    ]"
    role="banner"
  >
    <!-- Skip to main content link for accessibility -->
    <a 
      href="#main-content" 
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-blue-700 text-white px-4 py-3 z-[99999] font-medium text-sm"
      @keydown.tab="closeMobileMenu"
    >
      Skip to main content
    </a>

    <!-- Top accent bar -->
    <div class="h-1 bg-gradient-to-r from-brand-darkest via-brand-medium to-brand-light"></div>

    <!-- Main navigation container - Full width -->
    <div class="w-full px-4 md:px-6 lg:px-8 xl:px-12">
      <div class="flex items-center justify-between py-4 lg:py-5">
        <!-- Logo Section -->
        <div class="flex-shrink-0">
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
        <nav class="hidden lg:flex items-center" aria-label="Main navigation">
          <ul class="flex items-center gap-1">
            <li 
              v-for="(item, index) in menuItems" 
              :key="item.name" 
              class="relative"
              @mouseenter="item.submenu ? openSubmenu = item.name : null"
              @mouseleave="item.submenu ? openSubmenu = null : null"
            >
              <NuxtLink
                :to="item.href"
                class="relative px-5 py-3 font-medium text-gray-700 transition-all duration-200 flex items-center gap-2 group"
                :class="{ 'text-blue-700': item.current }"
                :aria-current="item.current ? 'page' : undefined"
                :aria-expanded="item.submenu ? openSubmenu === item.name : undefined"
                :aria-haspopup="item.submenu ? 'true' : undefined"
                @keydown="(e) => handleMenuKeydown(e, index)"
                @click="item.submenu ? toggleSubmenu(item.name) : null"
                role="menuitem"
                tabindex="0"
              >
                <span class="text-base font-semibold tracking-wide">{{ item.name }}</span>
                <UIcon 
                  v-if="item.submenu" 
                  name="i-heroicons-chevron-down" 
                  class="w-4 h-4 transition-transform duration-200"
                  :class="openSubmenu === item.name ? 'rotate-180' : ''"
                />
                
                <!-- Animated underline -->
                <span 
                  class="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-brand-dark to-brand-light transition-all duration-300"
                  :class="item.current ? 'w-full' : 'w-0 group-hover:w-full'"
                  aria-hidden="true"
                ></span>
              </NuxtLink>

              <!-- Dropdown Submenu -->
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
                  class="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl border border-gray-100 py-2 z-50"
                  role="menu"
                  aria-label="Submenu"
                >
                  <div class="absolute -top-2 left-4 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45"></div>
                  <NuxtLink
                    v-for="subitem in item.submenu"
                    :key="subitem.name"
                    :to="subitem.href"
                    class="relative block px-5 py-3 text-sm transition-all duration-150 border-l-4"
                    :class="[
                      subitem.current 
                        ? 'text-blue-700 bg-blue-50 border-blue-700' 
                        : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50 hover:border-blue-300 border-transparent'
                    ]"
                    role="menuitem"
                    tabindex="0"
                    @click="handleSubmenuClick(subitem.href)"
                  >
                    {{ subitem.name }}
                  </NuxtLink>
                </div>
              </Transition>
            </li>
          </ul>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center gap-3">
          <!-- Search button (mobile) -->
          <button
            @click="isSearchOpen = !isSearchOpen"
            class="lg:hidden p-2.5 text-gray-600 hover:text-blue-700 hover:bg-gray-100 transition-all duration-200"
            :aria-label="isSearchOpen ? 'Close search' : 'Open search'"
          >
            <UIcon 
              :name="isSearchOpen ? 'i-heroicons-x-mark' : 'i-heroicons-magnifying-glass'" 
              class="w-5 h-5" 
            />
          </button>

          <!-- Search input (desktop) -->
          <div class="hidden lg:block">
            <div class="relative group">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search..."
                class="w-52 px-4 py-2.5 pl-10 border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-800 transition-all duration-200"
                @keydown="handleSearchKeydown"
              />
              <UIcon 
                name="i-heroicons-magnifying-glass" 
                class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" 
              />
            </div>
          </div>

          <!-- Dark/Light Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2.5 text-gray-600 hover:text-blue-700 hover:bg-gray-100 transition-all duration-200"
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
            class="lg:hidden p-2.5 transition-all duration-200 hover:bg-gray-100"
            :class="isMenuOpen ? 'text-blue-700' : 'text-gray-600 hover:text-blue-700'"
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
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-20"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 max-h-20"
        leave-to-class="opacity-0 max-h-0"
      >
        <div 
          v-if="isSearchOpen"
          class="lg:hidden overflow-hidden pb-4"
        >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full px-4 py-3.5 pl-12 border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              @keydown="handleSearchKeydown"
            />
            <UIcon 
              name="i-heroicons-magnifying-glass" 
              class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
            />
            <button
              @click="handleSearch"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white px-4 py-1.5 text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </Transition>

      <!-- Scroll progress indicator -->
      <div
        v-if="isScrolled"
        class="h-0.5 bg-gradient-to-r from-brand-dark via-brand-light to-brand-dark origin-left"
        :style="{ 
          width: `${scrollProgress * 100}%`,
          transition: 'width 0.1s ease-out'
        }"
        aria-hidden="true"
      ></div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-screen"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-screen"
      leave-to-class="opacity-0 max-h-0"
    >
      <div 
        v-show="isMenuOpen"
        id="mobile-menu"
        class="lg:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
        role="menu"
        aria-label="Mobile navigation"
      >
        <nav class="py-2">
          <div 
            v-for="(item, index) in menuItems" 
            :key="item.name"
            role="none"
          >
            <!-- Main menu item with expandable submenu -->
            <div v-if="item.submenu">
              <button
                @click="toggleSubmenu(item.name)"
                class="w-full text-left px-6 py-4 text-base font-medium transition-all duration-150 border-l-4 flex items-center justify-between"
                :class="[
                  item.current 
                    ? 'text-blue-700 bg-blue-50 border-blue-700' 
                    : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50 border-transparent'
                ]"
                :aria-expanded="openSubmenu === item.name"
                role="menuitem"
                tabindex="0"
              >
                <span class="font-semibold">{{ item.name }}</span>
                <UIcon 
                  name="i-heroicons-chevron-down" 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="openSubmenu === item.name ? 'rotate-180' : ''"
                />
              </button>
              
              <!-- Mobile submenu items -->
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-40"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 max-h-40"
                leave-to-class="opacity-0 max-h-0"
              >
                <div 
                  v-if="openSubmenu === item.name"
                  class="bg-gray-50 overflow-hidden"
                  role="menu"
                >
                  <NuxtLink
                    v-for="subitem in item.submenu"
                    :key="subitem.name"
                    :to="subitem.href"
                    class="block pl-12 pr-6 py-3.5 text-sm transition-all duration-150 border-l-4"
                    :class="[
                      subitem.current 
                        ? 'text-blue-700 bg-blue-50 border-blue-700' 
                        : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100 border-transparent'
                    ]"
                    role="menuitem"
                    tabindex="0"
                    @click="handleSubmenuClick(subitem.href)"
                  >
                    {{ subitem.name }}
                  </NuxtLink>
                </div>
              </Transition>
            </div>

            <!-- Regular menu item without submenu -->
            <NuxtLink
              v-else
              :to="item.href"
              class="block px-6 py-4 text-base font-semibold transition-all duration-150 border-l-4"
              :class="[
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
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* Design system styles */

/* Remove all border-radius as per original requirement */
* {
  border-radius: 0 !important;
}

/* Font family from design system */
.font-sans {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* WCAG-compliant focus styles */
a:focus,
button:focus,
input:focus {
  outline: 2px solid #0078c1;
  outline-offset: 2px;
}

/* Ensure keyboard navigation support */
[role="menuitem"]:focus {
  outline: 2px solid #0078c1;
  outline-offset: -2px;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Reduced motion preference */
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
    border-color: #111827;
  }
  
  .text-gray-600,
  .text-gray-700 {
    color: #111827;
  }
}

/* Dark mode support */
.dark header {
  background-color: #111827;
  border-color: #374151;
}

.dark .bg-white {
  background-color: #1f2937;
}

.dark .text-gray-700 {
  color: #d1d5db;
}

.dark .text-gray-600 {
  color: #9ca3af;
}

.dark .border-gray-100,
.dark .border-gray-200 {
  border-color: #374151;
}

.dark .bg-gray-50 {
  background-color: #374151;
}

.dark .hover\:bg-gray-50:hover,
.dark .hover\:bg-gray-100:hover {
  background-color: #4b5563;
}

.dark .bg-blue-50 {
  background-color: rgba(59, 130, 246, 0.15);
}

/* Ensure z-index stacking */
header {
  z-index: 50;
}

/* Print styles */
@media print {
  header {
    display: none;
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
[dir="rtl"] .gap-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}

[dir="rtl"] .gap-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 1;
}

/* Backdrop blur fallback for older browsers */
@supports not (backdrop-filter: blur(8px)) {
  header {
    background-color: white;
  }
  .dark header {
    background-color: #111827;
  }
}
</style>
