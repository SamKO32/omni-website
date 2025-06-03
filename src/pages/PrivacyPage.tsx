import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>

        <section>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p className="text-gray-400">
            We collect basic data such as email addresses or contact info only when you provide it to us directly — for example, via contact forms or sign-ups.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
          <p className="text-gray-400">
            We use your information solely to communicate updates, respond to inquiries, and improve your experience with our brand. We do not sell or share your data with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Cookies</h2>
          <p className="text-gray-400">
            Our website may use cookies for basic functionality and anonymous analytics. You can disable cookies in your browser settings if you prefer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p className="text-gray-400">
            We take reasonable measures to protect your data, but please understand that no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
          <p className="text-gray-400">
            You have the right to access, update, or request deletion of your personal data by contacting us directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
          <p className="text-gray-400">
            For any questions or concerns about this privacy policy, please reach out to us at <a href="mailto:ontomynextidea@gmail.com" className="text-blue-400 hover:underline">ontomynextidea@gmail.com</a>.
          </p>
        </section>

        <p className="text-xs text-gray-300 text-center pt-6">
          Last updated: June 1, 2025
        </p>
      </div>
    </div>
  );
}
