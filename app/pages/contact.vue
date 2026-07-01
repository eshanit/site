<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

// Animation refs
const heroVisible = ref(false)
const heroRef = ref<HTMLElement | null>(null)

// Modal state
const modalOpen = ref(false)
const sending = ref(false)
const modalSuccess = ref(false)
const modalError = ref('')

// Form data for modal
const modalForm = ref({
  name: '',
  email: '',
  message: ''
})

// Intersection Observer for hero animation
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
})

// Open modal
const openModal = () => {
  modalOpen.value = true
  modalSuccess.value = false
  modalError.value = ''
}

// Close modal
const closeModal = () => {
  if (sending.value) return
  modalOpen.value = false
  modalForm.value = { name: '', email: '', message: '' }
  modalSuccess.value = false
  modalError.value = ''
}

// Validate email
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Submit message to backend (which will forward to jennifer.belus@unibas.ch)
const submitMessage = async () => {
  // Validation
  if (!modalForm.value.name.trim()) {
    modalError.value = 'Please enter your name'
    return
  }
  if (!modalForm.value.email.trim() || !validateEmail(modalForm.value.email)) {
    modalError.value = 'Please enter a valid email address'
    return
  }
  if (!modalForm.value.message.trim()) {
    modalError.value = 'Please enter your message'
    return
  }

  modalError.value = ''
  sending.value = true

  try {
    // Send to backend endpoint that will email jennifer.belus@unibas.ch
    // Replace '/api/contact' with your actual backend endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: modalForm.value.name,
        email: modalForm.value.email,
        message: modalForm.value.message,
        to: 'jennifer.belus@unibas.ch'
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    modalSuccess.value = true
    modalForm.value = { name: '', email: '', message: '' }
    
    // Close modal after 2 seconds on success
    setTimeout(() => {
      closeModal()
    }, 2000)
  } catch (error) {
    console.error('Error sending message:', error)
    modalError.value = 'An error occurred. Please try again later.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="w-full bg-white min-h-full">
    <!-- Hero Section - Minimal -->
    <div 
      ref="heroRef" 
      class="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16 sm:py-24 lg:py-32 bg-cover bg-center bg-no-repeat overflow-hidden"
      :class="heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
    >
      <!-- Image overlay on left 1/3 -->
      <div class="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden">
        <NuxtImg
          src="/img/pegi_tree_.webp"
          alt="Decorative tree illustration"
          class="w-full h-full object-cover opacity-40"
          loading="lazy"
        />
      </div>

      <div class="w-full max-w-4xl mx-auto text-center relative z-10">
        <!-- Contact Badge -->
        <div class="inline-flex items-center gap-2 bg-brand-lightest px-4 py-2 border-l-4 border-brand-medium mb-6">
          <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-brand-medium" />
          <span class="text-sm font-semibold text-brand-dark font-poppins">Get In Touch</span>
        </div>

        <!-- Main heading -->
        <div class="space-y-4">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-poppins leading-tight">
            Contact Us
            <span class="text-brand-medium block">Let's Work Together</span>
          </h1>

          <!-- Short description -->
          <p class="text-lg text-gray-600 leading-relaxed font-inter max-w-2xl mx-auto">
            Have a question or want to get in touch? Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <!-- Action button - opens message modal -->
        <div class="flex justify-center pt-8">
          <button
            @click="openModal"
            class="group px-8 py-4 bg-gradient-to-r from-brand-medium to-brand-dark hover:from-brand-dark hover:to-brand-darkest text-white font-bold font-poppins shadow-md hover:shadow-lg transform transition-all duration-300 text-lg flex items-center justify-center gap-3"
            aria-label="Open message form"
          >
            <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 transition-transform group-hover:translate-x-1" />
            Send a Message
          </button>
        </div>
      </div>
    </div>

    <!-- Message Modal -->
    <Teleport to="body">
      <div 
        v-if="modalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="bg-white w-full max-w-md shadow-xl transform transition-all">
          <!-- Modal Header -->
          <div class="flex justify-between items-center p-6 border-b border-gray-200">
            <div>
              <h3 class="text-xl font-bold text-gray-900 font-poppins">Send a Message</h3>
              <p class="text-sm text-gray-500 mt-1 font-inter">We'll get back to you shortly</p>
            </div>
            <button 
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
              :disabled="sending"
              aria-label="Close modal"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <!-- Modal Body - Form -->
          <div class="p-6 space-y-5">
            <!-- Success Message -->
            <div 
              v-if="modalSuccess"
              class="p-4 border-l-4 border-brand-teal bg-teal-50"
            >
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-brand-teal flex-shrink-0" />
                <div>
                  <div class="font-bold text-gray-900 font-poppins">Message Sent!</div>
                  <div class="text-sm text-gray-600 mt-1 font-inter">
                    Your message has been sent to Jennifer Belus. We'll respond within 2-3 business days.
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div 
              v-if="modalError"
              class="p-4 border-l-4 border-brand-dark bg-brand-lightest"
            >
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-brand-dark flex-shrink-0" />
                <div class="font-bold text-gray-900 font-poppins">{{ modalError }}</div>
              </div>
            </div>

            <form @submit.prevent="submitMessage" class="space-y-5">
              <!-- Name Field -->
              <div class="space-y-2">
                <label for="modal-name" class="block text-sm font-medium text-gray-700 font-inter">
                  Full Name *
                </label>
                <input
                  id="modal-name"
                  v-model="modalForm.name"
                  type="text"
                  required
                  :disabled="sending"
                  class="w-full px-4 py-3 border border-gray-300 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition-all font-inter"
                  placeholder="Your full name"
                />
              </div>

              <!-- Email Field -->
              <div class="space-y-2">
                <label for="modal-email" class="block text-sm font-medium text-gray-700 font-inter">
                  Email Address *
                </label>
                <input
                  id="modal-email"
                  v-model="modalForm.email"
                  type="email"
                  required
                  :disabled="sending"
                  class="w-full px-4 py-3 border border-gray-300 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition-all font-inter"
                  placeholder="your.email@example.com"
                />
              </div>

              <!-- Message Field -->
              <div class="space-y-2">
                <label for="modal-message" class="block text-sm font-medium text-gray-700 font-inter">
                  Your Message *
                </label>
                <textarea
                  id="modal-message"
                  v-model="modalForm.message"
                  rows="5"
                  required
                  :disabled="sending"
                  class="w-full px-4 py-3 border border-gray-300 focus:border-brand-dark focus:ring-1 focus:ring-brand-dark outline-none transition-all resize-none font-inter"
                  placeholder="What would you like to share or ask about?"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="sending"
                class="w-full py-3 px-6 bg-gradient-to-r from-brand-medium to-brand-dark text-white font-bold font-poppins shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
              >
                <div class="flex items-center justify-center gap-3">
                  <span>{{ sending ? 'Sending...' : 'Send Message' }}</span>
                  <UIcon 
                    :name="sending ? 'i-heroicons-arrow-path' : 'i-heroicons-paper-airplane'" 
                    class="w-4 h-4" 
                    :class="sending ? 'animate-spin' : 'transform group-hover:translate-x-1 transition-transform'" 
                  />
                </div>
              </button>

              <!-- <p class="text-xs text-gray-500 text-center font-inter">
                Your message will be sent to <strong>jennifer.belus@unibas.ch</strong>
              </p> -->
            </form>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
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
  box-shadow: 0 0 0 1px #004887;
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
a:focus-visible,
button:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid #004887;
  outline-offset: 2px;
}

/* Print styles for accessibility */
@media print {
  .bg-brand-lightest,
  .bg-teal-50 {
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

/* Responsive adjustments */
@media (max-width: 640px) {
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-5xl {
    font-size: 2rem;
  }
}
</style>