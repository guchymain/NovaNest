'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

// Smooth scroll utility with exact timing and easing curves
function smoothScroll(targetY, duration = 600, easing = 'easeInOut') {
  if (typeof window === 'undefined') return;
  const startY = window.pageYOffset;
  const diff = targetY - startY;
  const startTime = performance.now();

  const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  const easeOutCubic = (t) =>
    --t * t * t + 1;

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easing === 'easeOut' ? easeOutCubic(progress) : easeInOutQuad(progress);

    window.scrollTo(0, startY + diff * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export default function Header({ onOpenContact }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Categories', targetId: 'categories' },
    { name: 'Exclusive Offers', targetId: 'exclusive-offers' },
    { name: 'Popular Ads', targetId: 'popular-ads' },
    { name: 'Testimonials', targetId: 'testimonials' },
  ];

  // LOGO interaction: Scroll to top with 800ms duration, ease-out
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (pathname === '/') {
      smoothScroll(0, 800, 'easeOut');
    } else {
      router.push('/');
    }
  };

  // NAV ITEM interaction: Scroll to target section with 600ms duration, ease-in-out
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (pathname === '/') {
      const elem = document.getElementById(targetId);
      if (elem) {
        const top = elem.getBoundingClientRect().top + window.pageYOffset - 90;
        smoothScroll(top, 600, 'easeInOut');
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        backgroundColor: '#00000033',
        backdropFilter: 'blur(60px)',
        WebkitBackdropFilter: 'blur(60px)',
      }}
    >
      <div className="w-full max-w-[1729px] h-[110px] mx-auto p-[30px] flex items-center justify-between">
        {/* LOGO CONTAINER */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-[14px] cursor-pointer group bg-transparent border-0 p-0 text-left focus:outline-none"
          aria-label="NovaNest Logo - Return to Top"
        >
          {/* Logo Icon */}
          <div className="relative w-[36px] h-[36px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/Logo.png"
              alt="NovaNest Logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>

          {/* Logo Text */}
          <span
            className="w-[121px] h-[36px] flex items-center justify-center text-[26px] font-semibold text-[#F4FFFB] font-manrope leading-none tracking-[0%] text-center select-none"
            style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          >
            NovaNest
          </span>
        </button>

        {/* DESKTOP NAV ITEMS */}
        <nav className="hidden xl:flex items-center gap-6 2xl:gap-10">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={(e) => handleNavClick(e, item.targetId)}
              className="h-[36px] px-3 flex items-center justify-center text-[18px] font-medium text-[#9ECABC] hover:text-[#F4FFFB] transition-colors duration-200 cursor-pointer bg-transparent border-0 font-manrope leading-none tracking-[0%] whitespace-nowrap focus:outline-none"
              style={{
                fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                minWidth: '121px',
              }}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* DESKTOP BUTTONS */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={(e) => handleNavClick(e, 'categories')}
            className="w-[200px] 2xl:w-[217px] h-[46px] rounded-[12px] bg-[#BEDFD4] hover:bg-[#A8D3C5] active:scale-[0.98] text-[#21433D] text-[16px] font-semibold font-manrope tracking-normal flex items-center justify-center transition-all shadow-sm focus:outline-none"
            style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          >
            Explore Properties
          </button>

          <button
            onClick={() => onOpenContact && onOpenContact()}
            className="w-[180px] 2xl:w-[199px] h-[46px] rounded-[12px] bg-transparent border border-[#BEDFD4] hover:border-[#F4FFFB] hover:bg-[#BEDFD4]/10 active:scale-[0.98] text-[#9ECABC] hover:text-[#F4FFFB] text-[16px] font-semibold font-manrope tracking-normal flex items-center justify-center transition-all focus:outline-none"
            style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
          >
            Contact Us
          </button>
        </div>

        {/* MOBILE / TABLET HAMBURGER BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-[#9ECABC] hover:text-[#F4FFFB] focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Icon
            icon={mobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'}
            className="w-8 h-8"
          />
        </button>
      </div>

      {/* MOBILE / TABLET EXPANDED DRAWER */}
      {mobileMenuOpen && (
        <div className="xl:hidden w-full px-[30px] pb-6 bg-[#0E2522]/95 border-b border-[#235047] flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <nav className="flex flex-col gap-2 pt-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className="h-[44px] flex items-center text-left text-[18px] font-medium text-[#9ECABC] hover:text-[#F4FFFB] font-manrope border-b border-[#1A3D36] transition-colors focus:outline-none"
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <button
              onClick={(e) => handleNavClick(e, 'categories')}
              className="w-full h-[46px] rounded-[12px] bg-[#BEDFD4] text-[#21433D] text-[16px] font-semibold font-manrope flex items-center justify-center"
            >
              Explore Properties
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenContact) onOpenContact();
              }}
              className="w-full h-[46px] rounded-[12px] border border-[#BEDFD4] text-[#9ECABC] text-[16px] font-semibold font-manrope flex items-center justify-center"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
