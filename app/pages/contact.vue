<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// Contact statistics data
const contactStats = [
    { value: '3', label: 'Countries', icon: 'i-heroicons-globe-alt', color: 'blue' },
    { value: '20+', label: 'Communities', icon: 'i-heroicons-home', color: 'orange' },
    { value: '500+', label: 'Youth Impacted', icon: 'i-heroicons-users', color: 'green' }
]

// Contact info
const contactInfo = [
    {
        icon: 'i-heroicons-envelope',
        title: 'Email Us',
        value: 'contact@pegisus.org',
        description: 'For general inquiries and partnership opportunities',
        color: 'blue'
    },
    {
        icon: 'i-heroicons-academic-cap',
        title: 'Research Inquiries',
        value: 'research@pegisus.org',
        description: 'For academic collaborations and research partnerships',
        color: 'orange'
    },
    {
        icon: 'i-heroicons-handshake',
        title: 'Partnerships',
        value: 'partners@pegisus.org',
        description: 'For vocational training programs and community partners',
        color: 'green'
    }
]

// Form state
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  organization: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// Animation refs
const heroVisible = ref(false)
const formVisible = ref(false)
const infoVisible = ref(false)
const statsHovered = ref<number | null>(null)
const infoHovered = ref<number | null>(null)

const heroRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const infoRef = ref<HTMLElement | null>(null)

onMounted(() => {
  useIntersectionObserver(
    heroRef,
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          heroVisible.value = true
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -120px 0px' }
  )

  useIntersectionObserver(
    formRef,
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          formVisible.value = true
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
  )

  useIntersectionObserver(
    infoRef,
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          infoVisible.value = true
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
  )
})

// Get color class based on stat color
const getColorGradient = (color: string) => {
    const colors = {
        blue: 'from-blue-600 to-blue-900',
        orange: 'from-orange-500 to-orange-700',
        green: 'from-green-500 to-green-700',
        cyan: 'from-cyan-500 to-blue-700'
    }
    return colors[color as keyof typeof colors] || colors.blue
}

