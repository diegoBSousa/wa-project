import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Exam from '../app/models/Exam';
import File from '../app/models/File';
import Laboratory from '../app/models/Laboratory';
import User from '../app/models/User';
import Laboratory_Exam from '../app/models/Laboratory_Exam';

const models = [Exam, File, Laboratory, User, Laboratory_Exam];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
