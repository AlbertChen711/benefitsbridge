import express from 'express';

const router = express.Router();

/**
 * POST /api/documents/upload
 * Upload document
 */
router.post('/upload', (req, res) => {
  try {
    // TODO: Handle file upload to Cloudinary
    // TODO: Validate document (check if readable, angle correct, etc.)
    res.json({
      message: 'Document uploaded',
      documentId: 'doc_' + Date.now(),
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/documents/:id
 * Get document
 */
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Fetch from Cloudinary
    res.json({
      id,
      type: 'identity',
      url: 'https://example.com/document.jpg',
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/documents/:id
 * Delete document
 */
router.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Delete from Cloudinary
    res.json({
      message: 'Document deleted',
      id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
