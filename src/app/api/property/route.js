import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function normalizeZillow(pd) {
  if (!pd) return null;
  const priceNum = pd.price || 4250000;
  const originalPriceNum = Math.round(priceNum * 1.06);

  const gallery = (pd.originalPhotos || [])
    .map(
      (p) =>
        p.mixedSources?.jpeg?.[2]?.url ||
        p.mixedSources?.jpeg?.[1]?.url ||
        p.mixedSources?.jpeg?.[0]?.url
    )
    .filter(Boolean);

  return {
    id: '1875-avondale-circle',
    title: pd.streetAddress ? `${pd.streetAddress} Waterfront Estate` : 'Avondale Waterfront Estate',
    category: 'single-family',
    categoryTitle: 'Single Family Estates',
    price: '$' + priceNum.toLocaleString(),
    priceNumeric: priceNum,
    originalPrice: '$' + originalPriceNum.toLocaleString(),
    location: `${pd.streetAddress || '1875 Avondale Circle'}, ${pd.city || 'Jacksonville'}, ${pd.state || 'FL'} ${pd.zipcode || '32205'}`,
    streetAddress: pd.streetAddress || '1875 Avondale Circle',
    city: pd.city || 'Jacksonville',
    state: pd.state || 'FL',
    zipcode: pd.zipcode || '32205',
    specs: {
      area: pd.livingArea ? `${pd.livingArea.toLocaleString()} sqft` : '7,526 sqft',
      beds: pd.bedrooms ? `${pd.bedrooms} Bedrooms` : '7 Bedrooms',
      baths: pd.bathrooms ? `${pd.bathrooms} Bathrooms` : '9 Bathrooms',
      yearBuilt: pd.yearBuilt || 1927,
      lotSize: pd.lotSize ? `${pd.lotSize} Acres` : '0.85 Acres',
      garage: '3 Car Attached',
    },
    image:
      gallery[0] ||
      'https://photos.zillowstatic.com/fp/4f31d4039f085b05aae763bdfe8111ad-uncropped_scaled_within_1344_1008.jpg',
    gallery: gallery.length > 0 ? gallery : [
      'https://photos.zillowstatic.com/fp/4f31d4039f085b05aae763bdfe8111ad-uncropped_scaled_within_1344_1008.jpg'
    ],
    description:
      pd.description ||
      'Situated on prestigious Avondale Circle along the riverfront, this landmark 1927 Mediterranean revival estate combines historical architectural pedigree with state-of-the-art contemporary renovations.',
    features: [
      'Waterfront Access & Private Dock',
      'Heated Infinity Swimming Pool',
      'Handcrafted Marble Fireplaces',
      'Sommelier Wine Cellar',
      'Gourmet Chef Kitchen',
      'Smart Home Automation',
    ],
    isFromApi: true,
    rawZillow: pd,
  };
}

