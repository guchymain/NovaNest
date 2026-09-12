'use client';

import { useState, useEffect, useMemo } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactModal from '@/components/ContactModal';
import { getCategoryBySlug, getPropertiesByCategory, getAllCategories } from '@/lib/mockData';


export default function CategoryListingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug || 'apartments';

  const category = getCategoryBySlug(slug) || {
    id: slug,
    slug,
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    count: 'Exclusive Properties',
    description: 'Explore our curated luxury residences in this premier collection.',
    image: '/images/cat-apartments.png',
  };

  const fallbackProps = useMemo(() => getPropertiesByCategory(slug), [slug]);
  const [liveProps, setLiveProps] = useState(null);
  const allCategories = useMemo(() => getAllCategories(), []);

  // Fetch live API properties; fallback to mock data on failure
  useEffect(() => {
    fetch('/api/property')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.properties) && data.properties.length > 0) {
          const matching = data.properties.filter(
            (p) => p.category === slug || slug === 'all' || slug === 'featured'
          );
          if (matching.length > 0) {
            console.log('[Category Page] Rendering ONLY live API properties for category:', slug);
            setLiveProps(matching);
          }
        }
      })
      .catch((err) => {
        console.warn('[Category Page] API fetch note, using static category fallback:', err.message);
      });
  }, [slug]);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all', 'under-1m', '1m-3m', 'over-3m'
  const [bedFilter, setBedFilter] = useState('all'); // 'all', '2', '3', '4', '5+'
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc'

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    // If live API data exists, render ONLY API data. Do not mix mock data.
    let result = liveProps ? [...liveProps] : [...fallbackProps];

    if (!liveProps && result.length < 3) {
      const others = getPropertiesByCategory('all').filter((p) => p.category !== slug);
      result = [...result, ...others.slice(0, 4 - result.length)];
    }


    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Price Filter
    if (priceFilter === 'under-1m') {
      result = result.filter((p) => p.priceNumeric < 1000000);
    } else if (priceFilter === '1m-3m') {
      result = result.filter((p) => p.priceNumeric >= 1000000 && p.priceNumeric <= 3000000);
    } else if (priceFilter === 'over-3m') {
      result = result.filter((p) => p.priceNumeric > 3000000);
    }

    // Bed Filter
    if (bedFilter !== 'all') {
      const minBeds = parseInt(bedFilter, 10);
      result = result.filter((p) => {
        const beds = parseInt(p.specs?.beds) || 0;
        return beds >= minBeds;
      });
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceNumeric - a.priceNumeric);
    }

    return result;
  }, [liveProps, fallbackProps, slug, searchQuery, priceFilter, bedFilter, sortBy]);

  return (
    <div className="min-h-screen bg-transparent text-white font-manrope">
      {/* Header */}
      <Header onOpenContact={() => setModalOpen(true)} />

      {/* Main Content Container */}
      <main className="max-w-[1729px] mx-auto px-6 md:px-12 lg:px-[80px] pt-8 pb-24">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pt-4 border-b border-[#BEDFD4]/15 pb-6">
          <nav className="flex items-center gap-2 text-sm text-[#9ECABC]">
            <Link href="/" className="hover:text-[#F4FFFB] transition-colors flex items-center gap-1.5">
              <Icon icon="solar:home-2-linear" className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 opacity-60" />
            <Link href="/#categories" className="hover:text-[#F4FFFB] transition-colors">
              Categories
            </Link>
            <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 opacity-60" />
            <span className="text-[#BEDFD4] font-semibold">{category.title}</span>
          </nav>

          <Link
            href="/#categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#BEDFD4] hover:text-white transition-colors bg-[#BEDFD4]/10 hover:bg-[#BEDFD4]/20 px-4 py-2 rounded-full border border-[#BEDFD4]/25"
          >
            <Icon icon="solar:arrow-left-linear" className="w-4 h-4" />
            <span>All Categories</span>
          </Link>
        </div>

        {/* Category Hero Banner */}
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#1A3833]/90 to-[#264D45]/80 border border-[#BEDFD4]/20 p-8 sm:p-12 mb-12 shadow-2xl backdrop-blur-md">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#BEDFD4]/15 border border-[#BEDFD4]/30 text-[#BEDFD4] text-xs font-semibold uppercase tracking-wider mb-5">
              <Icon icon="solar:crown-star-bold" className="w-4 h-4 text-[#BEDFD4]" />
              <span>Curated Collection</span>
              <span className="w-1 h-1 rounded-full bg-[#BEDFD4]" />
              <span>{category.count}</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F4FFFB] leading-[125%] mb-4"
              style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
            >
              {category.title}
            </h1>

            <p className="text-base sm:text-lg text-[#9ECABC] leading-[160%] max-w-2xl font-normal">
              {category.description}
            </p>
          </div>

          {/* Quick Category Switcher Tabs */}
          <div className="relative z-10 mt-8 pt-6 border-t border-[#BEDFD4]/15 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-semibold text-[#BEDFD4]/70 uppercase tracking-wider mr-2 shrink-0">
              Browse:
            </span>
            {allCategories.map((c) => {
              const active = c.slug === slug;
              return (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#BEDFD4] text-[#21433D] font-semibold shadow-md'
                      : 'bg-[#21433D]/60 text-[#9ECABC] hover:text-white hover:bg-[#21433D] border border-[#BEDFD4]/20'
                  }`}
                >
                  {c.title}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Toolbar */}
        <div className="bg-[#1A3833]/80 backdrop-blur-md border border-[#BEDFD4]/20 rounded-[24px] p-4 sm:p-6 mb-10 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Icon
                icon="solar:magnifer-linear"
                className="w-5 h-5 text-[#9ECABC] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search properties or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[48px] pl-11 pr-4 rounded-[14px] bg-[#21433D] border border-[#BEDFD4]/30 text-white placeholder-[#9ECABC]/60 text-sm focus:outline-none focus:border-[#BEDFD4] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ECABC] hover:text-white p-1"
                >
                  <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div className="lg:col-span-3">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full h-[48px] px-4 rounded-[14px] bg-[#21433D] border border-[#BEDFD4]/30 text-sm text-[#F4FFFB] focus:outline-none focus:border-[#BEDFD4] transition-colors cursor-pointer"
              >
                <option value="all" className="bg-[#21433D]">All Price Ranges</option>
                <option value="under-1m" className="bg-[#21433D]">Under $1,000,000</option>
                <option value="1m-3m" className="bg-[#21433D]">$1,000,000 – $3,000,000</option>
                <option value="over-3m" className="bg-[#21433D]">Over $3,000,000</option>
              </select>
            </div>

            {/* Bedrooms Filter */}
            <div className="lg:col-span-2">
              <select
                value={bedFilter}
                onChange={(e) => setBedFilter(e.target.value)}
                className="w-full h-[48px] px-4 rounded-[14px] bg-[#21433D] border border-[#BEDFD4]/30 text-sm text-[#F4FFFB] focus:outline-none focus:border-[#BEDFD4] transition-colors cursor-pointer"
              >
                <option value="all" className="bg-[#21433D]">All Bedrooms</option>
                <option value="2" className="bg-[#21433D]">2+ Bedrooms</option>
                <option value="3" className="bg-[#21433D]">3+ Bedrooms</option>
                <option value="4" className="bg-[#21433D]">4+ Bedrooms</option>
                <option value="5" className="bg-[#21433D]">5+ Bedrooms</option>
              </select>
            </div>

            {/* Sort Options */}
            <div className="lg:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-[48px] px-4 rounded-[14px] bg-[#21433D] border border-[#BEDFD4]/30 text-sm text-[#F4FFFB] focus:outline-none focus:border-[#BEDFD4] transition-colors cursor-pointer"
              >
                <option value="featured" className="bg-[#21433D]">Sort: Featured First</option>
                <option value="price-asc" className="bg-[#21433D]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#21433D]">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filter Badges */}
          {(searchQuery || priceFilter !== 'all' || bedFilter !== 'all') && (
            <div className="mt-4 pt-4 border-t border-[#BEDFD4]/15 flex items-center justify-between text-xs text-[#9ECABC]">
              <div className="flex flex-wrap items-center gap-2">
                <span>Active Filters:</span>
                {searchQuery && (
                  <span className="bg-[#BEDFD4]/20 text-[#BEDFD4] px-2.5 py-1 rounded-full border border-[#BEDFD4]/30 flex items-center gap-1">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-white">×</button>
                  </span>
                )}
                {priceFilter !== 'all' && (
                  <span className="bg-[#BEDFD4]/20 text-[#BEDFD4] px-2.5 py-1 rounded-full border border-[#BEDFD4]/30 flex items-center gap-1">
                    Price: {priceFilter}
                    <button onClick={() => setPriceFilter('all')} className="hover:text-white">×</button>
                  </span>
                )}
                {bedFilter !== 'all' && (
                  <span className="bg-[#BEDFD4]/20 text-[#BEDFD4] px-2.5 py-1 rounded-full border border-[#BEDFD4]/30 flex items-center gap-1">
                    {bedFilter}+ Beds
                    <button onClick={() => setBedFilter('all')} className="hover:text-white">×</button>
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setPriceFilter('all');
                  setBedFilter('all');
                }}
                className="text-[#BEDFD4] underline hover:text-white font-medium ml-auto"
              >
                Reset all
              </button>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm sm:text-base text-[#9ECABC]">
            Showing <span className="text-[#F4FFFB] font-semibold">{filteredProperties.length}</span> luxury residences
          </p>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="group bg-[#F4FAF7] rounded-[28px] p-5 text-forest-900 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30 border border-white/20"
              >
                {/* Photo Container */}
                <Link href={`/property/${property.id}`} className="block relative w-full h-[240px] sm:h-[260px] rounded-[20px] overflow-hidden mb-5 bg-[#21433D]/10">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute bottom-3.5 right-3.5 bg-[#21433D]/90 backdrop-blur-md text-[#F4FFFB] text-base font-bold px-3.5 py-1.5 rounded-full border border-[#BEDFD4]/30 shadow-md">
                    {property.price}
                  </div>
                </Link>


                {/* Property Info */}
                <div className="flex-1 flex flex-col">
                  <div className="mb-2">
                    <Link href={`/property/${property.id}`}>
                      <h3
                        className="text-xl sm:text-[22px] font-semibold text-[#21433D] group-hover:text-[#16302B] transition-colors line-clamp-1 leading-snug"
                        style={{ fontFamily: 'var(--font-manrope), Manrope, sans-serif' }}
                      >
                        {property.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-[#638B7E] flex items-center gap-1.5 mt-1 line-clamp-1">
                      <Icon icon="solar:map-point-linear" className="w-4 h-4 text-[#21433D] shrink-0" />
                      <span>{property.location}</span>
                    </p>
                  </div>

                  {/* Specs Row */}
                  <div className="mt-4 pt-4 border-t border-[#21433D]/10 grid grid-cols-3 gap-2 text-center text-xs sm:text-sm text-[#638B7E]">
                    <div className="bg-[#E7F3EE] p-2 rounded-[12px] flex flex-col items-center justify-center">
                      <Icon icon="solar:maximize-square-minimalistic-linear" className="w-4 h-4 text-[#21433D] mb-1" />
                      <span className="font-semibold text-[#21433D]">{property.specs?.area}</span>
                    </div>
                    <div className="bg-[#E7F3EE] p-2 rounded-[12px] flex flex-col items-center justify-center">
                      <Icon icon="solar:bed-linear" className="w-4 h-4 text-[#21433D] mb-1" />
                      <span className="font-semibold text-[#21433D]">{property.specs?.beds}</span>
                    </div>
                    <div className="bg-[#E7F3EE] p-2 rounded-[12px] flex flex-col items-center justify-center">
                      <Icon icon="solar:bath-linear" className="w-4 h-4 text-[#21433D] mb-1" />
                      <span className="font-semibold text-[#21433D]">{property.specs?.baths}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 pt-2 flex items-center gap-3">
                    <Link
                      href={`/property/${property.id}`}
                      className="flex-1 h-[46px] rounded-[14px] bg-[#21433D] hover:bg-[#18342F] text-[#F4FFFB] text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <span>View Residence</span>
                      <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setModalOpen(true);
                      }}
                      className="h-[46px] px-4 rounded-[14px] border border-[#21433D]/25 hover:border-[#21433D] hover:bg-[#21433D]/5 text-[#21433D] text-sm font-medium transition-all"
                      title="Quick Inquiry"
                    >
                      <Icon icon="solar:chat-round-line-linear" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#1A3833]/60 rounded-[32px] border border-[#BEDFD4]/20 p-8">
            <Icon icon="solar:home-smile-linear" className="w-16 h-16 text-[#9ECABC] mx-auto mb-4 opacity-70" />
            <h3 className="text-2xl font-semibold text-[#F4FFFB] mb-2">No matching residences found</h3>
            <p className="text-[#9ECABC] text-base max-w-md mx-auto mb-6">
              Try adjusting your price range, bedroom criteria, or search keywords to discover available estates.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setPriceFilter('all');
                setBedFilter('all');
              }}
              className="px-6 py-3 rounded-[12px] bg-[#BEDFD4] text-[#21433D] font-semibold text-sm hover:bg-[#A8D3C5] transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Contact Inquiry Modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProperty(null);
        }}
        selectedItem={selectedProperty}
      />
    </div>
  );
}
