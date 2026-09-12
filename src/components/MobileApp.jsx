'use client';

import Image from 'next/image';

export default function MobileApp() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-12 lg:px-[80px] max-w-[1729px] mx-auto overflow-hidden">
      {/* Background Radial Glow & Contour Rings */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[700px] h-[600px] opacity-60 blur-3xl -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(48, 98, 85, 0.6) 0%, rgba(33, 67, 61, 0.25) 55%, transparent 80%)',
        }}
      />

      {/* Decorative Circular Outline on Left Edge */}
      {/* <div
        className="pointer-events-none absolute -left-28 bottom-[-40px] rounded-full z-0"
        style={{
          width: '380px',
          height: '380px',
          border: '1px solid rgba(158, 202, 188, 0.25)',
        }}
      />*/}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left: Phone Mockup Visual (using devices.png from ./public) */}
        <div className="lg:col-span-5 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[360px] sm:max-w-[400px] md:max-w-[440px] h-[400px] sm:h-[480px] md:h-[520px] transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/devices.png"
              alt="NovaNest Mobile Application Interface"
              fill
              sizes="(max-width: 768px) 360px, 440px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Right: Mobile App Info & Download Links */}
        <div className="lg:col-span-7 flex flex-col items-start max-w-xl">
          <h2
            className="text-[28px] sm:text-[32px] font-semibold text-[#F4FFFB] leading-[130%] tracking-normal mb-6"
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontWeight: 600,
              fontSize: '32px',
              lineHeight: '130%',
              letterSpacing: '0%',
              color: '#F4FFFB',
            }}
          >
            Mobile Application
          </h2>

          <p
            className="text-[16px] sm:text-[18px] font-normal text-[#9ECABC] leading-[160%] tracking-normal mb-10"
            style={{
              fontFamily: 'var(--font-manrope), Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '160%',
              letterSpacing: '0%',
              color: '#9ECABC',
            }}
          >
            Achieve seamless access to the world of real estate with the NovaNest Estates mobile app, available for download on both Google Play and the App Store. Whether you&apos;re searching for your dream home, exploring property listings, or staying updated with the latest market trends, our user-friendly app puts the power of real estate in the palm of your hand. Download now and experience the convenience of finding your perfect property anytime, anywhere.
          </p>

          {/* Download Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Apple App Store Button */}
            <div className="p-[1px] rounded-[14px] bg-gradient-to-b from-[#484848] to-[#0B0B0B] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <a
                href="#download-ios"
                className="h-[52px] px-7 rounded-[13px] bg-gradient-to-b from-[#2F2F2F] to-[#000000] text-[#F4FFFB] flex items-center gap-3.5 transition-colors focus:outline-none"
              >
                <div className="w-[25px] h-[25px] relative flex items-center justify-center shrink-0">
                  <Image
                    src="/icons (1).png"
                    alt="Apple Logo"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>
                <span
                  className="text-[16px] font-semibold tracking-normal text-[#F4FFFB]"
                  style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
                >
                  Download
                </span>
              </a>
            </div>

            {/* Google Play Store Button */}
            <div className="p-[1px] rounded-[14px] bg-gradient-to-b from-[#484848] to-[#0B0B0B] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-transform">
              <a
                href="#download-android"
                className="h-[52px] px-7 rounded-[13px] bg-gradient-to-b from-[#2F2F2F] to-[#000000] text-[#F4FFFB] flex items-center gap-3.5 transition-colors focus:outline-none"
              >
                <div className="w-[25px] h-[25px] relative flex items-center justify-center shrink-0">
                  <Image
                    src="/icons.png"
                    alt="Google Play Logo"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>
                <span
                  className="text-[16px] font-semibold tracking-normal text-[#F4FFFB]"
                  style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
                >
                  Download
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
