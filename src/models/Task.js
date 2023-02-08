import Sequelize, { Model } from 'sequelize';

export default class Task extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Insira uma tarefa',
          },
        },
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
      },
    }, {
      sequelize,
      tableName: 'tasks',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
