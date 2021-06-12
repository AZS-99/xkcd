const express = require('express');
const router = express.Router();
const fetch = require('../middlewares/fetch')
const database = require('../models/database')
const notifier = require('node-notifier')

/* GET home page. */
router.get('/', async (req, res) => {
  res.send(await fetch.json('https://xkcd.com/614/info.0.json'))
});


router.get('/:num', async (req, res) => {
  try {
    const visits = (await database.record_view(req.params.num)).view_count

    const img_json = await fetch.json('https://xkcd.com/' + req.params.num + '/info.0.json')
    img_json.transcript = img_json.transcript.replace(/{{.*}}/, "")
    const img_b64 = await fetch.imgb64(img_json.img)
    res.render('index', {
      img: img_b64,
      info: img_json,
      visits: visits,
      num: req.params.num
    })
  } catch (e) {

  }

})



module.exports = router;
