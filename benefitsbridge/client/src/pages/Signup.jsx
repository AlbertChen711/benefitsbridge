import React from 'react';

export default function Signup() {
  const [method, setMethod] = React.useState(null);
  const [formData, setFormData] = React.useState({ firstName: '', email: '', phone: '' });
  const [loading, setLoading] = React.useState(false);

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      // Google sign-up will be implemented with Firebase
      // Placeholder for now
      console.log('Google signup clicked');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Phone signup API call
      console.log('Phone signup:', formData);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (method === null) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-neutral-50">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-2 text-neutral-900">
            Create Account
          </h1>
          <p className="text-center text-neutral-600 mb-10 text-lg">
            Get started in seconds
          </p>

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignup}
              className="w-full py-4 bg-white border-2 border-neutral-300 rounded-lg font-bold text-lg hover:bg-neutral-50 transition flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>

            <button
              onClick={() => setMethod('phone')}
              className="w-full py-4 bg-white border-2 border-neutral-300 rounded-lg font-bold text-lg hover:bg-neutral-50 transition flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 text-neutral-700" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.3.102.605.142.91.08.814.171 1.814.252 2.752.082.918.244 1.914.428 2.856.079.412.188.823.305 1.22.22.839.645 1.545 1.3 2.037 1.373 1.073 3.534 1.292 5.228.6l.563-.187a1 1 0 00.755-.99V16.07a1 1 0 00-.674-.938l-1.272-.424c-.264-.088-.484-.201-.684-.34a.988.988 0 00-.578-.156h-.006a1 1 0 00-.983.833l-.348 2.09c-.047.28-.193.524-.404.708-.21.184-.493.288-.793.288-.304 0-.587-.104-.797-.288-.211-.184-.357-.428-.404-.708l-.348-2.09a1 1 0 00-.983-.833h-.006a.99.99 0 00-.578.156c-.2.139-.42.252-.684.34l-1.272.424A1 1 0 002 16.07V3z" />
              </svg>
              Sign up with Phone
            </button>
          </div>

          <p className="text-center text-neutral-600 mt-6 text-sm">
            By signing up, you agree we'll never sell your data. Your privacy is protected.
          </p>
        </div>
      </div>
    );
  }

  if (method === 'phone') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16 bg-neutral-50">
        <div className="w-full max-w-md">
          <button
            onClick={() => setMethod(null)}
            className="mb-6 text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold mb-2 text-neutral-900">
            Your Phone Number
          </h1>
          <p className="text-neutral-600 mb-8 text-lg">
            We'll send you a verification code
          </p>

          <form onSubmit={handlePhoneSignup} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-2 text-neutral-900">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-2 text-neutral-900">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg text-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
