const { createClient } = require("redis");
const redisClient = createClient();

redisClient.connect();

redisClient.on("error", (err) => {
  console.error("Erro no Redis:", err);
});

const CACHE_TTL = 5;

const cachingStrategy = async (req, res, next) => {
  const cacheKey = req.originalUrl;
  const cacheGroupKeyTeams = '/api/teams/*'; // Padrão de chave para o grupo de times
  const cacheGroupKeyUsers = '/api/users/*'; // Padrão de chave para o grupo de usuários


  try {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {

      // Invalida o cache para a chave específica
      await redisClient.del(cacheKey);

      // Invalida o cache para todas as chaves que correspondem ao padrão do grupo
      const keys = await redisClient.keys(cacheGroupKeyTeams);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
      const keysUsers = await redisClient.keys(cacheGroupKeyUsers);
      if (keysUsers.length > 0) {
        await redisClient.del(keysUsers);
      }

      return next();
    }
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.status(200).json(JSON.parse(cached));
    }
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