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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Hook this up to an email backend or something
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <TVFrame>
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-center">Contact</h1>
        <p className="text-gray-300 mb-8 text-center">
          Have questions? Contact us using the form below and we'll get back to you as soon as possible.
        </p>

        {submitted ? (
          <p className="text-green-400 text-center">Thanks for reaching out. We'll get back to you shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Your E-Mail"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-500 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-500 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <input
              type="text"
              name="order"
              placeholder="Order Number (optional)"
              value={formData.order}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-500 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
            />

            <select
              name="reason"
              required
              value={formData.reason}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-500 text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
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
              className="w-full p-3 h-32 rounded bg-gray-500 text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white resize-none"
            />

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded hover:bg-gray-500 transition font-semibold"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
    </TVFrame>
  );
}
