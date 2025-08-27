<template>
  <div class="pricing-plans">
    <div class="plans-grid">
      <!-- Essential Plan -->
      <div class="plan-card">
        <div class="plan-header">
          <h3>Essential</h3>
          <div class="plan-price">
            <span class="currency">£</span>
            <span class="amount">250</span>
            <span class="period">/month</span>
          </div>
        </div>
        <div class="plan-features">
          <div class="feature">
            <Check /> GP appointment coordination
          </div>
          <div class="feature">
            <Check /> Prescription management
          </div>
          <div class="feature">
            <Check /> Digital health records
          </div>
          <div class="feature">
            <Check /> Specialist referrals
          </div>
          <div class="feature">
            <Check /> Email support
          </div>
        </div>
        <button @click="$emit('select-plan', 'essential')" class="btn btn-secondary">
          Get Started
        </button>
      </div>

      <!-- Premier Plan (Featured) -->
      <div class="plan-card featured">
        <div class="plan-badge">Most Popular</div>
        <div class="plan-header">
          <h3>Premier</h3>
          <div class="plan-price">
            <span class="currency">£</span>
            <span class="amount">500</span>
            <span class="period">/month</span>
          </div>
        </div>
        <div class="plan-features">
          <div class="feature">
            <Check /> Everything in Essential
          </div>
          <div class="feature">
            <Check /> Annual executive health check
          </div>
          <div class="feature">
            <Check /> Priority specialist access
          </div>
          <div class="feature">
            <Check /> 24/7 phone support
          </div>
          <div class="feature">
            <Check /> Travel health coverage
          </div>
          <div class="feature">
            <Check /> Family member coordination
          </div>
        </div>
        <button @click="$emit('select-plan', 'premier')" class="btn btn-primary">
          Get Started
        </button>
      </div>

      <!-- Elite Plan -->
      <div class="plan-card">
        <div class="plan-header">
          <h3>Elite</h3>
          <div class="plan-price">
            <span class="currency">£</span>
            <span class="amount">1,500</span>
            <span class="period">/month</span>
          </div>
        </div>
        <div class="plan-features">
          <div class="feature">
            <Check /> Everything in Premier
          </div>
          <div class="feature">
            <Check /> Dedicated health concierge
          </div>
          <div class="feature">
            <Check /> Same-day appointments
          </div>
          <div class="feature">
            <Check /> Home visits available
          </div>
          <div class="feature">
            <Check /> International coverage
          </div>
          <div class="feature">
            <Check /> Full family coverage
          </div>
        </div>
        <button @click="$emit('select-plan', 'elite')" class="btn btn-secondary">
          Get Started
        </button>
      </div>
    </div>

    <div class="pricing-note">
      <p>All plans include initial health assessment and personalized care planning</p>
      <p class="gold-accent">No setup fees • Cancel anytime</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check } from 'lucide-vue-next'

defineEmits<{
  'select-plan': [plan: string]
}>()
</script>

<style scoped>
.pricing-plans {
  margin: 3rem 0;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.plan-card {
  background: var(--dark-tertiary);
  border-radius: 16px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 229, 0, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 229, 0, 0.4);
  box-shadow: 0 10px 40px rgba(255, 229, 0, 0.15);
}

.plan-card.featured {
  border-color: var(--primary-gold);
  transform: scale(1.05);
}

.plan-card.featured:hover {
  transform: scale(1.05) translateY(-5px);
}

.plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-gradient);
  color: var(--dark-bg);
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 229, 0, 0.1);
}

.plan-header h3 {
  margin-bottom: 1rem;
  color: var(--primary-gold);
}

.plan-price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
}

.currency {
  font-size: 1.5rem;
  opacity: 0.7;
}

.amount {
  font-size: 3rem;
  font-weight: 700;
}

.period {
  font-size: 1.2rem;
  opacity: 0.7;
}

.plan-features {
  margin-bottom: 2rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: var(--text-secondary);
}

.feature svg {
  width: 20px;
  height: 20px;
  color: var(--primary-gold);
  flex-shrink: 0;
}

.plan-card .btn {
  width: 100%;
  justify-content: center;
}

.pricing-note {
  text-align: center;
  margin-top: 3rem;
}

.pricing-note p {
  margin: 0.5rem 0;
}

@media (max-width: 1024px) {
  .plan-card.featured {
    transform: none;
  }
  
  .plans-grid {
    grid-template-columns: 1fr;
  }
}
</style>