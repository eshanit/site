<script setup lang="ts">
import { ref } from 'vue'

// Social media links matching the navbar
const socialLinks = [
  {
    name: 'Twitter',
    href: '#',
    icon: 'i-heroicons-x-mark',
    color: 'hover:bg-black/10 hover:text-black'
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
]

// Quick links
const quickLinks = [
  { name: 'Program Overview', href: '/program' },
  { name: 'Our Partners', href: '/who-we-are' },
  { name: 'Where We Work', href: '/where-we-work' },
  { name: 'Research & Evidence', href: '/research' },
  { name: 'Get Involved', href: '/contact' },
  { name: 'Privacy Policy', href: '#' }
]

// Contact information
const contactInfo = [
  {
    icon: 'i-heroicons-envelope',
    title: 'General Inquiries',
    value: 'info@pegisus.org',
    href: 'mailto:info@pegisus.org'
  },
  {
    icon: 'i-heroicons-academic-cap',
    title: 'Research Partnerships',
    value: 'research@pegisus.org',
    href: 'mailto:research@pegisus.org'
  },
  {
    icon: 'i-heroicons-phone',
    title: 'Contact Number',
    value: '+27 21 123 4567',
    href: 'tel:+27211234567'
  }
]

// Partner institutions
const partnerInstitutions = [
  'University Hospital Basel',
  'South African Medical Research Council',
  'University of Zambia',
  'SolidarMed Zambia',
  'SolidarMed Zimbabwe'
]

// Newsletter subscription
const email = ref('')
const isSubscribed = ref(false)
const isSubmitting = ref(false)

const handleSubscribe = async () => {
  if (!email.value.trim()) return

  isSubmitting.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubscribed.value = true
  email.value = ''
  isSubmitting.value = false

  // Reset success message after 5 seconds
  setTimeout(() => {
    isSubscribed.value = false
  }, 5000)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 opacity-5">
      <div 
        v-for="i in 8" 
        :key="i"
        class="absolute rounded-full bg-gradient-to-r from-cyan-500 to-blue-900"
        :style="{
          width: `${Math.random() * 200 + 50}px`,
          height: `${Math.random() * 200 + 50}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          filter: 'blur(40px)',
          animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 5}s`
        }"
      ></div>
    </div>

    <!-- Main footer content -->
    <div class="relative z-10">
      <!-- Top section -->
      <div class="border-b border-gray-800/50">
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">
            <!-- Logo and description -->
            <div class="space-y-6">
              <NuxtLink to="/" class="inline-block">
                <div class="flex items-center space-x-3 group">
                  <div class="relative">
                    <div class="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-900 opacity-20 blur group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div class="relative bg-white p-2.5 shadow-lg border border-gray-100">
                      <!-- <AppFooterLogo size="md" /> -->
                    </div>
                  </div>
                  <div>
                    <div class="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      PEGISUS
                    </div>
                    <div class="text-sm text-gray-400 font-medium tracking-wider">
                      Southern Africa
                    </div>
                  </div>
                </div>
              </NuxtLink>

              <p class="text-gray-400 leading-relaxed text-sm max-w-sm">
                Peer Education for Gender Inclusion and Substance Use in Southern Africa — 
                Empowering youth through evidence-based programs and vocational integration.
              </p>

              <!-- Social links -->
              <div class="pt-4">
                <div class="text-sm text-gray-400 font-semibold mb-3">FOLLOW US</div>
                <div class="flex space-x-2">
                  <NuxtLink
                    v-for="social in socialLinks"
                    :key="social.name"
                    :href="social.href"
                    :title="social.name"
                    :class="[
                      'p-2.5 bg-gray-800/50 backdrop-blur-sm text-gray-400 transition-all duration-300 transform hover:scale-110',
                      social.color
                    ]"
                  >
                    <UIcon :name="social.icon" class="w-4 h-4" />
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- Quick links -->
            <div class="space-y-6">
              <h3 class="text-lg font-bold text-white flex items-center">
                <UIcon name="i-heroicons-link" class="w-5 h-5 mr-2 text-cyan-400" />
                Quick Links
              </h3>
              <ul class="space-y-3">
                <li v-for="link in quickLinks" :key="link.name">
                  <NuxtLink
                    :to="link.href"
                    class="text-gray-400 hover:text-cyan-300 transition-colors duration-300 flex items-center group"
                  >
                    <UIcon 
                      name="i-heroicons-chevron-right" 
                      class="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                    />
                    {{ link.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Contact info -->
            <div class="space-y-6">
              <h3 class="text-lg font-bold text-white flex items-center">
                <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 mr-2 text-cyan-400" />
                Get in Touch
              </h3>
              <div class="space-y-4">
                <a
                  v-for="contact in contactInfo"
                  :key="contact.title"
                  :href="contact.href"
                  class="flex items-start space-x-3 text-gray-400 hover:text-cyan-300 transition-colors duration-300 group"
                >
                  <div class="w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-blue-900/20 flex items-center justify-center flex-shrink-0 group-hover:from-cyan-500/30 group-hover:to-blue-900/30 transition-all">
                    <UIcon :name="contact.icon" class="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-white">{{ contact.title }}</div>
                    <div class="text-sm mt-0.5">{{ contact.value }}</div>
                  </div>
                </a>
              </div>
            </div>

            <!-- Newsletter -->
            <div class="space-y-6">
              <h3 class="text-lg font-bold text-white flex items-center">
                <UIcon name="i-heroicons-newspaper" class="w-5 h-5 mr-2 text-cyan-400" />
                Stay Updated
              </h3>
              
              <p class="text-gray-400 text-sm">
                For more information about the latest research, program updates, workshops, programes and impact stories, fill in your email below.
              </p>

              <!-- Success message -->
              <div 
                v-if="isSubscribed"
                class="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 p-4"
              >
                <div class="flex items-center space-x-3">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-400 flex-shrink-0" />
                  <div>
                    <div class="font-semibold text-green-300">Added to mailing list!</div>
                    <div class="text-sm text-green-400/80 mt-1">
                      Thank you for reaching out to us.
                    </div>
                  </div>
                </div>
              </div>

              <!-- Newsletter form -->
              <form @submit.prevent="handleSubscribe" class="space-y-3">
                <div class="relative">
                  <input
                    v-model="email"
                    type="email"
                    placeholder="Your email address"
                    required
                    class="w-full px-4 py-3 pl-11 bg-gray-800/50 backdrop-blur-sm border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 text-white placeholder-gray-500 transition-all"
                  />
                  <UIcon 
                    name="i-heroicons-envelope" 
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" 
                  />
                </div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}</span>
                  <UIcon 
                    :name="isSubmitting ? 'i-heroicons-arrow-path' : 'i-heroicons-arrow-right'" 
                    class="w-4 h-4" 
                    :class="isSubmitting ? 'animate-spin' : ''"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Middle section - Partner institutions -->
      <div class="border-b border-gray-800/50">
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="text-center mb-6">
            <h4 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              In Partnership With
            </h4>
            <div class="flex flex-wrap justify-center items-center gap-8">
              <span 
                v-for="institution in partnerInstitutions" 
                :key="institution"
                class="text-gray-400 hover:text-cyan-300 transition-colors duration-300 text-sm"
              >
                {{ institution }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom section -->
      <div class="py-8">
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <!-- Copyright -->
            <div class="text-gray-500 text-sm">
              © {{ new Date().getFullYear() }} PEGISUS Program. All rights reserved.
            </div>

            <!-- Legal links -->
            <div class="flex items-center space-x-6">
              <NuxtLink 
                to="#"
                class="text-gray-500 hover:text-cyan-300 transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </NuxtLink>
              <NuxtLink 
                to="#"
                class="text-gray-500 hover:text-cyan-300 transition-colors duration-300 text-sm"
              >
                Terms of Service
              </NuxtLink>
              <NuxtLink 
                to="#"
                class="text-gray-500 hover:text-cyan-300 transition-colors duration-300 text-sm"
              >
                Accessibility
              </NuxtLink>
              <NuxtLink 
                to="#"
                class="text-gray-500 hover:text-cyan-300 transition-colors duration-300 text-sm"
              >
                Sitemap
              </NuxtLink>
            </div>

            <!-- Back to top -->
            <button
              @click="scrollToTop"
              class="flex items-center space-x-2 text-gray-500 hover:text-cyan-300 transition-colors duration-300 group"
            >
              <span class="text-sm">Back to top</span>
              <UIcon 
                name="i-heroicons-arrow-up" 
                class="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" 
              />
            </button>
          </div>

          <!-- Additional info -->
          <div class="text-center mt-6">
            <p class="text-xs text-gray-600">
              PEGISUS is a research-based initiative implemented across Southern Africa.
              All content and images are protected by copyright laws.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Floating animation for background elements */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-20px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Gradient text animation */
.gradient-text {
  background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #1e40af 100%);
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

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

/* Custom scrollbar for the footer */
footer {
  scrollbar-width: none;
}

footer::-webkit-scrollbar {
  display: none;
}

/* Focus styles for accessibility */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid #06b6d4;
  outline-offset: 2px;
}

/* Smooth backdrop blur */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .max-w-8xl {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>