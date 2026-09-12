'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';

export default function TestimonialCard({ item }) {
  const { title, community, specs, author, quote, image } = item;

  return (
    <div className="flex flex-col lg:flex-row w-full bg-white rounded-[28px] overflow-hidden shadow-2xl shadow-black/20">
      {/* Left Photography */}
      <div className="relative w-full lg:w-1/2 min-h-[260px] sm:min-h-[340px] lg:min-h-[440px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover"
        />
      </div>

      {/* Right Content */}
      <div className="relative w-full lg:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-between text-forest-900 bg-white">
        {/* Quote Decorative Icon at top right */}
        <div className="absolute top-6 right-8 sm:top-10 sm:right-10 text-forest-850/20">
          <Icon icon="ph:quotes-fill" className="w-12 h-12 sm:w-16 sm:h-16 text-forest-750/30" />
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-forest-900 mb-1">
            {title}
          </h3>
          <p className="text-sm font-medium text-sage-600 mb-6">
            {community}
          </p>

          {/* Specs Row */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-sage-600 mb-8">
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:maximize-square-minimalistic-linear" className="w-4 h-4 text-forest-800" />
              <span>{specs.area}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:bed-linear" className="w-4 h-4 text-forest-800" />
              <span>{specs.beds}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Icon icon="solar:bath-linear" className="w-4 h-4 text-forest-800" />
              <span>{specs.baths}</span>
            </div>
          </div>
        </div>

        {/* Client Author & Review */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-sage-300">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-base sm:text-lg text-forest-900">
              {author.name}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-forest-900/80 leading-relaxed">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
}
