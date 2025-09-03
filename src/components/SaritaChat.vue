<template>
  <div class="sarita-chat">
    <!-- Consultation Form Modal -->
    <div v-if="showConsultationForm" class="modal-overlay" @click="closeConsultationForm">
      <div @click.stop>
        <ConsultationForm 
          @close="closeConsultationForm"
          @submit="handleConsultationSubmit"
        />
      </div>
    </div>

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
              <div class="message-text" v-html="formatMessageContent(message.content)"></div>
              <div class="message-actions" v-if="message.role === 'assistant' && shouldShowBookButton(message.content)">
                <button @click="showConsultationForm = true" class="book-consultation-btn">
                  <Calendar />
                  Book Consultation
                </button>
              </div>
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
            @click="action.action ? action.action() : sendQuickAction(action.text)"
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
import { MessageSquare, Send, Calendar } from 'lucide-vue-next'
import ConsultationForm from './ConsultationForm.vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const messages = ref<Message[]>([])
const currentMessage = ref('')
const isTyping = ref(false)
const hasStarted = ref(false)
const showConsultationForm = ref(false)
const messagesContainer = ref<HTMLElement>()

const quickActions = [
  { label: 'How does it work?', text: 'How does your service work?' },
  { label: 'What\'s included?', text: 'What\'s included in the plans?' },
  { label: 'Book consultation', action: () => showConsultationForm.value = true }
]

const startConversation = () => {
  hasStarted.value = true
  messages.value.push({
    role: 'assistant',
    content: 'Hello! I\'m Sarita, your health concierge. I\'m here to help you understand how our service can support your healthcare needs. What would you like to know about our concierge health services?',
    timestamp: new Date()
  })
}

// Simulate typing effect
const simulateTyping = async (fullText: string, messageIndex: number) => {
  const words = fullText.split(' ')
  let currentText = ''
  
  for (let i = 0; i < words.length; i++) {
    currentText += (i > 0 ? ' ' : '') + words[i]
    messages.value[messageIndex].content = currentText
    
    // Scroll as text appears
    await nextTick()
    scrollToBottom()
    
    // Variable delay for more natural feel (faster than Dom's)
    const delay = Math.random() * 25 + 15 // 15-40ms per word for snappier feel
    await new Promise(resolve => setTimeout(resolve, delay))
  }
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
  
  try {
    // Call the actual API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        conversation_history: messages.value.slice(-10).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.content && data.content[0] && data.content[0].text) {
      // Add empty message for typing simulation
      messages.value.push({
        role: 'assistant',
        content: '',
        timestamp: new Date()
      })
      
      isTyping.value = false
      
      // Simulate typing the response
      await simulateTyping(data.content[0].text, messages.value.length - 1)
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    console.error('Chat API error:', error)
    // Fallback to generated response
    const response = generateResponse(userMessage)
    
    // Add empty message for typing simulation
    messages.value.push({
      role: 'assistant',
      content: '',
      timestamp: new Date()
    })
    
    isTyping.value = false
    
    // Simulate typing the fallback response
    await simulateTyping(response, messages.value.length - 1)
  } finally {
    isTyping.value = false
    scrollToBottom()
  }
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

const formatMessageContent = (content: string): string => {
  return content.replace(/\n/g, '<br>')
}

const shouldShowBookButton = (content: string): boolean => {
  const lowerContent = content.toLowerCase()
  return lowerContent.includes('consultation') || lowerContent.includes('book') || lowerContent.includes('appointment')
}

const closeConsultationForm = () => {
  showConsultationForm.value = false
}

const handleConsultationSubmit = (formData: any) => {
  console.log('Consultation form submitted:', formData)
  // Here you could send the data to your backend
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
  position: relative;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
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
  gap: 0.5rem;
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

.message.user {
  justify-content: flex-end;
}

.message.user .message-text {
  background: rgba(255, 229, 0, 0.1);
  border: 1px solid rgba(255, 229, 0, 0.2);
  border-radius: 18px 18px 4px 18px;
}

.message.assistant .message-text {
  border-radius: 18px 18px 18px 4px;
  max-width: 85%;
}

.message-actions {
  margin: 0.5rem 0;
}

.book-consultation-btn {
  background: var(--accent-gradient);
  border: none;
  border-radius: 20px;
  color: var(--dark-bg);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.book-consultation-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(255, 229, 0, 0.3);
}

.book-consultation-btn svg {
  width: 16px;
  height: 16px;
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
  .sarita-chat {
    margin: 0 0.25rem;
    max-width: calc(100vw - 0.5rem);
  }
  
  .chat-container {
    height: 70vh;
    max-height: 500px;
    min-height: 400px;
    width: 100%;
  }
  
  .welcome-state {
    padding: 1.5rem 1rem;
    text-align: center;
  }
  
  .welcome-text {
    max-width: 100%;
    font-size: 0.95rem;
    margin: 1rem 0 1.5rem;
  }
  
  .sarita-avatar {
    width: 80px;
    height: 80px;
    margin-bottom: 1.5rem;
  }
  
  .sarita-avatar span {
    font-size: 2rem;
  }
  
  .quick-actions {
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .quick-action-btn {
    flex: 1;
    min-width: 140px;
    text-align: center;
    font-size: 0.875rem;
  }
  
  .message-content {
    max-width: 90%;
  }
  
  .input-area {
    padding: 0.75rem;
    border-top: 1px solid rgba(255, 229, 0, 0.1);
  }
  
  .input-container {
    flex-direction: row;
  }
  
  .message-input {
    font-size: 16px; /* Prevent zoom on iOS */
    padding: 0.6rem 1rem;
  }
  
  .send-btn {
    padding: 0.6rem 1rem;
  }
}

@media (max-width: 480px) {
  .sarita-chat {
    margin: 0;
    max-width: 100%;
  }
  
  .chat-container {
    height: 60vh;
    max-height: 420px;
    min-height: 350px;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
  
  .welcome-state {
    padding: 0.75rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .welcome-state h3 {
    margin-bottom: 0.25rem;
    font-size: 1.25rem;
  }
  
  .welcome-state p:first-of-type {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .sarita-avatar {
    width: 60px;
    height: 60px;
    margin-bottom: 0.75rem;
  }
  
  .sarita-avatar span {
    font-size: 1.5rem;
  }
  
  .welcome-text {
    font-size: 0.85rem;
    margin: 0.5rem 0 1rem;
    line-height: 1.4;
  }
  
  .btn-primary {
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 380px) {
  .sarita-chat {
    margin: 0;
    max-width: 100%;
  }
  
  .chat-container {
    height: 55vh;
    max-height: 380px;
    min-height: 320px;
    border-radius: 0;
  }
  
  .welcome-state {
    padding: 0.5rem;
  }
  
  .sarita-avatar {
    width: 50px;
    height: 50px;
    margin-bottom: 0.5rem;
  }
  
  .welcome-text {
    font-size: 0.8rem;
  }
}
</style>