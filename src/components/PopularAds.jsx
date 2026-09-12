'use client';

import { useState, useEffect } from 'react';
import { popularAdsData as defaultPopularAds } from '@/lib/mockData';
import PropertyCard from './PropertyCard';
import NewsletterCard from './NewsletterCard';

export default function PopularAds({ onSelectProperty }) {
  const [properties, setProperties] = useState(defaultPopularAds);

  // Fetch API properties and gracefully fallback to static mock data if fetch fails
  useEffect(() => {
    fetch('/api/property')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.properties) && data.properties.length > 0) {
          console.log('[Popular Ads] Rendering ONLY live API properties. No mock data mixed.');
          // Render only live API data, no mock data mixed in
          setProperties(data.properties);
        }
      })
      .catch((err) => {
        console.warn('[Popular Ads] API fetch failed, gracefully using static fallback:', err.message);
        // Retains defaultPopularAds automatically
      });
  }, []);


  return (
    <section
      id="popular-ads"
      className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-[80px] max-w-[1729px] mx-auto"
    >
      {/* Header */}
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
          Popular Ads of This Week
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
          Explore our handpicked selection of popular listings at NovaNest Estates, showcasing a diverse range of exceptional properties that capture the essence of luxury living.
        </p>
      </div>

      {/* Grid: 4 Cards on Left (2 cols), 1 Newsletter Card on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {/* First 2 Property Cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {properties.slice(0, 2).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => onSelectProperty && onSelectProperty(property)}
            />
          ))}
          {/* Next 2 Property Cards */}
          {properties.slice(2, 4).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={() => onSelectProperty && onSelectProperty(property)}
            />
          ))}
        </div>

        {/* 3rd Column: Newsletter Subscription Card */}
        <div className="md:col-span-2 lg:col-span-1 flex">
          <NewsletterCard />
        </div>
      </div>
    </section>

  );
}
