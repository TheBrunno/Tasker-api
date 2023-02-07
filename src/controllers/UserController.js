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

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      const { nome = '', email = '' } = req.body;
      const change = {};

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não encontrado'],
        });
      }

      if (nome) change.nome = nome;
      if (email) change.email = email;

      return res.json(await user.update(change));
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuario não encontrado'],
        });
      }

      await user.destroy();
      return res.json(null);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map((error) => error.message),
      });
    }
  }
}

export default new UserController();
