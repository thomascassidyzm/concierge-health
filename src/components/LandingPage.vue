<template>
  <div class="landing-page">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <div class="logo">
            <span class="gold-accent gold-glow">Concierge Health Advisors</span>
          </div>
          <div class="nav-links">
            <a href="#services" class="nav-link">Services</a>
            <a href="#pricing" class="nav-link">Pricing</a>
            <a href="#chat" class="nav-link gold-accent">Chat with Sarita</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="glow-element" style="top: -150px; right: -150px;"></div>
      <div class="container">
        <div class="hero-content">
          <h1>Your Personal Health <span class="gold-accent gold-glow">Concierge</span></h1>
          <div class="gold-line"></div>
          <p class="hero-subtitle">
            With over 30 years of experience and London's largest network of specialists, 
            we deliver premium healthcare navigation with the care and attention you deserve.
          </p>
          <div class="credibility-badges">
            <div class="badge">
              <span class="badge-number">30+</span>
              <span class="badge-text">Years Experience</span>
            </div>
            <div class="badge">
              <span class="badge-number">500+</span>
              <span class="badge-text">Leading Specialists</span>
            </div>
            <div class="badge">
              <span class="badge-number">24/7</span>
              <span class="badge-text">Year-Round Support</span>
            </div>
          </div>
          <div class="hero-actions">
            <button @click="scrollToChat" class="btn btn-primary">
              Chat with Sarita
              <Arrow />
            </button>
            <button @click="scrollToPricing" class="btn btn-secondary">
              View Plans
            </button>
          </div>
        </div>
        <div class="hero-image floating">
          <!-- Placeholder for hero image -->
          <div class="image-placeholder">
            <Heart />
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
      <div class="container">
        <h2>Complete Healthcare <span class="gold-accent">Management</span></h2>
        <div class="gold-line"></div>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <Shield />
            </div>
            <h3>Executive Health Checks</h3>
            <p>Comprehensive annual assessments at London's leading private clinics</p>
            <ul class="service-details">
              <li>72-variant cancer screening</li>
              <li>Full cardiac & metabolic panel</li>
              <li>Mental health assessment</li>
              <li>Same-day results consultation</li>
            </ul>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <Calendar />
            </div>
            <h3>Appointment Management</h3>
            <p>We handle all bookings, follow-ups, and coordination with specialists</p>
            <ul class="service-details">
              <li>Same-day GP appointments</li>
              <li>Priority specialist access</li>
              <li>Insurance pre-authorisation</li>
              <li>In-person accompaniment available</li>
            </ul>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <Users />
            </div>
            <h3>Specialist Network</h3>
            <p>Access to vetted consultants across all medical specialties</p>
            <ul class="service-details">
              <li>500+ leading specialists</li>
              <li>Mental health experts</li>
              <li>ADHD assessment & treatment</li>
              <li>International second opinions</li>
            </ul>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <Phone />
            </div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock access to medical guidance when you need it</p>
            <ul class="service-details">
              <li>Doctor on-call service</li>
              <li>Mental health crisis support</li>
              <li>International medical assistance</li>
              <li>Prescription management</li>
            </ul>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <FileText />
            </div>
            <h3>Health Records & Insurance</h3>
            <p>Complete medical record management and insurance navigation</p>
            <ul class="service-details">
              <li>Digital health vault</li>
              <li>Insurance claim management</li>
              <li>Coverage maximisation</li>
              <li>Home blood test kits</li>
            </ul>
          </div>
          <div class="service-card">
            <div class="service-icon">
              <Zap />
            </div>
            <h3>Emergency Coordination</h3>
            <p>Rapid response and hospital liaison in urgent situations</p>
            <ul class="service-details">
              <li>A&E fast-track access</li>
              <li>Medical evacuation support</li>
              <li>Hospital liaison service</li>
              <li>Family coordination</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section id="why-us" class="why-us-section">
      <div class="container">
        <h2>Why Choose <span class="gold-accent">Concierge Health</span></h2>
        <div class="gold-line"></div>
        <WhyChooseUs @book-consultation="scrollToChat" />
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <h2>What Our Members <span class="gold-accent">Say</span></h2>
        <div class="gold-line"></div>
        <p class="section-subtitle">Real experiences from those who trust us with their health</p>
        <Testimonials />
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="pricing">
      <div class="container">
        <h2>Transparent <span class="gold-accent">Pricing</span></h2>
        <div class="gold-line"></div>
        <PricingPlans @select-plan="handlePlanSelection" />
      </div>
    </section>

    <!-- Chat Section -->
    <section id="chat" class="chat-section">
      <div class="container">
        <div class="chat-intro">
          <h2>Meet <span class="gold-accent gold-glow">Sarita</span></h2>
          <div class="gold-line"></div>
          <p>Your personal health concierge is ready to understand your needs and explain how we can support your healthcare journey.</p>
          <button @click="emit('open-fullscreen-chat')" class="btn btn-secondary full-screen-btn">
            Open Full-Screen Chat
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
            </svg>
          </button>
        </div>
        <SaritaChat />
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>&copy; 2024 Concierge Health. Premium healthcare navigation.</p>
          <div class="footer-links">
            <a href="#" class="footer-link">Privacy</a>
            <a href="#" class="footer-link">Terms</a>
            <a href="#" class="footer-link">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Heart, Shield, Calendar, Users, Phone, FileText, Zap, ArrowRight } from 'lucide-vue-next'
