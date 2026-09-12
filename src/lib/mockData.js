export const navLinks = [
  { name: 'Categories', href: '#categories' },
  { name: 'Exclusive Offers', href: '#exclusive-offers' },
  { name: 'Popular Ads', href: '#popular-ads' },
  { name: 'Testimonials', href: '#testimonials' },
];

export const heroData = {
  title: 'Discover your nest in the nova of luxury living.',
  description:
    'Our exquisite properties blend timeless elegance with modern comfort, offering an oasis of serenity amidst the bustling world outside. Come, embark on a journey of discovery, and let NovaNest Estates be the canvas upon which you paint the masterpiece of your life.',
  primaryCta: 'Explore Properties',
  secondaryCta: 'Contact Us',
};

export const categoriesData = [
  {
    id: 'apartments',
    slug: 'apartments',
    title: 'Apartment Residences',
    count: '7,200 Properties',
    image: '/images/cat-apartments.png',
  },
  {
    id: 'villas',
    slug: 'villas',
    title: 'Modern Villas',
    count: '966 Properties',
    image: '/images/cat-villas.png',
  },
  {
    id: 'farmhouses',
    slug: 'farmhouses',
    title: 'Farm Houses',
    count: '245 Properties',
    image: '/images/cat-farmhouses.png',
  },
];


export const exclusiveOffersData = [
  {
    id: 'elegant-apartment',
    title: 'Elegant Apartment',
    originalPrice: '$625,000',
    price: '$600,000',
    location: 'Downtown Metropolitan Area',
    specs: {
      area: '120m²',
      beds: '2 Bedrooms',
      baths: '2 Bathrooms',
    },
    image: '/images/offer-apartment-stack.png',
    reverse: false,
  },
  {
    id: 'oceanfront-paradise',
    title: 'Oceanfront Paradise',
    originalPrice: '$2,000,000',
    price: '$1,900,000',
    location: 'Beachfront Property, Coastal Area',
    specs: {
      area: '90m²',
      beds: '1 Bedroom',
      baths: '1 Bathroom',
    },
    image: '/images/offer-oceanfront-stack.png',
    reverse: true,
  },
];

export const popularAdsData = [
  {
    id: 'urban-oasis',
    title: 'Urban Oasis',
    price: '$500,000',
    location: 'Downtown Metropolitan Area',
    specs: {
      area: '120m²',
      beds: '2 Bedrooms',
      baths: '2 Bathrooms',
    },
    image: '/images/ad-urban-oasis.png',
  },
  {
    id: 'coastal-serenity',
    title: 'Coastal Serenity',
    price: '$1,200,000',
    location: 'Beachfront Property, Coastal Area',
    specs: {
      area: '250m²',
      beds: '4 Bedrooms',
      baths: '3 Bathrooms',
    },
    image: '/images/ad-coastal-serenity.png',
  },
  {
    id: 'contemporary-haven',
    title: 'Contemporary Haven',
    price: '$2,000,000',
    location: 'Suburban Luxury Community',
    specs: {
      area: '400m²',
      beds: '5 Bedrooms',
      baths: '4 Bathrooms',
    },
    image: '/images/ad-contemporary-haven.png',
  },
  {
    id: 'tranquil-farmstead',
    title: 'Tranquil Farmstead',
    price: '$800,000',
    location: 'Rural Countryside, Farming District',
    specs: {
      area: '800m²',
      beds: '3 Bedrooms',
      baths: '2 Bathrooms',
    },
    image: '/images/ad-tranquil-farmstead.png',
  },
];

export const testimonialsData = [
  {
    id: 'serene-haven',
    title: 'Serene Haven',
    community: 'Suburban Bliss Community',
    specs: {
      area: '200m²',
      beds: '3 Bedrooms',
      baths: '2 Bathrooms',
    },
    author: {
      name: 'Emily Johnson',
      avatar: '/images/avatar-emily.png',
    },
    quote:
      'NovaNest Estates helped me find the perfect suburban retreat for my family. The process was smooth, and their team was incredibly helpful every step of the way. Thank you for making our dream home a reality!',
    image: '/images/testimonial-suburban.png',
  },
  {
    id: 'tropical-resort',
    title: 'Tropical Retreat',
    community: 'Coastal Palm Sanctuary',
    specs: {
      area: '320m²',
      beds: '4 Bedrooms',
      baths: '3 Bathrooms',
    },
    author: {
      name: 'Marcus Vance',
      avatar: '/images/avatar-emily.png',
    },
    quote:
      'The attention to detail and personalized service provided by NovaNest was unmatched. Finding our coastal sanctuary was an unforgettable and seamless experience.',
    image: '/images/testimonial-peek.png',
  },
];

export const footerData = {
  quickLinks: [
    { name: 'Stuff for Designers', href: '#' },
    { name: 'Cool Stuff', href: '#' },
    { name: 'Random Feature', href: '#' },
    { name: 'Another One', href: '#' },
    { name: 'Last Time', href: '#' },
  ],
  companyInfo: [
    { name: 'About Us', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'User’s Guide', href: '#' },
  ],
  popularSearches: [
    { name: 'Apartment for Rent', href: '#' },
    { name: 'Modern House', href: '#' },
    { name: 'Seaside House', href: '#' },
  ],
  socials: [
    { name: 'X', icon: 'ri:twitter-x-fill', href: '#' },
    { name: 'YouTube', icon: 'ri:youtube-fill', href: '#' },
    { name: 'Instagram', icon: 'ri:instagram-line', href: '#' },
    { name: 'LinkedIn', icon: 'ri:linkedin-fill', href: '#' },
  ],
  designer: 'Design by Seda Sen',
};

export function getCategoryBySlug(slug) {
  return (
    categoriesData.find((c) => c.slug === slug || c.id === slug) || {
      id: slug,
      slug,
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      count: 'Exclusive Properties',
      image: '/images/cat-apartments.png',
    }
  );
}

export function getAllCategories() {
  return categoriesData;
}

export function getPropertiesByCategory(categorySlug) {
  const all = [...popularAdsData, ...exclusiveOffersData];
  if (!categorySlug || categorySlug === 'all') return all;
  return all.filter((p) => p.category === categorySlug || p.id?.includes(categorySlug));
}

export function getPropertyById(id) {
  const all = [...popularAdsData, ...exclusiveOffersData];
  return all.find((p) => p.id === id) || all[0];
}

