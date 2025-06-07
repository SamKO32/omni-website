import React from 'react';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 flex justify-center">
      <div className="w-full max-w-3xl space-y-16">

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>

          <div>
            <h3 className="text-lg font-semibold mb-1">How long does shipping take?</h3>
            <p className="text-gray-300">
              Orders typically ship within 5–7 business days. You’ll receive tracking info once shipped.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">What’s your return policy?</h3>
            <p className="text-gray-300">
              Returns are accepted within 14 days of delivery for unworn items. Contact us for details.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1">Where can I find OMNI?</h3>
            <p className="text-gray-300">
              Join our{' '}
              <a
                href="https://discord.gg/aVAwQEaU"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>{' '}
              and follow us on{' '}
              <a
                href="https://www.instagram.com/ontomynextidea"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>.
            </p>
          </div>
        </div>

        {/* Privacy Policy Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Privacy Policy</h2>

          <section>
            <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
            <p className="text-gray-400">
              We collect basic data such as email addresses or contact info only when you provide it to us directly — for example, via contact forms or sign-ups.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">2. How We Use Your Data</h3>
            <p className="text-gray-400">
              We use your information solely to communicate updates, respond to inquiries, and improve your experience with our brand. We do not sell or share your data with third parties.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">3. Cookies</h3>
            <p className="text-gray-400">
              Our website may use cookies for basic functionality and anonymous analytics. You can disable cookies in your browser settings if you prefer.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">4. Data Security</h3>
            <p className="text-gray-400">
              We take reasonable measures to protect your data, but please understand that no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">5. Your Rights</h3>
            <p className="text-gray-400">
              You have the right to access, update, or request deletion of your personal data by contacting us directly.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">6. Contact</h3>
            <p className="text-gray-400">
              For any questions or concerns about this privacy policy, please reach out to us at{' '}
              <a href="mailto:ontomynextidea@gmail.com" className="text-blue-400 hover:underline">
                ontomynextidea@gmail.com
              </a>.
            </p>
          </section>

          <p className="text-xs text-gray-500 text-center pt-4">Last updated: June 1, 2025</p>
        </div>
      </div>
    </div>
  );
}
