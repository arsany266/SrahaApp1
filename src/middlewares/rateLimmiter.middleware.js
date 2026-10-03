//ip request
const isRequest = {};

//set
const blockedIps = new Set();

//map {"127.0.0.1"-> {count:1,firstRequestTime:Date.now()}}

const unBlokedTimers = new Map();

const RATE_LIMIT = 5; // max requests per minute
const WINDOW_MS = 60 * 1000; // time window duration in milliseconds (1 minute)

export const customRateLimitgit = (req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();

  if (blockedIps.has(ip)) {
    return res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
  }
 
    if (!isRequest[ip]) {
        isRequest[ip] = { count: 1, startTime: currentTime };  
        return next();
    }  

    const diff = currentTime - isRequest[ip].startTime;
     if (diff < WINDOW_MS) {
        isRequest[ip].count++;
        if (isRequest[ip].count > RATE_LIMIT) {
            blockedIps.add(ip);
            if (!unBlokedTimers.has(ip)) {
                const timer = setTimeout(() => {
                    blockedIps.delete(ip);
                    unBlokedTimers.delete(ip);
                }, WINDOW_MS);
                unBlokedTimers.set(ip, timer);
            }
return res
      .status(429)
      .json({ message: "Too many requests. Please try again later." });
        }
    } else {
        isRequest[ip] = { count: 1, startTime: currentTime };  
    }
    next();

};
