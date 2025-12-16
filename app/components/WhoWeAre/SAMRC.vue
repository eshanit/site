<script setup lang="ts">

const team = [
  { name: 'Tara Carney, PhD', photo: '/img/samrc/TaraCarney.jpg', title: 'Site Principal Investigator', role: 'Local PI' },
  { name: 'Kim Johnson', photo: '/img/samrc/KimJohnson.jpg', title: 'Project Manager', role: 'Implementation' },
  { name: 'Maxwell Feni', photo: '/img/samrc/MaxwellFeni.jpg', title: 'Research Assistant', role: 'Data Collection' },
  { name: 'Liesl Izaks', photo: '/img/samrc/LieslIzaks.jpg', title: 'Research Assistant', role: 'Training' },
  { name: 'Thembisa Ngxukuma', photo: '/img/samrc/ThembisaNgxukuma.jpg', title: 'Senior Research Technologist', role: 'Field Operations' }
]
</script>
<template>
  <WhoWeAreStakeholderTemplate
    institution="South African Medical Research Council"
    country="South Africa"
    :team-members="5"
    description="Premiere medical research body in South Africa providing local context expertise and implementation support for PEGISUS trials."
    :team="team"
    icon="i-heroicons-beaker"
    :is-even="true"
  />
</template>
