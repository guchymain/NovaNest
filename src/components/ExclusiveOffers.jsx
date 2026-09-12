'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import OfferCard from './OfferCard';

const defaultOffers = [
  {
    id: 'elegant-apartment',
    title: 'Elegant Apartment',
    originalPrice: '$625,000',
    price: '$600,000',
    location: 'Downtown Metropolitan Area',
    specs: {
      area: '120m²',
      beds: '2 Bedrooms',
      baths: '2 Bathrooms',
    },
    images: ['/image.png', '/image (1).png', '/image (2).png'],
    reverse: false,
  },
  {
    id: 'oceanfront-paradise',
    title: 'Oceanfront Paradise',
    originalPrice: '$2,000,000',
    price: '$1,900,000',
    location: 'Beachfront Property, Coastal Area',
    specs: {
      area: '90m²',
      beds: '1 Bedroom',
      baths: '1 Bathroom',
    },
    images: ['/image (3).png', '/image (4).png', '/image (5).png'],
    reverse: true,
  },
];

export default function ExclusiveOffers({ onSelectOffer }) {
  const [offers, setOffers] = useState(defaultOffers);

  // Fetch API properties and gracefully fallback to static mock data if fetch fails
  useEffect(() => {
    fetch('/api/property')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.properties) && data.properties.length > 0) {
          console.log('[Exclusive Offers] Rendering ONLY live API properties. No mock data mixed.');
          const p1 = data.properties[0];
          const p2 = data.properties[1] || data.properties[0];

          const apiOffers = [
            {
              id: p1.id,
              title: p1.title,
              originalPrice: p1.originalPrice || '$4,500,000',
              price: p1.price,
              location: p1.location,
              specs: {
                area: p1.specs?.area || '7,526 sqft',
                beds: p1.specs?.beds || '7 Bedrooms',
                baths: p1.specs?.baths || '9 Bathrooms',
              },
              images: ['/image.png', '/image (1).png', '/image (2).png'],
              reverse: false,
            },
          ];

          if (data.properties.length > 1) {
            apiOffers.push({
              id: p2.id,
              title: p2.title,
              originalPrice: p2.originalPrice || '$260,000',
              price: p2.price,
              location: p2.location,
              specs: {
                area: p2.specs?.area || '1,193 sqft',
                beds: p2.specs?.beds || '3 Bedrooms',
                baths: p2.specs?.baths || '2.5 Bathrooms',
              },
              images: ['/image (3).png', '/image (4).png', '/image (5).png'],
              reverse: true,
            });
          }

          setOffers(apiOffers);
        }
      })
      .catch((err) => {
        console.warn('[Exclusive Offers] API fetch failed, gracefully using static fallback:', err.message);
        // Retains defaultOffers automatically
      });
  }, []);


  return (
    <section
      id="exclusive-offers"
      className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-[80px] max-w-[1729px] mx-auto overflow-visible"
    >
      {/* Header Container */}
      <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
        <h2
          className="text-[28px] sm:text-[32px] font-semibold text-[#F4FFFB] leading-[130%] tracking-normal text-center mb-4"
          style={{
            fontFamily: 'var(--font-manrope), Manrope, sans-serif',
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '130%',
            letterSpacing: '0%',
            textAlign: 'center',
            color: '#F4FFFB',
          }}
        >
          Exclusive Offers
        </h2>

        <p
          className="text-[16px] sm:text-[18px] font-normal text-[#9ECABC] leading-[160%] tracking-normal text-center"
          style={{
            fontFamily: 'var(--font-manrope), Manrope, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '160%',
            letterSpacing: '0%',
            textAlign: 'center',
            color: '#9ECABC',
          }}
        >
          Explore our handpicked selection of discounted properties at NovaNest Estates. Don&apos;t miss out on these exclusive deals offering exceptional value for your dream home.
        </p>
      </div>

      {/* Offers Stack */}
      <div className="relative flex flex-col gap-16 lg:gap-24">
        {/* First Offer Card */}
        <OfferCard
          offer={offers[0]}
          onSelect={onSelectOffer}
        />

        {/* Mid-Section Decorative Graphics: Shape Cluster PNG & Ambient Radial Glow */}
        <div className="relative w-full flex items-center justify-between pointer-events-none -my-6 sm:-my-10">
          {/* Shape Cluster PNG positioned between the first and second offer card */}
          <div className="absolute left-[-40px] sm:left-[-60px] md:left-[-80px] w-48 sm:w-60 md:w-64 opacity-35 z-0 select-none">
            <Image
              src="/Shape cluster.png"
              alt=""
              width={255}
              height={537}
              className="object-contain"
            />
          </div>

          {/* Ambient Gradient Glow between the cards */}
          <div
            className="absolute inset-x-0 h-48 opacity-40 blur-3xl -z-10"
            style={{
              background: 'radial-gradient(circle at 60% 50%, rgba(158, 202, 188, 0.15) 0%, rgba(33, 67, 61, 0.3) 50%, transparent 80%)',
            }}
          />

          {/* Yellow Amber Circle & Dark Contour Ring on the Right Edge */}
          {/* <div className="hidden md:flex absolute right-[-40px] lg:right-[-60px] top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-0">*/}
            {/* Dark Ellipse Ring */}
            {/* <div
              className="rounded-full border-[60px] border-black/20"
              style={{ width: '320px', height: '320px' }}
            />*/}
            {/* Amber Sun Circle */}
            {/* <div
              className="absolute -right-4 w-[84px] h-[84px] rounded-full bg-[#FFCC49] shadow-lg shadow-[#FFCC49]/25"
            />
          </div>*/}
        </div>

        {/* Second Offer Card */}
        <OfferCard
          offer={offers[1]}
          onSelect={onSelectOffer}
        />
      </div>
    </section>
  );
}
