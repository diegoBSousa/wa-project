import * as Yup from 'yup';
import Laboratory_Exam from '../models/Laboratory_Exam';

class LaboratoryExamController {
  async store(req, res) {
    const schema = Yup.object().shape({
      laboratory_uuid: Yup.string().uuid().required(),
      exam_uuid: Yup.string().uuid().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed' });
    }

    const association = await Laboratory_Exam.create(req.body);

    return res.json({
      association,
      message: 'The Entities have been associated.',
    });
  }
}

export default new LaboratoryExamController();
