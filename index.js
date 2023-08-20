const fs = require('node:fs')
const path = require('node:path')

// Ejercicio 2
async function writeFile (filePath, data, callback) {
  let directory
  try {
    directory = path.dirname(filePath)
  } catch (exception) {
    let message = 'filePath no es una cadena de texto'
    if (exception.name !== 'TypeError') {
      message = `Se ha producido un error al leer del directorio ${directory}`
    }
    callback(new Error(message))
    return
  }

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true })
  }

  fs.writeFile(filePath, data, function (err) {
    if (err) {
      callback(new Error(`No se pudo escribir en el fichero ${filePath}`))
    } else {
      callback()
    }
  })
}

// Ejercicio 3
async function readFileAndCount (word, callback) {
  if (word === undefined) {
    callback(new Error('No se ha especificado la palabra a buscar'))
    return
  }

  if (process.argv.length < 3) {
    callback(new Error('No se ha especificado el path del archivo'))
    return
  }

  if (!fs.existsSync(process.argv[2])) {
    callback(null, 0)
    return
  }

  fs.readFile(process.argv[2], 'utf8', (error, data) => {
    if (error) {
      callback(new Error('No se ha podido leer el archivo'))
      return
    }

    const regExp = new RegExp(word, 'g')
    const matches = (data.match(regExp) || []).length
    callback(null, matches)
  })
}

module.exports = {
  writeFile,
  readFileAndCount
}
