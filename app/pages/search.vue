<script setup lang="ts">
const route = useRoute();
const searchQuery = computed(() => (route.query.q as string) || '');

// PEGISUS Program Pillars (from Details.vue)
const programPillars = [
  { title: 'PEGISUS Overview', path: '/what-we-do/overview#what-is-pegisus', content: 'Peer Education for Gender Inclusion and Substance Use in Southern Africa - An 8-session program for youth aged 16-24' },
  { title: 'Sustainable Change Through Peer Groups', path: '/what-we-do/overview', content: 'Changes are sustainable through peer groups - young people and community friends take part together' },
  { title: 'Integration with Vocational Training', path: '/what-we-do/overview', content: 'Delivered within vocational training programs to support employment and healthy lifestyles' },
  { title: 'RAD-PAL Program', path: '/what-we-do/programs#rad-pal', content: 'Substance use reduction program for younger South African adolescents using behavioral skills training' },
  { title: 'Manhood 2.0 Program', path: '/what-we-do/programs#manhood-2-0', content: 'Gender-transformative program for adolescent boys and young men to develop equitable gender beliefs' },
  { title: 'Program Development Process', path: '/what-we-do/overview#program-development', content: 'Feedback from focus group discussions with young people and youth advisory boards' },
  { title: 'Clinical Trial & Testing', path: '/what-we-do/overview#testing', content: 'Randomized controlled trial comparing vocational training with and without PEGISUS' }
];

// Sessions data (from Details.vue - 8 sessions)
const sessions = [
  { title: 'Session 1: Introduction to PEGISUS', path: '/what-we-do/overview', content: 'Introduction to the program, peer education, and healthy lifestyle goals' },
  { title: 'Session 2: Substance Use Awareness', path: '/what-we-do/overview', content: 'Understanding substance use triggers, motivations for reduction, and behavioral skills' },
  { title: 'Session 3: Gender Identity Exploration', path: '/what-we-do/overview', content: 'Exploring gender concepts, power dynamics in relationships, and healthy communication' },
  { title: 'Session 4: Emotional Intelligence', path: '/what-we-do/overview', content: 'Understanding emotions, emotional regulation, and healthy expression' },
  { title: 'Session 5: Peer Support Skills', path: '/what-we-do/overview', content: 'Building skills to support peers in making healthier lifestyle choices' },
  { title: 'Session 6: Employment Readiness', path: '/what-we-do/overview', content: 'Linking program content to vocational training and employment opportunities' },
  { title: 'Session 7: Community Action Planning', path: '/what-we-do/overview', content: 'Planning sustainable peer support initiatives in local communities' },
  { title: 'Session 8: Program Completion & Evaluation', path: '/what-we-do/overview', content: 'Review, evaluation, and planning for continued peer support' }
];

// Partners data (from various WhoWeAre pages)
const partners = [
  { title: 'University Hospital Basel', path: '/who-we-are/partners', content: 'Leading Swiss academic medical center - PEGISUS research partner' },
  { title: 'South African Medical Research Council (SAMRC)', path: '/who-we-are/partners', content: 'South African Medical Research Council - Local research implementation partner' },
  { title: 'SolidarMed Zambia', path: '/who-we-are/partners', content: 'Swiss NGO working to improve health in rural Zambia - Implementation partner' },
  { title: 'SolidarMed Zimbabwe', path: '/who-we-are/partners', content: 'Swiss NGO improving healthcare access in Zimbabwe - Implementation partner' },
  { title: 'University of Zambia', path: '/who-we-are/partners', content: 'Academic institution - Research and training partner in Zambia' }
];

// Funders data (from Fundedby.vue)
const funders = [
  { title: 'SOR4D', path: '/', content: 'Solution-oriented Research for Development Programme - Lead funder of PEGISUS research' },
  { title: 'SDC', path: '/', content: 'Swiss Agency for Development and Cooperation - Development partnership and implementation support' },
  { title: 'SNF', path: '/', content: 'Swiss National Science Foundation - Research quality and methodological rigor funding' }
];

// All searchable content
const allSearchContent = computed(() => [
  ...programPillars,
  ...sessions,
  ...partners,
  ...funders,
  { title: 'Home', path: '/', content: 'Welcome to PEGISUS - Youth empowerment organization' },
  { title: 'What We Do', path: '/what-we-do', content: 'Skills development, community well-being, meaningful work' },
  { title: 'Who We Are', path: '/who-we-are', content: 'Our team of dedicated professionals working with youth' },
  { title: 'Where We Work', path: '/where-we-work', content: 'Zambia, Zimbabwe, South Africa - Community-led solutions' },
  { title: 'Contact', path: '/contact', content: 'Get in touch with PEGISUS team' },
  { title: 'Community Well Being', path: '/what-we-do#wellbeing', content: 'We nurture young people in body, mind and spirit' },
  { title: 'Meaningful Work', path: '/what-we-do#work', content: 'We support worthwhile jobs and sustainable livelihoods' },
  { title: 'Zero Substance Abuse', path: '/what-we-do#substance', content: 'Thriving toward a clean, drug free youth' },
  { title: 'Equality and Justice', path: '/what-we-do#justice', content: 'We amplify youth voices in the community' }
]);

