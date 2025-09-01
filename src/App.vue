<template>
  <div id="app">
    <BubbleBackground />
    <LandingPage />
  </div>
</template>

<script setup lang="ts">
import LandingPage from './components/LandingPage.vue'
import BubbleBackground from './components/BubbleBackground.vue'
</script>

<style>
/* Global Styles - Dark theme with warm yellow accents */
:root {
  --primary-gold: #FFE500;  /* Warm yellow */
  --secondary-gold: #FFF44F;  /* Lighter warm yellow */
  --dark-bg: #0A0A0A;
  --dark-secondary: #141414;
  --dark-tertiary: #1F1F1F;
  --text-primary: #FFFFFF;
  --text-secondary: #B0B0B0;
  --text-tertiary: #808080;
  --accent-gradient: linear-gradient(135deg, #FFE500, #FFF44F);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  background: var(--dark-bg);
  color: var(--text-primary);
  overflow-x: hidden;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* Typography */
h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  line-height: 1.3;
}

h3 {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 600;
}

p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.gold-accent {
  color: var(--primary-gold);
  position: relative;
}

.gold-glow {
  text-shadow: 0 0 30px rgba(255, 229, 0, 0.5), 0 0 60px rgba(255, 229, 0, 0.3);
}

/* Buttons */
.btn {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--accent-gradient);
  color: var(--dark-bg);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(255, 229, 0, 0.4), 0 0 60px rgba(255, 229, 0, 0.2);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-gold);
  border: 2px solid var(--primary-gold);
}

.btn-secondary:hover {
  background: rgba(255, 229, 0, 0.1);
  box-shadow: 0 0 30px rgba(255, 229, 0, 0.3);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  body {
    text-align: center;
  }
  
  #app {
    align-items: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }
  
  h1 {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
  }
  
  p {
    font-size: 1rem;
  }
}

/* Gold line decoration */
.gold-line {
  width: 80px;
  height: 3px;
  background: var(--accent-gradient);
  margin: 1.5rem 0;
  border-radius: 2px;
}

/* Subtle animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.floating {
  animation: float 6s ease-in-out infinite;
}

.glow-element {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 229, 0, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: glow-pulse 4s ease-in-out infinite;
  filter: blur(20px);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--dark-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--dark-tertiary);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-gold);
}
</style>