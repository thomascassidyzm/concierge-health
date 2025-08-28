<template>
  <div class="consultation-form">
    <div class="form-header">
      <div class="sarita-avatar">
        <span>S</span>
      </div>
      <h3>Book Your Consultation</h3>
      <p>Schedule a complimentary consultation with Sarita to discuss your healthcare needs.</p>
    </div>

    <!-- Direct Calendly Integration -->
    <div class="calendly-container">
      <div class="calendly-embed">
        <!-- Calendly inline widget begin -->
        <div class="calendly-inline-widget" 
             data-url="https://calendly.com/sarita-concierge/consultation?hide_event_type_details=1&hide_gdpr_banner=1"
             style="min-width:320px;height:650px;">
        </div>
      </div>
      <div class="calendly-footer">
        <button @click="$emit('close')" class="btn btn-secondary">
          Close
        </button>
        <p>Or call us directly: <strong>020 7946 0958</strong> | <strong>contact@conciergehealth.com</strong></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const emit = defineEmits(['close'])

onMounted(() => {
  // Load Calendly widget script
  const script = document.createElement('script')
  script.src = 'https://assets.calendly.com/assets/external/widget.js'
  script.async = true
  document.body.appendChild(script)
})
</script>

<style scoped>
.consultation-form {
  background: var(--dark-tertiary);
  border-radius: 16px;
  border: 1px solid rgba(255, 229, 0, 0.1);
  overflow: hidden;
  max-width: 700px;
  margin: 0 auto;
}

.form-header {
  background: var(--dark-secondary);
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 229, 0, 0.1);
}

.sarita-avatar {
  width: 60px;
  height: 60px;
  background: var(--accent-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.sarita-avatar span {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dark-bg);
}

.form-header h3 {
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--text-secondary);
}

/* Calendly Integration */
.calendly-container {
  padding: 2rem;
}

.calendly-embed {
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.calendly-footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 229, 0, 0.1);
}

.calendly-footer p {
  margin-top: 1rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(255, 229, 0, 0.3);
  border-radius: 8px;
  background: transparent;
  color: var(--primary-gold);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: rgba(255, 229, 0, 0.1);
  border-color: var(--primary-gold);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .consultation-form {
    margin: 1rem;
  }
  
  .form-header,
  .calendly-container {
    padding: 1.5rem;
  }
}
</style>