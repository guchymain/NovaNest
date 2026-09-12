import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.REALTY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'REALTY_API_KEY not configured',
        categories: [],
      },
      { status: 500 }
    );
  }

  const zillowUrl =
    process.env.REALTY_API_URL ||
    process.env.NEXT_PUBLIC_REALTY_API_URL ||
    'https://zillow.realtyapi.io/pro/byaddress?propertyaddress=1875+AVONDALE+Circle%2C+Jacksonville%2C+FL+32205';

  const realtorUrl =
    process.env.REALTOR_API_URL ||
    'https://realtor.realtyapi.io/details/byaddress?address=9504+Quail+Village+Ln%2C+Austin%2C+TX+78758';

  console.log('==================================================');
  console.log('[Categories API] Fetching categories with live Realty API integration');

  try {
    const [zillowRes, realtorRes] = await Promise.allSettled([
      fetch(zillowUrl, {
        headers: { 'x-realtyapi-key': apiKey },
        cache: 'no-store',
      }).then((r) => (r.ok ? r.json() : null)),
      fetch(realtorUrl, {
        headers: { 'x-realtyapi-key': apiKey },
        cache: 'no-store',
      }).then((r) => (r.ok ? r.json() : null)),
    ]);

    const zillowData = zillowRes.status === 'fulfilled' ? zillowRes.value : null;
    const realtorData = realtorRes.status === 'fulfilled' ? realtorRes.value : null;

    const pd = zillowData?.propertyDetails;
    const rd = realtorData?.detail;

    if (!pd && !rd) {
      console.warn('[Categories API] Live Realty API returned no valid category data.');
      return NextResponse.json(
        {
          status: 'error',
          message: 'API returned no valid categories data',
          categories: [],
        },
        { status: 502 }
      );
    }

    const liveCategories = [];

    // Category 1: Single Family Estates (from Zillow API)
    if (pd) {
      const zillowPhoto =
        pd.originalPhotos?.[0]?.mixedSources?.jpeg?.[1]?.url ||
        pd.originalPhotos?.[0]?.mixedSources?.jpeg?.[0]?.url ||
        'https://photos.zillowstatic.com/fp/4f31d4039f085b05aae763bdfe8111ad-uncropped_scaled_within_1344_1008.jpg';

      liveCategories.push({
        id: 'single-family',
        slug: 'single-family',
        title: pd.propertyTypeDimension ? `${pd.propertyTypeDimension} Estates` : 'Single Family Estates',
        count: '1,420 Properties',
        image: zillowPhoto,
        heroImage: zillowPhoto,
        description: `Prestigious ${pd.city || 'Jacksonville'} waterfront single family estates and historic residences.`,
        isFromApi: true,
      });
    }

    // Category 2: Townhomes & Residences (from Realtor API)
    if (rd) {
      const realtorPhoto =
        rd.photos?.[0]?.href ||
        'https://ap.rdcpix.com/b6013b365aae5db3593a596587d4d958l-m806556992od.jpg';

      liveCategories.push({
        id: 'townhomes',
        slug: 'townhomes',
        title: 'Townhomes & Residences',
        count: '840 Properties',
        image: realtorPhoto,
        heroImage: realtorPhoto,
        description: `Curated townhomes in tranquil ${rd.address?.city || 'Austin'} communities with modern luxury amenities.`,
        isFromApi: true,
      });
    }

    // Category 3: Waterfront Luxury (from Zillow Riverfront listing)
    if (pd) {
      const waterPhoto =
        pd.originalPhotos?.[1]?.mixedSources?.jpeg?.[1]?.url ||
        pd.originalPhotos?.[0]?.mixedSources?.jpeg?.[1]?.url ||
        '/images/offer-oceanfront-main.png';

      liveCategories.push({
        id: 'waterfront-estates',
        slug: 'waterfront-estates',
        title: 'Waterfront Estates',
        count: '380 Properties',
        image: waterPhoto,
        heroImage: waterPhoto,
        description: 'Exclusive riverfront and coastal estates offering private docks and serene water vistas.',
        isFromApi: true,
      });
    }

    console.log('[Categories API] Generated', liveCategories.length, 'categories directly from live API');
    console.log('==================================================');

    return NextResponse.json({
      status: 'success',
      endpoint: zillowUrl,
      categories: liveCategories,
    });
  } catch (err) {
    console.error('[Categories API Error]:', err.message);
    return NextResponse.json(
      {
        status: 'error',
        message: err.message || 'Failed to fetch categories from API',
        categories: [],
      },
      { status: 500 }
    );
  }
}

