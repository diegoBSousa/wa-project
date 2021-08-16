import Sequelize, { Model } from 'sequelize';

class Laboratory_Exam extends Model {
  static init(sequelize) {
    super.init(
      {
        laboratory_uuid: {
          type: Sequelize.UUID,
        },
        exam_uuid: {
          type: Sequelize.UUID,
        },
      },
      { sequelize, tableName: 'laboratory_exam' }
    );

    return this;
  }
}

export default Laboratory_Exam;
