module.exports = function (sequelize, DataTypes) {
  var Stat = sequelize.define("Stat", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,

    },
    minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
          allowNull: false,
          len: [1 - 50]
      }
  }
  });

  Stat.associate = function (models) {
    Stat.belongsTo(models.User, {})
  };

  return Stat;
};
