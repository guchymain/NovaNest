'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function ContactModal({ isOpen, onClose, selectedItem }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: selectedItem ? `I am interested in ${selectedItem.title || 'a property'}.` : '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-forest-900 border border-forest-750 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-sage-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <Icon icon="solar:close-circle-bold" className="w-7 h-7" />
        </button>

        <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
          {selectedItem ? `Inquire About ${selectedItem.title}` : 'Get In Touch'}
        </h3>
        <p className="text-sm text-sage-300/80 mb-6">
          {selectedItem
            ? `Connect with our luxury estate advisory team for ${selectedItem.location || 'this listing'}.`
            : 'Connect with a NovaNest estate specialist to begin your luxury property journey.'}
        </p>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-sage-500/20 text-sage-400 flex items-center justify-center mb-4">
              <Icon icon="solar:check-circle-bold" className="w-10 h-10 text-sage-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-1">Message Sent Successfully</h4>
            <p className="text-sm text-sage-300/80">Our advisory team will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-sage-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-forest-950 border border-forest-700/70 text-white placeholder:text-forest-700 focus:outline-none focus:border-sage-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sage-300 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-forest-950 border border-forest-700/70 text-white placeholder:text-forest-700 focus:outline-none focus:border-sage-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sage-300 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 rounded-xl bg-forest-950 border border-forest-700/70 text-white placeholder:text-forest-700 focus:outline-none focus:border-sage-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-sage-300 uppercase tracking-wider mb-1.5">
                Message
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your requirements..."
                className="w-full px-4 py-2.5 rounded-xl bg-forest-950 border border-forest-700/70 text-white placeholder:text-forest-700 focus:outline-none focus:border-sage-400 text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 rounded-xl font-semibold text-sm mt-2"
            >
              Send Inquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
