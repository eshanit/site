
<script setup lang="ts">
const mainText = `We work in the urban communities of Masvingo district, in the southern region of the country. Masvingo province has an International Wealth Index value of 38.2, which means that most households have few basic material needs met. This region is in the 30th percentile globally for indicators of overall human development, like education, income, and health. Other local efforts are already underway to engage young Zimbabweans into dialogue to reduce violence against women, showing that some young people are ready to challenge traditional gender beliefs and make positive changes in their communities.`

const partnerText = `We have partnered with Masvingo Polytechnic, which offers a wide range of practical skills-based programs for learners to increase opportunities for future employment.`

const images: string[] = [
  // '/img/countries/zimbabwe/community_1.jpg',
  // '/img/countries/zimbabwe/community_2.jpg'
     'https://picsum.photos/640/640?random=1',
  'https://picsum.photos/640/640?random=2',
  'https://picsum.photos/640/640?random=3',
  'https://picsum.photos/640/640?random=4',
  'https://picsum.photos/640/640?random=5',
  'https://picsum.photos/640/640?random=6'
]

const countryMap ='/img/countries/zimbabwe/zimbabweMap.png'


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
    :country-map="countryMap"
    :communities="communities"
    svg-icon="/img/countries/zimbabwe/zimbabwe.svg"
    :is-reversed="true"
  />
</template>
