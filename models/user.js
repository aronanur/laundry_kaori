'use strict';

const Model = require('sequelize').Sequelize.Model

module.exports = (sequelize, DataTypes) => {

  class User extends Model {}

  User.init({
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Nama wajib diisi!'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      validate : {
          isUnique : (value) =>{
            console.log(value)
            return User
              .findAll({
                where : {
                  email : value,
                },
                hooks : false
              })
              .then(response => {
                if(response.length > 0){
                  throw new Error('Email telah terpakai!')
                }
              })
        },
        isEmail : {
          args : true,
          msg : 'Format email salah!'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        minLength : (value) => {
          if(value < 6){
            throw new Error('Password minimal 6 character')
          }
        }
      }
    },
    phone: {
      type : DataTypes.STRING,
      validate : {
        minLength : (value) => {
          if(value < 6){
            throw new Error('Phone number minimal 10 character')
          }
        }
      }
    },
    address: {
      type : DataTypes.TEXT,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Alamat wajib diisi!'
        }
      }
    },
    role: DataTypes.STRING,
    gender: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Jenis kelamin wajib diisi!'
        }
      }
    }
  }, { hooks : {
    beforeCreate : (instance, options) => {
      console.log(bcrypt)
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(instance.password, salt);
      instance.password = hash
    }
  }
  ,sequelize })

  User.associate = function(models) {
    User.belongsToMany(models.Category, { through: models.Transaction })
    User.hasMany(models.Transaction)
  };
  return User;
};