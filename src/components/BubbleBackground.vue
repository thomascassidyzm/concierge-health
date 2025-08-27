<template>
  <div class="bubble-container">
    <div
      v-for="bubble in bubbles"
      :key="bubble.id"
      class="bubble"
      :style="{
        left: bubble.x + '%',
        animationDuration: bubble.duration + 's',
        animationDelay: bubble.delay + 's',
        width: bubble.size + 'px',
        height: bubble.size + 'px',
        opacity: bubble.opacity
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Bubble {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
}

const bubbles = ref<Bubble[]>([])

onMounted(() => {
  // Generate bubbles with varying properties
  const bubbleCount = 40
  
  for (let i = 0; i < bubbleCount; i++) {
    // Even more size variety - from tiny to large
    const sizeType = Math.random()
    let size
    if (sizeType < 0.3) {
      size = Math.random() * 15 + 5 // 30% tiny: 5-20px
    } else if (sizeType < 0.7) {
      size = Math.random() * 40 + 20 // 40% medium: 20-60px
    } else {
      size = Math.random() * 80 + 60 // 30% large: 60-140px
    }
    
    // Make larger bubbles more transparent
    const sizeRatio = (size - 5) / 135 // 0 for smallest, 1 for largest
    const baseOpacity = Math.random() * 0.15 + 0.08 // Base: 0.08-0.23 (more transparent)
    const opacity = baseOpacity * (1 - sizeRatio * 0.6) // Larger bubbles up to 60% more transparent
    
    bubbles.value.push({
      id: i,
      x: Math.random() * 100, // Random horizontal position
      size,
      duration: Math.random() * 15 + 10, // Duration between 10-25s (faster)
      delay: Math.random() * 15, // Random start delay (shorter)
      opacity
    })
  }
})
</script>

<style scoped>
.bubble-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.bubble {
  position: absolute;
  bottom: -100px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, 
    rgba(255, 229, 0, 0.25), 
    rgba(255, 229, 0, 0.12) 40%, 
    rgba(255, 244, 79, 0.06) 70%,
    transparent
  );
  box-shadow: 
    inset 0 5px 10px rgba(255, 255, 255, 0.1),
    0 0 20px rgba(255, 229, 0, 0.12);
  animation: rise infinite ease-in-out;
  filter: blur(1px);
}

/* Alternate bubble styles for variety */
.bubble:nth-child(3n) {
  background: radial-gradient(circle at 40% 40%, 
    rgba(255, 244, 79, 0.2), 
    rgba(255, 229, 0, 0.1) 50%, 
    transparent 80%
  );
}

.bubble:nth-child(5n) {
  background: radial-gradient(circle at 35% 35%, 
    rgba(255, 229, 0, 0.18), 
    rgba(255, 255, 255, 0.06) 45%, 
    transparent 75%
  );
  filter: blur(1.5px);
}

@keyframes rise {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0;
  }
  5% {
    opacity: var(--bubble-opacity, 0.15);
  }
  25% {
    transform: translateY(-25vh) translateX(10px) scale(1.05);
  }
  50% {
    transform: translateY(-50vh) translateX(-8px) scale(1.02);
  }
  75% {
    transform: translateY(-75vh) translateX(6px) scale(0.98);
  }
  95% {
    opacity: var(--bubble-opacity, 0.15);
  }
  100% {
    transform: translateY(-110vh) translateX(0) scale(0.95);
    opacity: 0;
  }
}

/* Add some wobble for organic movement */
.bubble:nth-child(even) {
  animation-name: rise-wobble;
}

@keyframes rise-wobble {
  0% {
    transform: translateY(0) translateX(0) scale(1) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: var(--bubble-opacity, 0.15);
  }
  20% {
    transform: translateY(-20vh) translateX(15px) scale(1.03) rotate(5deg);
  }
  40% {
    transform: translateY(-40vh) translateX(-10px) scale(1.01) rotate(-3deg);
  }
  60% {
    transform: translateY(-60vh) translateX(12px) scale(0.99) rotate(4deg);
  }
  80% {
    transform: translateY(-80vh) translateX(-8px) scale(0.97) rotate(-2deg);
  }
  95% {
    opacity: var(--bubble-opacity, 0.15);
  }
  100% {
    transform: translateY(-110vh) translateX(0) scale(0.95) rotate(0deg);
    opacity: 0;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .bubble {
    filter: blur(0.5px); /* Less blur on mobile for performance */
  }
}
</style>