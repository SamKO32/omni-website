import React from 'react';
import TVFrame from '../components/ui/TVFrame';

export default function FAQPage() {
  return (
    <>
      {/* Full-screen background video */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/videos/bgspace.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Fixed, scrollable content container */}
      <div
        style={{
          position: 'absolute',
          top: '17.5%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '55%',
          maxWidth: '900px',
          height: '65vh',
          overflow: 'hidden',
          zIndex: 2,
          backgroundColor: 'white',
          opacity: '80%',
          borderRadius: '2%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Inner scrollable content */}
        <div
          style={{
            overflowY: 'auto',
            padding: '3rem 2rem',
            flex: 1,
            paddingTop: 0,
          }}
          className="hide-scrollbar"
        >
          {/* FAQ Section */}
          <div style={{ width: '100%', marginTop: '2rem' }}>
            <h2 className='font-custom' style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
              FAQ
            </h2>

            <div style={{ marginBottom: '2rem', color: '#ddd', lineHeight: '1.6' }}>
              <h3 className='font-custom' style={{  color: 'black', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                How long does shipping take?
              </h3>
              <p className='text-black font-custom'>
                Orders typically ship within 5 to 7 business days. You will receive tracking info once shipped.
              </p>
            </div>

            <div style={{ marginBottom: '2rem', color: '#ddd', lineHeight: '1.6' }}>
              <h3 className='font-custom' style={{  color: 'black', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                What’s your return policy?
              </h3>
              <p className='text-black font-custom'>
                Returns are accepted within 14 days of delivery for unworn items. Contact us for details.
              </p>
            </div>

            <div style={{ marginBottom: '2rem', color: '#ddd', lineHeight: '1.6' }}>
              <h3 className='font-custom' style={{ color: 'black', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Where can I find OMNI?
              </h3>
              <p className='text-black font-custom'>
                Join our{' '}
                <a
                  href="https://discord.gg/aVAwQEaU"
                  style={{ color: '#3b82f6', textDecoration: 'underline' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>{' '}
                and follow us on{' '}
                <a
                  href="https://www.instagram.com/ontomynextidea"
                  style={{ color: '#3b82f6', textDecoration: 'underline' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>.
              </p>
            </div>
          </div>

          {/* Privacy Policy Section */}
          <div style={{ width: '100%', color: '#ddd', lineHeight: '1.6' }}>
            <h2 className='font-custom' style={{ color: 'black', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
              Privacy Policy
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 className='font-custom' style={{color: 'black', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                1. Information We Collect
              </h3>
              <p className='text-black font-custom'>
                We collect basic data such as email addresses or contact info only when you provide it to us directly, for example, via contact forms or sign-ups.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 className='font-custom' style={{ color: 'black', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                2. How We Use Your Data
              </h3>
              <p className='text-black font-custom'>
                We use your information solely to communicate updates, respond to inquiries, and improve your experience with our brand. We do not sell or share your data with third parties.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 className='font-custom' style={{ color: 'black', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                3. Cookies
              </h3>
              <p className='text-black font-custom'>
                Our website may use cookies for basic functionality and anonymous analytics. You can disable cookies in your browser settings if you prefer.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 className='font-custom' style={{ color: 'black', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                4. Data Security
              </h3>
              <p className='text-black font-custom'>
                We take reasonable measures to protect your data, but please understand that no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 className='font-custom' style={{ color: 'black', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                5. Your Rights
              </h3>
              <p className='text-black font-custom'>
                You have the right to access, update, or request deletion of your personal data by contacting us directly.
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 className='font-custom' style={{ color: 'black', fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                6. Contact
              </h3>
              <p className='text-black font-custom'>
                For any questions or concerns about this privacy policy, please reach out to us at{' '}
                <a
                  href="mailto:ontomynextidea@gmail.com"
                  style={{ color: '#3b82f6', textDecoration: 'underline' }}
                >
                  ontomynextidea@gmail.com
                </a>.
              </p>
            </div>

            <p className='font-custom' style={{ fontSize: '0.75rem', color: '#999', textAlign: 'center', marginTop: '1rem' }}>
              Last updated: June 2025
            </p>
          </div>
        </div>
      </div>

      {/* TV frame overlay */}
      <TVFrame><></></TVFrame>
    </>
  );
}