function normalizeRealtor(detail) {
  if (!detail) return null;
  const addr = detail.address || {};
  const specs = detail.details || {};
  const priceNum = detail.list_price || 240000;
  const originalPriceNum = Math.round(priceNum * 1.08);

  const gallery = (detail.photos || []).map((p) => p.href).filter(Boolean);

  return {
    id: '9504-quail-village-ln',
    title: addr.line ? `${addr.line} Luxury Townhome` : 'Quail Village Luxury Townhome',
    category: 'townhomes',
    categoryTitle: 'Townhomes & Residences',
    price: '$' + priceNum.toLocaleString(),
    priceNumeric: priceNum,
    originalPrice: '$' + originalPriceNum.toLocaleString(),
    location: `${addr.line || '9504 Quail Village Ln'}, ${addr.city || 'Austin'}, ${addr.state_code || 'TX'} ${addr.postal_code || '78758'}`,
    streetAddress: addr.line || '9504 Quail Village Ln',
    city: addr.city || 'Austin',
    state: addr.state_code || 'TX',
    zipcode: addr.postal_code || '78758',
    specs: {
      area: specs.sqft ? `${specs.sqft.toLocaleString()} sqft` : '1,193 sqft',
      beds: specs.beds ? `${specs.beds} Bedrooms` : '3 Bedrooms',
      baths: specs.baths ? `${specs.baths} Bathrooms` : '2.5 Bathrooms',
      yearBuilt: specs.year_built || 1983,
      lotSize: specs.lot_sqft ? `${specs.lot_sqft} sqft` : 'N/A',
      garage: specs.garage ? `${specs.garage} Garage` : '1 Car Attached',
    },
    image:
      gallery[0] ||
      'https://ap.rdcpix.com/b6013b365aae5db3593a596587d4d958l-m806556992od.jpg',
    gallery: gallery.length > 0 ? gallery : [
      'https://ap.rdcpix.com/b6013b365aae5db3593a596587d4d958l-m806556992od.jpg'
    ],
    description:
      specs.text ||
      'Tranquil parklike setting in a peaceful community with private enclosed patio and upgraded interior finishes.',
    features: [
      'Quiet Parklike Setting',
      'Private Enclosed Patio',
      'Hardwood Flooring',
      'Updated Kitchen & Appliances',
      'Community Pool Access',
      'Assigned Covered Parking',
    ],
    isFromApi: true,
    rawRealtor: detail,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';
  const id = searchParams.get('id');

  const apiKey = process.env.REALTY_API_KEY;

  if (!apiKey) {
    console.warn('[Realty API] REALTY_API_KEY is not defined in environment.');
    return NextResponse.json(
      {
        status: 'error',
        message: 'REALTY_API_KEY is not configured in environment variables.',
        properties: [],
        data: null,
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

  console.log('--------------------------------------------------');
  console.log('[Realty API Request] Mode:', type, id ? `(id: ${id})` : '');
  console.log('[Realty API Request] Key present: YES (never exposed to client)');

  try {
    const fetchPromises = [];

    // Fetch Zillow if appropriate
    if (type === 'all' || type === 'zillow' || id === '1875-avondale-circle') {
      fetchPromises.push(
        fetch(zillowUrl, {
          headers: { 'x-realtyapi-key': apiKey },
          cache: 'no-store',
        })
          .then(async (res) => {
            if (!res.ok) return { source: 'zillow', error: res.statusText, status: res.status };
            const json = await res.json();
            return { source: 'zillow', data: json };
          })
          .catch((err) => ({ source: 'zillow', error: err.message }))
      );
    }

    // Fetch Realtor if appropriate
    if (type === 'all' || type === 'realtor' || id === '9504-quail-village-ln') {
      fetchPromises.push(
        fetch(realtorUrl, {
          headers: { 'x-realtyapi-key': apiKey },
          cache: 'no-store',
        })
          .then(async (res) => {
            if (!res.ok) return { source: 'realtor', error: res.statusText, status: res.status };
            const json = await res.json();
            return { source: 'realtor', data: json };
          })
          .catch((err) => ({ source: 'realtor', error: err.message }))
      );
    }

    const results = await Promise.all(fetchPromises);
    const properties = [];
    let rawZillow = null;
    let rawRealtor = null;

    for (const res of results) {
      if (res.source === 'zillow' && res.data?.propertyDetails) {
        rawZillow = res.data.propertyDetails;
        const norm = normalizeZillow(rawZillow);
        if (norm) properties.push(norm);
        console.log('[Realty API] Successfully fetched Zillow property:', rawZillow.streetAddress);
      } else if (res.source === 'realtor' && res.data?.detail) {
        rawRealtor = res.data.detail;
        const norm = normalizeRealtor(rawRealtor);
        if (norm) properties.push(norm);
        console.log('[Realty API] Successfully fetched Realtor property:', rawRealtor.address?.line);
      }
    }

    if (properties.length === 0) {
      console.warn('[Realty API] No valid properties returned by API endpoints.');
      return NextResponse.json(
        {
          status: 'error',
          message: 'API returned no valid property details',
          properties: [],
          data: null,
        },
        { status: 502 }
      );
    }

    console.log('[Realty API Response] Returning', properties.length, 'live API properties');
    console.log('--------------------------------------------------');

    return NextResponse.json({
      status: 'success',
      properties,
      propertyDetails: rawZillow,
      data: {
        properties,
        propertyDetails: rawZillow,
        realtorDetails: rawRealtor,
      },
    });
  } catch (err) {
    console.error('[Realty API Error]:', err.message);
    return NextResponse.json(
      {
        status: 'error',
        message: err.message || 'Failed to fetch property details from API',
        properties: [],
        data: null,
      },
      { status: 500 }
    );
  }
}

