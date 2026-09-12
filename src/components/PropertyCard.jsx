'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function PropertyCard({ property, onClick }) {
  const { id, title, price, location, specs, image } = property;
  const href = `/property/${id || 'urban-oasis'}`;

  return (
    <Link href={href} className="focus:outline-none block group">
      <div
        onClick={onClick}
        className="cursor-pointer flex flex-col bg-[#F4FAF7] rounded-[24px] p-4 text-forest-900 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl group-hover:shadow-black/25 border border-white/20 shadow-md shadow-black/10"
      >
        {/* Property Photo */}
        <div className="relative w-full h-[200px] sm:h-[220px] rounded-[18px] overflow-hidden mb-4 bg-[#21433D]/10">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Title & Price */}
        <div className="mb-2">
          <h4
            className="text-lg sm:text-[20px] font-semibold text-[#21433D] group-hover:text-[#18342F] transition-colors line-clamp-1 leading-snug"
            style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          >
            {title}
          </h4>
          <p
            className="text-base sm:text-lg font-bold text-[#21433D] mt-0.5"
            style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          >
            {price}
          </p>
        </div>

        {/* Location */}
        <p className="text-xs sm:text-sm font-normal text-[#638B7E] mb-4 line-clamp-1">
          {location}
        </p>

        {/* Specs Row */}
        <div className="mt-auto pt-3 border-t border-[#21433D]/10 flex items-center justify-between text-xs sm:text-[13px] text-[#638B7E]">
          <div className="flex items-center gap-1.5">
            <Icon icon="solar:maximize-square-minimalistic-linear" className="w-4 h-4 text-[#21433D]" />
            <span>{specs?.area}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon icon="solar:bed-linear" className="w-4 h-4 text-[#21433D]" />
            <span>{specs?.beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon icon="solar:bath-linear" className="w-4 h-4 text-[#21433D]" />
            <span>{specs?.baths}</span>
          </div>
        </div>
      </div>
    </Link>

  );
}
