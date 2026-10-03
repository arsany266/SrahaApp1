import { WHITE_LIST } from "../../../config/confi.service.js";

export function corsOptions(req, callback) {
  const whiteList = WHITE_LIST.split(",");
  const corsOptions = {
    origin: function (origin, callback) {
      if (whiteList.includes(origin)) {
        callback(null, true);
      } 
      else if (!origin){
        callback(null, true);
      } else{
        callback(new Error("Not allowed by CORS"));
      }
  },
  methods : ["GET" , "POST","PATCH" , "PUT" , "DELETE"]
}
return corsOptions
}