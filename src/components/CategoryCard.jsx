'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CategoryCard({ category, onClick }) {
  const href = `/category/${category.slug || category.id}`;

  const content = (
    <div
      onClick={onClick}
      className="group flex-shrink-0 w-[300px] sm:w-[360px] md:w-[410px] lg:w-[440px] bg-[#F4FAF7] rounded-[28px] p-4 sm:p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 cursor-pointer block select-none border border-white/10"
    >
      {/* Category Card Image Container */}
      <div className="relative w-full h-[230px] sm:h-[260px] md:h-[285px] rounded-[20px] overflow-hidden mb-5 bg-[#21433D]/10">
        <Image
          src={category.image}
          alt={category.title}
          fill
          sizes="(max-width: 640px) 300px, (max-width: 768px) 360px, (max-width: 1024px) 410px, 440px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>


      {/* Card Info */}
      <div className="pb-2">
        <h3
          className="text-xl sm:text-[24px] font-semibold text-[#21433D] group-hover:text-[#18342F] transition-colors leading-[130%]"
          style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
        >
          {category.title}
        </h3>
        <p
          className="text-sm sm:text-[16px] font-normal text-[#638B7E] mt-1 tracking-normal"
          style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
        >
          {category.count}
        </p>
      </div>
    </div>
  );

  return (
    <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BEDFD4] rounded-[28px] block">
      {content}
    </Link>
  );
}
