import multer from "multer";
import path from "node:path";
import fs from "fs";



export const fileValidation = {
  images: ["image/png", "image/jpg", "image/jpeg"],
  videos: ["video/mp4", "video/mpeg", "video/jpeg"],
  audios: ["audio/3gpp2", "audio/webm", "audio/mp4"],
  document: ["application/pdf", "application/msword"],
};




export const localFileUpload = ({customPath="general" , validation=[]}) => {
  const basePath = `uploads/${customPath}`;
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let userBasePath = basePath;
      if (req.user?._id) userBasePath += `/${req.user._id}`; //el 5atwa de 3san kol user yt3mlo folder b 2sm el id bta3o
      const fullPath = path.resolve(`./src/${userBasePath}`); // da 3san yii kol el oat mn awl el partition
      if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath, { recursive: true });
      cb(null,  path.resolve(fullPath));
    },
    filename: (req, file, cb) => {
        const uniqueFileName = Date.now()+"__" + file.originalname ; 
        file.finalPath = `${basePath}/${req.user._id}/${uniqueFileName}`
      cb(null, uniqueFileName);
    },
  });


  const fileFilter = (req, file, cb) => {
  if (validation.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb(new Error("Invalid file type", false));
  }
};

  return multer({ fileFilter ,storage });
};

// export const localFileUpload = (req, res) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.resolve("./src/uploads"));
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });

//   return multer({ storage });
// };
