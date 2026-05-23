import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40 border-b-2 border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition"
          >
            {t('nav.logo')}
          </Link>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/screener" className="text-neutral-700 hover:text-primary-600 font-medium transition">{t('nav.eligibility')}</Link>
            <Link to="/calculator" className="text-neutral-700 hover:text-primary-600 font-medium transition">Calculator</Link>
            <Link to="/documents" className="text-neutral-700 hover:text-primary-600 font-medium transition">Apply Now</Link>
            <Link to="/status" className="text-neutral-700 hover:text-primary-600 font-medium transition">{t('nav.status')}</Link>
            <Link to="/faq" className="text-neutral-700 hover:text-primary-600 font-medium transition">FAQ</Link>
          </div>

          {/* Right Side - Language & Auth */}
          <div className="flex items-center gap-4">
            {/* Globe icon wraps LanguageSelector */}
            <div className="p-1 rounded-full hover:bg-neutral-100 transition">
              <LanguageSelector />
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-neutral-700">
                  {user.firstName || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-medium rounded-lg transition"
                >
                  {t('nav.signout')}
                </button>
              </div>
            ) : (
              <Link
                to="/signup"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition"
              >
                {t('nav.signin')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
