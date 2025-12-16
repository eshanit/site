<script setup lang="ts">


// Replace with actual photo paths
const team = [
  { name: 'Jennifer Belus, PhD', photo: '/img/basel/BelusJennifer.jpg', title: 'Principal Investigator', role: 'Project Lead' },
  { name: 'Sina Hansen', photo: '/img/basel/SinaHansen.jpg', title: 'Project Manager', role: 'Methodology' },
  { name: 'Natalie Johnson', photo: '/img/basel/JohnsonNatalie.jpg', title: 'PHD Student', role: 'Evaluation' },
  { name: 'Giuliana Samaniego Sanchez, PhD', photo: '/img/basel/SanchezSamaniegoGiuliana.jpg', title: 'Senior Technical Advisor (Swiss Tropical and Public Health Institute)', role: 'Content Development' },
  { name: 'Irene Falgas-Bague, MD, PhD', photo: '/img/basel/FalgasBagueIrene.jpg', title: 'Data Scientist', role: 'Analysis' },
  { name: 'Gwendolyn Ciletti- Dougherty', photo: '/img/basel/GwendolynDougherty.jpg', title: 'Masters Student', role: 'Coordination' }
]
</script>
<template>
  <WhoWeAreStakeholderTemplate
    institution="University Hospital Basel"
    country="Switzerland"
    :team-members="6"
    description="Leading research institution providing scientific expertise and program design leadership for PEGISUS implementation across Southern Africa."
    :team="team"
    icon="i-heroicons-academic-cap"
  />
</template>
