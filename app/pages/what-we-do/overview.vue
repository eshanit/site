<!-- pages/what-we-do/overview.vue -->
<script setup lang="ts">
useHead({
  title: 'Overview - What We Do - PEGISUS',
  meta: [
    {
      name: 'description',
      content: 'Learn about the PEGISUS program overview - our evidence-based approach to youth empowerment, substance use prevention, and gender inclusion in Southern Africa.'
    }
  ]
});

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'What We Do', href: '/what-we-do/overview' },
  { name: 'Overview', href: '/what-we-do/overview', current: true }
];

// Color key type for type-safe color mapping
type ColorKey = 'indigo' | 'teal' | 'emerald';

// Focus areas data
const focusAreas: { title: string; description: string; icon: string; color: ColorKey }[] = [
  {
    title: 'Youth Empowerment',
    description: 'Equipping young people with skills, knowledge, and opportunities to become agents of change in their communities.',
    icon: 'i-heroicons-user-group',
    color: 'indigo'
  },
  {
    title: 'Substance Use Prevention',
    description: 'Evidence-based interventions that reduce risk factors and promote healthy behaviors among adolescents.',
    icon: 'i-heroicons-shield-check',
    color: 'teal'
  },
  {
    title: 'Gender Inclusion',
    description: 'Addressing systemic barriers and fostering equitable participation for all genders in development programs.',
    icon: 'i-heroicons-scale',
    color: 'emerald'
  }
];

// Map color names to Tailwind/Brand classes
const colorMap: Record<ColorKey, { bg: string; border: string; text: string; hover: string }> = {
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-600',
    text: 'text-indigo-800',
    hover: 'hover:bg-indigo-100'
  },
  teal: {
    bg: 'bg-teal-50',
    border: 'border-teal-600',
    text: 'text-teal-800',
    hover: 'hover:bg-teal-100'
  },
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-600',
    text: 'text-emerald-800',
    hover: 'hover:bg-emerald-100'
  }
};
</script>

