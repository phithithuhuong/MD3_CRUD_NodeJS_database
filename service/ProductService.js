const connection = require('../model/connection');
connection.connection()

class ProductService {

    findAll() {
        return new Promise((resolve, reject) => {
            let sql = `select *
                       from product p
                                join category c on p.idCategory = c.idCategory`;

            let connect = connection.getConnection();
            connect.query(sql, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }

    save(product) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`insert into manager.product(price, name, description, image, idCategory)
                           values (${product.price}, '${product.name}', '${product.description}', 'abc.jpg',
                                   ${product.idCategory})`, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('Tạo Thành công !')
                }
            })
        })
    };

    remove(id) {
        let connect = connection.getConnection();
        let sql = `delete
                   from manager.product
                   where id = ${id}`;
        return new Promise((resolve, reject) => {
            connect.query(sql, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve('Thành công !!!')
                }
            })
        })
    }

    saveEdit(product, id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`update product
                           set name        = '${product.name}',
                               price       = ${product.price},
                               description = '${product.description}'
                           where id = ${id}`, (err, product) => {
                if (err) {
                    reject(err)
                } else {
                    console.log('đã sửa!')
                    resolve(product)
                }
            })
        })
    };

    finById(id) {
        let connect = connection.getConnection();
        return new Promise((resolve, reject) => {
            connect.query(`SELECT *
                           FROM product
                           WHERE id = ${id}`, (err, product) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(product)
                }
            })
        })
    }

    searchProduct(search) {
        let connect = connection.getConnection();
        let sql = `select *  from product p join category c on p.idCategory = c.idCategory   WHERE name LIKE '%${search}%'`
        return new Promise((resolve, reject) => {
            connect.query(sql, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }


}

module.exports = new ProductService()