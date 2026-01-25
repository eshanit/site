<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// Form state
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// Animation refs
const heroVisible = ref(false)
const formVisible = ref(false)
const infoVisible = ref(false)

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

// Contact information
const contactInfo = [
  {
    icon: 'i-heroicons-envelope',
    title: 'Email Us',
    value: 'contact@pegisus.org',
    description: 'For general inquiries and partnership opportunities'
  },
  {
    icon: 'i-heroicons-academic-cap',
    title: 'Research Inquiries',
    value: 'research@pegisus.org',
    description: 'For academic collaborations and research partnerships'
  },
  {
    icon: 'i-heroicons-cube-transparent',
    title: 'Partnerships',
    value: 'partners@pegisus.org',
    description: 'For vocational training programs and community partners'
  }
]
</script>

<template>
  <div class="bg-white min-h-screen">
    <!-- Hero Section -->
    <section 
      ref="heroRef" 
      class="pt-20 pb-16 md:pt-28 md:pb-20 px-4 sm:px-6 lg:px-8"
      :class="heroVisible ? 'fade-in-up' : 'opacity-0'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left Column: Text -->
          <div class="space-y-8">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-cyan-500"></div>
                <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Contact Us</span>
              </div>
              
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span class="block">Get In Touch</span>
                <span class="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-900">
                  Let's Work Together
                </span>
              </h1>
              
              <div class="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 my-6"></div>
              
              <p class="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                Interested in partnering with PEGISUS, learning more about our program, 
                or exploring research collaborations? We'd love to hear from you.
              </p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4">
              <div class="border border-gray-200 p-4 bg-white">
                <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">3</div>
                <div class="text-sm font-medium text-gray-900 mt-1">Countries</div>
              </div>
              <div class="border border-gray-200 p-4 bg-white">
                <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">20+</div>
                <div class="text-sm font-medium text-gray-900 mt-1">Communities</div>
              </div>
              <div class="border border-gray-200 p-4 bg-white">
                <div class="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">500+</div>
                <div class="text-sm font-medium text-gray-900 mt-1">Youth Impacted</div>
              </div>
            </div>
          </div>

          <!-- Right Column: Visual -->
          <div class="relative">
            <div class="border border-gray-200 p-6 md:p-8 bg-white shadow-sm">
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-900 flex items-center justify-center">
                    <UIcon name="i-heroicons-handshake" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-900">Partnership Opportunities</h3>
                    <div class="h-1 w-8 bg-gradient-to-r from-cyan-500 to-blue-900 mt-1"></div>
                  </div>
                </div>

                <div class="space-y-4">
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-cyan-500"></div>
                    <span class="text-sm text-gray-700">Vocational training programs</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-blue-600"></div>
                    <span class="text-sm text-gray-700">Research institutions</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-cyan-600"></div>
                    <span class="text-sm text-gray-700">Community organizations</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-2 h-2 bg-blue-700"></div>
                    <span class="text-sm text-gray-700">Government agencies</span>
                  </div>
                </div>

                <div class="pt-6 border-t border-gray-200">
                  <p class="text-sm text-gray-600 italic">
                    "Together, we can create sustainable impact for youth across Southern Africa."
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Decorative corner -->
            <div class="absolute -bottom-2 -right-2 w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-900"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Section -->
    <section 
      ref="formRef" 
      class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      :class="formVisible ? 'fade-in-up' : 'opacity-0'"
    >
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <!-- Form -->
          <div class="border border-gray-200 p-6 md:p-8 bg-white">
            <div class="mb-8">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-3 h-3 bg-cyan-500"></div>
                <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Send Message</span>
              </div>
              
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h2>
              
              <div class="h-1 w-8 bg-gradient-to-r from-cyan-500 to-blue-900 mb-4"></div>
              
              <p class="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <!-- Success Message -->
            <div 
              v-if="submitSuccess"
              class="mb-6 p-4 border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <div class="font-bold text-gray-900">Message Sent Successfully!</div>
                  <div class="text-sm text-gray-600 mt-1">
                    Thank you for reaching out. We'll get back to you within 2-3 business days.
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div 
              v-if="submitError"
              class="mb-6 p-4 border border-red-200 bg-gradient-to-r from-red-50 to-rose-50"
            >
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-600 flex items-center justify-center">
                  <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <div class="font-bold text-gray-900">{{ submitError }}</div>
                </div>
              </div>
            </div>

            <!-- Form Fields -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="firstName" class="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="lastName" class="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <!-- Email Field -->
              <div class="space-y-2">
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <!-- Message Field -->
              <div class="space-y-2">
                <label for="message" class="block text-sm font-medium text-gray-700">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-4 py-3 border border-gray-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all resize-none"
                  placeholder="Tell us about your inquiry, partnership interest, or research collaboration..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-900 text-white font-bold shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
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

              <p class="text-xs text-gray-500 text-center mt-4">
                We respect your privacy. Your information will only be used to respond to your inquiry.
              </p>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <!-- Contact Cards -->
            <div 
              v-for="(info, index) in contactInfo"
              :key="info.title"
              class="border border-gray-200 p-6 bg-white hover:border-cyan-300 hover:shadow transition-all duration-300 group"
              :style="`transition-delay: ${index * 100}ms`"
            >
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <UIcon :name="info.icon" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 mb-1">{{ info.title }}</h3>
                  <p class="text-cyan-600 font-medium mb-2">{{ info.value }}</p>
                  <p class="text-sm text-gray-600">{{ info.description }}</p>
                </div>
              </div>
            </div>

            <!-- Partnership Info -->
            <div class="border border-cyan-200 p-6 bg-gradient-to-r from-cyan-50/50 to-blue-50/50">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-900 flex items-center justify-center">
                  <UIcon name="i-heroicons-check-badge" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 text-lg mb-3">Why Partner With PEGISUS?</h3>
                  <div class="space-y-3">
                    <div class="flex items-start gap-3">
                      <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Evidence-based approach to youth development</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Proven results in substance use prevention</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Gender-transformative programming</span>
                    </div>
                    <div class="flex items-start gap-3">
                      <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                      <span class="text-sm text-gray-700">Integration with vocational training</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Response Time -->
            <div class="border border-gray-200 p-6 bg-white">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-gradient-to-r from-cyan-500/10 to-blue-900/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-clock" class="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">Response Time</h4>
                  <p class="text-sm text-gray-600 mt-1">We typically respond within 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Partners Section -->
    <section 
      ref="infoRef" 
      class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white"
      :class="infoVisible ? 'fade-in-up' : 'opacity-0'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-3 h-3 bg-cyan-500"></div>
            <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Our Network</span>
          </div>
          
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Network of Partners
          </h2>
          
          <div class="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-900 mx-auto mb-6"></div>
          
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            We collaborate with leading institutions across Southern Africa to create meaningful impact
          </p>
        </div>

        <!-- Partner Types -->
        <div class="grid md:grid-cols-3 gap-6">
          <div class="border border-gray-200 p-6 bg-white hover:border-cyan-300 hover:shadow transition-all duration-300">
            <div class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-900 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Research Partners</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Universities and research institutions contributing to evidence-based program development
            </p>
          </div>

          <div class="border border-gray-200 p-6 bg-white hover:border-cyan-300 hover:shadow transition-all duration-300">
            <div class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-900 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-briefcase" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Vocational Partners</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Training programs integrating PEGISUS into skills development for youth employment
            </p>
          </div>

          <div class="border border-gray-200 p-6 bg-white hover:border-cyan-300 hover:shadow transition-all duration-300">
            <div class="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-900 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-user-group" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Community Partners</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Local organizations and community leaders facilitating program implementation
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-4xl mx-auto">
        <div class="bg-gradient-to-r from-cyan-500 to-blue-900 p-8 md:p-10 text-white">
          <div class="text-center">
            <h3 class="text-2xl md:text-3xl font-bold mb-6">
              Ready to Make a Difference?
            </h3>
            
            <div class="w-8 h-1 bg-white mx-auto mb-6"></div>
            
            <p class="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Join us in creating sustainable change for young people across Southern Africa.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/what-we-do"
                class="px-8 py-3 bg-white text-cyan-600 font-bold shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                <UIcon name="i-heroicons-information-circle" class="w-5 h-5" />
                <span>Learn About PEGISUS</span>
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
              </NuxtLink>
              
              <NuxtLink
                to="/where-we-work"
                class="px-8 py-3 bg-transparent text-white border-2 border-white font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
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
              <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">24-48h</div>
              <div class="text-xs text-gray-600">Response Time</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">3</div>
              <div class="text-xs text-gray-600">Contact Channels</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">Global</div>
              <div class="text-xs text-gray-600">Partnership Reach</div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold bg-gradient-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">2023</div>
              <div class="text-xs text-gray-600">Active Since</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Remove all border-radius globally */
* {
  border-radius: 0 !important;
}

.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form input focus styles */
input:focus, textarea:focus {
  box-shadow: 0 0 0 1px #06b6d4;
  outline: none;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Stagger animations for contact cards */
.border.border-gray-200.p-6:nth-child(1) { animation-delay: 0.1s; }
.border.border-gray-200.p-6:nth-child(2) { animation-delay: 0.2s; }
.border.border-gray-200.p-6:nth-child(3) { animation-delay: 0.3s; }

@media (prefers-reduced-motion: reduce) {
  .fade-in-up,
  .border.border-gray-200.p-6 {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-6xl {
    font-size: 3rem;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
}

@media (max-width: 475px) {
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-5xl {
    font-size: 2rem;
  }
  
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>