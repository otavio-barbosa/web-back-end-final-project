const express = require(express);
const router = express.Router();

router.post('/register', (req, res) => {
  let { user, password } = req.body;

  console.log('entrou')
})

module.exports = router;