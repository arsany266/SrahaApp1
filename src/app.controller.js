// import connectDB from "./DB/connection.js"
import helmet from "helmet";
import connectDB from "./DB/connection.js";
import { conenctRedis } from "./DB/redis.connection.js";
import { authRouter, userRouter, messageRouter } from "./modules/index.js";
import { corsOptions } from "./utils/cors/cors.util.js";
import {
  BadRequestExeception,
  ErrorRespone,
  globalErrorHandler,
} from "./utils/error.response.js";
import { successRespone } from "./utils/success.respone.js";
import cors from "cors";
import path from "node:path";
import morgan from "morgan";
import { attachRouterWithLogger } from "./utils/logger/morgan.logger.js";
import rateLimit from "express-rate-limit";
import { customRateLimiter } from "./middlewares/rateLimmiter.middleware.js";
export const bootstrap = async (app, express) => {
  app.use("/uploads", express.static(path.resolve("./src/uploads")));
  await connectDB();
  await conenctRedis();
  app.use(express.json(), cors(corsOptions()), helmet()
  // , customRateLimiter()
);

  attachRouterWithLogger(app, "/auth", authRouter, "auth.log");
  attachRouterWithLogger(app, "/user", userRouter, "user.log");
  attachRouterWithLogger(app, "/message", messageRouter, "message.log");

  app.get("/", (req, res) => {
    successRespone({ res, message: "welcome" });
  });
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  app.use(globalErrorHandler);
  app.all("/*dummy", (req, res) => {
    return res.status(404).json({ Message: "not found handler" });
  });
};
