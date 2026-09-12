'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { footerData } from '@/lib/mockData';

export default function Footer() {
  return (
    <footer
      className="relative z-10 w-full transition-all duration-300"
      style={{
        backgroundColor: '#00000033',
        backdropFilter: 'blur(60px)',
        WebkitBackdropFilter: 'blur(60px)',
      }}
    >
      <div className="w-full max-w-[1728px] min-h-[500px] lg:min-h-[640px] xl:min-h-[754px] mx-auto pt-48 sm:pt-56 lg:pt-64 pb-14 px-6 md:px-12 lg:px-[80px] flex flex-col justify-between">
        {/* Top Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 pb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              className="flex items-center gap-[14px] mb-6 group focus:outline-none"
              aria-label="NovaNest Home"
            >
              {/* Logo Icon */}
              <div className="relative w-[36px] h-[36px] flex items-center justify-center shrink-0">
                <Image
                  src="/Logo.png"
                  alt="NovaNest Logo"
                  width={36}
                  height={36}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Logo Text per spec: Manrope 600, 26px, 100%, text-align center, #F4FFFB */}
              <span
                className="w-[121px] h-[36px] flex items-center justify-center text-[26px] font-semibold text-[#F4FFFB] leading-none tracking-[0%] text-center select-none"
                style={{
                  fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: '26px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  textAlign: 'center',
                  color: '#F4FFFB',
                }}
              >
                NovaNest
              </span>
            </Link>
          </div>

          {/* Column 1: Quick Links */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4
              className="font-medium text-[#F4FFFB] mb-6"
              style={{
                fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                fontWeight: 500,
                fontSize: '21px',
                lineHeight: '130%',
                letterSpacing: '0%',
                color: '#F4FFFB',
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {footerData.quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-normal text-[#9ECABC] hover:text-[#F4FFFB] transition-colors inline-block"
                    style={{
                      fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '160%',
                      letterSpacing: '0%',
                      color: '#9ECABC',
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Company Info */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4
              className="font-medium text-[#F4FFFB] mb-6"
              style={{
                fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                fontWeight: 500,
                fontSize: '21px',
                lineHeight: '130%',
                letterSpacing: '0%',
                color: '#F4FFFB',
              }}
            >
              Company Info
            </h4>
            <ul className="space-y-3.5">
              {footerData.companyInfo.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-normal text-[#9ECABC] hover:text-[#F4FFFB] transition-colors inline-block"
                    style={{
                      fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '160%',
                      letterSpacing: '0%',
                      color: '#9ECABC',
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Searches */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4
              className="font-medium text-[#F4FFFB] mb-6"
              style={{
                fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                fontWeight: 500,
                fontSize: '21px',
                lineHeight: '130%',
                letterSpacing: '0%',
                color: '#F4FFFB',
              }}
            >
              Popular Searches
            </h4>
            <ul className="space-y-3.5">
              {footerData.popularSearches.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-normal text-[#9ECABC] hover:text-[#F4FFFB] transition-colors inline-block"
                    style={{
                      fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '160%',
                      letterSpacing: '0%',
                      color: '#9ECABC',
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Attribution & Socials */}
        <div className="pt-8 border-t border-[#BEDFD4]/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-[#9ECABC]">
          <div>
            <span
              className="font-normal text-[#9ECABC]"
              style={{
                fontFamily: 'var(--font-manrope), Manrope, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '160%',
                color: '#9ECABC',
              }}
            >
              {footerData.designer}
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6 text-[#BEDFD4]">
            {footerData.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="hover:text-white hover:scale-110 transition-all text-[#BEDFD4]"
              >
                <Icon icon={s.icon} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