// Form validation
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const handleSubmit = async () => {
  // Basic validation
  if (!form.value.firstName.trim() || !form.value.lastName.trim()) {
    submitError.value = 'Please enter your first and last name'
    return
  }

  if (!form.value.email.trim() || !validateEmail(form.value.email)) {
    submitError.value = 'Please enter a valid email address'
    return
  }

  if (!form.value.message.trim()) {
    submitError.value = 'Please enter your message'
    return
  }

  submitError.value = ''
  isSubmitting.value = true

  try {
    // In a real app, you would submit to your backend here
    // For now, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    submitSuccess.value = true
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      organization: '',
      message: ''
    }
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
    
  } catch (error) {
    submitError.value = 'An error occurred. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="w-full bg-white min-h-screen">
    <!-- Hero Section -->
    <div 
      ref="heroRef" 
      class="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24 lg:py-32"
      :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <div class="w-full max-w-7xl mx-auto">
        <!-- Grid layout - 12 column system -->
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          <!-- Text content - 6 columns -->
          <div class="lg:col-span-6 space-y-8">
            <!-- Contact Badge - PEGISUS professional style -->
            <div class="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 border-l-4 border-blue-600">
              <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-blue-600" />
              <span class="text-sm font-semibold text-blue-700 font-poppins">Get In Touch</span>
            </div>

            <!-- Main heading with PEGISUS clarity -->
            <div class="space-y-4">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins leading-tight">
                Contact Us
                <span class="text-blue-600 block">Let's Work Together</span>
              </h1>

              <!-- Impact Subtitle -->
              <p class="text-lg text-gray-600 leading-relaxed font-inter">
                Interested in partnering with PEGISUS, learning more about our program, 
                or exploring research collaborations? We'd love to hear from you.
              </p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-3 gap-4 py-6">
              <div 
                v-for="(stat, index) in contactStats" 
                :key="stat.label"
                class="text-center group cursor-pointer transform transition-all duration-300 hover:scale-105"
                @mouseenter="statsHovered = index"
                @mouseleave="statsHovered = null"
              >
                <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center text-white transition-all duration-300"
                     :class="`bg-gradient-to-br ${getColorGradient(stat.color)} ${statsHovered === index ? 'scale-110' : ''}`">
                    <UIcon :name="stat.icon" class="w-6 h-6" />
                </div>
                <div 
                  class="text-2xl md:text-3xl font-bold font-poppins transition-all duration-300"
                  :class="statsHovered === index ? `bg-gradient-to-r ${getColorGradient(stat.color)} bg-clip-text text-transparent` : 'text-gray-900'"
                >
                  {{ stat.value }}
                </div>
                <div class="text-sm text-gray-600 mt-1 font-inter">{{ stat.label }}</div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <NuxtLink
                to="/what-we-do"
                class="group relative px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold font-poppins shadow-md hover:shadow-lg transform transition-all duration-300 text-lg text-center flex items-center justify-center gap-3"
                aria-label="Learn about PEGISUS programs"
              >
                Learn About PEGISUS
                <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </NuxtLink>

              <button
                @click="$el.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })"
                class="group px-6 py-4 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 font-semibold font-poppins flex items-center justify-center gap-3"
                aria-label="Go to contact form"
              >
                <UIcon name="i-heroicons-arrow-down" class="w-5 h-5" />
                Send Message
              </button>
            </div>
          </div>

          <!-- Right Column: Visual - 6 columns -->
          <div class="lg:col-span-6 relative">
            <!-- Partnership Opportunities Card -->
            <div class="border border-gray-200 p-8 bg-white shadow-lg">
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-900 flex items-center justify-center">
                    <UIcon name="i-heroicons-handshake" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900 font-poppins">Partnership Opportunities</h3>
                    <div class="h-1 w-8 bg-blue-600 mt-1"></div>
                  </div>
                </div>

                <!-- Partnership List -->
                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-blue-600"></div>
                    <span class="text-sm text-gray-700 font-inter">Vocational training programs</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-orange-500"></div>
                    <span class="text-sm text-gray-700 font-inter">Research institutions</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-green-500"></div>
                    <span class="text-sm text-gray-700 font-inter">Community organizations</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-blue-700"></div>
                    <span class="text-sm text-gray-700 font-inter">Government agencies</span>
                  </div>
                </div>

                <!-- Quote -->
                <div class="pt-6 border-t border-gray-200">
                  <p class="text-sm text-gray-600 italic font-inter">
                    "Together, we can create sustainable impact for youth across Southern Africa."
                  </p>
                </div>
              </div>
            </div>

            <!-- Contact Methods -->
            <div class="mt-8 space-y-6">
              <div 
                v-for="(info, index) in contactInfo"
                :key="info.title"
                class="group relative bg-white border border-gray-200 p-6 shadow-md transition-all duration-300 hover:shadow-xl"
                @mouseenter="infoHovered = index"
                @mouseleave="infoHovered = null"
              >
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110"
                       :class="`bg-gradient-to-br ${getColorGradient(info.color)}`">
                    <UIcon :name="info.icon" class="w-5 h-5" />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-bold text-gray-900 font-poppins mb-1">{{ info.title }}</h4>
                    <p class="font-medium text-blue-600 font-inter mb-2">{{ info.value }}</p>
                    <p class="text-sm text-gray-600 font-inter">{{ info.description }}</p>
                  </div>
                </div>
                <!-- Hover indicator -->
                <div class="absolute bottom-0 left-0 h-1 transition-all duration-300"
                     :class="`${getColorGradient(info.color)} ${infoHovered === index ? 'w-full' : 'w-0'}`"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div 
      ref="formRef" 
      id="contact-form"
      class="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24 bg-gray-50"
      :class="formVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <div class="w-full max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <!-- Form - 6 columns -->
          <div class="lg:col-span-6 bg-white p-8 md:p-10 shadow-lg">
            <div class="mb-8">
              <div class="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 border-l-4 border-blue-600 mb-4">
                <UIcon name="i-heroicons-document-text" class="w-4 h-4 text-blue-600" />
                <span class="text-sm font-semibold text-blue-700 font-poppins">Send Message</span>
              </div>
              
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 font-poppins mb-2">
                Send Us a Message
              </h2>
              
              <div class="h-1 w-8 bg-blue-600 mb-4"></div>
              
              <p class="text-gray-600 font-inter">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <!-- Success Message -->
            <div 
              v-if="submitSuccess"
              class="mb-6 p-4 border-l-4 border-green-500 bg-green-50"
            >
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <div class="font-bold text-gray-900 font-poppins">Message Sent Successfully!</div>
                  <div class="text-sm text-gray-600 mt-1 font-inter">
                    Thank you for reaching out. We'll get back to you within 2-3 business days.
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div 
              v-if="submitError"
              class="mb-6 p-4 border-l-4 border-red-500 bg-red-50"
            >
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <div class="font-bold text-gray-900 font-poppins">{{ submitError }}</div>
                </div>
              </div>
            </div>

            <!-- Form Fields -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="firstName" class="block text-sm font-medium text-gray-700 font-inter">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-inter"
                    placeholder="Enter your first name"
                    aria-label="First name"
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 font-inter">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-inter"
                    placeholder="Enter your last name"
                    aria-label="Last name"
                  />
                </div>
              </div>

              <!-- Email and Organization -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="email" class="block text-sm font-medium text-gray-700 font-inter">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-inter"
                    placeholder="your.email@example.com"
                    aria-label="Email address"
                  />
                </div>

                <div class="space-y-2">
                  <label for="organization" class="block text-sm font-medium text-gray-700 font-inter">
                    Organization
                  </label>
                  <input
                    id="organization"
                    v-model="form.organization"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all font-inter"
                    placeholder="Your organization (optional)"
                    aria-label="Organization name"
                  />
                </div>
              </div>

              <!-- Message Field -->
              <div class="space-y-2">
                <label for="message" class="block text-sm font-medium text-gray-700 font-inter">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all resize-none font-inter"
                  placeholder="Tell us about your inquiry, partnership interest, or research collaboration..."
                  aria-label="Message content"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-900 text-white font-bold font-poppins shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
                aria-label="Send message"
              >
                <div class="flex items-center justify-center gap-3">
                  <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
                  <UIcon 
                    :name="isSubmitting ? 'i-heroicons-arrow-path' : 'i-heroicons-paper-airplane'" 
                    class="w-4 h-4" 
                    :class="isSubmitting ? 'animate-spin' : 'transform group-hover:translate-x-1 transition-transform'" 
                  />
                </div>
              </button>

              <p class="text-xs text-gray-500 text-center mt-4 font-inter">
                We respect your privacy. Your information will only be used to respond to your inquiry.
              </p>
            </form>
          </div>

          <!-- Contact Info - 6 columns -->
          <div class="lg:col-span-6 space-y-8">
            <!-- Partnership Info -->
            <div class="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50/50">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-700 flex items-center justify-center">
                  <UIcon name="i-heroicons-check-badge" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 text-lg font-poppins mb-3">Why Partner With PEGISUS?</h3>
                  <div class="space-y-3">
                    <div class="flex items-start gap-3">
                      <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700 font-inter">Evidence-based approach to youth development</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700 font-inter">Proven results in substance use prevention</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700 font-inter">Gender-transformative programming</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700 font-inter">Integration with vocational training</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Response Time -->
            <div class="border border-gray-200 p-6 bg-white shadow-sm">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-blue-100 flex items-center justify-center">
                  <UIcon name="i-heroicons-clock" class="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 font-poppins">Response Time</h4>
                  <p class="text-sm text-gray-600 mt-1 font-inter">We typically respond within 2-3 business days</p>
                </div>
              </div>
            </div>

            <!-- Our Network -->
            <div class="mt-12">
              <h3 class="text-xl font-bold text-gray-900 font-poppins mb-6">Our Network of Partners</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 bg-white border border-gray-200">
                  <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-900 flex items-center justify-center mb-3">
                    <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-white" />
                  </div>
                  <h4 class="font-bold text-gray-900 text-sm font-poppins mb-2">Research Partners</h4>
                  <p class="text-gray-600 text-xs font-inter">Universities and research institutions</p>
                </div>
                <div class="p-4 bg-white border border-gray-200">
                  <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-700 flex items-center justify-center mb-3">
                    <UIcon name="i-heroicons-briefcase" class="w-5 h-5 text-white" />
                  </div>
                  <h4 class="font-bold text-gray-900 text-sm font-poppins mb-2">Vocational Partners</h4>
                  <p class="text-gray-600 text-xs font-inter">Training programs and skills development</p>
                </div>
                <div class="p-4 bg-white border border-gray-200">
                  <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center mb-3">
                    <UIcon name="i-heroicons-user-group" class="w-5 h-5 text-white" />
                  </div>
                  <h4 class="font-bold text-gray-900 text-sm font-poppins mb-2">Community Partners</h4>
                  <p class="text-gray-600 text-xs font-inter">Local organizations and community leaders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24">
      <div class="w-full max-w-7xl mx-auto">
        <div class="bg-gradient-to-r from-blue-600 to-blue-900 p-8 md:p-10 text-white">
          <div class="text-center">
            <h3 class="text-2xl md:text-3xl font-bold font-poppins mb-6">
              Ready to Make a Difference?
            </h3>
            
            <div class="w-8 h-1 bg-white mx-auto mb-6"></div>
            
            <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto font-inter">
              Join us in creating sustainable change for young people across Southern Africa.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/what-we-do"
                class="px-8 py-3 bg-white text-blue-600 font-bold font-poppins shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-3"
                aria-label="Learn about PEGISUS programs"
              >
                <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
                <span>Learn About PEGISUS</span>
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
              </NuxtLink>
              
              <NuxtLink
                to="/where-we-work"
                class="px-8 py-3 bg-transparent text-white border-2 border-white font-bold font-poppins hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
                aria-label="See where we work"
              >
                <UIcon name="i-heroicons-map" class="w-5 h-5" />
                <span>See Where We Work</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Contact Stats -->
        <div class="mt-12 pt-8 border-t border-gray-300">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="text-lg font-bold font-poppins bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">24-48h</div>
              <div class="text-xs text-gray-600 font-inter">Response Time</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold font-poppins bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">3</div>
              <div class="text-xs text-gray-600 font-inter">Contact Channels</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold font-poppins bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">Global</div>
              <div class="text-xs text-gray-600 font-inter">Partnership Reach</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold font-poppins bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">2023</div>
              <div class="text-xs text-gray-600 font-inter">Active Since</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Import fonts following design system */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Remove all border-radius globally */
* {
  border-radius: 0 !important;
}

/* Form input focus styles */
input:focus, textarea:focus {
  box-shadow: 0 0 0 1px #1e3a8a;
  outline: none;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* WCAG-compliant focus styles */
a:focus,
button:focus {
  outline: 2px solid #1E3A8A;
  outline-offset: 2px;
}

/* Print styles for accessibility */
@media print {
  .bg-blue-50,
  .bg-orange-50,
  .bg-green-50 {
    background-color: #f8fafc !important;
    -webkit-print-color-adjust: exact;
  }
  
  a {
    text-decoration: underline;
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Responsive adjustments following 12-column grid */
@media (max-width: 1024px) {
  .lg\:col-span-6 {
    grid-column: span 12;
  }
}

@media (max-width: 640px) {
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-5xl {
    font-size: 2rem;
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 475px) {
  .grid-cols-2,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
}
</style>