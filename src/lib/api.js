/**
 * Client-safe API utility functions for fetching live data from server API routes.
 * Never exposes the API key and never persists data locally on disk/browser storage.
 */

export async function fetchRealtyDetails(type = 'all') {
  try {
    const res = await fetch(`/api/property?type=${encodeURIComponent(type)}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.status === 'success' ? json : null;
  } catch {
    return null;
  }
}

export async function fetchRealtyProperties() {
  try {
    const res = await fetch('/api/property');
    if (!res.ok) return null;
    const json = await res.json();
    return json.status === 'success' && Array.isArray(json.properties) ? json.properties : null;
  } catch {
    return null;
  }
}

export async function fetchRealtyCategories() {
  try {
    const res = await fetch('/api/categories');
    if (!res.ok) return null;
    const json = await res.json();
    return json.status === 'success' && Array.isArray(json.categories) ? json.categories : null;
  } catch {
    return null;
  }
}

