import Laboratory from '../models/Laboratory';

class LaboratoryController {
  async store(req, res) {
    const laboratory = Laboratory.create();
    return res.json(laboratory);
  }
}

export default new LaboratoryController();
