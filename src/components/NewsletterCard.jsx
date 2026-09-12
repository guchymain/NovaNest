'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[520px] rounded-[28px] p-7 sm:p-8 flex flex-col justify-between shadow-2xl shadow-black/20 text-[#21433D] overflow-hidden">
      {/* Background Image: goldenbg.png from ./public */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/goldenbg.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 450px"
          className="object-cover object-center"
        />
        {/* Subtle warm overlay to harmonize text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-200/10 via-amber-300/15 to-amber-400/25 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* NovaNest Logo Emblem */}
        <div className="w-10 h-10 mb-6 relative flex items-center justify-center">
          <Image
            src="/Logo.png"
            alt="NovaNest Emblem"
            width={36}
            height={36}
            className="brightness-0 object-contain opacity-90"
          />
        </div>

        {/* Headline */}
        <h3
          className="text-2xl sm:text-[30px] font-bold tracking-tight text-[#21433D] leading-[125%] mb-5"
          style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
        >
          The most intriguing, unique, and novel offers.
        </h3>

        {/* Description Body */}
        <div className="space-y-3.5 text-xs sm:text-[14px] text-[#21433D]/90 font-medium leading-[160%] mb-6">
          <p>
            Stay updated with the latest trends, market insights, and exclusive property offers by subscribing to our real estate newsletter.
          </p>
          <p>
            Receive curated content straight to your inbox, including tips for buyers, sellers, and investors.
          </p>
          <p>
            Don&apos;t miss out on the opportunity to be informed and inspired. Subscribe now!
          </p>
        </div>
      </div>

      {/* Subscription Form */}
      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-3 mt-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full h-[48px] px-4 rounded-[14px] bg-white text-[#21433D] text-sm placeholder:text-[#21433D]/50 focus:outline-none focus:ring-2 focus:ring-[#21433D] transition-all shadow-md"
        />

        <button
          type="submit"
          className="w-full h-[48px] rounded-[14px] bg-gradient-to-r from-[#9ECABC] to-[#638B7E] hover:from-[#BEDFD4] hover:to-[#71988C] text-[#21433D] text-sm font-semibold tracking-wide transition-all shadow-md active:scale-[0.99] cursor-pointer"
          style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
        >
          {subscribed ? 'Thank you for subscribing!' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
