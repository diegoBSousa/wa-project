import { Op } from 'sequelize';
import * as Yup from 'yup';
import Exam from '../models/Exam';
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
        error: `There is not any register with this ID: ${req.params.uuid}`,
      });
    }

    await laboratory.update(req.body);

    return res.json(laboratory);
  }

  async delete(req, res) {
    const laboratory = await Laboratory.findByPk(req.params.uuid);
    if (!laboratory) {
      return res.status(400).json({
        error: `There is not any register with this ID: ${req.params.uuid}`,
      });
    }

    await laboratory.destroy();

    return res.json({
      message: `Laboratory ${laboratory.nome} has been erased`,
      laboratory,
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

    const laboratories = await Laboratory.findAll({
      attributes: [
        'uuid',
        'nome',
        'endereco_linha_1',
        'endereco_linha_2',
        'endereco_linha_3',
        'status',
        'updated_at',
      ],
      where: whereStatement,
      include: {
        model: Exam,
        as: 'Exams',
      },
    });

    return res.json({ laboratories });
  }
}

export default new LaboratoryController();
