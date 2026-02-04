<script setup lang="ts">
// Program information items
const programItems = [
  {
    id: 'pegisus-overview',
    label: 'What is the PEGISUS Program?',
    icon: 'i-heroicons-academic-cap',
    content: `Peer Education for Gender Inclusion and Substance Use in Southern Africa (PEGISUS) is an 8-session program to help young people aged 16 to 24 lead healthier lives now and better prepare them for the future. PEGISUS is built upon two other science-backed programs: RAD-PAL to reduce alcohol and drug use and Manhood 2.0 to develop more flexible and equitable beliefs about gender.`,
    color: 'blue'
  },
  {
    id: 'sustainable-change',
    label: 'Sustainable Change Through Peer Groups',
    icon: 'i-heroicons-users',
    content: `Importantly, we want these changes to be sustainable. To accomplish this, we deliver PEGISUS to peer groups. Young people and friends from their community take part in the program together so they can support each other as they make healthier lifestyle changes.`,
    color: 'orange'
  },
  {
    id: 'vocational-integration',
    label: 'Integration with Vocational Training',
    icon: 'i-heroicons-briefcase',
    content: `Because we know how important employment is for a healthy and prosperous future, we deliver PEGISUS within vocational training programs. Vocational training programs help people learn practical job skills, making it easier to find employment. We train existing staff who work at these vocational programs in how to deliver PEGISUS.`,
    color: 'green'
  },
  {
    id: 'rad-pal',
    label: 'RAD-PAL Program',
    icon: 'i-heroicons-shield-check',
    content: `RAD-PAL is a substance use reduction program designed for younger South African adolescents, developed by team member Dr. Tara Carney. The program teaches behavioral skills to help young people identify their own motivation for reducing substance use, what triggers their use, and problem-solving to identify alternative behaviors outside of using substances.`,
    color: 'purple'
  },
  {
    id: 'manhood-2',
    label: 'Manhood 2.0 Program',
    icon: 'i-heroicons-scale',
    content: `Manhood 2.0 is a gender-transformative program designed to help adolescent boys and young men develop flexible and equitable beliefs about gender. The program covers topics such as: gender and gender identity, power and relationships, understanding emotions, and overall healthy living. The program is highly interactive with hands-on activities for participants to engage with these topics.`,
    color: 'blue'
  },
  {
    id: 'development-process',
    label: 'Program Development Process',
    icon: 'i-heroicons-beaker',
    content: `To turn RAD-PAL and Manhood 2.0 into PEGISUS, we solicited feedback using focus group discussions with young people living in the local community and from our youth advisory boards. We received feedback on the program's content, activities, and language to make sure it was appropriate for young people aged 16 – 24 and their peers.`,
    color: 'orange'
  },
  {
    id: 'clinical-trial',
    label: 'Clinical Trial & Testing',
    icon: 'i-heroicons-chart-bar',
    content: `We are conducting a clinical trial to test whether PEGISUS has a positive impact. Half of the young people and their peers will be randomly selected to receive the standard training of their vocational training program (mostly training in employment skills) and the other half will receive the standard vocational training program plus PEGISUS. We will compare the two groups on their substance use, beliefs about gender, and employment potential once both programs have been completed.`,
    color: 'green'
  }
];

// Color mapping from design system
const colorClasses = {
  blue: {
    bg: 'bg-blue-600',
    text: 'text-blue-600',
    border: 'border-blue-600',
    bgLight: 'bg-blue-50',
    hover: 'hover:bg-blue-50',
    fromTo: 'from-blue-500 to-blue-700'
  },
  orange: {
    bg: 'bg-orange-500',
    text: 'text-orange-600',
    border: 'border-orange-500',
    bgLight: 'bg-orange-50',
    hover: 'hover:bg-orange-50',
    fromTo: 'from-orange-400 to-orange-600'
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-500',
    bgLight: 'bg-green-50',
    hover: 'hover:bg-green-50',
    fromTo: 'from-green-400 to-green-600'
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    border: 'border-purple-500',
    bgLight: 'bg-purple-50',
    hover: 'hover:bg-purple-50',
    fromTo: 'from-purple-400 to-purple-600'
  }
};

