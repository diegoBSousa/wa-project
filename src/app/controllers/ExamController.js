import * as Yup from 'yup';
import Exam from '../models/Exam';

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
}

export default new ExamController();
