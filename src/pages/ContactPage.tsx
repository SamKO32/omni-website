import React, { useState } from "react";
import VideoBackground from "../components/ui/VideoBackground";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    order: "",
    reason: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-black">
      {/* Background video */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <VideoBackground src="/videos/bgspace.mp4" poster="/images/posters/bgspace_poster.jpg" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-4 py-6">
        {/* 
          Key changes for mobile width:
          - max-w-[320px] on mobile (tighter than max-w-md)
          - sm:max-w-md for larger screens
          - mx-auto ensures centered
        */}
        <div
          className="
            mx-auto
            w-full max-w-[320px] sm:max-w-md
            max-h-[calc(100dvh-3rem)]
            overflow-y-auto hide-scrollbar
            flex flex-col items-center
            gap-4 sm:gap-6
            text-white
          "
        >
          <h1 className="font-custom font-bold text-center text-3xl sm:text-5xl">
            Contact
          </h1>

          <p className="font-custom text-center text-sm sm:text-base text-white/90">
            Contact us using the form below and we&apos;ll get back to you as soon as possible.
          </p>

          {submitted ? (
            <p className="font-custom text-center text-sm sm:text-base text-green-400">
              Thanks for reaching out. We&apos;ll get back to you shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:gap-4">
              <input
                type="email"
                name="email"
                placeholder="Your E-Mail"
                required
                value={formData.email}
                onChange={handleChange}
                className="
                  font-custom w-full
                  rounded-lg border border-black/40
                  bg-white/90 text-black
                  px-3 py-2 sm:px-4 sm:py-3
                  text-sm sm:text-base
                  outline-none
                "
              />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="
                  font-custom w-full
                  rounded-lg border border-black/40
                  bg-white/90 text-black
                  px-3 py-2 sm:px-4 sm:py-3
                  text-sm sm:text-base
                  outline-none
                "
              />

              <input
                type="text"
                name="order"
                placeholder="Order Number (optional)"
                value={formData.order}
                onChange={handleChange}
                className="
                  font-custom w-full
                  rounded-lg border border-black/40
                  bg-white/90 text-black
                  px-3 py-2 sm:px-4 sm:py-3
                  text-sm sm:text-base
                  outline-none
                "
              />

              <select
                name="reason"
                required
                value={formData.reason}
                onChange={handleChange}
                className="
                  font-custom w-full
                  rounded-lg border border-black/40
                  bg-white/90 text-black
                  px-3 py-2 sm:px-4 sm:py-3
                  text-sm sm:text-base
                  outline-none
                "
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
                className="
                  font-custom w-full
                  rounded-lg border border-black/40
                  bg-white/90 text-black
                  px-3 py-2 sm:px-4 sm:py-3
                  text-sm sm:text-base
                  outline-none
                  min-h-[110px] sm:min-h-[140px]
                  resize-none
                "
              />

              <button
                type="submit"
                className="
                  font-custom w-full
                  rounded-lg
                  bg-white text-black
                  font-bold
                  py-2.5 sm:py-3
                  text-sm sm:text-base
                  hover:bg-[#8c8d8f]
                  transition
                "
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
