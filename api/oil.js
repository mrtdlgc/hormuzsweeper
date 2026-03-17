let cache = { price: null, formatted: null, ts: 0 };
const TTL = 5 * 60 * 1000; // 5 minutes

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');

  const now = Date.now();
  if (cache.price && now - cache.ts < TTL) {
    return res.json({ price: cache.price, formatted: cache.formatted, cached: true });
  }

  try {
    const r = await fetch('https://api.oilpriceapi.com/v1/prices/latest?by_code=BRENT_CRUDE_USD', {
      headers: { 'Authorization': `Token ${process.env.OIL_API_KEY}` }
    });
    const data = await r.json();
    cache = { price: data.data.price, formatted: data.data.formatted, ts: now };
    return res.json({ price: cache.price, formatted: cache.formatted, cached: false });
  } catch (e) {
    if (cache.price) {
      return res.json({ price: cache.price, formatted: cache.formatted, cached: true, stale: true });
    }
    return res.status(502).json({ error: 'Failed to fetch oil price' });
  }
}
