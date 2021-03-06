import { Op } from 'sequelize';
import * as Yup from 'yup';
import Exam from '../models/Exam';
import Laboratory from '../models/Laboratory';

class ExamController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      tipo: Yup.mixed().oneOf(['análise clínica', 'imagem']).required(),
      status: Yup.mixed().oneOf(['ativo', 'inativo']),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed' });
    }

    const { nome, tipo, status } = req.body;

    const examExists = await Exam.findOne({ where: { nome } });
    if (examExists) {
      return res.status(400).json({
        error: `This Exam: '${nome}' already exists on our database.`,
      });
    }

    const exam = await Exam.create({ nome, tipo, status });

    return res.json(exam);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      tipo: Yup.mixed().oneOf(['análise clínica', 'imagem']),
      status: Yup.mixed().oneOf(['ativo', 'inativo']),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed' });
    }

    const { nome } = req.body;

    const nameExists = await Exam.findOne({ where: { nome } });
    if (nameExists) {
      return res.status(400).json({
        error: `This Exam Name: '${nome}' is already in use by another exam.`,
      });
    }

    const exam = await Exam.findByPk(req.params.uuid);
    if (!exam) {
      return res.status(400).json({
        error: `There is not a exam with this ID: ${req.params.uuid}`,
      });
    }

    await exam.update(req.body);

    return res.json(exam);
  }

  async delete(req, res) {
    const exam = await Exam.findByPk(req.params.uuid);
    if (!exam) {
      return res.status(400).json({
        error: `There is not any register with this ID: ${req.params.uuid}`,
      });
    }

    await exam.destroy();

    return res.json({
      message: `The exam ${exam.nome} has been erased`,
      exam,
    });
  }

  async index(req, res) {
    let whereStatement = {
      status: 'ativo',
    };

    if (req.query.nome) {
      whereStatement = {
        [Op.and]: [
          { nome: { [Op.iLike]: `%${req.query.nome}%` } },
          { status: 'ativo' },
        ],
      };
    }

    const exams = await Exam.findAll({
      attributes: ['uuid', 'nome', 'tipo'],
      where: whereStatement,
      include: {
        model: Laboratory,
        as: 'Laboratories',
      },
    });

    return res.json({ exams });
  }
}

export default new ExamController();
