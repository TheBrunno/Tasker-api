import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../models/User';
import Task from '../models/Task';

const models = [User, Task];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
