import React from 'react';

export default function DeadlineBanner() {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <div className="w-full bg-orange-500 text-white text-sm py-2 px-4 shadow-md fixed top-0 left-0 z-50 animate-slideDown">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <strong>Your CalFresh recertification is due in 7 days.</strong>
            <div className="text-sm">Don't lose your benefits — <a href="/status" className="underline font-semibold">Recertify Now →</a></div>
          </div>
        </div>
        <button onClick={() => setVisible(false)} className="text-white font-bold">✕</button>
      </div>
    </div>
  );
}
