const needle = require('needle')
const { JSDOM } = require('jsdom')

const stalker = async () => {
  const naborAnekov = await new Promise((res, rej) => {
    needle.get(
      'https://stalker.fandom.com/ru/wiki/%D0%90%D0%BD%D0%B5%D0%BA%D0%B4%D0%BE%D1%82%D1%8B',
      (err, response) => {
        if (err) throw rej(err)

        const naborAnekov = [
          ...new JSDOM(response.body).window.document.querySelectorAll('.poem'),
        ].map((el) =>
          el.children[0].innerHTML
            .replaceAll('<br>', '\n')
            .replaceAll(/(<([^>]+)>)/gi, '')
            .replaceAll('\n\n', '\n')
        )

        res(naborAnekov)
      }
    )
  })

  return (
    'Внимание, анекдот!\n' +
    naborAnekov[Math.floor(Math.random() * (naborAnekov.length + 1))]
  )
}

module.exports = { stalker }
