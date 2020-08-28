const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const ms = require('ms');
const db = require('../database');

exports.login = async (req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    const {username, password} = req.body;

    if (!username || !password) {
      return res.status(400).send('Bad request/Login');
    }

    const user = await db.get('SELECT * FROM users where users.username = $username', {
      $username: username,
    });
    if (!user) {
      return res.status(404).send('Wrong password or username' );
    }
    if (user.password !== password) {
      return res.status(401).send('Wrong password' );
    }

    const token = jwt.sign({ id: user.id }, 'config.secret', {
      expiresIn: ms('3 hrs'), // expires in 3 hours
    });
    // return the information including token as JSON
    return res.status(200).json({ auth: true, token, username: user.username });
  } catch (e) {
    return res.status(500).send( 'Something went wrong/login' );
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ auth: false, token: null, username: '' });
};
