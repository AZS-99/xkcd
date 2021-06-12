const express = require('express');
const router = express.Router();
const fetch = require('../middlewares/fetch')

/* GET home page. */
router.get('/', async (req, res) => {
  res.send(await fetch.json('https://xkcd.com/614/info.0.json'))
});


router.get('/:num', async (req, res) => {
  const img_json = await fetch.json('https://xkcd.com/' + req.params.num + '/info.0.json')
  console.log(img_json)
  img_json.transcript = img_json.transcript.replace(/{{.*}}/, "")
  const img_b64 = await fetch.imgb64(img_json.img)
  res.render('index', {
    img: img_b64,
    info: img_json,
    num: req.params.num
  })
})



module.exports = router;
