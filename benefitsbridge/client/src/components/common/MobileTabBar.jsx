import React from 'react';
import { Link } from 'react-router-dom';

export default function MobileTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 md:hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <Link to="/" className="flex-1 text-center">🏠<div className="text-xs">Home</div></Link>
          <Link to="/screener" className="flex-1 text-center">✅<div className="text-xs">Eligibility</div></Link>
          <Link to="/documents" className="flex-1 text-center">📋<div className="text-xs">Apply</div></Link>
          <Link to="/status" className="flex-1 text-center">📍<div className="text-xs">Status</div></Link>
          <Link to="/faq" className="flex-1 text-center">❓<div className="text-xs">FAQ</div></Link>
        </div>
      </div>
    </nav>
  );
}
