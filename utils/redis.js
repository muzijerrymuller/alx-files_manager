import redis from 'redis';
import { promisify } from 'util';

/**
 * This function perations with Redis service
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
      // This is a console.log
    });
  }

  /**
   * observes if Redis is Alive
   * @return {boolean}true if it is alivw
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * this will go and get the value corresponding to a key
   * @key {string} to search for
   * @return {string}  value of key
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * generates a new key in redis
   * @key {string} This is the key to be saved
   * @value {string} value to be asigned to
   * @duration {number} TTL
   * @return {undefined} returns non
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * Removed key
   * @key {string} Key to be removed
   * @return {undefined} returns non
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
