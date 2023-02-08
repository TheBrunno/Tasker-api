import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    if (!req.userId) return res.sendStatus(404);

    const tasks = await Task.findAll({ where: { user_id: req.userId } });

    return res.json(tasks);
  }

  async store(req, res) {
    try {
      let task;
      const { nome = '', status = '' } = req.body;
      const user_id = req.userId;

      if (!user_id) return res.sendStatus(401);

      if (status) task = await Task.create({ nome, status, user_id });
      else task = await Task.create({ nome, user_id });

      return res.json(task);
    } catch (_) {
      return res.sendStatus(400);
    }
  }

  async update(req, res) {
    try {
      const { nome = '', status = '' } = req.body;

      if (!nome && !status) return res.sendStatus(400);

      const task = await Task.findByPk(req.params.id);

      if (!task) return res.sendStatus(400);

      if (status && nome) await task.update({ nome, status });
      else if (status) await task.update({ status });
      else if (nome) await task.update({ nome });

      return res.json(task);
    } catch (_) {
      return res.sendStatus(400);
    }
  }

  async delete(req, res) {
    try {
      const task = await Task.findByPk(req.params.id);

      if (!task) return res.sendStatus(400);

      await task.destroy();

      return res.json(null);
    } catch (_) {
      return res.sendStatus(400);
    }
  }
}

export default new TaskController();
