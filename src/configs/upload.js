const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

//passando a nossa pasta temporária
const TMP_FOLDER = path.resolve('..', '..', 'tmp')

//passando a nossa pasta definitiva
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, uploads)

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){ //passando as configurações para o arquivo
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash} - ${file.originalname}`

      return callback(null, fileName)
    }
  })
}

module.exports = {
TMP_FOLDER,
UPLOADS_FOLDER,
MULTER
}