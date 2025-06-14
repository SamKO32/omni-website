import React, { useState } from 'react';
import TVFrame from '../components/ui/TVFrame';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    order: '',
    reason: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

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

      {/* Centered, scrollable content */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxHeight: '80vh',
        padding: '2rem',
        overflowY: 'auto',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        backgroundColor: 'transparent',
        borderRadius: '0',
      }}
      className='hide-scrollbar'>
        <h1 className='font-custom' style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold', textAlign: 'center' }}>
          Contact
        </h1>
        <p className='font-custom' style={{ color: 'white', textAlign: 'center', maxWidth: '600px' }}>
          Contact us using the form below and we'll get back to you as soon as possible.
        </p>

        {submitted ? (
          <p className='font-custom' style={{ color: '#4ade80', textAlign: 'center' }}>
            Thanks for reaching out. We'll get back to you shortly.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              width: '100%',
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <input
              type="email"
              name="email"
              placeholder="Your E-Mail"
              required
              value={formData.email}
              onChange={handleChange}
              className='font-custom'
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                border: '1px solid #666',
                outline: 'none',
              }}
            />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className='font-custom'
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                border: '1px solid #666',
                outline: 'none',
              }}
            />

            <input
              type="text"
              name="order"
              placeholder="Order Number (optional)"
              value={formData.order}
              onChange={handleChange}
              className='font-custom'
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                border: '1px solid #666',
                outline: 'none',
              }}
            />

            <select
              name="reason"
              required
              value={formData.reason}
              onChange={handleChange}
              className='font-custom'
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                border: '1px solid #666',
                outline: 'none',
              }}
            >
              <option value="">Select Reason...</option>
              <option value="general help">General Help</option>
              <option value="shipping">Shipping</option>
              <option value="returns">Returns</option>
              <option value="exchanges">Exchanges</option>
            </select>

            <textarea
              name="message"
              placeholder="Your Message"
              required
              value={formData.message}
              onChange={handleChange}
              className='font-custom'
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#000',
                border: '1px solid #666',
                outline: 'none',
                minHeight: '120px',
                resize: 'none',
              }}
            />

            <button
              type="submit"
              className='font-custom'
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                backgroundColor: '#fff',
                color: '#000',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#8c8d8f')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* TV frame overlay */}
      <TVFrame><></></TVFrame>
    </>
  );
}
