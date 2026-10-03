import { redisClient } from "./redis.connection.js";

export const revokeTokenKeyPrefix = ({userId})=>{
return `user:revokeToken:${userId}`
}
export const revokeTokenKey = ({userId , jti})=>{
return `${revokeTokenKeyPrefix({userId})}:${jti}`
}



export const set = async ({ key, value, ttl = null }) => {
  try {
    const data = typeof value != "string" ? json.stringify(value) : value;

    if (ttl) {
      return await redisClient.set(key, data, {
        expiration: { type: "Ex", value: ttl },
      });
    } else {
      return await redisClient.set(key, data);
    }
  } catch {
    console.log("Redis Set error", error);
  }
};

export const get = async ({ key }) => {
  try {
    const data = await redisClient.get(key);
    return data;
  } catch {
    console.log("Redis Get error", error);
  }
};

export const update = async ({ key, value, ttl = null }) => {
  try {
    const isExist = await redisClient.exists(key);
    if (!isExist) return false;

    const data = typeof value != "string" ? json.stringify(value) : value;
    if (ttl) {
      return await redisClient.set(key, data, {
        expiration: { type: "Ex", value: ttl },
      });
    } else {
      return await redisClient.set(key, data);
    }
  } catch {
    console.log("Redis Update error", error);
  }
};

export const delet = async ({ key }) => {
  try {
    const isExist = await redisClient.exists(key);
    if (!isExist) return false;
    return await redisClient.del(key);
  } catch {
    console.log("Redis Delete error", error);
  }
};

export const expire = async ({ key, ttl }) => {
  try {
    const isExist = await redisClient.exists(key);
    if (!isExist) return false;
    return await redisClient.expire(key, ttl);
  } catch {
    console.log("Redis Expire error", error);
  }
};

export const ttl = async ({ key, ttl }) => {
  try {
    const isExist = await redisClient.exists(key);
    if (!isExist) return false;
    return await redisClient.ttl(key, ttl);
  } catch {
    console.log("Redis ttl error", error);
  }
};

export const keys = async ({ pattern }) => {
  try {
    return await redisClient.keys(pattern);
  } catch {
    console.log("Redis keys error", error);
  }
};
