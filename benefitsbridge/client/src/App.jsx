import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AIAssistant from './components/common/AIAssistant';
import Home from './pages/Home';
import Screener from './pages/Screener';
import Signup from './pages/Signup';
import Documents from './pages/Documents';
import Apply from './pages/Apply';
import Confirmation from './pages/Confirmation';
import Status from './pages/Status';
import Help from './pages/Help';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ApplicationProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen bg-white">
              <Navbar />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/screener" element={<Screener />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/apply" element={<Apply />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  <Route path="/status" element={<Status />} />
                  <Route path="/help" element={<Help />} />
                </Routes>
              </main>

              <Footer />
              <AIAssistant />
            </div>
          </LanguageProvider>
        </ApplicationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
