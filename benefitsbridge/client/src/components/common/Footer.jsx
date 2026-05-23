import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white mt-16 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-primary-400">
              BenefitsBridge
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Making CalFresh benefits accessible to everyone, without the
              confusion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3 text-neutral-200">Quick Links</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="/screener" className="hover:text-primary-400 transition">
                  Check Eligibility
                </a>
              </li>
              <li>
                <a href="/apply" className="hover:text-primary-400 transition">
                  Start Application
                </a>
              </li>
              <li>
                <a href="/status" className="hover:text-primary-400 transition">
                  Track Status
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-3 text-neutral-200">Resources</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="/help" className="hover:text-primary-400 transition">
                  Help & FAQ
                </a>
              </li>
              <li>
                <a href="/help#contact" className="hover:text-primary-400 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/help#accessibility" className="hover:text-primary-400 transition">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3 text-neutral-200">Legal</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href="/privacy" className="hover:text-primary-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-primary-400 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/accessibility" className="hover:text-primary-400 transition">
                  A11y Statement
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-neutral-800 my-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-neutral-400">
          <p>
            &copy; {currentYear} BenefitsBridge. Official CalFresh Application
            Partner.
          </p>
          <p className="mt-4 sm:mt-0">
            CalFresh Helpline: <span className="text-primary-400 font-semibold">1-877-847-3663</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
