<script setup lang="ts">
const team = [
  { name: 'Anitha Menon, PhD', photo: '/img/zambia/AnithaMenon.jpg', title: ' Principal Investigator', role: 'Country Lead' }
]
</script>
<template>
  <WhoWeAreStakeholderTemplate
    institution="University of Zambia"
    country="Zambia"
    :team-members="1"
    description="Key academic partner providing crucial local insights and research infrastructure for PEGISUS implementation in Zambia."
    :team="team"
    icon="i-heroicons-building-library"
  />
</template>

