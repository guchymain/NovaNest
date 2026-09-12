'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function OfferCard({ offer, onSelect }) {
  const { id, title, originalPrice, price, location, specs, images, reverse } = offer;

  const stackImages = images || [offer.image];
  const dropShadowStyle = { boxShadow: '0px -4px 10px 5px #21433D26' };

  return (
    <div
      className={`flex flex-col ${
        reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } items-center justify-between gap-12 lg:gap-20 py-8`}
    >
      {/* 3-Layered Stacked Images Visual */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <Link
          href={`/property/${id || 'elegant-apartment'}`}
          className="relative block w-full max-w-[500px] h-[360px] sm:h-[460px] md:h-[530px] group cursor-pointer focus:outline-none"
        >
          {reverse ? (
            /* Card 2 Stack: Front card on left, middle and back cards peek out on the right */
            <>
              {/* Back Card (peeking furthest right) */}
              {stackImages[2] && (
                <div
                  style={dropShadowStyle}
                  className="absolute top-10 sm:top-14 right-0 w-[72%] h-[80%] rounded-[24px] overflow-hidden z-10 opacity-75 group-hover:opacity-95 transition-all duration-500"
                >
                  <Image
                    src={stackImages[2]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 260px, 360px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Middle Card (peeking middle right) */}
              {stackImages[1] && (
                <div
                  style={dropShadowStyle}
                  className="absolute top-5 sm:top-7 right-8 sm:right-12 w-[78%] h-[86%] rounded-[24px] overflow-hidden z-20 opacity-90 group-hover:opacity-100 transition-all duration-500"
                >
                  <Image
                    src={stackImages[1]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Front Card (aligned to left) */}
              <div
                style={dropShadowStyle}
                className="absolute top-0 left-0 w-[84%] h-[94%] rounded-[26px] overflow-hidden z-30 group-hover:scale-[1.015] transition-all duration-500"
              >
                <Image
                  src={stackImages[0]}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 340px, 440px"
                  className="object-cover"
                  priority
                />
              </div>
            </>
          ) : (
            /* Card 1 Stack: Front card on right, middle and back cards peek out on the left */
            <>
              {/* Back Card (peeking furthest left) */}
              {stackImages[2] && (
                <div
                  style={dropShadowStyle}
                  className="absolute top-10 sm:top-14 left-0 w-[72%] h-[80%] rounded-[24px] overflow-hidden z-10 opacity-75 group-hover:opacity-95 transition-all duration-500"
                >
                  <Image
                    src={stackImages[2]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 260px, 360px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Middle Card (peeking middle left) */}
              {stackImages[1] && (
                <div
                  style={dropShadowStyle}
                  className="absolute top-5 sm:top-7 left-8 sm:left-12 w-[78%] h-[86%] rounded-[24px] overflow-hidden z-20 opacity-90 group-hover:opacity-100 transition-all duration-500"
                >
                  <Image
                    src={stackImages[1]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 300px, 400px"
                    className="object-cover"
                  />
                </div>
              )}

              {/* Front Card (aligned to right) */}
              <div
                style={dropShadowStyle}
                className="absolute top-0 right-0 w-[84%] h-[94%] rounded-[26px] overflow-hidden z-30 group-hover:scale-[1.015] transition-all duration-500"
              >
                <Image
                  src={stackImages[0]}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 340px, 440px"
                  className="object-cover"
                  priority
                />
              </div>
            </>
          )}
        </Link>
      </div>

      {/* Property Information */}
      <div className="w-full lg:w-1/2 flex flex-col items-start max-w-xl">
        {/* Property Name: Manrope SemiBold 600, 64px, 130%, #F4FFFB */}
        <Link href={`/property/${id || 'elegant-apartment'}`}>
          <h3
            className="text-4xl sm:text-5xl lg:text-[64px] font-semibold text-[#F4FFFB] leading-[130%] tracking-normal mb-5 hover:text-[#BEDFD4] transition-colors"
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(32px, 5vw, 64px)',
              lineHeight: '130%',
              letterSpacing: '0%',
              color: '#F4FFFB',
            }}
          >
            {title}
          </h3>
        </Link>

        {/* Pricing */}
        <div className="mb-4">
          <span className="block text-base sm:text-[18px] text-[#9ECABC]/80 line-through font-normal mb-1">
            {originalPrice}
          </span>
          <span className="text-3xl sm:text-4xl font-semibold text-[#F4FFFB] tracking-tight">
            {price}
          </span>
        </div>

        {/* Location */}
        <p className="text-base sm:text-[18px] text-[#9ECABC] font-normal mb-8">
          {location}
        </p>

        {/* Specs: Arranged vertically in a column per Figma design */}
        <div className="flex flex-col gap-4 sm:gap-5 text-[#9ECABC] text-base sm:text-[18px] font-normal">
          {/* Area */}
          <div className="flex items-center gap-3">
            <Icon icon="solar:maximize-square-minimalistic-linear" className="w-5 h-5 text-[#9ECABC]" />
            <span>{specs?.area}</span>
          </div>

          {/* Bedrooms */}
          <div className="flex items-center gap-3">
            <Icon icon="solar:bed-linear" className="w-5 h-5 text-[#9ECABC]" />
            <span>{specs?.beds}</span>
          </div>

          {/* Bathrooms */}
          <div className="flex items-center gap-3">
            <Icon icon="solar:bath-linear" className="w-5 h-5 text-[#9ECABC]" />
            <span>{specs?.baths}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
