const jwt = require('jsonwebtoken');
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
                const token = jwt.sign({
                    name: username,
                    password: password,
                }, 'lemon', { expiresIn: '12h' });

                ctx.response.status = 200;
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: token
                };
            } else {
                ctx.response.status = 401;
                ctx.body = {
                    status: 401,
                    message: 'unauthorized',
                    data: null
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

    static async verify(ctx) {
        try {
            const authorizationHeader = ctx.request.headers.authorization;
            if (!authorizationHeader) {
                throw {
                    status: 401,
                    message: 'Authorization header not found',
                    data: null
                };
            }
    
            const token = authorizationHeader.replace('Bearer ', '');
            if (!token) {
                throw {
                    status: 401,
                    message: 'Bearer token not found',
                    data: null
                };
            }
    
            const secret = 'lemon';
            const decodedToken = jwt.verify(token, secret);
    
            ctx.body = {
                status: 200,
                message: 'Token verification successful',
                data: null
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
}

module.exports = userController;