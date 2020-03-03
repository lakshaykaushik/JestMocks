const AzureNodeFunctions = require('./AzureNodeFunctions.js')
const storage = require('azure-storage')
const entGen = storage.TableUtilities.entityGenerator

jest.mock('azure-storage')
 
test('Insert to table gives success', async ()  => {

    const fn = (table, entity, cb) => {
        cb(null, 'Insert to Table Successfull', { success: true });
    }
    
    const tableServiceStub = {
        createTableIfNotExists: jest.fn,
        insertEntity: jest.fn,
        retrieveEntity: jest.fn,
        insertOrReplaceEntity: fn   
    }
    storage.createTableService.mockImplementationOnce(() => tableServiceStub)
    
    var status = await AzureNodeFunctions.InsertToTable('table', {
        PartitionKey: entGen.String('part2'),
        RowKey: entGen.String('row1'),
        taskDone: entGen.Boolean(true),
      });
      console.log('>>> status: ', status);
      expect(status).toBe('Insert to Table Successfull')
});

test('Insert to table gives failure', async ()  => {

    const fn = (table, entity, cb) => {
        cb('error', 'Insert to Table Failed', { success: false });
    }
    
    const tableServiceStub = {
        createTableIfNotExists: jest.fn,
        insertEntity: jest.fn,
        retrieveEntity: jest.fn,
        insertOrReplaceEntity: fn   
    }
    storage.createTableService.mockImplementationOnce(() => tableServiceStub)
    
    try { await AzureNodeFunctions.InsertToTable('table', {
        PartitionKey: entGen.String('part2'),
        RowKey: entGen.String('row1'),
        taskDone: entGen.Boolean(true),
      });
    } catch (err) {
    console.log('>>> status: ', err);
    expect(err).toBe('error')
    }
      
});

test('Blob Fetching gives Success', async ()  => {

    const expectedBlob = {
        "key": "value1",
        "anotherkey": "value2",
        "3rdkey": "value3"
    }

    const fn = (table, entity, cb) => {
        cb(null, expectedBlob);
    }
    
    const blobServiceStub = {
        getBlobToText: fn   
    }
    storage.createBlobService.mockImplementationOnce(() => blobServiceStub)
    
    var status = await AzureNodeFunctions.FetchJsonFile('container', 'blobName');
      console.log('>>> status: ', status);
      expect(status).toBe(expectedBlob)
});

test('Blob Fetching gives Failure', async ()  => {

    const expectedBlob = {
        "key": "value1",
        "anotherkey": "value2",
        "3rdkey": "value3"
    }

    const fn = (table, entity, cb) => {
        cb('error', expectedBlob);
    }
    
    const blobServiceStub = {
        getBlobToText: fn   
    }
    storage.createBlobService.mockImplementationOnce(() => blobServiceStub)
    
    try { await AzureNodeFunctions.FetchJsonFile('container', 'blobName');
} catch (err) {
      console.log('>>> status: ', err);
      expect(err).toBe('error')
}
});