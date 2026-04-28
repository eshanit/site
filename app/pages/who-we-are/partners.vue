<script setup lang="ts">
useHead({
  title: 'Our Partners - Who We Are - PEGISUS',
  meta: [
    {
      name: 'description',
      content: 'Learn about our partner institutions working together with leading organizations to create sustainable impact.',
    },
  ],
})

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/who-we-are' },
  { name: 'Our Partners', href: '/who-we-are/partners', current: true },
]
</script>

<template>
  <div class="bg-white min-h-screen">
    <SharedBreadcrumb :items="breadcrumbs" />
    <WhoWeArePartnersHero />
    <WhoWeArePartnerLogos />
    <WhoWeArePartnershipValues />
  </div>
</template>
