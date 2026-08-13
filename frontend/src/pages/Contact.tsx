import { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-serif font-light text-cream-light tracking-wide mt-6">Get in touch</h2>
      <p className="text-muted border-b border-dark-border pb-4 mb-6">We'd love to hear from you</p>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-4">
        <div className="flex-1">
          <h3 className="text-2xl font-serif font-normal text-gold mb-4">Contact</h3>
          <p className="text-muted-text leading-relaxed mb-3">
            <FaEnvelope className="inline text-gold mr-3" /> contact@perfumology.shop
          </p>
          <p className="text-muted-text leading-relaxed mb-3">
            <FaPhoneAlt className="inline text-gold mr-3" /> +880 1234 567890
          </p>
          <p className="text-muted-text leading-relaxed mb-3">
            <FaClock className="inline text-gold mr-3" /> Mon–Sun, 10:00 AM – 8:00 PM
          </p>
          <p className="text-muted text-sm mt-6">We reply within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1.5">
          <label className="block text-cream mb-1 tracking-wide">Your name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#1a1715] text-cream px-4 py-3 rounded-lg border border-dark-border focus:border-gold focus:outline-none transition-colors mb-4"
            placeholder="e.g. Sarah Ahmed"
            required
          />

          <label className="block text-cream mb-1 tracking-wide">Email address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-[#1a1715] text-cream px-4 py-3 rounded-lg border border-dark-border focus:border-gold focus:outline-none transition-colors mb-4"
            placeholder="sarah@example.com"
            required
          />

          <label className="block text-cream mb-1 tracking-wide">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-[#1a1715] text-cream px-4 py-3 rounded-lg border border-dark-border focus:border-gold focus:outline-none transition-colors mb-4 min-h-[120px] resize-vertical"
            placeholder="Tell us about your fragrance preferences..."
            required
          />

          <button type="submit" className="btn-primary w-full text-center border-none">
            {submitted ? '✓ Sent!' : 'Send message'}
          </button>
        </form>
      </div>
    </>
  );
};