<template>
  <div>
    <!-- Breadcrumb Navigation -->
    <SharedBreadcrumb :items="breadcrumbs" />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br bg-brand-lighter  py-16 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center md:text-left md:flex md:items-center md:gap-12">
          <div class="md:w-2/3">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold font-poppins text-gray-900 mb-6">
              PEGISUS Program
              <span class="gradient-text block mt-2">Overview</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8 font-inter max-w-2xl mx-auto md:mx-0">
              Peer Education for Gender Inclusion and Substance Use in Southern Africa (PEGISUS) is an 8-session program
              to help young people aged 16 to 24 lead healthier lives now and better prepare them for the future.
            </p>
            <!-- <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <UButton
                to="/what-we-do/approach"
                class="bg-brand-medium text-white px-6 py-3 font-semibold hover:bg-brand-dark transition-colors no-underline"
              >
                Learn About Our Approach
              </UButton>
              <UButton
                to="/contact"
                variant="outline"
                class="border-2 border-brand-medium text-brand-medium px-6 py-3 font-semibold hover:bg-brand-lightest transition-colors no-underline"
              >
                Partner With Us
              </UButton>
            </div> -->
          </div>
          <!-- Decorative image -->
          <div class="hidden md:block md:w-1/3">
            <div class="relative h-80 w-full overflow-hidden">
              <NuxtImg
                src="/img/afrogirl2.png"
                alt="Young African woman"
                class="w-full h-full object-cover"
              />
              <!-- Color correction overlay to neutralize purple tint -->
              <div class="absolute inset-0 bg-cyan-50/15 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Focus Areas Section (unchanged) -->
    <section class="py-20 bg-white relative overflow-hidden">
      <NuxtImg src="/img/honeycomb.png" alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none" aria-hidden="true" />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 mb-4">Our Focus Areas</h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            We concentrate our efforts on three interconnected pillars to drive sustainable change.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(area, idx) in focusAreas" :key="idx"
            class="group relative border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div class="h-1 w-full" :class="colorMap[area.color].border"></div>
            <div class="p-8">
              <div class="relative w-16 h-16 mb-6 flex items-center justify-center" :class="colorMap[area.color].bg">
                <UIcon :name="area.icon" class="w-8 h-8" :class="colorMap[area.color].text" />
              </div>
              <h3 class="text-xl font-bold font-poppins mb-3 transition-colors" :class="colorMap[area.color].text">
                {{ area.title }}
              </h3>
              <p class="text-gray-600 font-inter leading-relaxed">{{ area.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What Is PEGISUS? Section - Enhanced layout, original text preserved -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-3 h-3 bg-brand-medium"></div>
          <span class="text-sm font-semibold text-brand-dark font-poppins uppercase tracking-wider">
            What Is PEGISUS?
          </span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 mb-6">
          Peer Education for Gender Inclusion<br /> and Substance Use in Southern Africa
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          <!-- Left column: Image with subtle overlay and facts badge -->
          <div class="relative h-80 lg:h-full min-h-[500px] w-full overflow-hidden">
            <NuxtImg src="/img/workshops.webp" alt="PEGISUS workshop participants" class="w-full h-full object-cover" />
            <div class="grid grid-cols-3">
              <div class="bg-blue-900 p-2">
              </div>
              <div class="bg-cyan-400 p-2">
              </div>
              <div class="bg-sky-900 p-2">
              </div>
            </div>
          </div>

          <!-- Right column: Original text with subtle visual cues -->
          <div class="flex flex-col justify-center">


            <!-- First paragraph with inline program highlights -->
            <div class="mb-6 flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-brand-lightest flex items-center justify-center mt-1">
                <UIcon name="i-heroicons-arrow-down-right" class="w-6 h-6 text-brand-medium" />
              </div>
              <div>
                <p class="text-gray-700 font-inter">
                  PEGISUS is built upon two other science-backed programs:
                  <span
                    class="inline-block bg-indigo-50 px-2 py-0.5 text-indigo-800 font-semibold text-sm mx-1 border-l-2 border-indigo-600">RAD-PAL</span>
                  to reduce alcohol and drug use and
                  <span
                    class="inline-block bg-teal-50 px-2 py-0.5 text-teal-800 font-semibold text-sm mx-1 border-l-2 border-teal-600">Manhood
                    2.0</span>
                  to develop more flexible and equitable beliefs about gender.
                </p>
              </div>
            </div>

            <!-- Second paragraph -->
            <div class="mb-6 flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-brand-lightest flex items-center justify-center mt-1">
                <UIcon name="i-heroicons-arrow-down-right" class="w-6 h-6 text-brand-medium" />
              </div>
              <p class="text-gray-700 font-inter">
                Importantly, we want these changes to be sustainable. To accomplish this, we deliver PEGISUS to peer
                groups. Young people and friends from their community take part in the program together so they can
                support each other as they make healthier lifestyle changes.
              </p>
            </div>

            <!-- Third paragraph -->
            <div class="mb-6 flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-brand-lightest flex items-center justify-center mt-1">
                <UIcon name="i-heroicons-arrow-down-right" class="w-6 h-6 text-brand-medium" />
              </div>
              <p class="text-gray-700 font-inter">
                Because we know how important employment is for a healthy and prosperous future, we deliver PEGISUS
                within vocational training programs. Vocational training programs help people learn practical job
                skills, making it easier to find employment. We train existing staff who work at these vocational
                programs in how to deliver PEGISUS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Program Development Section - Enhanced layout, original text preserved -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Preheading and heading (above grid) -->
        <div class="inline-flex items-center gap-3 mb-4">
          <div class="w-3 h-3 bg-brand-teal"></div>
          <span class="text-sm font-semibold text-brand-dark font-poppins uppercase tracking-wider">
            Program Development
          </span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold font-poppins text-gray-900 mb-6">
          From Evidence-Based Foundations
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <!-- Left column: text with icons -->
          <div class="flex flex-col justify-center">
            <!-- Paragraph 1: introduction of the two programs -->
            <div class="mb-6 flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-brand-lightest flex items-center justify-center mt-1">
                <UIcon name="i-heroicons-arrow-up-right" class="w-6 h-6 text-brand-medium" />
              </div>
              <p class="text-gray-700 font-inter">
                To develop PEGISUS, we started with two science-backed programs:
                <span
                  class="inline-block bg-indigo-50 px-2 py-0.5 text-indigo-800 font-semibold text-sm mx-1 border-l-2 border-indigo-600">RAD-PAL</span>
                and
                <span
                  class="inline-block bg-teal-50 px-2 py-0.5 text-teal-800 font-semibold text-sm mx-1 border-l-2 border-teal-600">Manhood
                  2.0</span>.
              </p>
            </div>

            <!-- Paragraph 2: RAD-PAL description -->
            <div class="mb-6 flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-brand-lightest flex items-center justify-center mt-1">
                <UIcon name="i-heroicons-arrow-up-right" class="w-6 h-6 text-brand-medium" />
              </div>
              <p class="text-gray-700 font-inter">
                RAD-PAL is a substance use reduction program designed for younger South African adolescents, developed
                by team member Dr. Tara Carney. The program teaches behavioral skills to help young people identify
                their own motivation for reducing substance use, what triggers their use, and problem-solving to
                identify alternative behaviors outside of using substances.
              </p>
            </div>

            <!-- Paragraph 3: Manhood 2.0 description -->
            <div class="mb-6 flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 bg-brand-lightest flex items-center justify-center mt-1">
                <UIcon name="i-heroicons-arrow-up-right" class="w-6 h-6 text-brand-medium" />
              </div>
              <p class="text-gray-700 font-inter">
                Manhood 2.0 is a gender-transformative program designed to help adolescent boys and young men develop
                flexible and equitable beliefs about gender. The program covers topics such as: gender and gender
                identity, power and relationships, understanding emotions, and overall healthy living. The program is
                highly interactive with hands-on activities for participants to engage with these topics.
              </p>
            </div>

          </div>

          <!-- Right column: image -->
          <div class="relative h-80 lg:h-full min-h-[500px] w-full overflow-hidden">
            <NuxtImg src="/img/youth.jpg" alt="Youth participating in PEGISUS program"
              class="w-full h-full object-cover" />
            <div class="grid grid-cols-3">
              <div class="bg-blue-900 p-2">
              </div>
              <div class="bg-cyan-400 p-2">
              </div>
              <div class="bg-sky-900 p-2">
              </div>
            </div>
          </div>
        </div>

        <!-- Paragraph 4: feedback process -->
        <div class="mb-6 flex items-start gap-4">
          <div class="flex-shrink-0 w-10 h-10 bg-brand-lightest flex items-center justify-center mt-1">
            <UIcon name="i-heroicons-arrow-up-right" class="w-6 h-6 text-brand-medium" />
          </div>
          <p class="text-gray-700 font-inter">
            To turn RAD-PAL and Manhood 2.0 into PEGISUS, we solicited feedback using focus group discussions with young
            people living in the local community and from our youth advisory boards. We received feedback on the
            program’s content, activities, and language to make sure it was appropriate for young people aged 16–24 and
            their peers.
          </p>
        </div>
      </div>
    </section>
    <!-- Testing the Program Section (client text) -->
    <!-- Testing the Program Section (client text) -->
    <section class="py-20 bg-gradient-to-r from-brand-medium to-brand-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center">
          <!-- Preheading (now white) -->
          <div class="inline-flex items-center gap-3 mb-4">
            <div class="w-3 h-3 bg-white"></div>
            <span class="text-sm font-semibold text-white font-poppins uppercase tracking-wider">
              Testing the Program
            </span>
          </div>

          <!-- Heading (white) -->
          <h2 class="text-3xl sm:text-4xl font-bold font-poppins text-white mb-6">
            Clinical Trial in Progress
          </h2>

          <!-- Paragraph (light) -->
          <div class="prose prose-lg text-white/90 font-inter mx-auto">
            <p>
              We are conducting a clinical trial to test whether PEGISUS has a positive impact. Half of the young people
              and their peers will be randomly selected to receive the standard training of their vocational training
              program (mostly training in employment skills) and the other half will receive the standard vocational
              training program plus PEGISUS. We will compare the two groups on their substance use, beliefs about
              gender, and employment potential once both programs have been completed.
            </p>
          </div>

          <!-- Brand‑compliant button -->
          <a href="https://clinicaltrials.gov/study/NCT06489899?term=PEGISUS&rank=1" target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-6 py-3 mt-8 bg-white text-brand-dark font-bold font-poppins border-2 border-white hover:bg-brand-lightest hover:text-brand-dark transition-all duration-300 no-underline"
            aria-label="Read more about the clinical trial (opens in new tab)">
            <UIcon name="i-heroicons-document-text" class="w-5 h-5" />
            <span>Read More</span>
            <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Remove all border-radius */
* {
  border-radius: 0 !important;
}

.gradient-text {
  background: linear-gradient(90deg, #0078c1, #004887);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Font family utilities */
.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.font-inter {
  font-family: 'Inter', sans-serif;
}

/* WCAG-compliant focus styles */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #004887;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
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
  .text-5xl {
    font-size: 2.5rem;
  }

  .text-4xl {
    font-size: 2rem;
  }
}
</style>
