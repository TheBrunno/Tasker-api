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

      if (status) {
        task = await Task.create({ nome, status, user_id });
      } else {
        task = await Task.create({ nome, user_id });
      }
      return res.json(task);
    } catch (_) {
      return res.sendStatus(400);
    }
  }
}

export default new TaskController();
