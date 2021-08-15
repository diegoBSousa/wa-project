import * as Yup from 'yup';
import Laboratory from '../models/Laboratory';

class LaboratoryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      endereco_linha_1: Yup.string().required(),
      endereco_linha_2: Yup.string(),
      endereco_linha_3: Yup.string(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed' });
    }

    const {
      uuid,
      nome,
      endereco_linha_1,
      endereco_linha_2,
      endereco_linha_3,
      status,
      updated_at,
    } = await Laboratory.create(req.body);

    return res.json({
      uuid,
      nome,
      endereco_linha_1,
      endereco_linha_2,
      endereco_linha_3,
      status,
      updated_at,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      endereco_linha_1: Yup.string().required(),
      endereco_linha_2: Yup.string(),
      endereco_linha_3: Yup.string(),
      status: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation has failed' });
    }

    const laboratory = await Laboratory.findByPk(req.params.uuid);
    if (!laboratory) {
      return res.status(400).json({
        error: `There is not any user with this ID: ${req.params.uuid}`,
      });
    }

    await laboratory.update(req.body);

    return res.json(laboratory);
  }
}

export default new LaboratoryController();
