import express from 'express';

const router = express.Router();

/**
 * GET /api/status/:applicationId
 * Get application status
 */
router.get('/:applicationId', (req, res) => {
  try {
    const { applicationId } = req.params;

    // TODO: Fetch status from database/county system
    res.json({
      applicationId,
      status: 'under_review',
      stage: 'Submitted',
      submittedDate: '2024-01-15',
      estimatedDecisionDate: '2024-02-20',
      timeline: [
        { stage: 'Submitted', date: '2024-01-15', completed: true },
        { stage: 'Under Review', date: '2024-01-20', completed: false, current: true },
        { stage: 'Interview', date: null, completed: false },
        { stage: 'Decision Pending', date: null, completed: false },
        { stage: 'Approved/Denied', date: null, completed: false },
      ],
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/status/:applicationId/timeline
 * Get detailed timeline
 */
router.get('/:applicationId/timeline', (req, res) => {
  try {
    const { applicationId } = req.params;

    // TODO: Fetch timeline from database
    res.json({
      timeline: [
        {
          stage: 'Application Submitted',
          date: '2024-01-15',
          description: 'Your application was successfully submitted.',
          icon: '📋',
        },
        {
          stage: 'Under Review',
          date: '2024-01-20',
          description: 'An eligibility worker is reviewing your documents.',
          icon: '👁️',
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
