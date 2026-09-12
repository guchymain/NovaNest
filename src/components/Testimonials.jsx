'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { testimonialsData } from '@/lib/mockData';
import TestimonialCard from './TestimonialCard';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeBtn, setActiveBtn] = useState('right');

  const handlePrev = () => {
    setActiveBtn('left');
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveBtn('right');
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const currentItem = testimonialsData[currentIndex];
  const nextItem = testimonialsData[(currentIndex + 1) % testimonialsData.length];

  return (
    <section
      id="testimonials"
      className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-[80px] max-w-[1729px] mx-auto overflow-visible"
    >
      {/* Decorative Shape cluster PNG between Mobile App and Testimonials section */}
      {/* <div className="pointer-events-none absolute left-[-40px] sm:left-[-60px] md:left-[-80px] -top-28 w-48 sm:w-60 md:w-64 opacity-35 z-0 select-none">
        <Image
          src="/Shape cluster.png"
          alt=""
          width={255}
          height={537}
          className="object-contain"
        />
      </div>*/}

      {/* Decorative Left Circular Graphic & Amber Accent Circle */}
      {/* <div className="hidden md:flex pointer-events-none absolute  top-24 items-center justify-center z-0">
        <div
          className="rounded-full border-[55px] border-black/20"
          style={{ width: '280px', height: '280px' }}
        />
        <div
          className="absolute -left-3 top-12 w-[84px] h-[84px] rounded-full bg-[#FFCC49] shadow-lg shadow-[#FFCC49]/25"
        />
      </div>*/}

      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-12 md:mb-16 relative z-10">
        <div className="flex-shrink-0">
          <h2
            className="text-[28px] sm:text-[32px] font-semibold text-[#F4FFFB] leading-[130%] tracking-normal"
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontWeight: 600,
              fontSize: '32px',
              lineHeight: '130%',
              letterSpacing: '0%',
              color: '#F4FFFB',
            }}
          >
            What Our<br className="hidden sm:inline" /> Clients Say
          </h2>
        </div>

        <div className="flex-1 max-w-[620px]">
          <p
            className="text-[16px] sm:text-[18px] font-normal text-[#9ECABC] leading-[160%] tracking-normal"
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              color: '#9ECABC',
            }}
          >
            Discover what our satisfied clients have to say about their experience with NovaNest Estates. From finding their dream homes to experiencing exceptional service, our clients&apos; testimonials speak volumes about the quality and dedication we bring to every real estate transaction.
          </p>
        </div>

        {/* Carousel Arrow Controls (same styling & behavior with categories) */}
        <div className="flex items-center gap-4 self-start lg:self-center">
          {/* Left Arrow Button */}
          <div
            className={`p-[1.5px] rounded-full transition-all duration-300 ${
              activeBtn === 'left'
                ? 'bg-gradient-to-r from-[#BEDFD4] to-[#6DA090] shadow-md shadow-[#638B7E]/25'
                : 'bg-transparent border border-[#BEDFD4]/35 hover:bg-gradient-to-r hover:from-[#BEDFD4] hover:to-[#6DA090]'
            }`}
          >
            <button
              onClick={handlePrev}
              onMouseEnter={() => setActiveBtn('left')}
              className={`w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer ${
                activeBtn === 'left'
                  ? 'bg-gradient-to-r from-[#9ECABC] to-[#638B7E] text-[#21433D]'
                  : 'bg-transparent text-[#9ECABC] hover:bg-gradient-to-r hover:from-[#9ECABC] hover:to-[#638B7E] hover:text-[#21433D]'
              }`}
              aria-label="Previous Testimonial"
            >
              <Icon icon="solar:arrow-left-linear" className="w-6 h-6" />
            </button>
          </div>

          {/* Right Arrow Button */}
          <div
            className={`p-[1.5px] rounded-full transition-all duration-300 ${
              activeBtn === 'right'
                ? 'bg-gradient-to-r from-[#BEDFD4] to-[#6DA090] shadow-md shadow-[#638B7E]/25'
                : 'bg-transparent border border-[#BEDFD4]/35 hover:bg-gradient-to-r hover:from-[#BEDFD4] hover:to-[#6DA090]'
            }`}
          >
            <button
              onClick={handleNext}
              onMouseEnter={() => setActiveBtn('right')}
              className={`w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer ${
                activeBtn === 'right'
                  ? 'bg-gradient-to-r from-[#9ECABC] to-[#638B7E] text-[#21433D]'
                  : 'bg-transparent text-[#9ECABC] hover:bg-gradient-to-r hover:from-[#9ECABC] hover:to-[#638B7E] hover:text-[#21433D]'
              }`}
              aria-label="Next Testimonial"
            >
              <Icon icon="solar:arrow-right-linear" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Testimonial Active Display + Peek Card */}
      <div className="relative z-10 flex items-center gap-6">
        {/* Main Testimonial Card */}
        <div className="flex-1 transition-opacity duration-300">
          <TestimonialCard item={currentItem} />
        </div>

        {/* Right Peek Card */}
        <div
          onClick={handleNext}
          className="hidden xl:block w-[240px] h-[440px] rounded-[28px] overflow-hidden opacity-60 hover:opacity-90 cursor-pointer transition-all duration-300 relative shadow-2xl border border-white/10 shrink-0"
        >
          <Image
            src={nextItem.image}
            alt={nextItem.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
