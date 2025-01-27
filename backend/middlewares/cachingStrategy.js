const cache = new Map(); 
const CACHE_TTL = 600000; 

const cachingStrategy = (req, res, next) => {
    const cacheKey = req.originalUrl; 
    const cached = cache.get(cacheKey);

    if (cached && Date.now() < cached.expiry) {
        console.log(`Cache hit for ${cacheKey}`);
        return res.status(200).json(cached.data);
    }

    console.log(`Cache miss for ${cacheKey}`);
    res.sendResponse = res.json;
    res.json = (body) => {
        cache.set(cacheKey, { data: body, expiry: Date.now() + CACHE_TTL });
        res.sendResponse(body);
    };

    next();
};
