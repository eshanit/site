<script setup lang="ts">

const team = [
  { name: 'Kudakwashe Madzeke, PhD', photo: '/img/zimbabwe/KudaMadzeke.jpg', title: 'Site Principal Investigator', role: 'Local PI' },
  { name: 'Mathias Basera', photo: '/img/zimbabwe/MathiasBasera.jpg', title: 'Project Manager', role: 'Implementation' },
  { name: 'Tinashe Nyakauru', photo: '/img/zimbabwe/TinasheNyakauru.jpg', title: 'Research Assistant', role: 'Data Collection' },
  { name: 'Talent Nyandoro', photo: '/img/zimbabwe/NyandoroTalent.jpg', title: 'Research Assistant', role: 'Training' },
]
</script>
<template>
  <WhoWeAreStakeholderTemplate
    institution="SolidarMed Zimbabwe"
    country="Zimbabwe"
    :team-members="5"
    description="A public health organisation that works to ensure better access to quality healthcare for marginalised rural areas."
    :team="team"
    icon="i-heroicons-plus-circle"
    :is-even="true"
  />
</template>
