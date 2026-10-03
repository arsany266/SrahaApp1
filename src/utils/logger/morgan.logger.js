import fs from "fs";
import morgan from "morgan";
import path from "path";

const __direname = path.resolve();

export function attachRouterWithLogger(app,routerPath,router, logFileName) {
    const logStream = fs.createWriteStream(path.join(__direname, "./src/logger" , logFileName) , { flags: "a" });
    app.use(routerPath, morgan("combined", { stream: logStream }), router);
    app.use(routerPath, morgan("dev"), router);
}
