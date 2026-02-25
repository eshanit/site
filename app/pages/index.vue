<script setup lang="ts">
const youthFutureData = {
    backgroundImage: '/img/honeycomb.png',
    impactApproachImage: '/img/impact-approach.jpg',
    stats: [
        { value: '60%', label: 'of Africa\'s Population', color: 'from-brand-light to-brand-darkest' },
        { value: '1B+', label: 'Young People in Africa', color: 'from-brand-light to-brand-medium' },
        { value: '75%', label: 'Under 35 Years Old', color: 'from-brand-teal to-brand-dark' }
    ]
}

const supportData = {
    backgroundImage: '/img/pattern4.png',
    cards: [
        {
            title: "Community Well Being",
            description: "We nurture young people in body, mind and spirit.",
            image: "/img/youth1.jpg",
            icon: "i-heroicons-heart",
            stat: "1 in 7",
            reason: "Young people aged 5 - 19 experiences some form of mental health disorder",
            source: "UN/WHO",
            gradient: ["#cde2ee", "#004887"]
        },
         {
            title: "Meaningful Work",
            description: "We support worthwhile jobs and sustainable livelihoods",
            image: "/img/electricity.jpeg",
            icon: "i-heroicons-briefcase",
            stat: "264 million",
            reason: "Young people aged 15 - 24 are not in education, employment or training",
            source: "UN/ILO",
            gradient: ["#a8daf9", "#002d54"]
        },
        {
            title: "Zero Substance Abuse",
            description: "Thriving toward a clean, drug free youth",
            image: "/img/drugfree.png",
            icon: "i-heroicons-shield-check",
            stat: "78 million",
            reason: "Young people aged 12 - 24 are affected by substance abuse worldwide",
            source: "UN/ILO",
            gradient: ["#daf8e3", "#0078c1"]
        },
        {
            title: "Equality and Justice",
            description: "We amplify youth voices in the community",
            image: "/img/justice.jpg",
            icon: "i-heroicons-scale",
            stat: "400 million",
            reason: "Young people face discrimination because of ethnicity and religion",
            source: "UN/ILO",
            gradient: ["#97ebdb", "#004887"]
        }
       
    ]
}

const storiesData = {
  backgroundImage: '/img/pattern.webp',
  stories: [
    {
      id: 1,
      name: "Tendai M.",
      age: 19,
      location: "Harare",
      role: "Tech Apprentice",
      quote: "The coding skills changed my life. I now develop apps for local businesses.",
      image: "/img/tech_story.jpg",
      tags: ["Technology", "Entrepreneurship"],
      color: "linear-gradient(135deg, #0078c1, #002d54)",
      icon: "i-heroicons-code-bracket"
    },
    {
      id: 2,
      name: "Rumbidzai C.",
      age: 21,
      location: "Bulawayo",
      role: "Community Health Worker",
      quote: "I'm helping fight substance abuse through peer education.",
      image: "/img/utsanana_story.jpg",
      tags: ["Health", "Leadership"],
      color: "linear-gradient(135deg, #0078c1, #002d54)", // Brand colors
      icon: "i-heroicons-heart" // Using Heroicons
    },
    {
      id: 3,
      name: "Tinashe K.",
      age: 24,
      location: "Masvingo",
      role: "Sustainable Farmer",
      quote: "Agricultural training helped me turn barren land into a thriving farm.",
      image: "/img/farmer_story.jpg",
      tags: ["Agriculture", "Sustainability"],
      color: "linear-gradient(135deg, #0078c1, #002d54)", // Brand colors
      icon: "i-heroicons-leaf" // Using Heroicons
    },
    {
      id: 4,
      name: "Anesu M.",
      age: 22,
      location: "Mutare",
      role: "Motor Mechanic",
      quote: "I learned how to fix cars, any type of car, and now I run my own garage.",
      image: "/img/motor_story.webp",
      tags: ["Marketing", "Business"],
      color: "linear-gradient(135deg, #0078c1, #002d54)", // Brand colors
      icon: "i-heroicons-chart-bar" // Using Heroicons
    },
    {
      id: 5,
      name: "Chiedza T.",
      age: 20,
      location: "Gweru",
      role: "Fashion Designer",
      quote: "The design program helped me launch my own clothing line.",
      image: "/img/fashion_story.jpg",
      tags: ["Design", "Creativity"],
      color: "linear-gradient(135deg, #0078c1, #002d54)", // Brand colors
      icon: "i-heroicons-scissors" // Using Heroicons
    }
  ]
}
</script>
<template>
    <div>
        <LandingFirst />
        <LandingYouthFuture v-bind="youthFutureData" />
        <LandingFundedby />
        <!-- <LandingSupport v-bind="supportData" />
        <LandingUpcomingEventsPlaceholder />
        <LandingStories v-bind="storiesData" /> -->
    </div>
</template>