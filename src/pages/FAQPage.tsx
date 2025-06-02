import React from 'react';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">What is OMNI?</h2>
          <p>OMNI is a multimedia brand focused on music, fashion, and immersive experiences.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">How long does shipping take?</h2>
          <p>Orders typically ship within 5-7 business days. You’ll receive tracking info once shipped.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">What’s your return policy?</h2>
          <p>Returns are accepted within 14 days of delivery for unworn items. Contact us for details.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">How can I join the OMNI community?</h2>
          <p>Join our <a href="https://discord.gg/aVAwQEaU" className="text-blue-600 underline" target="_blank">Discord</a> and follow us on <a href="https://www.instagram.com/ontomynextidea" className="text-blue-600 underline" target="_blank">Instagram</a>.</p>
        </div>
      </div>
    </div>
  );
}
