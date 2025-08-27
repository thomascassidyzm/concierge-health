<template>
  <div class="sarita-chat">
    <div class="chat-container">
      <!-- Messages Area -->
      <div class="messages-area" ref="messagesContainer">
        <div v-if="!hasStarted" class="welcome-state">
          <div class="sarita-avatar floating">
            <span>S</span>
          </div>
          <h3>Hello, I'm Sarita</h3>
          <p>Your personal health concierge</p>
          <p class="welcome-text">
            I'm here to understand your healthcare needs and explain how our concierge service can support you. 
            Whether you need help with appointments, health checks, or specialist referrals, I'll guide you through everything.
          </p>
          <button @click="startConversation" class="btn btn-primary">
            Start Conversation
            <MessageSquare />
          </button>
        </div>
        
        <div v-else class="messages-list">
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            :class="['message', message.role]"
          >
            <div class="message-avatar">
              <span>{{ message.role === 'user' ? 'You' : 'S' }}</span>
            </div>
            <div class="message-content">
              <div class="message-text">{{ message.content }}</div>
              <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
          </div>
          
          <div v-if="isTyping" class="message assistant typing">
            <div class="message-avatar">
              <span>S</span>
            </div>
            <div class="message-content">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div v-if="hasStarted" class="input-area">
        <div class="quick-actions">
          <button 
            v-for="action in quickActions" 
            :key="action.text"
            @click="sendQuickAction(action.text)"
            class="quick-action-btn"
          >
            {{ action.label }}
          </button>
        </div>
        <div class="input-container">
          <input 
            v-model="currentMessage"
            @keypress.enter="sendMessage"
            placeholder="Type your message..."
            :disabled="isTyping"
            class="message-input"
          />
          <button 
            @click="sendMessage"
            :disabled="!currentMessage.trim() || isTyping"
            class="send-btn"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { MessageSquare, Send } from 'lucide-vue-next'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const messages = ref<Message[]>([])
const currentMessage = ref('')
const isTyping = ref(false)
const hasStarted = ref(false)
const messagesContainer = ref<HTMLElement>()

const quickActions = [
  { label: 'Tell me about plans', text: 'Can you explain the different membership plans?' },
  { label: 'Health checks', text: 'What does an executive health check include?' },
  { label: 'Book consultation', text: 'I\'d like to book a consultation with Sarita' }
]

const startConversation = () => {
  hasStarted.value = true
  messages.value.push({
    role: 'assistant',
    content: 'Hello! I\'m Sarita, your health concierge. I\'m here to help you understand how our service can support your healthcare needs. What would you like to know about our concierge health services?',
    timestamp: new Date()
  })
}

const sendMessage = async () => {
  if (!currentMessage.value.trim() || isTyping.value) return
  
  const userMessage = currentMessage.value
  currentMessage.value = ''
  
  // Add user message
  messages.value.push({
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  })
  
  scrollToBottom()
  isTyping.value = true
  
  // Simulate API call with timeout
  setTimeout(() => {
    const response = generateResponse(userMessage)
    messages.value.push({
      role: 'assistant',
      content: response,
      timestamp: new Date()
    })
    isTyping.value = false
    scrollToBottom()
  }, 1500)
}

const sendQuickAction = (text: string) => {
  currentMessage.value = text
  sendMessage()
}

const generateResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('plan') || lowerMessage.includes('price') || lowerMessage.includes('membership')) {
    return 'We offer three membership tiers:\n\n• Essential (£250/month): GP coordination, prescriptions, digital records\n• Premier (£500/month): Includes annual health checks and 24/7 support\n• Elite (£1,500/month): Dedicated concierge, same-day appointments, full family coverage\n\nAll plans include an initial health assessment. Would you like to discuss which plan might be best for you?'
  }
  
  if (lowerMessage.includes('health check') || lowerMessage.includes('executive')) {
    return 'Our executive health checks are comprehensive assessments conducted at leading London clinics. They include:\n\n• Full blood panel and biomarkers\n• Cardiac screening with ECG\n• Body composition analysis\n• Cancer screening markers\n• Specialist consultations\n• Personalized health report\n\nThe results are reviewed with you by our medical team, and we create a tailored health optimization plan. Would you like to know more about scheduling?'
  }
  
  if (lowerMessage.includes('consultation') || lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
    return 'I\'d be delighted to arrange a consultation for you. Sarita offers both video and in-person consultations to discuss your health needs and how our concierge service can help.\n\nTo book your consultation, I\'ll need:\n• Your preferred date and time\n• Contact number\n• Any specific health concerns you\'d like to discuss\n\nShall I help you schedule this now?'
  }
  
  if (lowerMessage.includes('specialist') || lowerMessage.includes('referral')) {
    return 'We maintain relationships with vetted specialists across all medical fields including cardiology, dermatology, orthopedics, and more. When you need a specialist, we:\n\n• Identify the right consultant for your needs\n• Arrange priority appointments\n• Transfer your medical records\n• Coordinate follow-up care\n\nIs there a particular specialty you\'re interested in?'
  }
  
  return 'That\'s a great question. Let me connect you with more specific information. Our concierge service is designed to handle all aspects of your healthcare journey - from routine appointments to complex medical situations. What specific aspect of healthcare support are you most interested in?'
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.sarita-chat {
  max-width: 900px;
  margin: 0 auto;
}

.chat-container {
  background: var(--dark-tertiary);
  border-radius: 16px;
  border: 1px solid rgba(255, 229, 0, 0.1);
  overflow: hidden;
  height: 600px;
  display: flex;
  flex-direction: column;
}

/* Welcome State */
.welcome-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 3rem;
  text-align: center;
}

.sarita-avatar {
  width: 100px;
  height: 100px;
  background: var(--accent-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.sarita-avatar span {
  font-size: 3rem;
  font-weight: 700;
  color: var(--dark-bg);
}

.welcome-state h3 {
  margin-bottom: 0.5rem;
}

.welcome-text {
  max-width: 500px;
  margin: 1.5rem 0 2rem;
}

/* Messages Area */
.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  gap: 1rem;
  animation: fadeIn 0.3s ease;
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  background: rgba(255, 229, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message.assistant .message-avatar {
  background: var(--accent-gradient);
}

.message-avatar span {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--primary-gold);
}

.message.assistant .message-avatar span {
  color: var(--dark-bg);
}

.message-content {
  max-width: 70%;
}

.message-text {
  background: rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 12px;
  white-space: pre-wrap;
}

.message.user .message-text {
  background: rgba(255, 229, 0, 0.1);
  border: 1px solid rgba(255, 229, 0, 0.2);
}

.message-time {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-top: 0.25rem;
  padding: 0 0.5rem;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  gap: 0.25rem;
  padding: 1rem;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: var(--primary-gold);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-10px);
  }
}

/* Input Area */
.input-area {
  border-top: 1px solid rgba(255, 229, 0, 0.1);
  padding: 1rem;
  background: var(--dark-secondary);
}

.quick-actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.quick-action-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 229, 0, 0.1);
  border: 1px solid rgba(255, 229, 0, 0.2);
  border-radius: 20px;
  color: var(--primary-gold);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-action-btn:hover {
  background: rgba(255, 229, 0, 0.2);
  transform: translateY(-1px);
}

.input-container {
  display: flex;
  gap: 0.5rem;
}

.message-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: var(--dark-tertiary);
  border: 1px solid rgba(255, 229, 0, 0.1);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
}

.message-input:focus {
  outline: none;
  border-color: var(--primary-gold);
}

.send-btn {
  padding: 0.75rem 1.25rem;
  background: var(--accent-gradient);
  border: none;
  border-radius: 8px;
  color: var(--dark-bg);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(255, 229, 0, 0.3);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn svg {
  width: 20px;
  height: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar */
.messages-area::-webkit-scrollbar {
  width: 6px;
}

.messages-area::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.messages-area::-webkit-scrollbar-thumb {
  background: rgba(255, 229, 0, 0.3);
  border-radius: 3px;
}

.messages-area::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 229, 0, 0.5);
}

@media (max-width: 768px) {
  .chat-container {
    height: 500px;
  }
  
  .quick-actions {
    justify-content: center;
  }
  
  .message-content {
    max-width: 85%;
  }
}
</style>