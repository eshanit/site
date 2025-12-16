
<script setup lang="ts">
const mainText = `We work in the urban communities of Masvingo district, in the southern region of the country. Masvingo province has an International Wealth Index value of 38.2, which means that most households have few basic material needs met. This region is in the 30th percentile globally for indicators of overall human development, like education, income, and health. Other local efforts are already underway to engage young Zimbabweans into dialogue to reduce violence against women, showing that some young people are ready to challenge traditional gender beliefs and make positive changes in their communities.`

const partnerText = `We have partnered with Masvingo Polytechnic, which offers a wide range of practical skills-based programs for learners to increase opportunities for future employment.`

const images: [string, string] = [
  '/img/countries/zimbabwe/community_1.jpg',
  '/img/countries/zimbabwe/community_2.jpg'
]
const stats = [
  { label: 'Wealth Index', value: '38.2', color: 'text-cyan-600' },
  { label: 'Human Development', value: '30th %ile', color: 'text-amber-600' },
  { label: 'Basic Needs Met', value: 'Low', color: 'text-red-600' },
  { label: 'Youth Engagement', value: 'High', color: 'text-green-600' }
]

const communities = [
  'Masvingo Urban Communities'
]
</script>
<template>
  <WhereWeWorkCountryTemplate
    country="Zimbabwe"
    region="Masvingo District"
    :main-text="mainText"
    :partner-text="partnerText"
    :images="images"
    :stats="stats"
    :communities="communities"
    svg-icon="/img/countries/zimbabwe/zimbabwe.svg"
    :is-reversed="true"
  />
</template>
