'use client';

import Image from 'next/image';
import { heroData } from '@/lib/mockData';

function smoothScroll(targetY, duration = 600) {
  if (typeof window === 'undefined') return;
  const startY = window.pageYOffset;
  const diff = targetY - startY;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startY + diff * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export default function Hero({ onOpenContact }) {
  const handleExploreClick = (e) => {
    e.preventDefault();
    const elem = document.getElementById('categories');
    if (elem) {
      const top = elem.getBoundingClientRect().top + window.pageYOffset - 90;
      smoothScroll(top, 600);
    }
  };

  return (
    <section
      className="relative w-full min-h-[calc(100vh-110px)] flex flex-col justify-center overflow-visible"
      style={{
        background:
          'radial-gradient(ellipse 65% 80% at 75% 42%, rgba(48, 98, 85, 0.65) 0%, rgba(33, 67, 61, 0.3) 45%, rgba(26, 54, 49, 0.1) 80%, transparent 100%)',
      }}
    >
      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-[1729px] mx-auto py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-[700px]">
            {/* Hero Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-[54px] lg:text-[64px] font-semibold text-[#F4FFFB] leading-[130%] tracking-[0%] mb-6"
              style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
            >
              Discover your nest in the nova of luxury living.
            </h1>

            {/* Hero Description */}
            <p
              className="text-base sm:text-[18px] font-normal text-[#9ECABC] leading-[160%] tracking-[0%] mb-10 max-w-[620px]"
              style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
            >
              {heroData.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleExploreClick}
                className="h-[52px] px-8 rounded-[12px] bg-[#BEDFD4] hover:bg-[#A8D3C5] active:scale-[0.98] text-[#21433D] text-[16px] font-semibold leading-none tracking-[0%] flex items-center justify-center transition-all shadow-md focus:outline-none cursor-pointer"
                style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
              >
                {heroData.primaryCta}
              </button>

              <button
                onClick={onOpenContact}
                className="h-[52px] px-8 rounded-[12px] bg-transparent border border-[#BEDFD4] hover:border-[#F4FFFB] hover:bg-[#BEDFD4]/10 active:scale-[0.98] text-[#9ECABC] hover:text-[#F4FFFB] text-[16px] font-semibold leading-none tracking-[0%] flex items-center justify-center transition-all focus:outline-none cursor-pointer"
                style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
              >
                {heroData.secondaryCta}
              </button>
            </div>
          </div>

          {/* Right 3D Visual Column (HIDDEN ON MOBILE, visible on lg screens) */}
          <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center min-h-[440px] sm:min-h-[520px] md:min-h-[580px]">
            <div className="relative w-full max-w-[560px] h-[520px] sm:h-[580px] flex items-center justify-center">

              {/* Ellipse 3 (Thick Dark Ring) - Positioned accurately behind the house */}
              <div
                className="absolute z-0 pointer-events-none rounded-full"
                style={{
                  width: '400px',
                  height: '400px',
                  border: '65px solid rgba(0, 0, 0, 0.15)',
                  left: '320px',
                  top: '45%',
                  transform: 'translateY(-50%)',
                }}
              />

              {/* Yellow Accent Circle (Amber Sun) - Aligned with Ellipse 3 top */}
              <div
                className="absolute z-0 pointer-events-none rounded-full"
                style={{
                  width: '84px',
                  height: '84px',
                  backgroundColor: '#FFCC49',
                  left: '390px',
                  top: '10px',
                  boxShadow: '0 0 40px rgba(255, 204, 73, 0.25)',
                }}
              />

              {/* Ellipse 4 (Thin Mint Circular Stroke) */}
              <div
                className="absolute z-0 pointer-events-none rounded-full"
                style={{
                  width: '210px',
                  height: '210px',
                  border: '1px solid rgba(158, 202, 188, 0.45)',
                  left: '300px',
                  bottom: '100px',
                }}
              />

              {/* 3D Modern Villa Residence Model */}
              <div className="relative z-10 w-full max-w-[480px] sm:max-w-[530px] transform hover:scale-[1.015] transition-transform duration-500 ease-out">
                <Image
                  src="/wepik-export-20240402194448uhUN 1.png"
                  alt="NovaNest Luxury Villa Residence"
                  width={530}
                  height={530}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Decorative Shape cluster PNG - positioned on the left boundary between Hero and Categories */}
      <div
        className="pointer-events-none absolute left-0 bottom-[-180px] w-52 sm:w-64 md:w-72 lg:w-[255px] opacity-40 select-none z-20"
      >
        <Image
          src="/Shape cluster.png"
          alt=""
          width={255}
          height={537}
          className="object-contain"
        />
      </div>
    </section>
  );
}
