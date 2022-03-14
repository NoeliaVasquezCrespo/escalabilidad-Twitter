//----------------------------------CONEXIÓN A REDIS------------------------------------

const redis = require ('redis');
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
  })
  redisClient.on('connect', () => console.log('Conectado a Redis correctamente'));
  redisClient.on('error', (err) => console.log('Error: no pudo conectarse a Redis', err));
  redisClient.connect();
  
  module.exports = redisClient;