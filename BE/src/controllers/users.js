const {response} = require('../helper/common');
const {create, findEmail, getAll, getAllUsers} = require('../models/users');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } =  require('uuid');
const ModelUsers = require('../models/users');
const {generateToken, genRefreshToken} = require('../helper/auth');

const UsersController = {
    insert: async  (req, res, next) => {
        let {rows:[users]} = await findEmail(req.body.email)

        if(users){
            return response(res, 404, false, "email already use"," register fail") 
        }

        let salt = bcrypt.genSaltSync(10);
        console.log(salt);
        let password = bcrypt.hashSync(req.body.password);
        let data = {
            id : uuidv4(),
            nama_depan : req.body.nama_depan,
            nama_belakang : req.body.nama_belakang,
            email : req.body.email,
            alamat : req.body.alamat,
            phone : req.body.phone,
            password ,
        }
        try{
            const result = await create(data)
            if(result){
                console.log(result)
                response(res, 200, true, true, "register success")
            }
        } catch(err){
            console.log(err)
            response(res, 404, false, err," register fail")
        }
    },

    login: async (req,res,next)=>{
        console.log('email',req.body.email)
        console.log('password',req.body.password)
        let {rows:[users]} = await findEmail(req.body.email)
        if(!users){
            return response(res, 404, false, null," email not found")
        }
        const password = req.body.password
        const validation = bcrypt.compareSync(password,users.password)
        if(!validation){
            return response(res, 404, false, null,"wrong password")
        }
        delete users.password
        let payload = {
            id: users.id,
            nama_depan: users.nama_depan,
            nama_belakang: users.nama_belakang,
            email: users.email,
            alamat: users.alamat,
            phone: users.phone
        }
        users.token = generateToken(payload)
        users.refreshToken = genRefreshToken(payload)
        response(res, 200, false, users,"login success")
    },

    getAll: async (req, res) => {
        try {
          const page = req.query.page || 1; 
          const limit = req.query.limit || 6;
          const offset = (page - 1) * limit;
          const result = await getAll(limit,offset);
          if (result) {
            response(res, 200, true, result.rows, 'get all users success');
          }
        } catch (err) {
          console.log(err);
          response(res, 404, false, err, ' get all users failed');
        }
    },

    get: async (req, res) => {
        try {
          const page = req.query.page || 1; 
          const limit = req.query.limit || 6;
          const offset = (page - 1) * limit;
          const result = await getAllUsers({limit,offset});
          if (result) {
            response(res, 200, true, result.rows, 'get all users success');
          }
        } catch (err) {
          console.log(err);
          response(res, 404, false, err, ' get all users failed');
        }
    },

}


exports.UsersController = UsersController;