const getColorClass = (color: string | undefined, type: keyof typeof colorClasses.blue) => {
  if (!color) {
    return colorClasses.blue[type]
  }
  return colorClasses[color as keyof typeof colorClasses]?.[type] || colorClasses.blue[type]
}

// Core Components display data
const coreComponents = [
  { title: '8', subtitle: 'Sessions', description: 'Complete program structure', icon: 'i-heroicons-calendar', color: 'blue' },
  { title: '16-24', subtitle: 'Age Range', description: 'Target youth demographic', icon: 'i-heroicons-users', color: 'orange' },
  { title: '3', subtitle: 'Core Areas', description: 'Substance use, gender, employment', icon: 'i-heroicons-star', color: 'green' },
  { title: '2', subtitle: 'Foundational Programs', description: 'RAD-PAL & Manhood 2.0', icon: 'i-heroicons-beaker', color: 'purple' }
];

// Interactive state
const activeItem = ref(programItems[0]);
const componentHovered = ref<number | null>(null);
</script>

<template>
  <section class="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="mb-16 md:mb-24">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-3 h-3 bg-blue-600"></div>
          <span class="text-sm font-semibold text-blue-700 font-poppins uppercase tracking-wider">Program Framework</span>
        </div>

        <div class="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins leading-tight mb-6">
              Understanding the
              <span class="text-blue-600 block">PEGISUS Framework</span>
            </h2>
            
            <div class="h-1 w-24 bg-blue-600 mb-8"></div>
            
            <p class="text-lg text-gray-700 font-inter leading-relaxed mb-6">
              A comprehensive, evidence-based approach combining substance use prevention, gender inclusion, and vocational training for sustainable youth empowerment.
            </p>
          </div>
          
          <div class="bg-blue-50 p-6 border-l-4 border-blue-600">
            <div class="flex items-start gap-4">
              <UIcon name="i-heroicons-light-bulb" class="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 class="text-xl font-bold text-blue-700 font-poppins mb-2">Evidence-Based Design</h3>
                <p class="text-gray-700 font-inter">
                  Each component is grounded in rigorous research and community-led implementation for maximum impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Core Components Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div
          v-for="(component, i) in coreComponents"
          :key="i"
          class="group relative h-full transition-all duration-300"
          @mouseenter="componentHovered = i"
          @mouseleave="componentHovered = null"
        >
          <!-- Main card -->
          <div class="relative bg-white border border-gray-200 shadow-sm transition-all duration-300 p-6 h-full flex flex-col"
                :class="[
                  componentHovered === i ? 'shadow-lg -translate-y-1' : '',
                  getColorClass(component.color, 'hover')
                ]">
            
            <!-- Top accent -->
            <div class="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                 :class="[
                   getColorClass(component.color, 'bg'),
                   componentHovered === i ? 'w-full' : 'w-12'
                 ]"></div>
            
            <!-- Icon -->
            <div class="mb-4 inline-flex items-center justify-center w-12 h-12 transition-all duration-300"
                 :class="[
                   getColorClass(component.color, 'bg'),
                   'text-white',
                   componentHovered === i ? 'scale-110' : ''
                 ]">
              <UIcon :name="component.icon" class="w-6 h-6" />
            </div>
            
            <!-- Content -->
            <div class="relative z-10 flex-1">
              <div class="text-2xl md:text-3xl font-bold font-poppins mb-2 transition-colors duration-300"
                   :class="componentHovered === i ? getColorClass(component.color, 'text') : 'text-gray-900'">
                {{ component.title }}
              </div>
              
              <div class="text-sm font-semibold text-gray-900 mb-1 font-poppins">
                {{ component.subtitle }}
              </div>
              <div class="text-sm text-gray-600 font-inter">
                {{ component.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
        <!-- Left Column - Program Components List -->
        <div class="lg:col-span-4">
          <div class="border border-gray-200 bg-white sticky top-20">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-xl font-bold text-gray-900 font-poppins mb-2">Explore Components</h3>
              <p class="text-sm text-gray-600 font-inter">Select any component below to view detailed information.</p>
            </div>

            <div class="p-6 space-y-2 max-h-[480px] overflow-y-auto">
              <button
                v-for="item in programItems" 
                :key="item.id"
                class="w-full text-left border border-gray-200 p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                :class="[
                  activeItem?.id === item.id ? 'border-blue-400 bg-blue-50' : 'hover:bg-gray-50',
                  getColorClass(item.color, 'hover')
                ]"
                @click="activeItem = item"
                :aria-label="`View details for ${item.label}`"
                :aria-current="activeItem?.id === item.id ? 'true' : 'false'"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 flex items-center justify-center transition-all duration-200 flex-shrink-0"
                    :class="[
                      activeItem?.id === item.id ? getColorClass(item.color, 'bg') + ' text-white' : 'bg-gray-100 text-gray-600'
                    ]"
                  >
                    <UIcon :name="item.icon" class="w-5 h-5" />
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gray-900 text-sm font-poppins line-clamp-2" 
                        :class="activeItem?.id === item.id ? getColorClass(item.color, 'text') : ''">
                      {{ item.label }}
                    </h4>
                  </div>
                  
                  <UIcon
                    name="i-heroicons-chevron-right"
                    class="w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0"
                    :class="activeItem?.id === item.id ? 'rotate-90 ' + getColorClass(item.color, 'text') : ''"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column - Detailed View -->
        <div class="lg:col-span-8">
          <div class="bg-white border border-gray-200 p-6 md:p-8">
            <!-- Header -->
            <div class="flex items-start gap-4 mb-8">
              <div class="w-14 h-14 flex items-center justify-center"
                   :class="getColorClass(activeItem?.color, 'bg')">
                <UIcon :name="activeItem?.icon" class="w-6 h-6 text-white" />
              </div>

              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 font-poppins mb-2">{{ activeItem?.label }}</h3>
                <div class="flex items-center gap-4">
                  <div class="h-1 w-12" :class="getColorClass(activeItem?.color, 'bg')"></div>
                  <span class="text-sm text-gray-600 font-inter">PEGISUS Program Component</span>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="space-y-8">
              <div class="prose max-w-none">
                <p class="text-gray-700 text-lg leading-relaxed font-inter mb-6">
                  {{ activeItem?.content }}
                </p>
              </div>
              
              <!-- Key Points -->
              <div class="border-t border-b border-gray-200 py-6">
                <h4 class="font-bold text-gray-900 font-poppins mb-4">Key Aspects</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mt-0.5 flex-shrink-0" 
                           :class="getColorClass(activeItem?.color, 'text')" />
                    <span class="text-sm text-gray-700 font-inter">Evidence-based methodology</span>
                  </div>
                  <div class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mt-0.5 flex-shrink-0"
                           :class="getColorClass(activeItem?.color, 'text')" />
                    <span class="text-sm text-gray-700 font-inter">Peer-delivered approach</span>
                  </div>
                  <div class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mt-0.5 flex-shrink-0"
                           :class="getColorClass(activeItem?.color, 'text')" />
                    <span class="text-sm text-gray-700 font-inter">Youth-focused design</span>
                  </div>
                  <div class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mt-0.5 flex-shrink-0"
                           :class="getColorClass(activeItem?.color, 'text')" />
                    <span class="text-sm text-gray-700 font-inter">Sustainable impact focus</span>
                  </div>
                </div>
              </div>
              
              <!-- Related Information -->
              <div class="space-y-4">
                <h4 class="font-bold text-gray-900 font-poppins">Related Information</h4>
                <div class="flex flex-wrap gap-3">
                  <span class="px-3 py-1 text-sm font-medium font-inter border"
                        :class="[getColorClass(activeItem?.color, 'bgLight'), getColorClass(activeItem?.color, 'text'), getColorClass(activeItem?.color, 'border')]">
                    Peer Education
                  </span>
                  <span class="px-3 py-1 text-sm font-medium font-inter border"
                        :class="[getColorClass(activeItem?.color, 'bgLight'), getColorClass(activeItem?.color, 'text'), getColorClass(activeItem?.color, 'border')]">
                    Youth Development
                  </span>
                  <span class="px-3 py-1 text-sm font-medium font-inter border"
                        :class="[getColorClass(activeItem?.color, 'bgLight'), getColorClass(activeItem?.color, 'text'), getColorClass(activeItem?.color, 'border')]">
                    Evidence-based
                  </span>
                  <span class="px-3 py-1 text-sm font-medium font-inter border"
                        :class="[getColorClass(activeItem?.color, 'bgLight'), getColorClass(activeItem?.color, 'text'), getColorClass(activeItem?.color, 'border')]">
                    Southern Africa
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-8 md:p-12 mb-16">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div class="text-white">
            <h4 class="text-xl font-bold font-poppins mb-2">Clinical Trial Information</h4>
            <p class="text-white/90 font-inter max-w-3xl">
              We are conducting a clinical trial to test whether PEGISUS has a positive impact. Half of the young people and their peers will be randomly selected to receive the standard training of their vocational training program (mostly training in employment skills) and the other half will receive the standard vocational training program plus PEGISUS. We will compare the two groups on their substance use, beliefs about gender, and employment potential once both programs have been completed. You can read more about the planned research here.
            </p>
          </div>
          
          <a
            href="https://clinicaltrials.gov/study/NCT06489899?term=PEGISUS&rank=1"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3 bg-white text-blue-600 border-2 border-white font-bold font-poppins hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2"
            aria-label="Read more about the clinical trial"
          >
            <UIcon name="i-heroicons-document-text" class="w-5 h-5" />
            <span>Read More</span>
          </a>
        </div>
      </div>

      <!-- Quote -->
      <div class="border border-gray-200 p-8 bg-white mb-16">
        <div class="flex items-start gap-4">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <blockquote class="text-gray-800 italic leading-relaxed font-inter mb-4">
              "PEGISUS helps young people build healthier habits, stronger peer support, and practical skills to succeed in life and work."
            </blockquote>
            <div class="text-sm text-gray-600 font-semibold font-poppins">— Program Implementation Team</div>
          </div>
        </div>
      </div>

      <!-- Program Stats -->
      <div class="border-t border-gray-200 pt-8">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h5 class="font-bold text-gray-900 font-poppins mb-2">Program Resources & Impact</h5>
            <p class="text-sm text-gray-600 font-inter">Complete documentation, implementation materials, and impact data available.</p>
          </div>
          
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center p-4 bg-blue-50">
              <div class="text-xl font-bold font-poppins text-blue-600">7</div>
              <div class="text-xs text-gray-600 font-inter mt-1">Core Components</div>
            </div>
            
            <div class="text-center p-4 bg-orange-50">
              <div class="text-xl font-bold font-poppins text-orange-600">8</div>
              <div class="text-xs text-gray-600 font-inter mt-1">Session Modules</div>
            </div>
            
            <div class="text-center p-4 bg-green-50">
              <div class="text-xl font-bold font-poppins text-green-600">500+</div>
              <div class="text-xs text-gray-600 font-inter mt-1">Youth Impacted</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Remove all border-radius */
* {
  border-radius: 0 !important;
}

/* Font family utilities */
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* WCAG-compliant focus styles */
button:focus {
  outline: 2px solid #1E3A8A;
  outline-offset: 2px;
}

a:focus {
  outline: 2px solid #1E3A8A;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter;
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
  }
}

/* Print styles */
@media print {
  .bg-blue-600,
  .bg-orange-500,
  .bg-green-500,
  .bg-purple-500,
  .bg-gradient-to-r {
    background-color: #f8fafc !important;
    -webkit-print-color-adjust: exact;
  }
  
  a {
    text-decoration: underline;
  }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .lg\:col-span-4,
  .lg\:col-span-8 {
    grid-column: span 12;
  }
  
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
  
  .grid-cols-4,
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .gap-4 > * {
    width: 100%;
  }
}

/* Scrollbar styling for component list */
</style>
