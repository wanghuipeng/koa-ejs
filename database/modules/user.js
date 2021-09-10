// 连接数据库
const Sequelize = require('sequelize')
const sequelise = require('../index.js')

const UserModel = sequelise.define('User', {
    id: {
        type: Sequelize.INTEGER, // 数据类型
        allowNull: false, // 是否为 null
        primaryKey: true, // 是否为 主键
        autoIncrement: true // 是否 自动填值
    },
    telephone: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING, },
    companyName: { type: Sequelize.STRING, },
}, {
    timestamps: false, // 是否 自动添加数据的 创建、更新 时间戳
    paranoid: false, // 是否 硬删除数据
    freezeTableName: true, // 是否 冻结表名，false 访问 users表
    tableName: 'user_data', // 访问数据库 user_data 表
    indexes: [ // 设置 索引
        {
            name: 'tel',
            fields: ['telephone']
        },
        {
            name: 'name',
            fields: ['companyName']
        }
    ]
});

// module.exports.add = async (data) => await UserModel.create(data)

module.exports.add = async(data) => await UserModel.build(data).save()

module.exports.findUserByTelephone = async(data) => await UserModel.findOne({
    where: {
        telephone: data.telephone
    }
})

module.exports.find = async(condition) => {
    if (Object.keys(condition).length) {
        return await UserModel.findAll({ where: {...condition } })
    } else {
        return await UserModel.findAll();
    }
}