import PricingPlans from './PricingPlans.vue'
import SaritaChat from './SaritaChat.vue'
import Testimonials from './Testimonials.vue'
import WhyChooseUs from './WhyChooseUs.vue'

const emit = defineEmits(['open-fullscreen-chat'])

const Arrow = ArrowRight

const scrollToChat = () => {
  // Check if on mobile or user preference
  const isMobile = window.innerWidth <= 768
  if (isMobile) {
    // Open full-screen chat on mobile
    emit('open-fullscreen-chat')
  } else {
    // Scroll to embedded chat on desktop
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}

const handlePlanSelection = (plan: string) => {
  console.log('Selected plan:', plan)
  scrollToChat()
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  position: relative;
  z-index: 10;
  width: 100%;
}

/* Navigation */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 229, 0, 0.1);
  z-index: 1000;
  padding: 1rem 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-gold);
}

/* Hero Section */
.hero {
  padding: 8rem 0 4rem;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 600px;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin: 2rem 0;
}

/* Credibility Badges */
.credibility-badges {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  justify-content: center;
}

.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.badge-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-gold);
  text-shadow: 0 0 20px rgba(255, 229, 0, 0.3);
}

.badge-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.hero-image {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
}

.image-placeholder {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 229, 0, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 229, 0, 0.3);
  position: relative;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 229, 0, 0.2),
      0 0 40px rgba(255, 229, 0, 0.1),
      inset 0 0 20px rgba(255, 229, 0, 0.05);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(255, 229, 0, 0.4),
      0 0 60px rgba(255, 229, 0, 0.2),
      inset 0 0 30px rgba(255, 229, 0, 0.1);
  }
}

.image-placeholder svg {
  width: 150px;
  height: 150px;
  color: var(--primary-gold);
  opacity: 0.6;
  filter: drop-shadow(0 0 20px rgba(255, 229, 0, 0.5));
  animation: heart-beat 1.5s ease-in-out infinite;
}

@keyframes heart-beat {
  0%, 100% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.05);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.08);
  }
  40% {
    transform: scale(1);
  }
}

