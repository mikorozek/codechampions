const pool = require('../db')


const register_user =  async (req, res) => {
    console.log('try to register')
   try {
    console.log(req.body)
     const { firstName, surname, email, password } = req.body;
     const name = `${firstName} ${surname}`;
     const is_exist = await pool`SELECT * FROM users WHERE email = ${email} AND password = ${password}`;
     console.log(is_exist)
     if (is_exist.length == 0) {
        const result = await pool`INSERT INTO users (name, email, password) VALUES (${name}, ${email}, ${password})`;
        const check = await pool`SELECT * FROM users WHERE email = ${email} AND password = ${password}`;
        const userId = check[0].user_id;
        req.session.userId = userId;
        res.status(200).json('aaa');
     }
     else{
        res.status(401).json({ error: 'You already have an account on leetcode' });
     }
     
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: 'Internal Server Error' });
   }
  };

module.exports = {
    register_user,
}