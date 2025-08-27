<template>
  <div class="consultation-form">
    <div class="form-header">
      <div class="sarita-avatar">
        <span>S</span>
      </div>
      <h3>Book Your Consultation</h3>
      <p>I'd be delighted to arrange a consultation with Sarita to discuss your healthcare needs.</p>
    </div>

    <div v-if="!showCalendly" class="form-content">
      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-row">
          <div class="form-group">
            <label>Full Name *</label>
            <input 
              v-model="form.name" 
              type="text" 
              required 
              placeholder="Your full name"
            />
          </div>
          <div class="form-group">
            <label>Phone Number *</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              required 
              placeholder="Your phone number"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Email Address *</label>
          <input 
            v-model="form.email" 
            type="email" 
            required 
            placeholder="your.email@example.com"
          />
        </div>

        <div class="form-group">
          <label>Preferred Time for Calls</label>
          <select v-model="form.preferredTime">
            <option value="">Select preferred time</option>
            <option value="morning">Morning (9am - 12pm)</option>
            <option value="afternoon">Afternoon (12pm - 5pm)</option>
            <option value="evening">Evening (5pm - 7pm)</option>
            <option value="flexible">I'm flexible</option>
          </select>
        </div>

        <div class="form-group">
          <label>Coverage Type</label>
          <div class="radio-group">
            <label class="radio-option">
              <input type="radio" v-model="form.coverageType" value="personal" />
              <span>Personal coverage</span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="form.coverageType" value="family" />
              <span>Family coverage</span>
            </label>
            <label class="radio-option">
              <input type="radio" v-model="form.coverageType" value="both" />
              <span>Not sure yet</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Location (UK)</label>
          <input 
            v-model="form.location" 
            type="text" 
            placeholder="Your city/region"
          />
        </div>

        <div class="form-group">
          <label>Health Concerns or Priorities</label>
          <textarea 
            v-model="form.concerns" 
            rows="3"
            placeholder="Any specific health concerns, priorities, or questions you'd like to discuss..."
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" :disabled="!isFormValid">
            Schedule Consultation
            <Calendar />
          </button>
          <button type="button" @click="$emit('close')" class="btn btn-secondary">
            Maybe Later
          </button>
        </div>
      </form>
    </div>

    <!-- Calendly Integration -->
    <div v-else class="calendly-container">
      <div class="calendly-header">
        <p>Perfect! Here's Sarita's calendar to book your consultation:</p>
      </div>
      <div class="calendly-embed">
        <!-- Replace with your actual Calendly URL -->
        <iframe 
          src="https://calendly.com/sarita-concierge/consultation"
          width="100%" 
          height="600" 
          frameborder="0"
          title="Schedule a consultation with Sarita"
        ></iframe>
      </div>
      <div class="calendly-footer">
        <p>Alternatively, you can call us directly at <strong>020 7946 0958</strong> or email <strong>contact@conciergehealth.com</strong></p>
        <button @click="showCalendly = false" class="btn btn-secondary">
          Back to Form
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calendar } from 'lucide-vue-next'

const emit = defineEmits(['close', 'submit'])

const form = ref({
  name: '',
  phone: '',
  email: '',
  preferredTime: '',
  coverageType: 'personal',
  location: '',
  concerns: ''
})

const showCalendly = ref(false)

const isFormValid = computed(() => {
  return form.value.name && form.value.phone && form.value.email
})

const handleSubmit = () => {
  if (isFormValid.value) {
    // Here you could send the form data to your backend
    console.log('Form submitted:', form.value)
    
    // Show Calendly after form submission
    showCalendly.value = true
    
    // Emit to parent component
    emit('submit', form.value)
  }
}
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

.form-content {
  padding: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: var(--primary-gold);
  font-size: 0.875rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem 1rem;
  background: var(--dark-bg);
  border: 1px solid rgba(255, 229, 0, 0.1);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-gold);
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.radio-option:hover {
  background: rgba(255, 229, 0, 0.05);
}

.radio-option input[type="radio"] {
  width: auto;
  margin: 0;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.form-actions .btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Calendly Integration */
.calendly-container {
  padding: 2rem;
}

.calendly-header {
  text-align: center;
  margin-bottom: 1rem;
}

.calendly-embed {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 229, 0, 0.1);
}

.calendly-footer {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 229, 0, 0.1);
}

.calendly-footer p {
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .consultation-form {
    margin: 1rem;
  }
  
  .form-header,
  .form-content,
  .calendly-container {
    padding: 1.5rem;
  }
}
</style>