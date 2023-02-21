const Pool = require("../config/db");

const create = (data) => {
    const {id,nama_depan,nama_belakang,email,alamat,phone,password} = data;
    console.log(data,"model")
    return new Promise ((resolve,reject)=>
    Pool.query(`INSERT INTO users(id,nama_depan,nama_belakang,email,alamat,phone,password) VALUES('${id}','${nama_depan}','${nama_belakang}','${email}','${alamat}','${phone}','${password}')`,(err,result)=>{
    if(!err){ 
         resolve(result)
    } else {
        reject(err)
    }
}))
};

const findEmail = (email) => {
    return new Promise ((resolve,reject)=>
    Pool.query(`SELECT * FROM users where email='${email}'`,(err,result)=>{
    if(!err){
        resolve(result)
    } else {
        reject(err)
    }
}))
};

const getAll = (limit,offset) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getAllUsers = ({limit, offset}) => {
    Pool.query(`SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`)
}


module.exports = {
    create,
    findEmail,
    getAll,
    getAllUsers
};