module.exports = (sequelize, DataTypes)=>(
    sequelize.define('user',{
        uid :{
            type : DataTypes.STRING(30),
            allowNull : false,
            unique : true,
        },
        
        password : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },

<<<<<<< HEAD
        nickname: {
            type : DataTypes.STRING(40),
            allowNull : false,
        },

        token: {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : 0,
        },

        status: {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0,
        },
        
        p_photo: {
            type : DataTypes.STRING(100),
            allowNull : true,
            defaultValue : 0,
        },
        gender: {
            type : DataTypes.INTEGER,
            allowNull : true,
            defaultValue : 0,
        },
        birthday: {
            type : DataTypes.DATE,
            allowNull : true,
=======
        snsId : {
            type : DataTypes.STRING(30),
            allowNull : true,
        },

        password : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },

        salt : {
            type : DataTypes.STRING(64),
            allowNull : false,
>>>>>>> back-end1
        },

        nickname : {
            type : DataTypes.STRING(40),
            allowNull : false,
        },

        provider : {
            type : DataTypes.STRING(40),
            allowNull : false,
            defaultValue : 'local',
        },

        status : {
            type : DataTypes.TINYINT(1),
            allowNull : false,
            defaultValue : 1,
        },

        role : {
            type : DataTypes.TINYINT(1),
            allowNull : false,
            defaultValue : 1,
        },

        p_photo : {
            type : DataTypes.STRING(100),
        },

        gender : {
            type : DataTypes.TINYINT(1),
            allowNull : false,
            defaultValue : 1, 
        },

        accessedAt : {
            type : DataTypes.DATE,
            allowNull : false,
            defaultValue : sequelize.literal('now()'),
        }
    
    },
    
        {
            timestamps : true,
            paranoid : true,
        }

    
    )

);