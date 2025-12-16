<script setup lang="ts">
import CountryTemplate from './CountryTemplate.vue'

const mainText = `We work across multiple disadvantaged communities (Vrygrond, Capricorn Park, Lavender Hill, Steenberg) in and around the Cape Flats area. In Cape Town, more than a third of young people aged 15-24 are unemployed, with high levels of poverty, crime, substance use, mental health issues, and social instability. Use of substances in many communities leads to various health and social problems.`

const partnerText = `We have partnered with the SOZO Foundation, which offers 10-month vocational training programs to young people in areas such as construction, baking, or hairstyling, for a period of 10 months. SOZO provides job shadowing and assists beneficiaries with finding employment opportunities. SOZO also teaches their beneficiaries other life skills such as goal setting, financial management, and sexual health.`

const images: [string, string] = [
  '/img/countries/south-africa/community_1.jpg',
  '/img/countries/south-africa/community_2.jpg'
]


const stats = [
  { label: 'Youth Unemployment', value: '35%', color: 'text-red-600' },
  { label: 'Training Duration', value: '10 months', color: 'text-cyan-600' },
  { label: 'Communities', value: '4+', color: 'text-blue-600' },
  { label: 'Life Skills', value: 'Comprehensive', color: 'text-green-600' }
]

const communities = [
  'Vrygrond', 'Capricorn Park', 'Lavender Hill', 'Steenberg', 'Cape Flats'
]
</script>
<template>
  <CountryTemplate
    country="South Africa"
    region="Cape Town - Cape Flats"
    :main-text="mainText"
    :partner-text="partnerText"
    :images="images"
    :stats="stats"
    :communities="communities"
    svg-icon="/img/countries/south-africa/south-africa.svg"  
  />
</template>