// Search results computation
const searchResults = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return [];

  return allSearchContent.value.filter(page =>
    page.title.toLowerCase().includes(query) ||
    page.content.toLowerCase().includes(query) ||
    (page.path && page.path.toLowerCase().includes(query))
  );
});

// Filter results by category
const pillarResults = computed(() => searchResults.value.filter(r => programPillars.some(p => p.title === r.title)));
const sessionResults = computed(() => searchResults.value.filter(r => sessions.some(s => s.title === r.title)));
const partnerResults = computed(() => searchResults.value.filter(r => partners.some(p => p.title === r.title)));
const funderResults = computed(() => searchResults.value.filter(r => funders.some(f => f.title === r.title)));
const pageResults = computed(() => searchResults.value.filter(r =>
  !programPillars.some(p => p.title === r.title) &&
  !sessions.some(s => s.title === r.title) &&
  !partners.some(p => p.title === r.title) &&
  !funders.some(f => f.title === r.title)
));

const handleSearch = (query: string) => {
  navigateTo(`/search?q=${encodeURIComponent(query)}`);
};

// Category config — all brand blues
const categories = [
  { key: 'pillars', label: 'Program', icon: 'i-heroicons-beaker', results: pillarResults },
  { key: 'sessions', label: 'Sessions', icon: 'i-heroicons-calendar', results: sessionResults },
  { key: 'partners', label: 'Partners', icon: 'i-heroicons-user-group', results: partnerResults },
  { key: 'funders', label: 'Funders', icon: 'i-heroicons-banknotes', results: funderResults },
  { key: 'pages', label: 'Pages', icon: 'i-heroicons-document-text', results: pageResults },
] as const;
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <!-- Search Header -->
      <div class="mb-10">
        <h1 class="text-3xl font-bold text-gray-900 font-poppins mb-2">Search</h1>
        <div class="h-1 w-12 bg-brand-medium mb-6"></div>

        <!-- Search input -->
        <div class="relative max-w-2xl">
          <input
            :value="searchQuery"
            type="search"
            placeholder="Search PEGISUS..."
            class="w-full px-4 py-3 pl-12 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-medium focus:border-brand-medium text-gray-800 font-inter"
            @input="handleSearch(($event.target as HTMLInputElement).value)"
          />
          <UIcon
            name="i-heroicons-magnifying-glass"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          />
        </div>
      </div>

      <!-- Results count -->
      <div v-if="searchQuery" class="mb-6">
        <p class="text-gray-600 font-inter">
          <span v-if="searchResults.length > 0">
            {{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }} for
          </span>
          <span v-else>No results for </span>
          <span class="font-semibold text-gray-900">"{{ searchQuery }}"</span>
        </p>
      </div>

      <!-- Search Results -->
      <div v-if="searchQuery">
        <div v-if="searchResults.length > 0" class="space-y-10">
          <template v-for="cat in categories" :key="cat.key">
            <div v-if="cat.results.value.length > 0">
              <!-- Category heading — brand blue -->
              <h2 class="flex items-center gap-2 text-lg font-bold text-brand-dark font-poppins mb-4 pb-2 border-b border-gray-200">
                <UIcon :name="cat.icon" class="w-5 h-5 text-brand-medium" />
                {{ cat.label }}
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NuxtLink
                  v-for="result in cat.results.value"
                  :key="result.title"
                  :to="result.path || '#'"
                  class="block bg-white p-4 border border-gray-200 hover:border-brand-medium hover:shadow-md transition-all duration-200 group"
                >
                  <h3 class="font-semibold text-brand-medium group-hover:text-brand-dark mb-1 font-poppins">{{ result.title }}</h3>
                  <p class="text-sm text-gray-600 font-inter">{{ result.content }}</p>
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>

        <!-- No results -->
        <div v-else class="text-center py-16">
          <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-gray-900 font-poppins">No results found</h3>
          <p class="mt-1 text-gray-500 font-inter">Try different keywords or browse our pages.</p>
        </div>
      </div>

      <!-- Empty state — no query yet -->
      <div v-else class="text-center py-16">
        <UIcon name="i-heroicons-magnifying-glass" class="w-14 h-14 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 font-poppins mb-1">Start your search</h3>
        <p class="text-gray-500 font-inter mb-8">Search for programs, sessions, partners, funders, or any page.</p>

        <!-- Quick suggestions -->
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="term in ['PEGISUS', 'sessions', 'partners', 'funders', 'RAD-PAL', 'Manhood 2.0']"
            :key="term"
            @click="handleSearch(term)"
            class="px-4 py-2 bg-brand-lightest text-brand-dark border border-brand-light hover:bg-brand-light hover:text-brand-darkest transition-colors duration-150 text-sm font-inter"
          >
            {{ term }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
* {
  border-radius: 0 !important;
}

.font-poppins {
  font-family: 'Poppins', sans-serif;
}
.font-inter {
  font-family: 'Inter', sans-serif;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid #004887;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
