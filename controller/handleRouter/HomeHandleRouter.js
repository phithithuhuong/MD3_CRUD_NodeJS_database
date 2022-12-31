const fs = require('fs');
const productService = require('../../service/ProductService')
const qs = require('qs');
const categoryService = require('../../service/categoryService');

class HomeHandleRouter {
    static getHomeHtml(homeHtml, product) {

        let tbody = ''
        product.map((product, index) => {
            tbody += ` <tr>
        <td>${index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
        <td> ${product.nameCategory}</td>
        <td>
         <a href="/edit/${product.id}"> <button style="background-color: green; color: white">Edit</button></a>  
        </td>
        <td>
           <a href="/delete/${product.id}"> <button style="background-color: green; color: white">Delete</button></a>
        </td>
    </tr>`

        })
        homeHtml = homeHtml.replace('{product}', tbody);
        return homeHtml;
    }

    showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./src/views/home.html', 'utf8', async (err, homeHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    let product = await productService.findAll();
                    homeHtml = HomeHandleRouter.getHomeHtml(homeHtml, product);
                    res.writeHead(200, 'text/html');
                    res.write(homeHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chuck => {
                data += chuck;
            })
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    console.log(search.search)
                    fs.readFile('./src/views/home.html', 'utf-8', async (err, homeHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let products = await productService.searchProduct(search.search)
                            homeHtml =
                                HomeHandleRouter.getHomeHtml(homeHtml, products);
                            res.writeHead(200, 'text/html');
                            res.write(homeHtml);
                            res.end();
                        }
                    })
                }
            })
        }
    }


    createProduct(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./src/views/create.html', 'utf8', async (err, createHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    let categories = await categoryService.find();
                    let options = ''
                    categories.map(category => {
                        options += `         
        <option value="${category.idCategory}">${category.nameCategory}</option>
          
`
                    })
                    createHtml= createHtml.replace('{categories}',options)
                    res.write(createHtml);
                    res.end();
                }
            })

        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk;

            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const product = qs.parse(data);
                    console.log(product)
                    const mess = await productService.save(product);
                    console.log(mess);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            })
        }
    }

    async deleteProduct(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./src/views/delete.html', 'utf-8', (err, deleteHtml) => {
                if (err) {
                    console.log(err.message)
                } else {
                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}', id);
                    res.write(deleteHtml);
                    res.end();
                }
            })

        } else {
            let mess = await productService.remove(id)
            res.writeHead(301, {'location': '/home'});
            res.end();
        }
    }

    editProduct(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./src/views/edit.html', 'utf8', async (err, editHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = await productService.finById(id);
                    editHtml = editHtml.replace('{name}', product[0].name)
                    editHtml = editHtml.replace('{price}', product[0].price)
                    editHtml = editHtml.replace('{description}', product[0].description);
                    editHtml = editHtml.replace('{id}', product[0].id);
                    res.writeHead(200, 'text/html');

                    res.write(editHtml);
                    res.end();
                }
            })

        } else {
            let data = ''
            req.on('data', chunk => {
                data += chunk;

            })
            req.on('end', async err => {
                if (err) {
                    console.log(err)
                } else {
                    const product = qs.parse(data);
                    const mess = await productService.saveEdit(product, id);
                    console.log(mess);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            })
        }

    }
}


module.exports = new HomeHandleRouter()