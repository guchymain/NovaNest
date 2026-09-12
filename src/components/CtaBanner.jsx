'use client';

import Image from 'next/image';

export default function CtaBanner({ onOpenContact }) {
  return (
    <section className="relative z-20 w-full max-w-[1700px] h-400 mx-auto px-6 md:px-12 lg:px-[80px] -mb-35 sm:-mb-44 lg:-mb-47 overflow-visible">
      {/* Floating Card Container */}
      <div className="relative w-full bg-[#F4FAF7] rounded-[12px] md:rounded-[12px] shadow-2xl shadow-black/35 flex flex-col lg:flex-row items-center justify-between  p-8 sm:p-10 md:p-12 lg:p-14 border border-white/40">
        {/* Left Text and Action Column */}
        <div className="w-full lg:w-7/12 flex flex-col items-start z-10 max-w-xl">
          <h2
            className="text-[26px] sm:text-[32px] font-semibold text-[#21433D] leading-[130%] tracking-normal mb-5"
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontWeight: 600,
              fontSize: '32px',
              lineHeight: '130%',
              letterSpacing: '0%',
              color: '#21433D',
            }}
          >
            Begin your property listing or purchasing journey with NovaNest.
          </h2>

          <p
            className="text-[16px] sm:text-[18px] font-medium text-[#21433D] leading-[160%] tracking-normal mb-9 max-w-lg"
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              color: '#21433D',
            }}
          >
            Embark on your real estate journey by leveraging the expertise and resources of NovaNest. Whether you&apos;re listing your property for sale or searching for your dream home, our dedicated team is here to guide you every step of the way. With NovaNest, your real estate goals are within reach.
          </p>

          {/* Button styled identical to Nav and Hero */}
          <button
            onClick={onOpenContact}
            className="h-[52px] px-8 rounded-[12px] bg-[#BEDFD4] hover:bg-[#A8D3C5] active:scale-[0.98] text-[#21433D] text-[16px] font-semibold font-manrope tracking-normal flex items-center justify-center transition-all shadow-md focus:outline-none cursor-pointer"
            style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          >
            Get Started
          </button>
        </div>

        {/* Right 3D A-Frame Cabin Visual (wepik-export-20240402172716HK3R 1.png from ./public) */}
        <div className="hidden relative w-full lg:w-5/12 h-[280px] sm:h-[360px] lg:h-[480px] lg:-mt-28 lg:-mb-10 md:flex items-end justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="absolute bottom-20 w-full h-full ">
            <Image
              src="/wepik-export-20240402172716HK3R 1.png"
              alt="NovaNest Modern A-Frame Architectural Cabin"
              fill
              sizes="(max-width: 1024px) 100vw, 540px"
              className="object-contain object-bottom drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
