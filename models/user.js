module.exports = (sequelize, DataTypes)=>(
    sequelize.define('user',{
        email :{
            type : DataTypes.STRING(40),
            allowNull : true,
            unique : true,
        },
        
        password : {
            type : DataTypes.STRING(100),
            allowNull : true,
        },

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
        },

        provider : {
            type : DataTypes.STRING(40),
            allowNull : false,
            defaultValue : 'local',
        },


        snsId : {
            type : DataTypes.STRING(30),
            allowNull : true,
        },
    
    },
    
        {
            timestamps : true,
            paranoid : true,
        }

    
    )

);