/* Services Section */
.services {
  padding: 4rem 0;
  background: var(--dark-secondary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.service-card {
  background: var(--dark-tertiary);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 229, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 320px;
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-gold);
  box-shadow: 0 10px 30px rgba(255, 229, 0, 0.2);
}

.service-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 229, 0, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.service-icon svg {
  width: 30px;
  height: 30px;
  color: var(--primary-gold);
}

.service-card h3 {
  margin-bottom: 0.5rem;
}

.service-card p {
  margin-bottom: 1rem;
}

.service-details {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.service-details li {
  font-size: 0.875rem;
  color: var(--primary-gold);
  position: relative;
  padding-left: 1.25rem;
}

.service-details li::before {
  content: '✓';
  position: absolute;
  left: 0;
  font-weight: bold;
  color: var(--primary-gold);
}

/* Why Choose Us Section */
.why-us-section {
  padding: 4rem 0;
  background: var(--dark-secondary);
  text-align: center;
}

.why-us-section .gold-line {
  margin: 1.5rem auto;
}

/* Testimonials Section */
.testimonials-section {
  padding: 4rem 0;
  background: var(--dark-bg);
  text-align: center;
}

.testimonials-section .gold-line {
  margin: 1.5rem auto;
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-top: -0.5rem;
  margin-bottom: 2rem;
}

/* Pricing Section */
.pricing {
  padding: 4rem 0;
  background: var(--dark-secondary);
}

/* Chat Section */
.chat-section {
  padding: 4rem 0;
  background: var(--dark-secondary);
}

.chat-intro {
  text-align: center;
  margin-bottom: 3rem;
}

.chat-intro .gold-line {
  margin: 1.5rem auto;
}

/* Footer */
.footer {
  padding: 2rem 0;
  background: var(--dark-bg);
  border-top: 1px solid rgba(255, 229, 0, 0.1);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--primary-gold);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-image {
    display: none;
  }
  
  .nav-links {
    display: none;
  }
  
  .hero {
    padding: 5rem 0 2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .hero-content {
    max-width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
    margin: 1.5rem 0;
  }
  
  .credibility-badges {
    gap: 1.5rem;
    margin: 1.5rem 0;
    flex-wrap: wrap;
  }
  
  .badge-number {
    font-size: 1.5rem;
  }
  
  .badge-text {
    font-size: 0.75rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .hero-actions .btn {
    width: 100%;
    max-width: 320px;
    justify-content: center;
    padding: 1rem 2rem;
    font-size: 1.05rem;
  }
  
  .services {
    padding: 2rem 0;
    text-align: center;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }
  
  .service-card {
    min-height: auto;
    padding: 1.5rem;
  }
  
  .service-details li {
    font-size: 0.8rem;
  }
  
  .why-us-section {
    padding: 2rem 0;
  }
  
  .testimonials-section {
    padding: 2rem 0;
  }
  
  .section-subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .pricing {
    padding: 2rem 0;
    text-align: center;
  }
  
  .chat-section {
    padding: 1.5rem 0;
    text-align: center;
    min-height: auto;
  }
  
  .chat-section .container {
    padding: 0 0.25rem;
  }
  
  .chat-intro {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .chat-intro h2 {
    font-size: clamp(1.25rem, 5vw, 1.75rem);
    margin-bottom: 0.5rem;
  }
  
  .chat-intro p {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  .chat-intro .gold-line {
    margin: 0.75rem auto;
    height: 2px;
    width: 60px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  h1 {
    text-align: center;
  }
  
  .gold-line {
    margin: 1.5rem auto;
  }
}

@media (max-width: 480px) {
  .chat-section .container {
    padding: 0;
  }
}

@media (max-width: 380px) {
  .chat-section {
    padding: 1rem 0;
  }
  
  .chat-section .container {
    padding: 0;
  }
  
  .chat-intro {
    margin-bottom: 0.75rem;
    padding: 0 0.5rem;
  }
  
  .chat-intro h2 {
    font-size: 1.25rem;
  }
  
  .chat-intro p {
    font-size: 0.85rem;
  }
}

/* Full-screen chat button */
.full-screen-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1.5rem 0 2rem;
}

.full-screen-btn svg {
  width: 18px;
  height: 18px;
}
</style>