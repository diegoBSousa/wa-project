import fs from 'fs';
import * as csv from 'fast-csv';
import { v4 as uuidv4 } from 'uuid';
import Exam from '../models/Exam';

class BatchController {
  async storeExam(req, res) {
    const data = [];
    const { path } = req.file;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (row) => {
        row.uuid = uuidv4();
        data.push(row);
      })
      .on('end', () => {
        Exam.bulkCreate(data)
          .then(() => {
            res.status(200).send({
              message: `Uploaded the file successfully: ${req.file.originalname}`,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: 'Fail to import data into database!',
              error: error.message,
            });
          });
      });
  }
}

export default new BatchController();
