const fs = require('fs') //nos ajuda a lidar com manipulação de arquivos
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file){
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file
  }

  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) //resolve -> resolve uma sequência de segmentos de caminho para um caminho absoluto

    //tratando exceções caso o arquivo não exista mais
    try {
      await fs.promises.stat(filePath) // stat -> devolve o status do arquivo
    } catch {
      return
    }

    await fs.promises.unlink(filePath) //vai deletar através do unlink. O método delete() não funciona dentro do nodejs
  }
}

module.exports = DiskStorage