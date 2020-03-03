let InsertToTable =  async function(tableName, entity) {
  const storage = require('azure-storage')
  const tableService = storage.createTableService()
  return new Promise((resolve, reject) => {
        tableService.insertOrReplaceEntity(tableName, entity, function(
          error,
          result
      ) {
          if (error) {
            reject(error)
          } else {
              resolve(result)
          }
})
  })
}
module.exports.InsertToTable = InsertToTable


let FetchJsonFile =  async function(container, blobName) {
  const storage = require('azure-storage')
  const blobService = storage.createBlobService()
  return new Promise((resolve, reject) => {
  
        blobService.getBlobToText(container, blobName, function(error, text) {
          if (error) {
            reject(error)
          } else {
            resolve(text)
          }
      })
    })

}

module.exports.FetchJsonFile = FetchJsonFile