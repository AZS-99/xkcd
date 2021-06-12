const fetch = require('node-fetch')

module.exports.json = async (url) => {
    try {
        const response = await fetch(url)
        return JSON.parse(await response.text())
    } catch (e) {
        console.log(e)
    }
}


module.exports.imgb64 = async (url) => {
    const img_binary = await fetch(url)
    const img_buffer = await img_binary.buffer()
    const img_b64 = await img_buffer.toString('base64');
    return img_b64
}