module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mob: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      
      collegemail: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      
      sem: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      
      branch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      usn: {
        type: DataTypes.STRING,
      }
    });
  
    Users.associate = (models) => {
      Users.hasMany(models.Likes, {
        onDelete: "cascade",
      });
    };

    return Users;
  };