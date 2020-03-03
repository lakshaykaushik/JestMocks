const AzureNodeFunctions = require('./AzureNodeFunctions.js')
const storage = require('azure-storage')
const entGen = storage.TableUtilities.entityGenerator

module.exports = async function (context, req) {
    context.log('Team: JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        var tableName = 'TransactionStatus'
        var entity = {
        PartitionKey: entGen.String('PluginPartitionKey'),
        RowKey: entGen.String('rGuid'),
        mailName: entGen.String('MailName')
    }
       var container = 'application1'
       var blobName = 'Challenged Soft Lock-Non-Shadow.json'
        try {
            var result = await AzureNodeFunctions.InsertToTable(tableName, entity)
            context.log(result)
            
        } catch (err) {
            context.log(err)
        }

        try {
            var blob = await AzureNodeFunctions.FetchJsonFile(container, blobName)
            context.log(blob)
            
        } catch (err) {
            context.log(err)
        }
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
            
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};