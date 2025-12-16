<script setup lang="ts">
// Accordion items
const accordionItems = [
  {
    id: 'pegisus-overview',
    label: 'What is the PEGISUS Program?',
    icon: 'i-heroicons-academic-cap',
    content: `Peer Education for Gender Inclusion and Substance Use in Southern Africa (PEGISUS) is an 8-session program to help young people aged 16 to 24 lead healthier lives now and better prepare them for the future. PEGISUS is built upon two other science-backed programs: RAD-PAL to reduce alcohol and drug use and Manhood 2.0 to develop more flexible and equitable beliefs about gender.`
  },
  {
    id: 'sustainable-change',
    label: 'Sustainable Change Through Peer Groups',
    icon: 'i-heroicons-users',
    content: `Importantly, we want these changes to be sustainable. To accomplish this, we deliver PEGISUS to peer groups. Young people and friends from their community take part in the program together so they can support each other as they make healthier lifestyle changes.`
  },
  {
    id: 'vocational-integration',
    label: 'Integration with Vocational Training',
    icon: 'i-heroicons-briefcase',
    content: `Because we know how important employment is for a healthy and prosperous future, we deliver PEGISUS within vocational training programs. Vocational training programs help people learn practical job skills, making it easier to find employment. We train existing staff who work at these vocational programs in how to deliver PEGISUS.`
  },
  {
    id: 'rad-pal',
    label: 'RAD-PAL Program',
    icon: 'i-heroicons-heart',
    content: `RAD-PAL is a substance use reduction program designed for younger South African adolescents, developed by team member Dr. Tara Carney. The program teaches behavioral skills to help young people identify their own motivation for reducing substance use, what triggers their use, and problem-solving to identify alternative behaviors outside of using substances.`
  },
  {
    id: 'manhood-2',
    label: 'Manhood 2.0 Program',
    icon: 'i-heroicons-scale',
    content: `Manhood 2.0 is a gender-transformative program designed to help adolescent boys and young men develop flexible and equitable beliefs about gender. The program covers topics such as: gender and gender identity, power and relationships, understanding emotions, and overall healthy living. The program is highly interactive with hands-on activities for participants to engage with these topics.`
  },
  {
    id: 'development-process',
    label: 'Program Development Process',
    icon: 'i-heroicons-beaker',
    content: `To turn RAD-PAL and Manhood 2.0 into PEGISUS, we solicited feedback using focus group discussions with young people living in the local community and from our youth advisory boards. We received feedback on the program's content, activities, and language to make sure it was appropriate for young people aged 16 – 24 and their peers.`
  },
  {
    id: 'clinical-trial',
    label: 'Clinical Trial & Testing',
    icon: 'i-heroicons-chart-bar',
    content: `We are conducting a clinical trial to test whether PEGISUS has a positive impact. Half of the young people and their peers will be randomly selected to receive the standard training of their vocational training program (mostly training in employment skills) and the other half will receive the standard vocational training program plus PEGISUS. We will compare the two groups on their substance use, beliefs about gender, and employment potential once both programs have been completed.`
  }
];
</script>

<template>
  <section class="py-20 px-6 md:px-12 lg:px-20">
    <div class="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-start">
      <!-- Left Intro / Stats / Visual -->
      <div class="space-y-6">
        <div class="rounded-3xl p-8 bg-gradient-to-br from-cyan-500 to-blue-900 text-white shadow-2xl">
          <h3 class="text-3xl md:text-4xl font-extrabold leading-tight">Program Details</h3>
          <p class="mt-3 text-lg opacity-95 leading-relaxed max-w-xl">
            PEGISUS uses peer-delivered sessions to combine substance-use prevention, gender inclusion work, and vocational integration — designed to be interactive, evidence-led, and youth-facing.
          </p>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <div class="flex items-start space-x-3">
              <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <UIcon name="i-heroicons-users" class="w-5 h-5" />
              </div>
              <div>
                <div class="text-sm font-medium opacity-90">Peer Groups</div>
                <div class="text-lg font-bold">Cohorts</div>
              </div>
            </div>

            <div class="flex items-start space-x-3">
              <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <UIcon name="i-heroicons-briefcase" class="w-5 h-5" />
              </div>
              <div>
                <div class="text-sm font-medium opacity-90">Work Integration</div>
                <div class="text-lg font-bold">Vocational</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Visual card / quote -->
        <div class="rounded-2xl p-6 bg-white shadow-lg">
          <blockquote class="text-gray-800 italic leading-relaxed">
            "PEGISUS helps young people build healthier habits, stronger peer support, and practical skills to succeed in life and work."
          </blockquote>
          <footer class="mt-4 text-sm text-gray-500">— Program team</footer>
        </div>

        <!-- CTA -->
        <div class="flex flex-col sm:flex-row gap-4">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white text-cyan-600 font-semibold shadow-md hover:shadow-xl transition-all"
          >
            Partner With Us
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>

          <UButton
            variant="solid"
            color="neutral"
            class="px-6 py-3 rounded-full border border-gray-100 bg-white/10 text-white hover:bg-white/20 shadow-sm transition-all"
          >
            Download Overview
          </UButton>
        </div>
      </div>

      <!-- Right: Modern Accordion -->
      <div>
        <div class="bg-white rounded-3xl shadow-2xl p-4 md:p-6">
          <div class="px-4 md:px-6 py-3 border-b border-gray-100">
            <h4 class="text-lg font-bold text-gray-800">In depth</h4>
            <p class="mt-1 text-sm text-gray-500">Explore program components, research and how PEGISUS is delivered.</p>
          </div>

          <div class="p-4 md:p-6">
            <UAccordion
              :items="accordionItems"
              variant="ghost"
              size="lg"
              :ui="{ root: 'space-y-4', item: 'p-0' }"
            >
              <template #default="{ item, open }">
                <UButton
                  :aria-expanded="open"
                  variant="ghost"
                  color="neutral"
                  size="lg"
                  class="w-full flex items-center justify-between gap-4 rounded-2xl px-4 py-4 text-left hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 transition-shadow duration-200"
                  :class="open ? 'shadow-md bg-white' : 'bg-white/0'"
                >
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center"
                      :class="open ? 'bg-gradient-to-r from-cyan-500 to-blue-900 text-white shadow' : 'bg-gray-50 text-cyan-600'"
                    >
                      <UIcon :name="item.icon" class="w-5 h-5" />
                    </div>

                    <div class="text-base font-semibold text-gray-800">
                      {{ item.label }}
                    </div>
                  </div>
<!-- 
                  <UIcon
                    :name="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                    class="w-5 h-5 text-gray-400"
                  /> -->
                </UButton>
              </template>

              <template #content="{ item }">
                <div class="mt-3 pl-16 pr-4 text-gray-700 leading-relaxed">
                  <p class="text-base">{{ item.content }}</p>
                </div>
              </template>
            </UAccordion>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Focus-visible improvement for keyboard users */
:focus {
  outline: none;
}
[focus-visible] {
  outline: none;
}

/* Smooth global transitions kept light to not clash with reduced motion preferences */
* {
  transition-property: background-color, color, transform, box-shadow, opacity;
  transition-duration: 220ms;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
}

/* Slight hover lift for CTA area */
section > div > div > .rounded-3xl:hover {
  transform: translateY(-2px);
}

/* Helpful small shadow for the accordion content */
.u-accordion-content {
  will-change: opacity, transform;
}
</style>