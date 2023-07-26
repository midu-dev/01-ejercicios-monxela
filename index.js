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
    callback(null, (data.match(regExp) || []).length)
  })
}

module.exports = {
  writeFile,
  readFileAndCount
}
