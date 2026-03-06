import { StoreService } from '../services/store.service'

global.fetch = jest.fn()

describe('Store Service', () => {

    const storeService = new StoreService()

    const mockResults = [
        {id: 1, name: 'loja', email: 'loja@email.com', password: '1234'},
        {id: 2, name: 'store', email: 'store@email.com', password: 'abcd'}
    ]

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should fetch all stores', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResults
        })

        const result = await storeService.getAll()
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockResults)
    })

    test('should fetch one store', async () => {
        const id = '1'

        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResults[0]
        })

        const result = await storeService.getById(id)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/store/" + id, 
            expect.objectContaining({
                method: "GET"
            }))
        expect(result).toEqual(mockResults[0])
    })

    test('should throw error when store fetch fails', async () => {
        const id = '1'

        fetch.mockResolvedValue({
            ok: false,
            text: async () => "Not Found"
        });

        await expect(storeService.getById(id)).rejects.toThrow('Failed to get store')
    })
})