import express from 'express';

const router = express.Router();

/**
 * POST /api/notifications/subscribe
 * Subscribe to SMS notifications
 */
router.post('/subscribe', (req, res) => {
  try {
    const { phoneNumber, applicationId } = req.body;

    // TODO: Save subscription to database
    // TODO: Send welcome SMS

    res.json({
      message: 'Subscribed to notifications',
      phoneNumber,
      applicationId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/notifications/unsubscribe
 * Unsubscribe from notifications
 */
router.post('/unsubscribe', (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // TODO: Remove subscription from database

    res.json({
      message: 'Unsubscribed from notifications',
      phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/notifications/send-test
 * Send test SMS
 */
router.post('/send-test', (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // TODO: Send test SMS via Twilio

    res.json({
      message: 'Test SMS sent',
      phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
