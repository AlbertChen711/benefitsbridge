import express from 'express';

const router = express.Router();

/**
 * POST /api/ai/chat
 * Chat with Claude AI assistant
 */
router.post('/chat', (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    // TODO: Call Anthropic Claude API
    // TODO: Add system prompt for plain language responses
    // TODO: Detect language and respond in same language

    const reply = `I understand you're asking: "${message}". This is a placeholder response. In production, I would use Claude to provide helpful guidance about CalFresh benefits.`;

    res.json({
      role: 'assistant',
      reply,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
