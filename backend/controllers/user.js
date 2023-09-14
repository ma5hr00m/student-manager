const userModel = require('../model/user.js');

class userController {
    static async show(ctx) {
        try {    
            const users = await userModel.showAllUsers();
            ctx.response.status = 200;
            ctx.body = {
                status: 200,
                message: 'success',
                data: users
            };
        } catch (error) {
            ctx.response.status = error.status || 500;
            ctx.body = {
                status: ctx.response.status,
                message: error.message || 'Internal Server Error',
                data: null
            };
        }
    }

    static async auth(ctx) {
        try {
            const data = ctx.request.body;
            const username = data.username;
            const password = data.password;
            
            const result = await userModel.authUser(username, password);

            if (result) {
                ctx.response.status = 200;
                ctx.body = {
                    status: 200,
                    message: 'success'
                };
            } else {
                ctx.response.status = 401;
                ctx.body = {
                    status: 401,
                    message: 'unauthorized'
                }
            }
        } catch (error) {
            ctx.response.status = error.status || 500;
            ctx.body = {
                status: ctx.response.status,
                message: error.message || 'Internal Server Error'
            };
        }
    }
}

module.exports = userController;