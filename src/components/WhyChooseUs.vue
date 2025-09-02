<template>
  <div class="why-choose-us">
    <div class="container">
      <div class="intro-text">
        <h3 class="tagline">"Small enough to care, big enough to make a difference"</h3>
        <p class="description">
          At Concierge Health Advisors, we know how every unique person can thrive with precision support, 
          tailored to their needs for better health outcomes and longevity.
        </p>
      </div>

      <div class="benefits-grid">
        <div class="benefit-card highlight">
          <div class="benefit-icon">
            <Shield />
          </div>
          <h3>Insurance Navigation Experts</h3>
          <p>
            Your private medical insurance likely won't cover previous conditions without additional costs. 
            We work on your behalf with insurers to ensure maximum coverage.
          </p>
          <ul class="benefit-list">
            <li>Health plan audit & optimization</li>
            <li>Pre-authorization management</li>
            <li>Claims negotiation & appeals</li>
            <li>International coverage coordination</li>
          </ul>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <Heart />
          </div>
          <h3>Truly Personal Care</h3>
          <p>
            We take the time to get to know you, from your history to your goals for the future.
          </p>
          <ul class="benefit-list">
            <li>Dedicated health concierge</li>
            <li>Personalized health roadmap</li>
            <li>Family coverage included</li>
            <li>Lifestyle-aligned solutions</li>
          </ul>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <Users />
          </div>
          <h3>End-to-End Support</h3>
          <p>
            For any eventuality, we take care of everything and stay with you throughout the journey.
          </p>
          <ul class="benefit-list">
            <li>In-person accompaniment</li>
            <li>Results chasing & follow-up</li>
            <li>Multi-appointment coordination</li>
            <li>Family liaison services</li>
          </ul>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <Brain />
          </div>
          <h3>Mental Health Parity</h3>
          <p>
            With mental health fast outstripping physical illness, our mental wellbeing services add significant value.
          </p>
          <ul class="benefit-list">
            <li>Stress & anxiety screening</li>
            <li>Executive burnout prevention</li>
            <li>ADHD specialist network</li>
            <li>24/7 crisis support</li>
          </ul>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <Globe />
          </div>
          <h3>Global Coverage</h3>
          <p>
            Whether you're traveling for business or holiday, we ensure continuous care worldwide.
          </p>
          <ul class="benefit-list">
            <li>International specialist network</li>
            <li>Medical evacuation support</li>
            <li>Travel health planning</li>
            <li>Multi-country insurance liaison</li>
          </ul>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <Clock />
          </div>
          <h3>Time Is Health</h3>
          <p>
            We minimize waiting times through established relationships with the best hospitals and clinics.
          </p>
          <ul class="benefit-list">
            <li>Same-day appointments</li>
            <li>Priority specialist access</li>
            <li>Fast-track diagnostics</li>
            <li>Immediate second opinions</li>
          </ul>
        </div>
      </div>

      <div class="cta-section">
        <h3>Ready to experience healthcare as it should be?</h3>
        <p>Book a free consultation to see what difference this can make for you and those you love most.</p>
        <button @click="$emit('book-consultation')" class="btn btn-primary">
          Book Free Consultation
          <ArrowRight />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Shield, Heart, Users, Brain, Globe, Clock, ArrowRight } from 'lucide-vue-next'

defineEmits(['book-consultation'])
</script>

<style scoped>
.why-choose-us {
  padding: 4rem 0;
  background: var(--dark-bg);
}

.intro-text {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.tagline {
  font-size: 1.75rem;
  color: var(--primary-gold);
  font-style: italic;
  margin-bottom: 1rem;
  text-shadow: 0 0 30px rgba(255, 229, 0, 0.3);
}

.description {
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.benefit-card {
  background: var(--dark-secondary);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 229, 0, 0.1);
  transition: all 0.3s ease;
}

.benefit-card.highlight {
  border: 2px solid var(--primary-gold);
  position: relative;
}

.benefit-card.highlight::before {
  content: 'MOST POPULAR';
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-gold);
  color: var(--dark-bg);
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.benefit-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-gold);
  box-shadow: 0 10px 30px rgba(255, 229, 0, 0.15);
}

.benefit-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 229, 0, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.benefit-icon svg {
  width: 30px;
  height: 30px;
  color: var(--primary-gold);
}

.benefit-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.benefit-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.benefit-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-list li {
  font-size: 0.875rem;
  color: var(--primary-gold);
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
}

.benefit-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  font-weight: bold;
}

/* CTA Section */
.cta-section {
  text-align: center;
  background: var(--dark-tertiary);
  padding: 3rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 229, 0, 0.2);
}

.cta-section h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.cta-section .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .why-choose-us {
    padding: 3rem 0;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .benefit-card {
    padding: 1.5rem;
  }
  
  .tagline {
    font-size: 1.5rem;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .cta-section {
    padding: 2rem 1.5rem;
  }
  
  .cta-section h3 {
    font-size: 1.5rem;
  }
  
  .cta-section p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .tagline {
    font-size: 1.25rem;
  }
  
  .benefit-card h3 {
    font-size: 1.1rem;
  }
  
  .benefit-list li {
    font-size: 0.8rem;
  }
}
</style>