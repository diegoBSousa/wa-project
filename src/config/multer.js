import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      const fileName = uuidv4() + extname(file.originalname);
      return callback(null, fileName);
    },
  }),
};
