let cache = { data: null, ts: 0 };
const TTL = 10 * 60 * 1000; // 10 minutes

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=120');

  const now = Date.now();
  if (cache.data && now - cache.ts < TTL) {
    return res.json(cache.data);
  }

  try {
    const r = await fetch('https://api.alternative.me/fnd/v1/fear-greed-index/');
    const data = await r.json();
    cache = { data, ts: now };
    return res.json(data);
  } catch (e) {
    if (cache.data) return res.json(cache.data);
    return res.status(502).json({ error: 'Failed to fetch fear & greed index' });
  }
}
