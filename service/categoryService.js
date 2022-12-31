const connection = require('../model/connection');
connection.connection();

class CategoryService {
    find() {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from category`;
            let connect = connection.getConnection();
            connect.query(sql, (err, categories) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(categories);
                }
            })
        })
    }
}

module.exports = new CategoryService();