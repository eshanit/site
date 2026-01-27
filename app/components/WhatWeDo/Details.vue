<script setup lang="ts">
// Program information items
const programItems = [
  {
    id: 'pegisus-overview',
    label: 'What is the PEGISUS Program?',
    icon: 'i-heroicons-academic-cap',
    content: `Peer Education for Gender Inclusion and Substance Use in Southern Africa (PEGISUS) is an 8-session program to help young people aged 16 to 24 lead healthier lives now and better prepare them for the future. PEGISUS is built upon two other science-backed programs: RAD-PAL to reduce alcohol and drug use and Manhood 2.0 to develop more flexible and equitable beliefs about gender.`,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'sustainable-change',
    label: 'Sustainable Change Through Peer Groups',
    icon: 'i-heroicons-users',
    content: `Importantly, we want these changes to be sustainable. To accomplish this, we deliver PEGISUS to peer groups. Young people and friends from their community take part in the program together so they can support each other as they make healthier lifestyle changes.`,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'vocational-integration',
    label: 'Integration with Vocational Training',
    icon: 'i-heroicons-briefcase',
    content: `Because we know how important employment is for a healthy and prosperous future, we deliver PEGISUS within vocational training programs. Vocational training programs help people learn practical job skills, making it easier to find employment. We train existing staff who work at these vocational programs in how to deliver PEGISUS.`,
    color: 'from-cyan-600 to-blue-700'
  },
  {
    id: 'rad-pal',
    label: 'RAD-PAL Program',
    icon: 'i-heroicons-heart',
    content: `RAD-PAL is a substance use reduction program designed for younger South African adolescents, developed by team member Dr. Tara Carney. The program teaches behavioral skills to help young people identify their own motivation for reducing substance use, what triggers their use, and problem-solving to identify alternative behaviors outside of using substances.`,
    color: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'manhood-2',
    label: 'Manhood 2.0 Program',
    icon: 'i-heroicons-scale',
    content: `Manhood 2.0 is a gender-transformative program designed to help adolescent boys and young men develop flexible and equitable beliefs about gender. The program covers topics such as: gender and gender identity, power and relationships, understanding emotions, and overall healthy living. The program is highly interactive with hands-on activities for participants to engage with these topics.`,
    color: 'from-cyan-700 to-blue-800'
  },
  {
    id: 'development-process',
    label: 'Program Development Process',
    icon: 'i-heroicons-beaker',
    content: `To turn RAD-PAL and Manhood 2.0 into PEGISUS, we solicited feedback using focus group discussions with young people living in the local community and from our youth advisory boards. We received feedback on the program's content, activities, and language to make sure it was appropriate for young people aged 16 – 24 and their peers.`,
    color: 'from-blue-700 to-cyan-800'
  },
  {
    id: 'clinical-trial',
    label: 'Clinical Trial & Testing',
    icon: 'i-heroicons-chart-bar',
    content: `We are conducting a clinical trial to test whether PEGISUS has a positive impact. Half of the young people and their peers will be randomly selected to receive the standard training of their vocational training program (mostly training in employment skills) and the other half will receive the standard vocational training program plus PEGISUS. We will compare the two groups on their substance use, beliefs about gender, and employment potential once both programs have been completed.`,
    color: 'from-cyan-800 to-blue-900'
  }
];

// Core Components display data
const coreComponents = [
  { title: '8', subtitle: 'Sessions', description: 'Complete program structure', icon: 'i-heroicons-calendar' },
  { title: '16-24', subtitle: 'Age Range', description: 'Target youth demographic', icon: 'i-heroicons-users' },
  { title: '3', subtitle: 'Core Areas', description: 'Substance use, gender, employment', icon: 'i-heroicons-star' },
  { title: '2', subtitle: 'Foundational Programs', description: 'RAD-PAL & Manhood 2.0', icon: 'i-heroicons-beaker' }
];

// Gradient colors for core components
const componentGradients = [
  'from-cyan-500 to-blue-900',
  'from-cyan-500 to-blue-700',
  'from-cyan-500 to-emerald-600',
  'from-blue-700 to-cyan-500'
];

const getComponentGradient = (index: number) => {
  return `bg-gradient-to-br ${componentGradients[index % componentGradients.length]}`
};

// Interactive state
const activeItem = ref(programItems[0]);
const componentHovered = ref<number | null>(null);
</script>

