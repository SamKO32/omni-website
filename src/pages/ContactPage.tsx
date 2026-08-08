import React, { useState } from "react";

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    order: "",
    reason: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `
    font-custom w-full
    rounded-lg border border-black/40
    bg-white/90 text-black
    px-3 py-1.5 sm:py-2
    text-xs sm:text-sm
    outline-none
  `;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      className="text-white flex flex-col items-center justify-center gap-2 sm:gap-3 p-3 sm:p-5"
    >
    <div className="w-full max-w-[420px] flex flex-col items-center gap-2 sm:gap-3">
      <h1 className="font-custom font-bold text-center text-xl sm:text-3xl">
        Contact
      </h1>

      {submitted ? (
        <p className="font-custom text-center text-xs sm:text-sm text-green-400">
          Thanks for reaching out. We&apos;ll get back to you shortly.
        </p>
      ) : (
        <>
          <p className="font-custom text-center text-xs sm:text-sm text-white/90">
            Contact us using the form below and we&apos;ll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1.5 sm:gap-2.5">
            {submitError && (
              <p className="font-custom text-center text-xs text-red-400">{submitError}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Your E-Mail"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              type="text"
              name="order"
              placeholder="Order Number (optional)"
              value={formData.order}
              onChange={handleChange}
              className={inputClass}
            />

            <select
              name="reason"
              required
              value={formData.reason}
              onChange={handleChange}
              className={inputClass}
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
              className={`${inputClass} min-h-[52px] sm:min-h-[72px] resize-none`}
            />

            <button
              type="submit"
              disabled={submitting}
              className="
                font-custom w-full
                rounded-lg
                bg-white text-black
                font-bold
                py-1.5 sm:py-2
                text-xs sm:text-sm
                hover:bg-[#8c8d8f]
                transition
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </>
      )}
    </div>
    </div>
  );
}
