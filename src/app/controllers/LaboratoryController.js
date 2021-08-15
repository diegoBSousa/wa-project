class LaboratoryController {
  async store(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new LaboratoryController();
