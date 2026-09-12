'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { categoriesData as defaultCategories } from '@/lib/mockData';

import CategoryCard from './CategoryCard';

export default function Categories({ onSelectCategory }) {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState(defaultCategories);
  const [activeBtn, setActiveBtn] = useState('right'); // 'left' | 'right' | null
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fetch categories from Realty API endpoint on mount and gracefully fallback to static data
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.categories) && data.categories.length > 0) {
          console.log('[NovaNest Categories] Live API categories loaded. Rendering ONLY API data.');
          setCategories(data.categories);
        }
      })
      .catch((err) => {
        console.warn('[NovaNest Categories] API fetch note, gracefully using static fallback:', err.message);
        // Retains defaultCategories automatically
      });
  }, []);


  const updateScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScroll = (direction) => {
    setActiveBtn(direction);
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('div')?.clientWidth || 420;
      const scrollAmount = direction === 'left' ? -cardWidth - 24 : cardWidth + 24;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(updateScrollState, 350);
    }
  };

  return (
    <section
      id="categories"
      className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-[80px] max-w-[1729px] mx-auto overflow-hidden"
    >
      {/* Anchor for nav interaction "explore-categories" */}
      <div id="explore-categories" className="absolute -top-24 left-0" />

      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 mb-12 md:mb-16">
        {/* Title */}
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
            Explore<br className="hidden sm:inline" /> Categories
          </h2>
        </div>

        {/* Description */}
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
            Start exploring at NovaNest Estates and navigate our extensive range of categories to find the living space of your dreams. Each carefully curated, browse through diverse types of homes to discover your ideal residence.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
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
              onClick={() => handleScroll('left')}
              onMouseEnter={() => setActiveBtn('left')}
              className={`w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer ${
                activeBtn === 'left'
                  ? 'bg-gradient-to-r from-[#9ECABC] to-[#638B7E] text-[#21433D]'
                  : 'bg-transparent text-[#9ECABC] hover:bg-gradient-to-r hover:from-[#9ECABC] hover:to-[#638B7E] hover:text-[#21433D]'
              }`}
              aria-label="Previous Categories"
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
              onClick={() => handleScroll('right')}
              onMouseEnter={() => setActiveBtn('right')}
              className={`w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer ${
                activeBtn === 'right'
                  ? 'bg-gradient-to-r from-[#9ECABC] to-[#638B7E] text-[#21433D]'
                  : 'bg-transparent text-[#9ECABC] hover:bg-gradient-to-r hover:from-[#9ECABC] hover:to-[#638B7E] hover:text-[#21433D]'
              }`}
              aria-label="Next Categories"
            >
              <Icon icon="solar:arrow-right-linear" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Cards Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex items-center gap-6 sm:gap-7 md:gap-8 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-6 px-6 sm:-mx-12 sm:px-12 lg:mx-0 lg:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <div key={category.id} className="snap-start flex-shrink-0">
            <CategoryCard
              category={category}
              onClick={() => onSelectCategory && onSelectCategory(category)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
