const Pool = require("../config/db");

const selectProducts = () => {
    return new Promise((resolve, reject) =>
      Pool.query(`SELECT * FROM products`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      })
  );
};

const selectProduct = (id) => {
    return new Promise ((resolve,reject) =>
      Pool.query(`SELECT * FROM products WHERE id='${id}'`, (err, result) =>{
        if (!err) {
            resolve(result);
        } else {
            reject(err);
        }
    })
  )
}

const deleteProduct = (id) => {
    return new Promise ((resolve,reject) =>
      Pool.query(`DELETE FROM products WHERE id='${id}'`, (err, result) =>{
        if (!err) {
            resolve(result);
        } else {
            reject(err);
        }
    })
  )
}

const insertProduct = (data) => {
  const {id, name, price, photo, description} = data;
  console.log(data, "data dr model")
    return new Promise ((resolve,reject) =>
      Pool.query(`INSERT INTO products (id, name, price, photo, description) VALUES('${id}', '${name}', ${price}, '${photo}', '${description}')`, (err, result) =>{
        if (!err) {
            resolve(result);
        } else {
            reject(err);
        }
    })
  )
}

const updateProduct = (id, data) => {
    const {name, price, photo, description} = data;
      return new Promise ((resolve,reject) =>
        Pool.query(`UPDATE products SET name='${name}', price=${price}, photo='${photo}', description='${description}' WHERE id='${id}'`, (err, result) =>{
          if (!err) {
              resolve(result);
        } else {
              reject(err);
        }
    })
  )
}

module.exports = { selectProduct, selectProducts, deleteProduct, insertProduct, updateProduct }
  