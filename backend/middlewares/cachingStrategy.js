const { createClient } = require("redis");

const redisClient = createClient();

redisClient.connect();

redisClient.on("error", (err) => {

  console.error("Erro no Redis:", err);

});

const CACHE_TTL = 5;

const cachingStrategy = async (req, res, next) => {

  const cacheKey = req.originalUrl;

  try {

    if (["POST", "PUT", "DELETE"].includes(req.method)) {

      await redisClient.del(cacheKey);

      return next();

    }

    const cached = await redisClient.get(cacheKey);

    if (cached) {

      return res.status(200).json(JSON.parse(cached));

    }

    console.log(`Cache miss ❌ para ${cacheKey}`);

    const originalJson = res.json.bind(res);

    res.json = async (body) => {

      await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(body));

      originalJson(body);

    };

    next();

  } catch (error) {

    console.error("Erro ao acessar o Redis:", error);

    next();

  }

};

module.exports = cachingStrategy;
