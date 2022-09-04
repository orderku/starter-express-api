
const express = require('express')
var router = express.Router();
const axios = require('axios') //you can use any http client
const fs = require('fs')
const { getBuffer } = require('./function')
const Canvas = require('canvas')
const canvasGif = require('canvas-gif')
const Canvacord = require("canvacord");
const xa = require('xfarr-api')
const lineStickerUtil = require('./ranstic')




async function fn(img) {
  const pic = await axios.get(img, {
    responseType: 'arraybuffer',
  })
  const model = await nsfw.load() // To load a local model, nsfw.load('file://./path/to/model/')
  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  const image = await tf.node.decodeImage(pic.data,3)
  const predictions = await model.classify(image)
  image.dispose() // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
   console.log(predictions)
}

router.get('/cek', async(req, res) => {
  var img = req.query.img
  if (!img) return res.json({ message: 'Masukan parameter img?='})
const gg = await fn(img)
  res.json({ 
   creator: `akuari.my.id`,
   gg })

})

router.get('/linestickerdownloader', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter ?link=' })
  
     var result = await xa.downloader.linesticker(link)
	res.json({  
    creator: `akuari.my.id`,
    hasil: result.result
  })
})

router.get('/linestickerrandom', async(req, res) => {
  var sticker = lineStickerUtil.random()
    
	res.json({  
    creator: `akuari.my.id`,
    aaaa: `https://store.line.me/stickershop/product/${sticker.stickerId}`
  })
})

router.get('/whatmusic', async(req, res) => {
	var link = req.query.link
	if (!link) return res.json({ message: 'masukan parameter ?link=' })
     var result = await xa.search.whatanime(link)
	res.json({  
    creator: `akuari.my.id`,
    hasil: result
  })
})

router.get('/maker/attp', async (req, res) => {
	var text = req.query.text
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter text"})

const file = "./aset/attp.gif"

let length = text.length
		
var font = 90
if (length>12){ font = 68}
if (length>15){ font = 58}
if (length>18){ font = 55}
if (length>19){ font = 50}
if (length>22){ font = 48}
if (length>24){ font = 38}
if (length>27){ font = 35}
if (length>30){ font = 30}
if (length>35){ font = 26}
if (length>39){ font = 25}
if (length>40){ font = 20}
if (length>49){ font = 10}
Canvas.registerFont('./aset/SF-Pro.ttf', { family: 'SF-Pro' })
canvasGif(
	file,
	(ctx, width, height, totalFrames, currentFrame) => {

		var couler = ["#ff0000","#ffe100","#33ff00","#00ffcc","#0033ff","#9500ff","#ff00ff"]
		let jadi = couler[Math.floor(Math.random() * couler.length)]
	
	
		function drawStroked(text, x, y) {
			ctx.font = `${font}px SF-Pro`
			ctx.strokeStyle = 'black'
			ctx.lineWidth = 3
			ctx.textAlign = 'center'
			ctx.strokeText(text, x, y)
			ctx.fillStyle = jadi
			ctx.fillText(text, x, y)
		}
		
		drawStroked(text,290,300)

	},
	{
		coalesce: false, // whether the gif should be coalesced first (requires graphicsmagick), default: false
		delay: 0, // the delay between each frame in ms, default: 0
		repeat: 0, // how many times the GIF should repeat, default: 0 (runs forever)
		algorithm: 'neuquant', // the algorithm the encoder should use, default: 'neuquant',
		optimiser: false, // whether the encoder should use the in-built optimiser, default: false,
		fps: 2, // the amount of frames to render per second, default: 60
		quality: 1, // the quality of the gif, a value between 1 and 100, default: 100
	}
).then((buffer) =>{
res.set({'Content-Type': 'gif'})
res.send(buffer)

})
})
router.get('/maker/trigger', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.trigger(text)
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
  
})

router.get('/maker/rip', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.rip(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/greyscale', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.greyscale(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})
router.get('/maker/delete', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.delete(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/facepalm', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.facepalm(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/beautiful', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.beautiful(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/trash', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.trash(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})


router.get('/maker/bed', async (req, res) => {
	var text = req.query.url
  	var text2 = req.query.url2
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
  	if (!text2 ) return res.json({ status : false, message : "[!] masukan parameter url2"})
	const hasil =  await Canvacord.Canvas.bed(text, text2)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/spank', async (req, res) => {
	var text = req.query.url
  	var text2 = req.query.url2
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
  	if (!text2 ) return res.json({ status : false, message : "[!] masukan parameter url2"})
	const hasil =  await Canvacord.Canvas.spank(text, text2)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/slap', async (req, res) => {
	var text = req.query.url
  	var text2 = req.query.url2
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
  	if (!text2 ) return res.json({ status : false, message : "[!] masukan parameter url2"})
	const hasil =  await Canvacord.Canvas.slap(text, text2)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/kiss', async (req, res) => {
	var text = req.query.url
  	var text2 = req.query.url2
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
  	if (!text2 ) return res.json({ status : false, message : "[!] masukan parameter url2"})
	const hasil =  await Canvacord.Canvas.kiss(text, text2)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})


router.get('/maker/blur', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.blur(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/affect', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.affect(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/shit', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.shit(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/ohno', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.ohno(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})













router.get('/maker/joke', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.jokeOverHead(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})







router.get('/maker/hitler', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.hitler(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})



router.get('/maker/invert', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.invert(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/wanted', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.wanted(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/sepia', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})
	const hasil =  await Canvacord.Canvas.sepia(text)
	res.set({'Content-Type': 'png'})
	res.send(hasil)
  
})

router.get('/maker/trigger', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.trigger(text)
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
  
})

router.get('/maker/circle', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.circle(text);
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
  
})

router.get('/maker/blur', async (req, res) => {
	var text = req.query.url
	if (!text ) return res.json({ status : false, message : "[!] masukan parameter url"})


	const hasil =  await Canvacord.Canvas.blur(text);
	res.set({'Content-Type': 'gif'})
	res.send(hasil)
  
})

module.exports = router