<template>
  <section class="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-20 md:mb-24">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-3 h-3 bg-cyan-500"></div>
          <span class="text-sm font-semibold text-cyan-700 uppercase tracking-wider">Program Details</span>
        </div>

        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Understanding the <span class="bg-linear-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">PEGISUS Framework</span>
        </h2>

        <div class="h-1 w-20 bg-linear-to-r from-cyan-500 to-blue-900 mx-auto mb-8"></div>

        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          A comprehensive approach combining substance use prevention, gender inclusion, and vocational training
        </p>
      </div>

      <!-- Core Components Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div
          v-for="(component, i) in coreComponents"
          :key="i"
          class="group relative h-full transform transition-all duration-500 hover:scale-105"
          @mouseenter="componentHovered = i"
          @mouseleave="componentHovered = null"
        >
          <!-- Animated background gradient -->
          <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
               :class="`${componentGradients[i % componentGradients.length]}`"></div>
          
          <!-- Main card -->
          <div class="relative bg-white backdrop-blur-sm border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500 p-8 overflow-hidden h-full flex flex-col"
               :class="componentHovered === i ? 'border-cyan-300' : ''">
            
            <!-- Background icon glow -->
            <div class="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 rounded-full opacity-5 transition-all duration-500"
                 :class="`bg-gradient-to-br ${componentGradients[i % componentGradients.length]}`"></div>
            
            <!-- Icon -->
            <div class="mb-6 inline-flex items-center justify-center w-14 h-14 transition-all duration-500 text-white"
                 :class="`bg-gradient-to-br ${componentGradients[i % componentGradients.length]}`">
              <UIcon :name="component.icon" class="w-7 h-7" />
            </div>
            
            <!-- Content with animation -->
            <div class="relative z-10 flex-1">
              <div class="text-3xl md:text-4xl font-bold transition-all duration-300 mb-2"
                   :class="componentHovered === i ? `bg-gradient-to-r bg-clip-text text-transparent ` + `${componentGradients[i % componentGradients.length]}` : 'text-gray-900'">
                {{ component.title }}
              </div>
              
              <!-- Accent line -->
              <div class="h-1 w-8 transition-all duration-500 mb-4"
                   :class="`bg-gradient-to-r ${componentGradients[i % componentGradients.length]}`"></div>
              
              <div class="text-lg font-bold text-gray-900 mb-3 transition-colors duration-300"
                   :class="componentHovered === i ? 'text-cyan-600' : ''">
                {{ component.subtitle }}
              </div>
              <div class="text-sm text-gray-600 leading-relaxed">
                {{ component.description }}
              </div>
            </div>
            
            <!-- Hover indicator -->
            <div class="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                 :class="`bg-gradient-to-r ${componentGradients[i % componentGradients.length]}`"></div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- Left Column - Program Components List -->
        <div class="lg:col-span-1">
          <div class="border border-gray-200 p-6 bg-white sticky top-20">
            <h3 class="text-xl font-bold text-gray-900 mb-4">Explore Components</h3>
            <p class="text-sm text-gray-600 mb-6">Click on any component below to view detailed information.</p>

            <div class="space-y-3 max-h-96 overflow-y-auto">
              <div 
                v-for="item in programItems" 
                :key="item.id"
                class="border border-gray-200 p-3 transition-all duration-200 cursor-pointer hover:border-cyan-300 hover:shadow-sm"
                :class="activeItem?.id === item.id ? 'border-cyan-400 bg-linear-to-r from-cyan-50 to-blue-50' : 'bg-white'"
                @click="activeItem = item"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="w-8 h-8 flex items-center justify-center transition-all duration-200 flex-shrink-0 text-sm"
                    :class="activeItem?.id === item.id ? 'bg-linear-to-r ' + item.color + ' text-white' : 'bg-gray-100 text-gray-600'"
                  >
                    <UIcon :name="item.icon" class="w-4 h-4" />
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gray-900 text-sm line-clamp-2" :class="activeItem?.id === item.id ? 'text-cyan-700' : ''">
                      {{ item.label }}
                    </h4>
                  </div>
                  
                  <UIcon
                    name="i-heroicons-chevron-right"
                    class="w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0"
                    :class="activeItem?.id === item.id ? 'rotate-90 text-cyan-600' : ''"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Detailed View -->
        <div class="lg:col-span-2 space-y-6">
            <!-- Header -->
            <div class="flex items-start gap-4 mb-8">
              <div class="w-14 h-14 bg-linear-to-r from-cyan-500 to-blue-900 flex items-center justify-center">
                <UIcon :name="activeItem?.icon" class="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ activeItem?.label }}</h3>
                <div class="flex items-center gap-4">
                  <div class="h-1 w-12 bg-linear-to-r from-cyan-500 to-blue-900"></div>
                  <span class="text-sm text-gray-600">PEGISUS Program Component</span>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="space-y-6">
              <p class="text-gray-700 text-lg leading-relaxed">
                {{ activeItem?.content }}
              </p>
              
              <!-- Key Points -->
              <div class="border-t border-b border-gray-200 py-6">
                <h4 class="font-bold text-gray-900 mb-4">Key Aspects</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span class="text-sm text-gray-700">Evidence-based methodology</span>
                  </div>
                  <div class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span class="text-sm text-gray-700">Peer-delivered approach</span>
                  </div>
                  <div class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span class="text-sm text-gray-700">Youth-focused design</span>
                  </div>
                  <div class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span class="text-sm text-gray-700">Sustainable impact focus</span>
                  </div>
                </div>
              </div>
              
              <!-- Related Information -->
              <div class="space-y-4">
                <h4 class="font-bold text-gray-900">Related Information</h4>
                <div class="flex flex-wrap gap-3">
                  <span class="px-3 py-1 bg-linear-to-r from-cyan-50 to-blue-50 text-cyan-700 text-sm font-medium border border-cyan-100">
                    Peer Education
                  </span>
                  <span class="px-3 py-1 bg-linear-to-r from-cyan-50 to-blue-50 text-cyan-700 text-sm font-medium border border-cyan-100">
                    Youth Development
                  </span>
                  <span class="px-3 py-1 bg-linear-to-r from-cyan-50 to-blue-50 text-cyan-700 text-sm font-medium border border-cyan-100">
                    Evidence-based
                  </span>
                  <span class="px-3 py-1 bg-linear-to-r from-cyan-50 to-blue-50 text-cyan-700 text-sm font-medium border border-cyan-100">
                    Southern Africa
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-linear-to-r from-cyan-500 to-blue-900 p-8 mt-12">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div class="text-white">
            <h4 class="text-xl font-bold mb-2">Ready to Learn More?</h4>
            <p class="text-white/90">
              Access detailed program materials, research papers, and implementation guides
            </p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink
              to="/contact"
              class="px-6 py-3 bg-white text-cyan-700 font-bold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
              <span>Contact Team</span>
            </NuxtLink>
            
            <button class="px-6 py-3 bg-transparent text-white border-2 border-white font-bold hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2">
              <UIcon name="i-heroicons-document-arrow-down" class="w-5 h-5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Quote -->
      <div class="mt-12 border border-gray-200 p-6 bg-white">
        <div class="flex items-start gap-4">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-cyan-600 flex-shrink-0 mt-1" />
          <div>
            <blockquote class="text-gray-800 italic leading-relaxed mb-4">
              "PEGISUS helps young people build healthier habits, stronger peer support, and practical skills to succeed in life and work."
            </blockquote>
            <div class="text-sm text-gray-600 font-semibold">— Program Implementation Team</div>
          </div>
        </div>
      </div>

      <!-- Bottom Navigation -->
      <div class="mt-16 pt-8 border-t border-gray-200">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h5 class="font-bold text-gray-900 mb-2">Program Resources</h5>
            <p class="text-sm text-gray-600">Complete documentation and implementation materials</p>
          </div>
          
          <div class="flex items-center gap-6">
            <div class="text-center">
              <div class="text-lg font-bold bg-linear-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">7</div>
              <div class="text-xs text-gray-600">Core Components</div>
            </div>
            <div class="h-6 w-px bg-gray-300"></div>
            <div class="text-center">
              <div class="text-lg font-bold bg-linear-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">8</div>
              <div class="text-xs text-gray-600">Session Modules</div>
            </div>
            <div class="h-6 w-px bg-gray-300"></div>
            <div class="text-center">
              <div class="text-lg font-bold bg-linear-to-r from-cyan-500 to-blue-900 bg-clip-text text-transparent">3</div>
              <div class="text-xs text-gray-600">Countries Active</div>
            </div>
          </div>
        </div>
      </div>
  </section>
</template>

<style scoped>
/* Remove all border-radius globally */
* {
  border-radius: 0 !important;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, 
                      opacity, box-shadow, transform, filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-4xl {
    font-size: 2rem;
  }
}

@media (max-width: 475px) {
  .text-5xl {
    font-size: 2rem;
  }
  
  .text-3xl {
    font-size: 1.75rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}
</style>
