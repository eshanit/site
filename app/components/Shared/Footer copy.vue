<script setup lang="ts">
// Icons are handled via NuxtIcon (Iconify)

// Social media icons - using Heroicons where available
const socialIcons = [
    {
        icon: 'facebook',
        href: '#',
        label: 'Facebook Link',
        title: 'Facebook'
    },
    {
        icon: 'instagram',
        href: '#',
        label: 'Instagram Link',
        title: 'Instagram'
    },
    {
        icon: 'linkedin',
        href: '#',
        label: 'LinkedIn Link',
        title: 'LinkedIn'
    },
    {
        icon: 'youtube',
        href: '#',
        label: 'YouTube Link',
        title: 'YouTube'
    },
    {
        icon: 'flickr',
        href: '#',
        label: 'Flickr Link',
        title: 'Flickr'
    }
]

// Footer links
const joinItems = [
    { text: 'For Students', href: '#' },
    { text: 'For Employers', href: '#' },
    { text: 'Volunteer', href: '#' },
    { text: 'Partner With Us', href: '#' },
    { text: 'Careers', href: '#' }
]

const footerLinks = [
    { text: 'Privacy Policy', href: '#' },
    { text: 'Terms of Service', href: '#' },
    { text: 'Accessibility', href: '#' }
]

// Simple SVG icons for social media
const SocialIcon = ({ icon }: { icon: string }) => {
  const icons: Record<string, string> = {
    facebook: `
      <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
    `,
    instagram: `
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    `,
    linkedin: `
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    `,
    youtube: `
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    `,
    flickr: `
      <path d="M0 12c0 3.074 2.49 5.564 5.564 5.564 3.074 0 5.564-2.49 5.564-5.564S8.638 6.436 5.564 6.436C2.49 6.436 0 8.926 0 12zm12.872 0c0 3.074 2.49 5.564 5.564 5.564s5.564-2.49 5.564-5.564S21.51 6.436 18.436 6.436C15.362 6.436 12.872 8.926 12.872 12z"/>
    `
  };

  return icons[icon] || '';
};
</script>

<template>
    <!-- Footer -->
    <footer class="bg-linear-to-br from-cyan-500 to-blue-900 text-white pt-16 pb-8 relative overflow-hidden">
      <!-- Animated Background Elements -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-20 left-10 w-32 h-32 rounded-full bg-cyan-500 animate-pulse"></div>
        <div class="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-blue-700 animate-ping animation-delay-1000"></div>
        <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-amber-400 rounded-full animate-bounce animation-delay-500"></div>
      </div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <!-- About Section -->
          <div class="space-y-6">
            <h3 class="text-3xl font-bold">
              <span class="text-cyan-300">Youth</span> <span class="text-amber-300">Pegisus</span>
            </h3>
            <p class="text-blue-100 text-lg">
              Empowering young people in Southern Africa through education, skills development, and community building.
            </p>
            <div class="flex space-x-4">
              <NuxtLink
                v-for="(social, index) in socialIcons" 
                :key="index"
                :href="social.href"
                class="text-blue-200 hover:text-white transition-colors bg-blue-800/50 p-2 rounded-full hover:bg-linear-to-r from-cyan-500 to-blue-700 hover:scale-110 duration-300"
                :title="social.title"
              >
                <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <g v-html="SocialIcon({ icon: social.icon })"></g>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Join Us Section -->
          <div class="space-y-6">
            <h4 class="text-xl font-bold uppercase tracking-wider text-cyan-300">Join Us</h4>
            <ul class="space-y-3">
              <li v-for="(item, index) in joinItems" :key="index">
                <NuxtLink :to="item.href" class="text-blue-100 hover:text-amber-300 transition-colors flex items-center group">
                  <NuxtIcon name="heroicons:arrow-right" class="mr-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {{ item.text }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Contact Section -->
          <div class="space-y-6">
            <h4 class="text-xl font-bold uppercase tracking-wider text-cyan-300">Contact Us</h4>
            <address class="not-italic space-y-3 text-blue-100">
              <div class="flex items-start">
                <NuxtIcon name="heroicons:map-pin" class="w-6 h-6 mt-0.5 mr-3 shrink-0 text-cyan-300" />
                <span>123 Youth Avenue, Masvingo, Zimbabwe</span>
              </div>
              <div class="flex items-center">
                <NuxtIcon name="heroicons:phone" class="w-6 h-6 mr-3 shrink-0 text-cyan-300" />
                <span>+263 123 456 789</span>
              </div>
              <div class="flex items-center">
                <NuxtIcon name="heroicons:envelope" class="w-6 h-6 mr-3 shrink-0 text-cyan-300" />
                <span>info@youthpegasus.org</span>
              </div>
            </address>
          </div>

          <!-- Newsletter Section -->
          <div class="space-y-6">
            <h4 class="text-xl font-bold uppercase tracking-wider text-cyan-300">Stay Updated</h4>
            <p class="text-blue-100">
              Subscribe to our newsletter for the latest programs and success stories.
            </p>
            <form class="space-y-3" @submit.prevent="">
              <input 
                type="email" 
                placeholder="Your email address" 
                class="w-full px-4 py-3 rounded-lg bg-blue-800/50 backdrop-blur-sm border border-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-white placeholder-blue-300"
                required
              >
              <button 
                type="submit" 
                class="w-full px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-700 hover:from-blue-700 hover:to-cyan-500 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-blue-800 my-12"></div>

        <!-- Bottom Footer -->
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-blue-300 text-sm">
            © 2025 Youth Pegasus. All rights reserved.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <NuxtLink 
              v-for="(link, index) in footerLinks" 
              :key="index"
              :to="link.href"
              class="text-blue-300 hover:text-amber-300 text-sm transition-colors"
            >
              {{ link.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
</template>

<style scoped>
/* Custom animation delays */
.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-1000 {
  animation-delay: 1000ms;
}
</style>