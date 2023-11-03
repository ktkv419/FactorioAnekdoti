const needle = require('needle')
const { JSDOM } = require('jsdom')

const bashorg = async () =>
  new Promise((res, rej) => {
    needle.get('http://bashorg.org/casual', function (err, response) {
      if (err) throw rej(err)
      const anek = new JSDOM(response.body).window.document
        .querySelector('.q')
        .children[1].innerHTML.replaceAll('<br>', '\n')
      res(anek)
    })
  })

module.exports = { bashorg }
