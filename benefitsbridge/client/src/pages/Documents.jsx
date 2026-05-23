import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Documents() {
  const { t } = useLanguage();
  const [uploaded, setUploaded] = React.useState({});

  const documents = [
    { id: 'identity', title: t('documents.identity'), example: t('documents.identityExample') },
    { id: 'address', title: t('documents.address'), example: t('documents.addressExample') },
    { id: 'income', title: t('documents.income'), example: t('documents.incomeExample') },
    { id: 'ssn', title: t('documents.ssn'), example: t('documents.ssnExample') },
    { id: 'immigration', title: t('documents.immigration'), example: t('documents.immigrationExample') },
  ];

  const handleFileUpload = (docId) => {
    setUploaded(prev => ({ ...prev, [docId]: true }));
  };

  const allUploaded = documents.every(doc => uploaded[doc.id]);

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-neutral-900">
          {t('documents.title')}
        </h1>
        <p className="text-xl text-neutral-700 mb-10">
          {t('documents.intro')}
        </p>

        <div className="space-y-6 mb-10">
          {documents.map(doc => (
            <div
              key={doc.id}
              className="bg-white border-2 border-neutral-300 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-neutral-600 text-lg">{doc.example}</p>
                </div>
                {uploaded[doc.id] && (
                  <span className="text-3xl">✓</span>
                )}
              </div>

              {!uploaded[doc.id] && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFileUpload(doc.id)}
                    className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition flex items-center justify-center gap-2"
                  >
                    📷 {t('documents.camera')}
                  </button>
                  <button
                    onClick={() => handleFileUpload(doc.id)}
                    className="flex-1 py-3 bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold rounded-lg transition"
                  >
                    {t('documents.fileUpload')}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button className="flex-1 py-4 bg-neutral-300 hover:bg-neutral-400 text-neutral-800 font-bold text-lg rounded-lg">
            {t('documents.missingDocuments')}
          </button>
          <button
            disabled={!allUploaded}
            className="flex-1 py-4 bg-success-600 hover:bg-success-700 text-white font-bold text-lg rounded-lg disabled:opacity-50 transition"
          >
            {t('documents.haveAll')}
          </button>
        </div>
      </div>
    </div>
  );
}
