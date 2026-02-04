<script setup lang="ts">
// SEO Meta Tags following UNICEF compliance
useSeoMeta({
  title: 'PEGISUS - Peer Education for Gender Inclusion and Substance Use in Southern Africa',
  ogTitle: 'PEGISUS - Empowering Youth Through Evidence-Based Programs',
  description: 'PEGISUS is a research-based initiative implementing peer education programs for gender inclusion and substance use prevention across Southern Africa.',
  ogDescription: 'Empowering youth through evidence-based programs, vocational training, and community-led solutions in Southern Africa.',
  ogImage: '/img/pegi_logo.png',
  twitterCard: 'summary_large_image',
  themeColor: '#06b6d4',
});

// Structured Data for Organization (JSON-LD)
useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'canonical',
      href: 'https://pegisus.org',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NGO',
        name: 'PEGISUS',
        description: 'Peer Education for Gender Inclusion and Substance Use in Southern Africa',
        url: 'https://pegisus.org',
        logo: '/img/pegi_logo.png',
        areaServed: {
          '@type': 'Place',
          name: 'Southern Africa',
        },
        sameAs: [
          'https://twitter.com/pegisus',
          'https://www.linkedin.com/company/pegisus',
          'https://www.youtube.com/@pegisus',
        ],
      }),
    },
  ],
});
</script>

<template>
  <div>
    <!-- Skip Link for Screen Readers (Accessibility) -->
    <a
      href="#main-content"
      class="skip-link sr-only focus:not-sr-only"
    >
      Skip to main content
    </a>

    <!-- Route Announcer for Screen Readers -->
    <NuxtRouteAnnouncer />

    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  background: #06b6d4;
  color: white;
  padding: 12px 24px;
  z-index: 9999;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: top 0.2s ease;
}

.skip-link:focus {
  top: 0;
  outline: 2px solid #1e3a8a;
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus {
  position: fixed;
  width: auto;
  height: auto;
  padding: 12px 24px;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
  background: #06b6d4;
  color: white;
  z-index: 9999;
}
</style>
