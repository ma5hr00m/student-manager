const db = require('../database/db.js');

const sequelize = db.sequelize;

const user = require('../schema/user.js')(sequelize);
user.sync({force: false});

class userModel {
    static async showAllUsers() {
        const result = await user.findAll();
        return result;
    }

    static async authUser(username, password) {
        const realPassword = await user.findOne({
            where: {
                username
            }
        });

        if (password === realPassword) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = userModel;