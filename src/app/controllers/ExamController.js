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

    const exam = Exam.create(req.body);

    return res.json(exam);
  }
}

export default new ExamController();
