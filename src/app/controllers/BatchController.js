import fs from 'fs';
import * as csv from 'fast-csv';
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
        data.push(row);
      })
      .on('end', () => {
        Exam.bulkCreate(data, { individualHooks: true })
          .then(() => {
            res.status(200).json({
              message: `Uploaded the file successfully: ${req.file.originalname}`,
            });
          })
          .catch((error) => {
            res.status(500).json({
              message:
                'Fail to import data into database! ' +
                'Some data may already exists on database',
              error: error.message,
            });
          });
      });
  }

  async updateExam(req, res) {
    const { path } = req.file;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (row) => {
        if (row.uuid) {
          Exam.findByPk(row.uuid)
            .then((exam) => {
              exam.update(row);
            })
            .catch((error) => {
              res.status(500).json({
                message:
                  'Fail to import data into database! ' +
                  'Some data may already exists on database',
                error: error.message,
              });
            });
        }
        if (row.nome) {
          Exam.findOne({ where: { nome: row.nome } })
            .then((exam) => {
              exam.update(row);
            })
            .catch((error) => {
              res.status(500).json({
                message:
                  'Fail to import data into database! ' +
                  'Some data may already exists on database',
                error: error.message,
              });
            });
        }
      });

    res.status(200).json({
      message: `Uploaded the file successfully: ${req.file.originalname}`,
    });
  }

  async deleteExam(req, res) {
    const { path } = req.file;

    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => {
        throw error.message;
      })
      .on('data', (row) => {
        if (row.uuid) {
          Exam.findByPk(row.uuid)
            .then((exam) => {
              exam.destroy();
            })
            .catch((error) => {
              res.status(500).json({
                message: 'Fail to import data into database! ',
                error: error.message,
              });
            });
        }
        if (row.nome) {
          Exam.findOne({ where: { nome: row.nome } })
            .then((exam) => {
              exam.destroy();
            })
            .catch((error) => {
              res.status(500).json({
                message: 'Fail to import data into database!',
                error: error.message,
              });
            });
        }
      });

    res.status(200).json({
      message: `Uploaded the file successfully: ${req.file.originalname}`,
    });
  }
}

export default new BatchController();
