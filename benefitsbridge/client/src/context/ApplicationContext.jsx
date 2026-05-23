import React, { createContext, useContext, useState, useEffect } from 'react';

const ApplicationContext = createContext(null);

export const ApplicationProvider = ({ children }) => {
  const [applicationData, setApplicationData] = useState({
    screener: {},
    personalInfo: {},
    addressHousing: {},
    householdMembers: [],
    incomeEmployment: {},
    expensesDeductions: {},
    documents: [],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [savedAt, setSavedAt] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [submittedAt, setSubmittedAt] = useState(null);
  const [applicationStatus, setApplicationStatus] = useState(null); // e.g., 'submitted', 'under_review', 'approved'
  const [referenceNumber, setReferenceNumber] = useState(null);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('applicationData');
    if (saved) {
      try {
        setApplicationData(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load saved application data:', err);
      }
    }
    // load submission meta if present
    const meta = localStorage.getItem('applicationMeta');
    if (meta) {
      try {
        const m = JSON.parse(meta);
        if (m.submittedAt) setSubmittedAt(new Date(m.submittedAt));
        if (m.applicationStatus) setApplicationStatus(m.applicationStatus);
        if (m.referenceNumber) setReferenceNumber(m.referenceNumber);
      } catch (err) { console.error('Failed to load application meta', err); }
    }
  }, []);

  // Auto-save every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (Object.keys(applicationData).some(key => applicationData[key])) {
        saveApplicationData();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [applicationData]);

  const updateApplicationData = (section, data) => {
    setApplicationData(prev => ({
      ...prev,
      [section]: typeof data === 'object' && !Array.isArray(data)
        ? { ...prev[section], ...data }
        : data,
    }));
  };

  const saveApplicationData = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('applicationData', JSON.stringify(applicationData));
      
      // Save to server if user is authenticated
      const token = localStorage.getItem('authToken');
      if (token) {
        await fetch('/api/application/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(applicationData),
        });
      }

      setSavedAt(new Date());
  // persist meta (keep existing)
  const meta = JSON.parse(localStorage.getItem('applicationMeta') || '{}');
  localStorage.setItem('applicationMeta', JSON.stringify(meta));
    } catch (err) {
      console.error('Failed to save application data:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const submitApplication = async () => {
    try {
      // mark as submitted locally and persist
      const now = new Date();
      setSubmittedAt(now);
      setApplicationStatus('submitted');
      const ref = `CB-${now.getFullYear()}-${Math.floor(Math.random()*9000000)+1000000}`;
      setReferenceNumber(ref);
      const meta = { submittedAt: now.toISOString(), applicationStatus: 'submitted', referenceNumber: ref };
      localStorage.setItem('applicationMeta', JSON.stringify(meta));

      // send to server if authenticated (best-effort)
      const token = localStorage.getItem('authToken');
      if (token) {
        await fetch('/api/application/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ applicationData, submittedAt: now.toISOString(), referenceNumber: ref }),
        });
      }
    } catch (err) {
      console.error('Failed to submit application', err);
    }
  };

  const clearApplicationData = () => {
    setApplicationData({
      screener: {},
      personalInfo: {},
      addressHousing: {},
      householdMembers: [],
      incomeEmployment: {},
      expensesDeductions: {},
      documents: [],
    });
    localStorage.removeItem('applicationData');
  };

  const addHouseholdMember = (member) => {
    setApplicationData(prev => ({
      ...prev,
      householdMembers: [...prev.householdMembers, { ...member, id: Date.now() }],
    }));
  };

  const updateHouseholdMember = (memberId, data) => {
    setApplicationData(prev => ({
      ...prev,
      householdMembers: prev.householdMembers.map(m =>
        m.id === memberId ? { ...m, ...data } : m
      ),
    }));
  };

  const removeHouseholdMember = (memberId) => {
    setApplicationData(prev => ({
      ...prev,
      householdMembers: prev.householdMembers.filter(m => m.id !== memberId),
    }));
  };

  const addDocument = (document) => {
    setApplicationData(prev => ({
      ...prev,
      documents: [...prev.documents, { ...document, id: Date.now() }],
    }));
  };

  const removeDocument = (documentId) => {
    setApplicationData(prev => ({
      ...prev,
      documents: prev.documents.filter(d => d.id !== documentId),
    }));
  };

  const value = {
    applicationData,
    updateApplicationData,
    saveApplicationData,
    clearApplicationData,
    currentStep,
    setCurrentStep,
    addHouseholdMember,
    updateHouseholdMember,
    removeHouseholdMember,
    addDocument,
    removeDocument,
    savedAt,
    isSaving,
    submitApplication,
    submittedAt,
    applicationStatus,
    referenceNumber,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within ApplicationProvider');
  }
  return context;
};
