const express = require('express');


const router = express.Router()
const { LottoApi } = require('../controller/apiController')

router.get('/', (req, res, next) => {
    res.send("user api access");
})


router.get('/getLotto/:date', LottoApi);
router.get('/getLotto', LottoApi);


module.exports = router;