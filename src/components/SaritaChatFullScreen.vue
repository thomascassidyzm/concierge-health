<template>
  <div class="sarita-chat-fullscreen">
    <!-- Fixed Header -->
    <div class="chat-header">
      <div class="header-content">
        <div class="left-section">
          <div class="avatar">✨</div>
          <div class="info">
            <h3>Sarita</h3>
            <p>Your Health Concierge</p>
          </div>
        </div>
        <button @click="$emit('close')" class="btn-close" title="Close chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>

    <!-- Messages Area -->
    <div class="messages-area" ref="messagesArea">
      <div class="messages-content">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.role]">
          <div class="bubble" v-html="formatMessage(message.content)"></div>
        </div>
        
        <!-- Typing indicator -->
        <div v-if="isTyping" class="message assistant">
          <div class="bubble">
            <div class="typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
        
        <!-- Bottom spacer -->
        <div class="bottom-spacer"></div>
      </div>
    </div>
    
    <!-- Fixed Input -->
    <div class="chat-input">
      <button @click="triggerUpload" class="btn-attach" title="Upload insurance documents">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
        </svg>
      </button>
      
      <input 
        v-model="currentMessage"
        @keydown.enter.prevent="sendMessage"
        placeholder="Ask about health plans, screening, or upload insurance docs..."
        :disabled="isTyping"
        class="input-field"
        ref="messageInput"
      />
      
      <button @click="sendMessage" :disabled="!currentMessage.trim() || isTyping" class="btn-send">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
      
      <input 
        type="file" 
        ref="fileInput" 
        @change="handleUpload" 
        accept="image/*,.pdf,.doc,.docx" 
        style="display: none" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

defineEmits(['close'])

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([])
const currentMessage = ref('')
const isTyping = ref(false)
const messagesArea = ref<HTMLElement>()
const fileInput = ref<HTMLInputElement>()
const messageInput = ref<HTMLInputElement>()

const formatMessage = (content: string) => {
  return content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/•/g, '&bull;')
}

const scrollToBottom = () => {
  if (!messagesArea.value) return
  messagesArea.value.scrollTop = messagesArea.value.scrollHeight
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
    
    // Variable delay for more natural feel
    const delay = Math.random() * 25 + 15 // 15-40ms per word
    await new Promise(resolve => setTimeout(resolve, delay))
  }
}

const sendMessage = async () => {
  if (!currentMessage.value.trim() || isTyping.value) return
  
  messages.value.push({
    role: 'user',
    content: currentMessage.value
  })
  
  const msg = currentMessage.value
  currentMessage.value = ''
  
  await nextTick()
  scrollToBottom()
  
  isTyping.value = true
  
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: msg,
        conversation_history: messages.value.slice(-10)
      })
    })
    
    const data = await response.json()
    
    // Add empty message that will be filled by typing simulation
    messages.value.push({
      role: 'assistant',
      content: ''
    })
    
    isTyping.value = false
    
    // Simulate typing the response
    await simulateTyping(data.content[0].text, messages.value.length - 1)
    
  } catch (error) {
    messages.value.push({
      role: 'assistant',
      content: 'Sorry, I had trouble connecting. Please try again or contact us directly.'
    })
    isTyping.value = false
  } finally {
    await nextTick()
    scrollToBottom()
  }
}

const triggerUpload = () => {
  fileInput.value?.click()
}

// Compress image before upload
const compressImage = (file: File, maxWidth: number = 1024): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        // Scale down if needed
        if (width > maxWidth) {
          height = (maxWidth / width) * height
          width = maxWidth
        }
        
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        
        // Convert to base64 with compression
        const base64 = canvas.toDataURL('image/jpeg', 0.8)
        const base64Data = base64.split(',')[1]
        resolve(base64Data)
      }
      img.onerror = reject
      img.src = e.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Handle document/image upload
const handleUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  
  try {
    let uploadMessage = ''
    let promptMessage = ''
    
    // Handle different file types
    if (file.type.startsWith('image/')) {
      // Compress the image
      const base64Data = await compressImage(file, 1024)
      
      uploadMessage = '📸 [Uploaded insurance document image]'
      promptMessage = "I've uploaded an image of my insurance policy. Can you analyze what's covered, what's excluded, and any important limitations I should know about? Please highlight any pre-existing condition clauses."
      
      messages.value.push({
        role: 'user',
        content: uploadMessage
      })
      
      await nextTick()
      scrollToBottom()
      
      isTyping.value = true
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptMessage,
          image_data: base64Data,
          image_type: 'image/jpeg',
          conversation_history: messages.value.slice(-10)
        })
      })
      
      const data = await response.json()
      
      // Add empty message for typing simulation
      messages.value.push({
        role: 'assistant',
        content: ''
      })
      
      isTyping.value = false
      
      // Simulate typing the response
      await simulateTyping(data.content[0].text, messages.value.length - 1)
      
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      // For PDF files
      uploadMessage = '📄 [Uploaded insurance policy PDF]'
      promptMessage = "I've uploaded my insurance policy PDF. Please analyze the coverage details, exclusions, and any important terms I should be aware of."
      
      messages.value.push({
        role: 'user',
        content: uploadMessage
      })
      
      messages.value.push({
        role: 'assistant',
        content: "I can see you've uploaded a PDF. While I can't directly process PDFs yet, I can help you understand your insurance policy if you share key sections as images or text. \n\nMeanwhile, here are the most important things to look for in your policy:\n\n**Coverage Limits:**\n• Annual maximum benefit\n• Per-condition limits\n• Outpatient vs inpatient limits\n\n**Exclusions to Check:**\n• Pre-existing conditions waiting periods\n• Mental health coverage\n• Chronic condition management\n• Preventive screening coverage\n\n**Key Terms:**\n• Excess/deductible amounts\n• Co-payment percentages\n• Network restrictions\n\nWould you like me to explain any specific section, or shall we discuss how Concierge Health can help maximize your coverage?"
      })
      
    } else {
      // For Word docs and other files
      uploadMessage = '📋 [Uploaded document]'
      messages.value.push({
        role: 'user',
        content: uploadMessage
      })
      
      messages.value.push({
        role: 'assistant',
        content: "I've received your document. For the best analysis of your insurance policy, please upload it as an image or share the key sections you'd like me to review. I can help you understand coverage limits, exclusions, and how to maximize your benefits.\n\nOur insurance navigation service can also work directly with your insurer to ensure you're getting maximum coverage. Would you like to learn more?"
      })
    }
  } catch (error) {
    console.error('Upload error:', error)
    messages.value.push({
      role: 'assistant',
      content: "I couldn't process the uploaded file. Please try uploading an image of your insurance policy, or describe what coverage questions you have, and I'll help guide you."
    })
  } finally {
    isTyping.value = false
    await nextTick()
    scrollToBottom()
    // Reset file input
    if (fileInput.value) fileInput.value.value = ''
  }
}

