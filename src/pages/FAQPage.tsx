import React from 'react';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-white flex justify-center px-4">
      <div className="max-w-2xl w-full text-center p-8">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-1">What is OMNI?</h2>
            <p>OMNI is a multimedia brand focused on music, fashion, and immersive experiences.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">How long does shipping take?</h2>
            <p>Orders typically ship within 5-7 business days. You’ll receive tracking info once shipped.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">What’s your return policy?</h2>
            <p>Returns are accepted within 14 days of delivery for unworn items. Contact us for details.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-1">How can I join the OMNI community?</h2>
            <p>
              Join our{' '}
              <a href="https://discord.gg/aVAwQEaU" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                Discord
              </a>{' '}
              and follow us on{' '}
              <a href="https://www.instagram.com/ontomynextidea" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
