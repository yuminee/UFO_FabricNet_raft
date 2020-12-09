module.exports =(sequelize, DataTypes) => {
  return sequelize.define('User', {
    kakao_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    transaction_pw: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    customer_id: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    sales_id: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  }, {
      timestamps: false,
    });
  }