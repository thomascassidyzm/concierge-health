<template>
  <div class="testimonials">
    <div class="testimonials-container">
      <div class="testimonial-card" :class="{ active: currentIndex === index }" 
           v-for="(testimonial, index) in testimonials" 
           :key="index"
           v-show="currentIndex === index">
        <div class="quote-mark">"</div>
        <p class="testimonial-text">{{ testimonial.text }}</p>
        <div class="testimonial-author">
          <div class="author-info">
            <h4>{{ testimonial.name }}</h4>
            <p>{{ testimonial.role }}</p>
          </div>
        </div>
      </div>
      
      <!-- Navigation dots -->
      <div class="testimonial-nav">
        <button 
          v-for="(_, index) in testimonials" 
          :key="index"
          @click="currentIndex = index"
          :class="['nav-dot', { active: currentIndex === index }]"
          :aria-label="`Go to testimonial ${index + 1}`"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Testimonial {
  text: string
  name: string
  role: string
}

const testimonials = ref<Testimonial[]>([
  {
    text: "Sarita's team literally saved my life. They identified symptoms my GP missed and got me to the right specialist within 24 hours. The level of care and attention is extraordinary.",
    name: "James Mitchell",
    role: "CEO, Tech Startup"
  },
  {
    text: "Having someone navigate the insurance maze for me was invaluable. They secured coverage for treatments I was told weren't included. Worth every penny of the membership.",
    name: "Sarah Chen",
    role: "Investment Director"
  },
  {
    text: "The mental health support has been transformative. They matched me with the perfect therapist and coordinate all my appointments. It's healthcare as it should be.",
    name: "Michael Roberts",
    role: "Senior Partner, Law Firm"
  },
  {
    text: "When my daughter needed urgent care abroad, they coordinated everything from London. Found the best specialists, translated medical records, even arranged the medical flight home.",
    name: "Emma Thompson",
    role: "Managing Director"
  },
  {
    text: "The annual health screening caught early-stage issues that would have been serious. The follow-up care coordination was seamless. They handle everything so I can focus on my recovery.",
    name: "David Kumar",
    role: "Hedge Fund Manager"
  }
])

const currentIndex = ref(0)
let intervalId: number | null = null

const startRotation = () => {
  intervalId = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
  }, 5000) // Change every 5 seconds
}

const stopRotation = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startRotation()
})

onUnmounted(() => {
  stopRotation()
})
</script>

<style scoped>
.testimonials {
  padding: 4rem 0;
  background: var(--dark-secondary);
  position: relative;
  overflow: hidden;
}

.testimonials-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
}

.testimonial-card {
  text-align: center;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.testimonial-card.active {
  opacity: 1;
}

.quote-mark {
  font-size: 4rem;
  color: var(--primary-gold);
  opacity: 0.3;
  font-family: Georgia, serif;
  line-height: 1;
  margin-bottom: -1rem;
}

.testimonial-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--text-primary);
  margin: 1.5rem auto;
  max-width: 700px;
  font-style: italic;
}

.testimonial-author {
  margin-top: 2rem;
}

.author-info h4 {
  color: var(--primary-gold);
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.author-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Navigation dots */
.testimonial-nav {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}

.nav-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid var(--primary-gold);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot.active {
  background: var(--primary-gold);
  transform: scale(1.2);
}

.nav-dot:hover {
  background: rgba(255, 229, 0, 0.5);
}

/* Background decoration */
.testimonials::before {
  content: '';
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 229, 0, 0.05) 0%, transparent 70%);
  border-radius: 50%;
}

@media (max-width: 768px) {
  .testimonials {
    padding: 3rem 0;
  }
  
  .testimonials-container {
    padding: 0 1rem;
  }
  
  .quote-mark {
    font-size: 3rem;
  }
  
  .testimonial-text {
    font-size: 1.1rem;
  }
  
  .author-info h4 {
    font-size: 1rem;
  }
  
  .author-info p {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .testimonial-text {
    font-size: 1rem;
    line-height: 1.6;
  }
}
</style>