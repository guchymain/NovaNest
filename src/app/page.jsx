'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import ExclusiveOffers from '@/components/ExclusiveOffers';
import PopularAds from '@/components/PopularAds';
import MobileApp from '@/components/MobileApp';
import Testimonials from '@/components/Testimonials';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenContact = (item = null) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseContact = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  // Auto scroll to anchor if URL has hash on load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-sage-500 selection:text-forest-950">
      {/* Top Header */}
      <Header onOpenContact={() => handleOpenContact()} />

      {/* Hero Section */}
      <Hero onOpenContact={() => handleOpenContact()} />

      {/* Categories Section */}
      <Categories onSelectCategory={(cat) => handleOpenContact(cat)} />

      {/* Exclusive Offers Section */}
      <ExclusiveOffers onSelectOffer={(offer) => handleOpenContact(offer)} />

      {/* Popular Ads & Newsletter Section */}
      <PopularAds onSelectProperty={(prop) => handleOpenContact(prop)} />

      {/* Mobile Application Section */}
      <MobileApp />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Bottom Call to Action Banner */}
      <CtaBanner onOpenContact={() => handleOpenContact()} />

      {/* Footer */}
      <Footer />

      {/* Interactive Contact & Inquiry Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={handleCloseContact}
        selectedItem={selectedItem}
      />
    </main>
  );
}
