const db = require('../database/db.js');

const sequelize = db.sequelize;

const student = require('../schema/student.js')(sequelize);
student.sync({force: false});

class studentModel {
    static async showAllStudents() {
        const result = await student.findAll();
        return result;
    }

    static async createStudent(name, age, major) {
        const result = await student.create({
            name,
            age,
            major
        });
        return result;
    }

    static async deleteStudent(id) {
        const result = await student.destroy({
            where: {
                id
            }
        });
        return result;
    }

    static async searchStudent(name) {
        const result = await student.findOne({
            where: {
                name
            }
        });
        return result;
    }

    static async updateStudent(studentId, name, age, major) {
        const result = await student.update({
            name,
            age,
            major
        }, {
            where: {
                id: studentId
            }
        });
        return result;
    }
}

module.exports = studentModel;