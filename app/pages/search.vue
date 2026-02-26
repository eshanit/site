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
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
        
        <!-- Search Form -->
        <form @submit.prevent="handleSearch(searchQuery)" class="max-w-2xl">
          <div class="relative">
            <input
              :value="searchQuery"
              type="text"
              placeholder="Search PEGISUS..."
              class="w-full px-4 py-3 pl-12 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-transparent text-gray-800"
              @input="handleSearch(($event.target as HTMLInputElement).value)"
            />
            <svg
              class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </form>
      </div>

      <!-- Search Query Display -->
      <div v-if="searchQuery" class="mb-6">
        <p class="text-gray-600">
          Showing results for: <span class="font-semibold text-gray-900">"{{ searchQuery }}"</span>
        </p>
      </div>

      <!-- Search Results -->
      <div v-if="searchQuery">
        <!-- Results found -->
        <div v-if="searchResults.length > 0" class="space-y-8">
          <!-- Program Pillars -->
          <div v-if="pillarResults.length > 0">
            <h2 class="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
              <UIcon name="i-heroicons-beaker" class="w-5 h-5" />
              Program Pillars
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NuxtLink
                v-for="result in pillarResults"
                :key="result.title"
                :to="result.path || '#'"
                class="block bg-white p-4 rounded border border-gray-200 hover:border-blue-700 hover:shadow-md transition-all duration-200"
              >
                <h3 class="font-semibold text-blue-700 mb-1">{{ result.title }}</h3>
                <p class="text-sm text-gray-600">{{ result.content }}</p>
              </NuxtLink>
            </div>
          </div>

          <!-- Sessions -->
          <div v-if="sessionResults.length > 0">
            <h2 class="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
              <UIcon name="i-heroicons-calendar" class="w-5 h-5" />
              Sessions
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NuxtLink
                v-for="result in sessionResults"
                :key="result.title"
                :to="result.path || '#'"
                class="block bg-white p-4 rounded border border-gray-200 hover:border-green-600 hover:shadow-md transition-all duration-200"
              >
                <h3 class="font-semibold text-green-600 mb-1">{{ result.title }}</h3>
                <p class="text-sm text-gray-600">{{ result.content }}</p>
              </NuxtLink>
            </div>
          </div>

          <!-- Partners -->
          <div v-if="partnerResults.length > 0">
            <h2 class="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <UIcon name="i-heroicons-user-group" class="w-5 h-5" />
              Partners
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NuxtLink
                v-for="result in partnerResults"
                :key="result.title"
                :to="result.path || '#'"
                class="block bg-white p-4 rounded border border-gray-200 hover:border-orange-600 hover:shadow-md transition-all duration-200"
              >
                <h3 class="font-semibold text-orange-600 mb-1">{{ result.title }}</h3>
                <p class="text-sm text-gray-600">{{ result.content }}</p>
              </NuxtLink>
            </div>
          </div>

          <!-- Funders -->
          <div v-if="funderResults.length > 0">
            <h2 class="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
              <UIcon name="i-heroicons-banknotes" class="w-5 h-5" />
              Funders
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NuxtLink
                v-for="result in funderResults"
                :key="result.title"
                :to="result.path || '#'"
                class="block bg-white p-4 rounded border border-gray-200 hover:border-purple-600 hover:shadow-md transition-all duration-200"
              >
                <h3 class="font-semibold text-purple-600 mb-1">{{ result.title }}</h3>
                <p class="text-sm text-gray-600">{{ result.content }}</p>
              </NuxtLink>
            </div>
          </div>

          <!-- General Pages -->
          <div v-if="pageResults.length > 0">
            <h2 class="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
              <UIcon name="i-heroicons-document-text" class="w-5 h-5" />
              Pages
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NuxtLink
                v-for="result in pageResults"
                :key="result.title"
                :to="result.path || '#'"
                class="block bg-white p-4 rounded border border-gray-200 hover:border-gray-700 hover:shadow-md transition-all duration-200"
              >
                <h3 class="font-semibold text-gray-900 mb-1">{{ result.title }}</h3>
                <p class="text-sm text-gray-600">{{ result.content }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- No results found -->
        <div v-else class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900">No results found</h3>
          <p class="mt-1 text-gray-500">Try different keywords or browse our pages.</p>
        </div>
      </div>

      <!-- No Search Query -->
      <div v-else class="text-center py-12">
        <svg
          class="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">Start your search</h3>
        <p class="mt-1 text-gray-500">Search for pillars, sessions, partners, funders, or any content on our website.</p>
        
        <!-- Quick Search Suggestions -->
        <div class="mt-8">
          <p class="text-sm text-gray-600 mb-4">Try searching for:</p>
          <div class="flex flex-wrap justify-center gap-2">
            <button @click="handleSearch('PEGISUS')" class="px-4 py-2 bg-blue-50 text-blue-700 rounded border border-blue-200 hover:bg-blue-100 transition-colors">PEGISUS</button>
            <button @click="handleSearch('sessions')" class="px-4 py-2 bg-green-50 text-green-700 rounded border border-green-200 hover:bg-green-100 transition-colors">Sessions</button>
            <button @click="handleSearch('partners')" class="px-4 py-2 bg-orange-50 text-orange-700 rounded border border-orange-200 hover:bg-orange-100 transition-colors">Partners</button>
            <button @click="handleSearch('funders')" class="px-4 py-2 bg-purple-50 text-purple-700 rounded border border-purple-200 hover:bg-purple-100 transition-colors">Funders</button>
            <button @click="handleSearch('RAD-PAL')" class="px-4 py-2 bg-gray-50 text-gray-700 rounded border border-gray-200 hover:bg-gray-100 transition-colors">RAD-PAL</button>
            <button @click="handleSearch('Manhood 2.0')" class="px-4 py-2 bg-gray-50 text-gray-700 rounded border border-gray-200 hover:bg-gray-100 transition-colors">Manhood 2.0</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
