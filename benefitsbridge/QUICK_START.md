# BenefitsBridge Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
# From project root
npm install
```

### 2. Copy Environment Template
```bash
cp .env.example .env
```

**Edit .env with your keys:**
- Firebase API keys (get from Firebase Console)
- Anthropic API key (get from API keys page)
- Twilio credentials (get from Twilio console)
- Cloudinary credentials
- Database URL (PostgreSQL)
- JWT secret (any random string)

### 3. Start Development Servers
```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:3000 (React Vite dev server)
- **Backend**: http://localhost:5000 (Express with Nodemon)

### 4. Test the App

**Homepage**: Visit http://localhost:3000
- See the hero section with "Check If I Qualify" CTA
- View "How It Works" with 3 steps
- See trust indicators

**Eligibility Screener**: Click "Check If I Qualify"
- Answer 6 questions, one per screen
- See progress bar
- Get results with estimated benefit

**Sign Up**: Click "Sign In" → "Sign up with Phone"
- Test phone-based authentication flow

**AI Assistant**: Click the chat bubble (bottom right)
- Try suggested questions
- Test chat interface

### 5. Next Steps to Production

#### Environment Setup
- [ ] Create `.env` file with all required keys
- [ ] Set up PostgreSQL database
- [ ] Generate Firebase admin credentials
- [ ] Get Anthropic API key
- [ ] Configure Twilio account
- [ ] Set up Cloudinary

#### Database
- [ ] Connect to PostgreSQL
- [ ] Run `initializeDatabase()` to create tables
- [ ] Test connection

#### API Integration (Backend)
- [ ] Implement Firebase Admin authentication
- [ ] Implement JWT token generation
- [ ] Connect Anthropic Claude API
- [ ] Connect Twilio SMS service
- [ ] Connect Cloudinary for uploads
- [ ] Implement database operations

#### Frontend Polish
- [ ] Connect Auth Context to API
- [ ] Implement auto-save to server
- [ ] Add loading states
- [ ] Add error handling toasts
- [ ] Test form validation
- [ ] Test accessibility

## 📱 Mobile Testing

### Test on Real Phone
```bash
# Find your machine's IP
ipconfig getifaddr en0  # macOS
ifconfig               # Linux
ipconfig              # Windows

# Visit from phone on same WiFi
http://YOUR_IP:3000
```

### Browser DevTools
```
Chrome/Firefox → F12 → Toggle Device Toolbar (Ctrl+Shift+M)
Test at 375px width (iPhone SE)
```

## 🧪 Testing Commands

```bash
# Frontend tests
npm run test --workspace=client

# Backend tests
npm run test --workspace=server

# Linting
npm run lint

# Build check
npm run build
```

## 🔧 Common Development Tasks

### Add a New Page
1. Create component in `client/src/pages/YourPage.jsx`
2. Add route in `App.jsx`
3. Add navigation link in `Navbar.jsx`
4. Add translations in `i18n/index.js`

### Add a New Component
1. Create in `client/src/components/common/YourComponent.jsx`
2. Export from component directory
3. Use with `import YourComponent from './components/common/YourComponent'`

### Update Styling
- Edit `client/tailwind.config.js` for theme changes
- Use Tailwind classes directly in components
- No separate CSS files needed (utility-first)

### Add Translations
1. Add to each language in `client/src/i18n/index.js`
2. Use with `const { t } = useLanguage()` hook
3. Call `t('namespace.key')`

### Debug Frontend
```bash
# Open React DevTools Chrome Extension
# Check Redux DevTools if added
# Use browser console for logs
console.log('value:', variable);
```

### Debug Backend
```bash
# Logs auto-print to console
# Add debugging:
console.log('Debug:', req.body);
// Check server terminal for output
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill existing process
npx kill-port 3000 5000
```

### .env Not Loading
- Restart dev servers after editing .env
- Make sure .env is in project ROOT
- Check NODE_ENV = development

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql postgres

# Verify DATABASE_URL format:
# postgresql://user:password@localhost:5432/benefitsbridge
```

## 📚 Next Implementation Steps

### High Priority (MVP)
1. **Authentication** - Firebase Admin + JWT
2. **Database** - PostgreSQL models
3. **Application Save** - Auto-save to database
4. **Claude AI** - API integration
5. **Twilio SMS** - Notification system

### Medium Priority
1. **Document Upload** - Cloudinary integration
2. **Status Updates** - Real-time tracking
3. **Error Handling** - Comprehensive error flow
4. **Form Validation** - Server-side validation

### Nice to Have
1. **Analytics** - Track user journey
2. **Admin Dashboard** - Monitor applications
3. **Email Notifications** - SendGrid/Mailgun
4. **Offline Mode** - Service workers

## 🌟 Key Features to Test

- ✅ Eligibility calculation (all income ranges)
- ✅ Form validation (phone, email, SSN)
- ✅ Auto-save functionality
- ✅ Language switching (4 languages)
- ✅ Mobile responsiveness (375px - 1920px)
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader (NVDA, JAWS, VoiceOver)
- ✅ Error messages (all edge cases)
- ✅ API error handling (network failures)

## 📞 Support

**Questions?** Check `README.md` in project root

**CalFresh Info**: https://www.benefitscal.org/
**Twilio Docs**: https://www.twilio.com/docs/sms
**Anthropic Claude**: https://claude.ai/
**Tailwind CSS**: https://tailwindcss.com/docs

---

Good luck building! 🎉 This is going to help millions of people.
