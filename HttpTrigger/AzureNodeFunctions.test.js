const AzureNodeFunctions = require('./AzureNodeFunctions.js')
const storage = require('azure-storage')

jest.mock('azure-storage')

test('Insert to table gives success', async ()  => {
    const tableServiceStub = {
        createTableIfNotExists: jest.fn,
        insertEntity: jest.fn,
        retrieveEntity: jest.fn,
        insertOrReplaceEntity: jest.fn(() => Promise.resolve().then('Fetching Blob Successfull')
        )
    }
    storage.createTableService.mockImplementationOnce(() => tableServiceStub)

    const status = await AzureNodeFunctions.InsertToTable('table', 'entity')
    expect(status).toBe('Fetching Blob Successfull')
})

/*test('Insert to table gives Failure', async () => {
    const tableServiceStub = {
        createTableIfNotExists: jest.fn,
        insertEntity: jest.fn,
        retrieveEntity: jest.fn,
        insertOrReplaceEntity: jest.fn(() =>  Promise.reject(new Error('Insert Failure'))
        )
    }
    storage.createTableService.mockImplementationOnce(() => tableServiceStub)

        await expect(AzureNodeFunctions.InsertToTable('table', 'entity')).rejects.toThrowError('Insert Failure')
})

test('Able to Fetch Blob from Storage Account', async () => {
    const expectedBlob = {
        "key": "value1",
        "anotherkey": "value2",
        "3rdkey": "value3"
    }
    const blobServiceStub = {
        getBlobToText: jest.fn(() => Promise.resolve(expectedBlob)
        )
    }
    storage.createBlobService.mockImplementationOnce(() => blobServiceStub)

        const status =  await AzureNodeFunctions.FetchJsonFile('container', 'blobName')
        expect(status).toBe(expectedBlob)
      
})

test('Failed to Fetch Blob from Storage Account', async () => {
   
    const blobServiceStub = {
        getBlobToText: jest.fn(() => Promise.reject(new Error('Failed to fetch Blob'))
        )
    }
    storage.createBlobService.mockImplementationOnce(() => blobServiceStub)

        await expect(AzureNodeFunctions.FetchJsonFile('container', 'blobName')).rejects.toThrowError('Failed to fetch Blob')
      
})*/