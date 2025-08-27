// Sarita Health Concierge Chat API
// This endpoint handles conversations with the AI health concierge

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'ok',
      service: 'Sarita Health Concierge',
      version: '1.0.0'
    });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { message, conversation_history = [] } = req.body;
    
    // If no API key, return intelligent fallback responses
    if (!process.env.CLAUDE_API_KEY) {
      return res.status(200).json({
        content: [{
          text: generateFallbackResponse(message)
        }]
      });
    }
    
    // Claude API integration would go here
    // For now, using fallback responses
    return res.status(200).json({
      content: [{
        text: generateFallbackResponse(message)
      }]
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(200).json({
      content: [{
        text: "I apologize for the technical issue. Let me help you another way. You can reach Sarita directly at contact@conciergehealth.com or call our concierge line."
      }]
    });
  }
}

function generateFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('plan') || lowerMessage.includes('pricing') || lowerMessage.includes('cost')) {
    return `Our membership plans are designed to meet different healthcare needs:

**Essential (£250/month)**
• GP appointment coordination
• Prescription management  
• Digital health records
• Specialist referrals

**Premier (£500/month)**
• Everything in Essential
• Annual executive health check
• 24/7 phone support
• Travel health coverage

**Elite (£1,500/month)**
• Everything in Premier
• Dedicated health concierge
• Same-day appointments
• Full family coverage

All plans include an initial health assessment with no setup fees. Which level of support would best suit your needs?`;
  }
  
  if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('consultation')) {
    return `I'd be delighted to arrange a consultation with Sarita to discuss your healthcare needs.

Our consultations are available:
• Video call (30 minutes)
• In-person at our Harley Street clinic (45 minutes)
• Home visit (Elite members)

To schedule your consultation, please provide:
• Your preferred date and time
• Contact number
• Any specific health concerns

You can also call us directly at 020 7946 0958 or email contact@conciergehealth.com`;
  }
  
  if (lowerMessage.includes('health check') || lowerMessage.includes('executive')) {
    return `Our executive health checks provide a comprehensive assessment of your health status:

**Included Services:**
• Full blood panel (50+ biomarkers)
• Cardiac screening with ECG
• Body composition analysis
• Cancer screening markers
• Lung function tests
• Vision and hearing assessment
• Specialist consultation
• Personalized health report

The assessment takes approximately 3 hours at our partner clinics in Central London. Results are reviewed with you by our medical team within 48 hours.

Would you like to schedule your health check?`;
  }
  
  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent')) {
    return `For medical emergencies, please call 999 immediately.

For urgent but non-emergency situations, our Premier and Elite members have access to:
• 24/7 medical helpline
• Same-day GP consultations
• Direct specialist referrals
• A&E liaison support

Our urgent care line: 020 7946 0999

How can I assist with your current situation?`;
  }
  
  return `Thank you for your interest in Concierge Health. I'm here to help you understand how our service can support your healthcare journey.

We specialize in:
• Coordinating all your medical appointments
• Managing specialist referrals
• Organizing executive health checks
• Providing 24/7 health support

What aspect of your healthcare would you like to discuss?`;
}