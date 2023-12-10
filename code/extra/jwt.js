//import "jsonwebtoken" library
const jwt = require('jsonwebtoken');
//set a secret password
const SECRET_KEY = 'practice_makes_perfect';
//set timeout for token
const timeout = '1h';
router.post('/login', async (req, res) => {
   //create access token
   jwt.sign({ user }, SECRET_KEY, { expiresIn: timeout }, (err, token) => {
      if (err) {
         return res.sendStatus(403);
      }
      res.json({ token });
   })
});

router.post('/logout', (req, res) => {
   //delete access token
   localStorage.removeItem('token');
});