onMounted(() => {
  messages.value.push({
    role: 'assistant',
    content: "Hi! I'm Sarita, your health concierge. 💚\n\nI can help you:\n• Understand our membership plans\n• Navigate insurance coverage\n• Plan health screenings\n• Find the right specialists\n\nYou can even upload your insurance policy, and I'll analyze what's covered! How can I help today?"
  })
})
</script>

<style scoped>
/* Container */
.sarita-chat-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%);
}

/* Header */
.chat-header {
  background: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(10px);
  color: white;
  padding: 1rem;
  border-bottom: 2px solid var(--primary-gold);
  flex-shrink: 0;
  box-shadow: 0 2px 20px rgba(255, 229, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-close {
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-secondary);
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  transform: scale(1.05);
}

.avatar {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, var(--primary-gold), #ffc700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 0 20px rgba(255, 229, 0, 0.3);
}

.info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.info p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--primary-gold);
  opacity: 0.9;
}

/* Messages Area */
.messages-area {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.messages-content {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.message {
  display: flex;
  animation: fadeIn 0.3s ease;
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

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: 85%;
  padding: 0.875rem 1.125rem;
  border-radius: 1.125rem;
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 0.95rem;
}

.message.user .bubble {
  background: linear-gradient(135deg, var(--primary-gold), #ffc700);
  color: #0a0a0a;
  border-bottom-right-radius: 0.25rem;
  box-shadow: 0 2px 10px rgba(255, 229, 0, 0.2);
}

.message.assistant .bubble {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border: 1px solid rgba(255, 229, 0, 0.1);
  border-bottom-left-radius: 0.25rem;
  backdrop-filter: blur(10px);
}

/* Typing animation */
.typing {
  display: flex;
  gap: 4px;
  padding: 4px 0;
}

.typing span {
  width: 8px;
  height: 8px;
  background: var(--primary-gold);
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.typing span:nth-child(1) { animation-delay: 0s; }
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 60%, 100% { 
    transform: scale(0.8); 
    opacity: 0.5; 
  }
  30% { 
    transform: scale(1); 
    opacity: 1; 
  }
}

/* Bottom spacer */
.bottom-spacer {
  height: 80px;
  flex-shrink: 0;
}

/* Input Area */
.chat-input {
  background: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 229, 0, 0.2);
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-shrink: 0;
}

.input-field {
  flex: 1;
  padding: 0.875rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 229, 0, 0.2);
  border-radius: 2rem;
  font-size: 1rem;
  outline: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input-field:focus {
  border-color: var(--primary-gold);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(255, 229, 0, 0.1);
}

.btn-attach,
.btn-send {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-attach {
  background: rgba(255, 229, 0, 0.1);
  color: var(--primary-gold);
}

.btn-attach:hover {
  background: rgba(255, 229, 0, 0.2);
  transform: scale(1.05);
}

.btn-send {
  background: linear-gradient(135deg, var(--primary-gold), #ffc700);
  color: #0a0a0a;
  box-shadow: 0 2px 10px rgba(255, 229, 0, 0.2);
}

.btn-send:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(255, 229, 0, 0.3);
}

.btn-send:disabled {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
  box-shadow: none;
}

/* Scrollbar styling */
.messages-area::-webkit-scrollbar {
  width: 8px;
}

.messages-area::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

.messages-area::-webkit-scrollbar-thumb {
  background: rgba(255, 229, 0, 0.2);
  border-radius: 4px;
}

.messages-area::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 229, 0, 0.3);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .chat-header {
    padding: 0.875rem;
  }
  
  .messages-content {
    padding: 1rem 0.5rem;
  }
  
  .bubble {
    max-width: 90%;
    font-size: 0.925rem;
  }
  
  .chat-input {
    padding: 0.75rem;
    gap: 0.5rem;
  }
  
  .input-field {
    padding: 0.75rem 1rem;
    font-size: 16px; /* Prevent zoom on iOS */
  }
  
  .btn-attach,
  .btn-send {
    width: 38px;
    height: 38px;
  }
  
  .bottom-spacer {
    height: 60px;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .messages-content {
    padding: 0.75rem 0.25rem;
  }
  
  .bubble {
    max-width: 92%;
    padding: 0.75rem 1rem;
  }
  
  .chat-input {
    padding: 0.625rem;
  }
}

/* Desktop adjustments */
@media (min-width: 1024px) {
  .messages-content {
    padding: 2rem;
  }
  
  .bubble {
    max-width: 75%;
    font-size: 1rem;
  }
  
  .chat-input {
    padding: 1.25rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>