const studentModel = require('../model/student.js');

class studentController {
    static async show(ctx) {
        console.log('show');
        try {
            const students = await studentModel.showAllStudents();
            ctx.response.status = 200;
            ctx.body = {
                status: 200,
                message: 'success',
                data: students
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

    static async create(ctx) {
        console.log(1);
        try {    
            const data = ctx.request.body;
            const name = data.name;
            const age = data.age;
            const major = data.major;

            const newStudent = await studentModel.createStudent(name, age, major);
            ctx.response.status = 200;
            ctx.body = {
                status: 200,
                message: 'success',
                data: newStudent
            };

            console.log('[CREATE] ' + name);
        } catch (error) {
            ctx.response.status = error.status || 500;
            ctx.body = {
                status: ctx.response.status,
                message: error.message || 'Internal Server Error',
                data: null
            };
        }
    }

    static async delete(ctx) {
        try {    
            const studentId = ctx.params.id;

            const result = await studentModel.deleteStudent(studentId);

            // Check the result of the delete operation
            if (result) {
                ctx.response.status = 200;
                ctx.body = {
                    status: 200,
                    message: 'success',
                    data: result
                };

                console.log('[DELETE] ' + studentId);
            } else {
                // Throw an error if the delete operation failed
                throw {
                    status: 500,
                    message: 'Delete operation failed'
                };
            }
        } catch (error) {
            ctx.response.status = error.status || 500;
            ctx.body = {
                status: ctx.response.status,
                message: error.message || 'Internal Server Error',
                data: null
            };
        }
    }


    static async search(ctx) {
        try {    
            const name = ctx.params.name;

            const students = await studentModel.searchStudent(
                name
            );
            
            ctx.response.status = 200;
            ctx.body = {
                status: 200,
                message: 'success',
                data: students
            };

            console.log('[SEARCH] ' + name);
        } catch (error) {
            ctx.response.status = error.status || 500;
            ctx.body = {
                status: ctx.response.status,
                message: error.message || 'Internal Server Error',
                data: null
            };
        }
    }

    static async update(ctx) {
        try {
            const studentId = ctx.params.id;
            const data = ctx.request.body;
            const name = data.name;
            const age = data.age;
            const major = data.major;
    
            const result = await studentModel.updateStudent(studentId, name, age, major);
            ctx.response.status = 200;
            ctx.body = {
                status: 200,
                message: 'success',
                data: result
            };
    
            console.log('[UPDATE] ' + studentId);
    
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

module.exports = studentController;