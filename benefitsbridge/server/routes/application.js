import express from 'express';

const router = express.Router();

/**
 * POST /api/application/save
 * Save application progress
 */
router.post('/save', (req, res) => {
  try {
    const userId = req.user?.id;
    const applicationData = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // TODO: Save to database
    console.log('Saving application for user:', userId);

    res.json({ 
      message: 'Application saved',
      savedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/application/:id
 * Get application by ID
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Fetch from database
    res.json({ 
      id,
      status: 'submitted',
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/application/:id
 * Update application
 */
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // TODO: Update in database
    res.json({ 
      message: 'Application updated',
      id,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/application/:id/submit
 * Submit final application
 */
router.post('/:id/submit', (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Submit to county system
    // TODO: Send initial SMS notification
    res.json({ 
      message: 'Application submitted',
      referenceNumber: `CB-2024-${Math.random().toString().slice(2, 10)}`,
      submittedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
