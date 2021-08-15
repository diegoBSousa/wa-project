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
}

export default new ExamController();
