const fs = require('node:fs')
const path = require('path')

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  let directory
  try {
    directory = path.dirname(filePath)
  } catch (exception) {
    if (exception.name === 'TypeError') {
      console.log('filePath no es una cadena de texto')
    } else {
      console.log(`Se ha producido un error al leer del directorio ${directory}`)
    }
    process.exit(1)
  }

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, true)
  }

  fs.writeFile(filePath, data, function (err) {
    if (err) {
      console.log(`No se pudo escribir en el fichero ${filePath}`)
    } else {
      callback()
    }
  })
}

// Ejercicio 3
async function readFileAndCount (word, callback) {

}

module.exports = {
  writeFile,
  readFileAndCount
}
