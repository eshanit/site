<script setup lang="ts">

const mainText = `We work in the Matero, Lilanda, and 6-mile to 15-mile communities, as well as the areas surrounding Heroes Stadium, located in and around the capital city of Lusaka, Zambia. Zambia has one of the highest rates of regular alcohol use among young people in low- and middle-income countries, with almost one-third reporting recent experiences of intimate partner violence (WHO, 2018; UNFPA, 2020). This violence often stems from deeply rooted unhealthy beliefs about gender (Heise et al., 2019). The region also faces significant challenges related to the education and employment of young people. For instance, over 36% of youth aged 20 to 24 are unemployed, and more than 80% of Zambians are engaged in the informal sector, where work lacks proper regulations and protections (ILO, 2021).`

const partnerText = `We have partnered with Build It International, a vocational training program focused mainly on teaching skilled trades, such as bricklaying, painting, and carpentry.`

const images: [string, string] = [
  '/img/countries/zambia/community_1.jpg',
  '/img/countries/zambia/community_2.jpg'
]

const stats = [
  { label: 'Youth Unemployment', value: '36%', color: 'text-red-600' },
  { label: 'Informal Sector', value: '80%', color: 'text-amber-600' },
  { label: 'Alcohol Use Rate', value: 'Highest', color: 'text-blue-600' },
  { label: 'IPV Experience', value: '33%', color: 'text-purple-600' }
]

const communities = [
  'Matero', 'Lilanda', '6-mile', '15-mile', 'Heroes Stadium Area'
]
</script>
<template>
  <WhereWeWorkCountryTemplate
    country="Zambia"
    region="Lusaka & Surrounding Areas"
    :main-text="mainText"
    :partner-text="partnerText"
    :images="images"
    :stats="stats"
    :communities="communities"
    icon="i-heroicons-flag"
    svg-icon="/img/countries/zambia/zambia.svg" 
  />
</template>
