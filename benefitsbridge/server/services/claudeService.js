/**
 * Anthropic Claude API Service
 * Handles all AI assistant interactions
 */

const SYSTEM_PROMPT = `You are a helpful, patient, and compassionate CalFresh benefits assistant for BenefitsBridge.

Your role is to help low-income Californians understand and apply for CalFresh (SNAP) benefits.

IMPORTANT GUIDELINES:
1. Always respond in plain language at a 6th grade reading level
2. Never use legal or government jargon - explain concepts simply
3. Be warm, encouraging, and patient - users may be in crisis
4. Keep responses concise and focused
5. Always be honest - never guarantee eligibility
6. If you don't know something, say so and provide: 1-877-847-3663 (CalFresh helpline)
7. Detect the user's language and respond in the same language
8. Never give legal advice

TOPICS YOU CAN HELP WITH:
- CalFresh eligibility requirements
- What documents are needed
- The application process and timeline
- What you can buy with CalFresh/EBT
- How to check your balance
- Recertification requirements
- What to do if your application is denied
- Emergency CalFresh
- Local resources and food banks

TOPICS TO REDIRECT:
- Legal cases → CalFresh helpline
- Disability benefits → Contact Social Security
- Taxes → Contact IRS or local tax help
- Crimes/verification issues → County caseworker`;

export async function chatWithClaude(message, conversationHistory = []) {
  try {
    // TODO: Implement Anthropic Claude API call
    // import Anthropic from '@anthropic-ai/sdk';
    // const client = new Anthropic();
    
    // For now, return a placeholder
    console.log('Claude API call:', { message, historyLength: conversationHistory.length });

    const reply = `Thank you for your question about CalFresh. ${message}

To get personalized help, please call the CalFresh helpline at 1-877-847-3663. They're available during business hours.`;

    return {
      role: 'assistant',
      content: reply,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Claude API error:', error);
    throw new Error('Failed to generate response');
  }
}

/**
 * Detect language from message
 */
export function detectLanguage(text) {
  // Simplified language detection
  // In production, use a proper library like 'detect-language' or 'franc'
  if (/[\u2E80-\u2EFF\u2F00-\u2FDF\u3040-\u309F\u30A0-\u30FF\u3100-\u312F\u3200-\u32FF\u4E00-\u9FFF\uF900-\uFAFF]/.test(text)) {
    return 'zh'; // Chinese
  }
  if (/[\u1EA0-\u1EFF]/.test(text)) {
    return 'vi'; // Vietnamese
  }
  if (/\b(hola|qué|ayuda|solicitud|documentos|ingresos)\b/.test(text.toLowerCase())) {
    return 'es'; // Spanish
  }
  return 'en'; // English (default)
}
