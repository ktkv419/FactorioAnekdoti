const { Rcon } = require('rcon-ts')
const { bashorg } = require('./anek_sources/bashorg')
const { stalker } = require('./anek_sources/stalker')
require('dotenv').config()

const rcon = new Rcon({
  host: process.env.SERVER_RCON_URL,
  port: process.env.SERVER_RCON_PORT,
  password: process.env.SERVER_RCON_PASSWORD,
  timeout: 5000,
})

const sleep = (t) => new Promise((r) => setTimeout(r, t))

;(async () => {
  while (true) {
    const anek = await stalker()

    rcon.session((c) => c.send(anek)).then(() => {}, console.error)

    await sleep(process.env.ANEK_TIMEOUT_MINS * 1000 * 60)
  }
})()
