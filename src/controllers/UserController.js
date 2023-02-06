import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const { id, nome, email } = await User.create(req.body);
      return res.json({ id, nome, email });
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async index(req, res) {
    try {
      return res.json(await User.findAll({ attributes: ['id', 'nome', 'email'] }));
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new UserController();
