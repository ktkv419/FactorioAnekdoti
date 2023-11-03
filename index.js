const needle = require('needle')
const { JSDOM } = require('jsdom')
const { Rcon } = require('rcon-ts')
require('dotenv').config()

const rcon = new Rcon({
  host: process.env.SERVER_RCON_URL,
  port: process.env.SERVER_RCON_PORT,
  password: process.env.SERVER_RCON_PASSWORD,
  timeout: 5000,
})

;(async () => {
  const anekSource = 'http://bashorg.org/casual'

  setInterval(() => {
    needle.get(anekSource, function (err, res) {
      if (err) throw err
      const anek = new JSDOM(res.body).window.document
        .querySelector('.q')
        .children[1].innerHTML.replaceAll('<br>', '\n')
      rcon
        .session((c) => c.send(anek))
        .then(() => console.log('Anek succesfully otpravlen'), console.error)
    })
  }, process.env.ANEK_TIMEOUT_MINS * 1000 * 60)
})()
