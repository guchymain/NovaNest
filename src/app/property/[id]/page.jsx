'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Icon } from '@iconify/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import { getPropertyById, popularAdsData } from '@/lib/mockData';


export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params?.id || '1875-avondale-circle';

  // Base property from mock fallback
  const initialProperty = getPropertyById(id) || popularAdsData[0];

  const [property, setProperty] = useState(initialProperty);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquirySent, setInquirySent] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: `I am interested in scheduling a private viewing for ${initialProperty.title}.`,
  });

  // Fetch live Realty API data for this property; gracefully fallback to static data if fetch fails
  useEffect(() => {
    fetch(`/api/property?id=${encodeURIComponent(id)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((resData) => {
        if (resData.status === 'success' && Array.isArray(resData.properties) && resData.properties.length > 0) {
          const matched =
            resData.properties.find((p) => p.id === id) ||
            (id === '1875-avondale-circle' || property.isApiListing ? resData.properties[0] : null);

          if (matched) {
            console.log('[Property Page] Rendering ONLY live API data for:', matched.title);
            setProperty(matched);
          }
        }
      })
      .catch((err) => {
        console.warn('[Property Page] API fetch failed, gracefully using static fallback:', err.message);
        // Retains initialProperty automatically
      });
  }, [id, property.isApiListing]);


  const gallery = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];
  const activeImage = gallery[activeImageIndex] || property.image;

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: `I am interested in scheduling a private viewing for ${property.title}.`,
      });
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-transparent text-white font-manrope">
      <Header onOpenContact={() => setContactModalOpen(true)} />

      <main className="max-w-[1729px] mx-auto px-6 md:px-12 lg:px-[80px] pt-6 pb-24">
        {/* Top Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4 border-b border-[#BEDFD4]/15 pb-6">
          <nav className="flex items-center gap-2 text-sm text-[#9ECABC]">
            <Link href="/" className="hover:text-[#F4FFFB] transition-colors flex items-center gap-1.5">
              <Icon icon="solar:home-2-linear" className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 opacity-60" />
            <Link href={`/category/${property.category}`} className="hover:text-[#F4FFFB] transition-colors">
              {property.categoryTitle || 'Categories'}
            </Link>
            <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#BEDFD4] font-semibold truncate max-w-[280px] sm:max-w-md">
              {property.title}
            </span>
          </nav>

          <Link
            href={`/category/${property.category}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#BEDFD4] hover:text-white transition-colors bg-[#BEDFD4]/10 hover:bg-[#BEDFD4]/20 px-4 py-2 rounded-full border border-[#BEDFD4]/25"
          >
            <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
            <span>Back to Listings</span>
          </Link>
        </div>

        {/* Property Header Info Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="bg-[#BEDFD4] text-[#21433D] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                For Sale
              </span>
              <span className="text-xs text-[#9ECABC] bg-black/20 px-3 py-1 rounded-full">
                {property.specs?.yearBuilt ? `Built ${property.specs.yearBuilt}` : 'Contemporary Build'}
              </span>
            </div>


            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F4FFFB] leading-[120%] tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
            >
              {property.title}
            </h1>

            <p className="text-base sm:text-lg text-[#9ECABC] flex items-center gap-2 font-normal">
              <Icon icon="solar:map-point-bold" className="w-5 h-5 text-[#BEDFD4] shrink-0" />
              <span>{property.location}</span>
            </p>
          </div>

          <div className="lg:text-right flex flex-col lg:items-end">
            <span className="text-xs sm:text-sm uppercase tracking-wider text-[#9ECABC] font-medium">
              Offered At
            </span>
            <div
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4FFFB] mt-1"
              style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
            >
              {property.price}
            </div>
            <span className="text-xs text-[#9ECABC]/80 mt-1">
              Estimated Mortgage: ~${Math.round(property.priceNumeric * 0.0055 || 23000).toLocaleString()}/mo
            </span>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-12">
          {/* Main Large Image */}
          <div className="relative w-full h-[380px] sm:h-[480px] md:h-[580px] lg:h-[640px] rounded-[32px] overflow-hidden shadow-2xl border border-white/15 bg-black/30 mb-4">
            <Image
              src={activeImage}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 1729px) 100vw, 1729px"
              className="object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Gallery counter pill */}
            <div className="absolute bottom-6 right-6 bg-[#21433D]/90 backdrop-blur-md text-[#F4FFFB] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-[#BEDFD4]/30 shadow-lg flex items-center gap-2">
              <Icon icon="solar:gallery-wide-linear" className="w-4 h-4 text-[#BEDFD4]" />
              <span>
                {activeImageIndex + 1} / {gallery.length} Photos
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-none">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 sm:w-32 h-16 sm:h-20 rounded-[14px] overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#BEDFD4] scale-105 shadow-md ring-2 ring-[#BEDFD4]/30'
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Photo ${idx + 1}`}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid: Specs, Description, and Viewing Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Specs, Features & Description */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Key Specs Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#1A3833]/80 backdrop-blur-md p-6 rounded-[24px] border border-[#BEDFD4]/20 shadow-lg">
              <div className="flex flex-col">
                <span className="text-xs text-[#9ECABC] uppercase tracking-wider">Living Area</span>
                <span className="text-xl sm:text-2xl font-bold text-[#F4FFFB] mt-1">
                  {property.specs?.area}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#9ECABC] uppercase tracking-wider">Bedrooms</span>
                <span className="text-xl sm:text-2xl font-bold text-[#F4FFFB] mt-1">
                  {property.specs?.beds}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#9ECABC] uppercase tracking-wider">Bathrooms</span>
                <span className="text-xl sm:text-2xl font-bold text-[#F4FFFB] mt-1">
                  {property.specs?.baths}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#9ECABC] uppercase tracking-wider">Lot Size</span>
                <span className="text-xl sm:text-2xl font-bold text-[#F4FFFB] mt-1">
                  {property.specs?.lotSize || 'Generous Acreage'}
                </span>
              </div>
            </div>

            {/* Narrative Description */}
            <div className="bg-[#1A3833]/70 backdrop-blur-md p-8 rounded-[28px] border border-[#BEDFD4]/20 shadow-lg">
              <h2
                className="text-2xl sm:text-3xl font-semibold text-[#F4FFFB] mb-4"
                style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
              >
                About the Residence
              </h2>
              <p className="text-[#9ECABC] leading-[180%] text-base sm:text-lg font-normal mb-6">
                {property.description}
              </p>
            </div>


            {/* Bespoke Features & Amenities */}
            <div className="bg-[#1A3833]/70 backdrop-blur-md p-8 rounded-[28px] border border-[#BEDFD4]/20 shadow-lg">
              <h2
                className="text-2xl sm:text-3xl font-semibold text-[#F4FFFB] mb-6"
                style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
              >
                Features & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(property.features || [
                  'Private Heated Pool & Spa',
                  'Gourmet Chef Kitchen',
                  'Smart Home Automation',
                  'Architectural Ceilings & Finishes',
                  'Floor-to-Ceiling Panoramic Windows',
                  '24/7 Security & Gated Grounds',
                ]).map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-[16px] bg-[#21433D]/60 border border-[#BEDFD4]/15">
                    <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-[#BEDFD4] shrink-0" />
                    <span className="text-sm sm:text-base text-[#F4FFFB] font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Schedule Tour & Advisor Form */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="bg-[#1A3833] border border-[#BEDFD4]/30 rounded-[32px] p-6 sm:p-8 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#BEDFD4]/20">
                <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-[#BEDFD4]">
                  <Image
                    src="/images/avatar-emily.png"
                    alt="Private Client Advisor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#F4FFFB]">Victoria Sterling</h4>
                  <p className="text-xs text-[#BEDFD4]">NovaNest Private Office Advisor</p>
                </div>
              </div>

              <h3
                className="text-xl sm:text-2xl font-semibold text-[#F4FFFB] mb-2"
                style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
              >
                Schedule Private Viewing
              </h3>
              <p className="text-xs sm:text-sm text-[#9ECABC] mb-6 font-normal">
                Arrange a confidential walk-through or request the comprehensive architectural dossier.
              </p>

              {inquirySent ? (
                <div className="p-6 rounded-[20px] bg-[#21433D] border border-[#BEDFD4] text-center">
                  <Icon icon="solar:check-circle-bold" className="w-12 h-12 text-[#BEDFD4] mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-[#F4FFFB] mb-1">Viewing Request Confirmed</h4>
                  <p className="text-xs text-[#9ECABC]">
                    Your private client advisor will contact you within 2 hours to confirm itinerary details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#BEDFD4] block mb-1.5 uppercase tracking-wider">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lorde Harrington"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-4 rounded-[12px] bg-[#21433D] border border-[#BEDFD4]/30 text-sm text-white placeholder-[#9ECABC]/50 focus:outline-none focus:border-[#BEDFD4]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#BEDFD4] block mb-1.5 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@luxurymail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-[12px] bg-[#21433D] border border-[#BEDFD4]/30 text-sm text-white placeholder-[#9ECABC]/50 focus:outline-none focus:border-[#BEDFD4]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#BEDFD4] block mb-1.5 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-4 rounded-[12px] bg-[#21433D] border border-[#BEDFD4]/30 text-sm text-white placeholder-[#9ECABC]/50 focus:outline-none focus:border-[#BEDFD4]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#BEDFD4] block mb-1.5 uppercase tracking-wider">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full h-11 px-4 rounded-[12px] bg-[#21433D] border border-[#BEDFD4]/30 text-sm text-white focus:outline-none focus:border-[#BEDFD4]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#BEDFD4] block mb-1.5 uppercase tracking-wider">
                      Message / Requests
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-[12px] bg-[#21433D] border border-[#BEDFD4]/30 text-sm text-white focus:outline-none focus:border-[#BEDFD4] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-[50px] rounded-[14px] bg-[#BEDFD4] hover:bg-[#A8D3C5] text-[#21433D] font-semibold text-base transition-all shadow-md mt-2 cursor-pointer active:scale-[0.98]"
                  >
                    Request Private Tour
                  </button>

                  <div className="flex items-center justify-center gap-4 text-xs text-[#9ECABC] mt-2">
                    <span className="flex items-center gap-1">
                      <Icon icon="solar:shield-check-linear" className="w-4 h-4 text-[#BEDFD4]" />
                      Strictly Confidential
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#9ECABC]/40" />
                    <span>Direct Broker Access</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        selectedItem={property}
      />
    </div>
  );
}
