class UserController {
  async store(req, res) {
    return res.json({ message: 'ok' });
  }
}

export default new UserController();
