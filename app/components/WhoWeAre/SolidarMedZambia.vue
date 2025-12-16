<script setup lang="ts">

const team = [
  { name: 'Beatrice Chiyokoma', photo: '/img/zambia/BeatriceChiyokoma.png', title: 'Site Principal Investigator', role: 'Local PI' },
  { name: 'Nancy Choka', photo: '/img/zambia/NancyChoka.jpg', title: 'Research Assistant', role: 'Implementation' },
  { name: 'Sheena Lungu', photo: '/img/zambia/SheenaLungu.jpg', title: 'Research Assistant', role: 'Data Collection' },
  { name: 'Chimuka Muleya', photo: '/img/zambia/ChimukaMuleya.jpg', title: 'Research Assistant', role: 'Training' },
]
</script>
<template>
  <WhoWeAreStakeholderTemplate
    institution="SolidarMed Zambia"
    country="Zambia"
    :team-members="5"
    description="A public health organisation that works to ensure better access to quality healthcare for marginalised rural areas."
    :team="team"
    icon="i-heroicons-plus-circle"
    :is-even="true"
  />
</template>
