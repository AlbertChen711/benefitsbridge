/**
 * Authentication middleware
 */
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  try {
    // TODO: Verify JWT token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    console.log('Auth token verified');
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Optional auth middleware - doesn't fail if no auth
 */
export function optionalAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      // TODO: Verify JWT token
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = decoded;
      console.log('Auth token verified (optional)');
    } catch (error) {
      console.log('Invalid token, continuing without auth');
    }
  }

  next();
}
